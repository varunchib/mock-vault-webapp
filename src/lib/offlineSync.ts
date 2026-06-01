/**
 * offlineSync — Enhancement 3 (Offline-first PWA)
 *
 * What this does:
 *  1. Detects live network drops with navigator.onLine + online/offline events.
 *  2. Queues failed syncLiveAttempt() calls in IndexedDB so no answer is lost.
 *  3. Auto-replays the queue the moment the connection returns.
 *
 * Usage in PaperAttemptPage (or MockAttemptPage):
 *
 *   const { isOnline, safeSyncAttempt } = useOfflineSync()
 *
 *   // Replace direct syncLiveAttempt(...) calls with:
 *   await safeSyncAttempt({ paperSlug, answers, marked, currentIndex, remainingSeconds })
 *
 *   // Optionally show a banner:
 *   {!isOnline && <div className="offline-banner">You're offline — answers are saved locally</div>}
 */

import { useCallback, useEffect, useState } from 'react'
import { syncLiveAttempt, type LiveAttemptState } from './api'

// ── IndexedDB helpers ─────────────────────────────────────────────────────────

const DB_NAME    = 'mop-offline'
const DB_VERSION = 1
const STORE      = 'pending-syncs'

type PendingSync = Pick<
  LiveAttemptState,
  'paperSlug' | 'answers' | 'marked' | 'currentIndex' | 'remainingSeconds'
>

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onupgradeneeded = () => {
      req.result.createObjectStore(STORE, { keyPath: 'id', autoIncrement: true })
    }
    req.onsuccess = () => resolve(req.result)
    req.onerror   = () => reject(req.error)
  })
}

async function enqueueSync(payload: PendingSync): Promise<void> {
  const db  = await openDB()
  const tx  = db.transaction(STORE, 'readwrite')
  const store = tx.objectStore(STORE)
  // Keep only the latest state per paper (delete previous entries for this slug)
  const idx = store.index?.('by-paper')
  if (idx) {
    const cursor = await new Promise<IDBCursorWithValue | null>(res =>
      Object.assign(idx.openCursor(IDBKeyRange.only(payload.paperSlug)), { onsuccess: (e: Event) => res((e.target as IDBRequest).result) })
    )
    cursor?.delete()
  }
  store.put(payload)
  return new Promise((res, rej) => { tx.oncomplete = () => res(); tx.onerror = () => rej(tx.error) })
}

async function drainQueue(): Promise<void> {
  const db    = await openDB()
  const tx    = db.transaction(STORE, 'readwrite')
  const store = tx.objectStore(STORE)
  const all   = await new Promise<(PendingSync & { id: number })[]>(resolve => {
    const req = store.getAll()
    req.onsuccess = () => resolve(req.result as (PendingSync & { id: number })[])
    req.onerror   = () => resolve([])
  })

  if (all.length === 0) return

  await Promise.allSettled(
    all.map(async entry => {
      try {
        await syncLiveAttempt({
          paperSlug:        entry.paperSlug,
          answers:          entry.answers,
          marked:           entry.marked,
          currentIndex:     entry.currentIndex,
          remainingSeconds: entry.remainingSeconds,
        })
        store.delete(entry.id)  // remove only on success
      } catch {
        // Leave in queue; will retry on next online event
      }
    })
  )
}

// ── localStorage fallback (ultra-fast, survives before IndexedDB opens) ──────

const LS_KEY = (paperSlug: string) => `mop:draft:${paperSlug}`

export function saveDraftToLocalStorage(payload: PendingSync): void {
  try {
    localStorage.setItem(LS_KEY(payload.paperSlug), JSON.stringify({
      ...payload,
      savedAt: Date.now(),
    }))
  } catch { /* storage full — silently ignore */ }
}

export function loadDraftFromLocalStorage(paperSlug: string): (PendingSync & { savedAt: number }) | null {
  try {
    const raw = localStorage.getItem(LS_KEY(paperSlug))
    return raw ? JSON.parse(raw) : null
  } catch { return null }
}

export function clearDraftFromLocalStorage(paperSlug: string): void {
  localStorage.removeItem(LS_KEY(paperSlug))
}

// ── React hook ────────────────────────────────────────────────────────────────

export function useOfflineSync() {
  const [isOnline, setIsOnline] = useState(() => navigator.onLine)

  useEffect(() => {
    const handleOnline = async () => {
      setIsOnline(true)
      await drainQueue()  // replay any queued syncs from IndexedDB
    }
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online',  handleOnline)
    window.addEventListener('offline', handleOffline)
    return () => {
      window.removeEventListener('online',  handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  /**
   * safeSyncAttempt — drop-in replacement for syncLiveAttempt().
   *
   * - When online: calls the API directly. Falls back to queue on failure.
   * - When offline: saves to localStorage immediately (synchronous),
   *   then enqueues to IndexedDB for replay when reconnected.
   */
  const safeSyncAttempt = useCallback(async (payload: PendingSync): Promise<void> => {
    // Always persist locally first — this is instantaneous
    saveDraftToLocalStorage(payload)

    if (!navigator.onLine) {
      await enqueueSync(payload).catch(() => { /* already in LS */ })
      return
    }

    try {
      await syncLiveAttempt({
        paperSlug:        payload.paperSlug,
        answers:          payload.answers,
        marked:           payload.marked,
        currentIndex:     payload.currentIndex,
        remainingSeconds: payload.remainingSeconds,
      })
      // Successful sync — clear the draft copy
      clearDraftFromLocalStorage(payload.paperSlug)
    } catch {
      // Network blip while navigator.onLine was true — queue for retry
      await enqueueSync(payload).catch(() => { /* IndexedDB unavailable */ })
    }
  }, [])

  return { isOnline, safeSyncAttempt }
}
