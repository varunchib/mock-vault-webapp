import { X, Send, ChevronLeft } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import {
  createInboxThread,
  fetchMyInboxThreads,
  sendInboxMessage,
  type InboxThread,
} from '../../lib/api'
import { useAuth } from '../../context/useAuth'

type View = 'list' | 'thread' | 'new'

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

export function InboxWidget({ open, onClose, onUnreadChange, examSlug, examName, searchTerm }: {
  open: boolean
  onClose: () => void
  /** Lets the sidebar nav item show an unread dot. */
  onUnreadChange?: (hasUnread: boolean) => void
  examSlug?: string
  examName?: string
  searchTerm?: string
}) {
  const { user } = useAuth()
  const [view, setView] = useState<View>('list')
  const [threads, setThreads] = useState<InboxThread[]>([])
  const [activeThread, setActiveThread] = useState<InboxThread | null>(null)
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  const load = async () => {
    try {
      const data = await fetchMyInboxThreads()
      setThreads(data)
      onUnreadChange?.(data.some(t => t.status === 'replied'))
      if (activeThread) {
        const updated = data.find(t => t.id === activeThread.id)
        if (updated) setActiveThread(updated)
      }
    } catch { /* silent */ }
  }

  // Fetch once on mount so the sidebar unread dot is accurate before the panel
  // is ever opened, then poll only while it is open.
  useEffect(() => {
    if (!user) return
    void load()
  }, [user?.id])

  useEffect(() => {
    if (!open || !user) return
    setView('list')
    void load()
    const id = setInterval(load, 30_000)
    return () => clearInterval(id)
  }, [open, user?.id])

  // Escape to close + lock body scroll while the panel is open
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prevOverflow
      document.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeThread?.messages.length])

  // Only render for logged-in users
  if (!user || !open) return null

  const openThread = (t: InboxThread) => {
    setActiveThread(t)
    setView('thread')
    onUnreadChange?.(threads.filter(x => x.id !== t.id).some(x => x.status === 'replied'))
  }

  const handleSend = async () => {
    const trimmed = text.trim()
    if (!trimmed || sending) return
    setSending(true)
    setError('')
    try {
      if (view === 'new') {
        const res = await createInboxThread({
          text: trimmed,
          examSlug,
          examName,
          searchTerm,
        })
        setText('')
        await load()
        const created = threads.find(t => t.id === res.threadId)
        if (created) openThread(created)
        else setView('list')
      } else if (activeThread) {
        await sendInboxMessage(activeThread.id, trimmed)
        setText('')
        await load()
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to send')
    } finally {
      setSending(false)
    }
  }

  const lastMsg = (t: InboxThread) => t.messages[t.messages.length - 1]

  return (
    <div className="inbox-widget">
      <div className="inbox-overlay" onClick={onClose} aria-hidden="true" />

      <div className="inbox-panel" role="dialog" aria-modal="true" aria-label="Suggestions inbox">
          {/* Header */}
          <div className="inbox-panel-head">
            {view !== 'list' && (
              <button type="button" className="inbox-back" onClick={() => { setView('list'); setActiveThread(null) }}>
                <ChevronLeft size={16} />
              </button>
            )}
            <span>{view === 'thread' ? 'Conversation' : view === 'new' ? 'New Suggestion' : 'My Suggestions'}</span>
            <button type="button" className="inbox-close" onClick={onClose}><X size={15} /></button>
          </div>

          {/* List view */}
          {view === 'list' && (
            <div className="inbox-list">
              {threads.length === 0 && (
                <p className="inbox-empty">No suggestions yet.</p>
              )}
              {threads.map(t => (
                <button key={t.id} type="button" className={`inbox-thread-row${t.status === 'replied' ? ' inbox-thread-row--replied' : ''}`} onClick={() => openThread(t)}>
                  <div className="inbox-thread-meta">
                    <span className="inbox-thread-context">{t.examName || t.searchTerm || 'General'}</span>
                    <span className="inbox-thread-time">{timeAgo(t.createdAt)}</span>
                  </div>
                  <p className="inbox-thread-preview">{lastMsg(t).text}</p>
                  {t.status === 'replied' && <span className="inbox-replied-badge">Reply received</span>}
                </button>
              ))}
              <button type="button" className="inbox-new-btn" onClick={() => { setView('new'); setText('') }}>
                + New suggestion
              </button>
            </div>
          )}

          {/* Thread view */}
          {view === 'thread' && activeThread && (
            <div className="inbox-thread-view">
              <div className="inbox-messages">
                {activeThread.messages.map(m => (
                  <div key={m.id} className={`inbox-msg inbox-msg--${m.from}`}>
                    <span className="inbox-msg-who">{m.from === 'admin' ? 'Ministry of Papers' : 'You'}</span>
                    <p className="inbox-msg-text">{m.text}</p>
                    <span className="inbox-msg-time">{timeAgo(m.createdAt)}</span>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>
              <div className="inbox-compose">
                <textarea
                  value={text}
                  onChange={e => setText(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); void handleSend() } }}
                  placeholder="Follow up…"
                  maxLength={500}
                  rows={2}
                />
                <button type="button" onClick={() => void handleSend()} disabled={!text.trim() || sending}>
                  <Send size={15} />
                </button>
              </div>
              {error && <p className="inbox-error">{error}</p>}
            </div>
          )}

          {/* New suggestion view */}
          {view === 'new' && (
            <div className="inbox-thread-view">
              {(examName || searchTerm) && (
                <p className="inbox-context-pill">
                  Re: <strong>{examName || searchTerm}</strong>
                </p>
              )}
              <div className="inbox-messages inbox-messages--new">
                <p className="inbox-empty">Suggest a paper, year, or anything missing. We read every message.</p>
              </div>
              <div className="inbox-compose">
                <textarea
                  value={text}
                  onChange={e => setText(e.target.value)}
                  onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); void handleSend() } }}
                  placeholder="e.g. JKSSB Patwari 2023 Shift 2…"
                  maxLength={500}
                  rows={3}
                  autoFocus
                />
                <button type="button" onClick={() => void handleSend()} disabled={!text.trim() || sending}>
                  <Send size={15} />
                </button>
              </div>
              {error && <p className="inbox-error">{error}</p>}
            </div>
          )}
      </div>
    </div>
  )
}
