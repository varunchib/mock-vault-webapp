import { MessageCircle, X, Send, ChevronLeft } from 'lucide-react'
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

export function InboxWidget({ examSlug, examName, searchTerm }: {
  examSlug?: string
  examName?: string
  searchTerm?: string
}) {
  const { user } = useAuth()
  const [open, setOpen] = useState(false)
  const [view, setView] = useState<View>('list')
  const [threads, setThreads] = useState<InboxThread[]>([])
  const [activeThread, setActiveThread] = useState<InboxThread | null>(null)
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [hasUnread, setHasUnread] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  // Only render for logged-in users
  if (!user) return null

  const load = async () => {
    try {
      const data = await fetchMyInboxThreads()
      setThreads(data)
      setHasUnread(data.some(t => t.status === 'replied'))
      if (activeThread) {
        const updated = data.find(t => t.id === activeThread.id)
        if (updated) setActiveThread(updated)
      }
    } catch { /* silent */ }
  }

  useEffect(() => {
    if (!open) return
    void load()
    const id = setInterval(load, 30_000)
    return () => clearInterval(id)
  }, [open])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [activeThread?.messages.length])

  const openThread = (t: InboxThread) => {
    setActiveThread(t)
    setView('thread')
    setHasUnread(threads.filter(x => x.id !== t.id).some(x => x.status === 'replied'))
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
      {/* Bubble toggle */}
      <button
        className={`inbox-bubble${hasUnread ? ' inbox-bubble--unread' : ''}`}
        onClick={() => { setOpen(o => !o); if (!open) setView('list') }}
        aria-label="Suggestions inbox"
        type="button"
      >
        {open ? <X size={20} /> : <MessageCircle size={20} />}
        {hasUnread && !open && <span className="inbox-badge" />}
      </button>

      {open && (
        <div className="inbox-panel">
          {/* Header */}
          <div className="inbox-panel-head">
            {view !== 'list' && (
              <button type="button" className="inbox-back" onClick={() => { setView('list'); setActiveThread(null) }}>
                <ChevronLeft size={16} />
              </button>
            )}
            <span>{view === 'thread' ? 'Conversation' : view === 'new' ? 'New Suggestion' : 'My Suggestions'}</span>
            <button type="button" className="inbox-close" onClick={() => setOpen(false)}><X size={15} /></button>
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
      )}
    </div>
  )
}
