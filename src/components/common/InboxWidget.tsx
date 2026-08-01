import { X, Send } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import {
  createInboxThread,
  fetchMyInboxThreads,
  sendInboxMessage,
  type InboxThread,
} from '../../lib/api'
import { useAuth } from '../../context/useAuth'

function timeAgo(iso: string) {
  const diff = Date.now() - new Date(iso).getTime()
  const m = Math.floor(diff / 60000)
  if (m < 1) return 'just now'
  if (m < 60) return `${m}m ago`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h ago`
  return `${Math.floor(h / 24)}d ago`
}

/**
 * Support chat — a single WhatsApp-style conversation with the Ministry of
 * Papers team. There is exactly one thread per user (never multiple); messages
 * auto-expire after 7 days (server-side TTL). No topic/exam threading — just one
 * continuous chat.
 */
export function InboxWidget({ open, onClose, onUnreadChange }: {
  open: boolean
  onClose: () => void
  /** Lets the sidebar nav item show an unread dot. */
  onUnreadChange?: (hasUnread: boolean) => void
}) {
  const { user } = useAuth()
  const [thread, setThread] = useState<InboxThread | null>(null)
  const [text, setText] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  const load = async () => {
    try {
      const data = await fetchMyInboxThreads()
      const t = data[0] ?? null
      setThread(t)
      // Unread while the panel is closed = admin has replied last.
      const lastFromAdmin = !!t && t.messages[t.messages.length - 1]?.from === 'admin'
      onUnreadChange?.(!open && lastFromAdmin)
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
    onUnreadChange?.(false) // opening the chat clears the unread dot
    void load()
    const id = setInterval(load, 15_000)
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
  }, [thread?.messages.length, open])

  if (!user || !open) return null

  const handleSend = async () => {
    const trimmed = text.trim()
    if (!trimmed || sending) return
    setSending(true)
    setError('')
    try {
      if (thread) await sendInboxMessage(thread.id, trimmed)
      else await createInboxThread({ text: trimmed })
      setText('')
      await load()
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Failed to send')
    } finally {
      setSending(false)
    }
  }

  const messages = thread?.messages ?? []

  return (
    <div className="inbox-widget">
      <div className="inbox-overlay" onClick={onClose} aria-hidden="true" />

      <div className="inbox-panel" role="dialog" aria-modal="true" aria-label="Chat with the Ministry of Papers team">
        {/* Header — WhatsApp-style contact bar */}
        <div className="inbox-panel-head">
          <div className="inbox-head-contact">
            <span className="inbox-head-avatar" aria-hidden="true">MoP</span>
            <div className="inbox-head-meta">
              <strong>Ministry of Papers</strong>
              <span>Support · replies within a day</span>
            </div>
          </div>
          <button type="button" className="inbox-close" onClick={onClose} aria-label="Close chat"><X size={16} /></button>
        </div>

        {/* Single continuous conversation */}
        <div className="inbox-thread-view">
          <div className="inbox-messages">
            {messages.length === 0 && (
              <p className="inbox-empty">
                Send us a message — suggest a paper, report an issue, or ask anything.
                We read every chat and reply here. Messages are kept for 7 days.
              </p>
            )}
            {messages.map(m => (
              <div key={m.id} className={`inbox-msg inbox-msg--${m.from}`}>
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
              placeholder="Type a message…"
              maxLength={500}
              rows={1}
              autoFocus
            />
            <button type="button" onClick={() => void handleSend()} disabled={!text.trim() || sending} aria-label="Send">
              <Send size={16} />
            </button>
          </div>
          {error && <p className="inbox-error">{error}</p>}
        </div>
      </div>
    </div>
  )
}
