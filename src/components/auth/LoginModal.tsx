import { GoogleLogin, GoogleOAuthProvider, type CredentialResponse } from '@react-oauth/google'
import { X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { homePathForUser } from '../../context/admin'
import { useAuth } from '../../context/useAuth'
import { env } from '../../lib/env'

type LoginModalProps = {
  open: boolean
  onClose: () => void
}

export function LoginModal({ open, onClose }: LoginModalProps) {
  const navigate = useNavigate()
  const { loginWithGoogleCredential } = useAuth()
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const slotRef = useRef<HTMLDivElement | null>(null)
  const [buttonWidth, setButtonWidth] = useState(320)

  // Google's Sign-In button takes a fixed pixel width and cannot be sized in
  // CSS — it renders inside an iframe. A hardcoded width overflows narrow
  // phones: a Redmi 12 is ~393px CSS wide, which leaves ~282px inside this
  // modal, so a 320px button hangs off the screen. Measure the slot instead.
  // (GSI clamps the width to 200-400.)
  useEffect(() => {
    if (!open) return
    const el = slotRef.current
    if (!el) return
    const measure = () => {
      const w = Math.floor(el.getBoundingClientRect().width)
      if (w > 0) setButtonWidth(Math.max(200, Math.min(400, w)))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [open])

  // Hooks above this line — an early return must never sit before them.
  if (!open) return null

  const handleSuccess = async (response: CredentialResponse) => {
    if (!response.credential) return
    setErrorMessage(null)
    setIsSubmitting(true)

    try {
      const user = await loginWithGoogleCredential(response.credential)
      onClose()
      navigate(homePathForUser(user))
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed. Please try again.'
      setErrorMessage(message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="auth-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        className="auth-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button className="auth-close" type="button" onClick={onClose} aria-label="Close login dialog">
          <X size={18} />
        </button>

        <div className="auth-mark">
          <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" width="40" height="40" aria-hidden="true">
            <rect width="40" height="40" rx="11" fill="#18181b"/>
            <path d="M8 30 L8 12 L16 22 L20 13 L24 22 L32 12 L32 30" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h2 id="auth-title">Login to continue</h2>
        <p>
          Use Google to save mock attempts, unlock gated PDFs, and keep your PYQ progress synced.
        </p>

        {env.googleClientId ? (
          // The provider lives here rather than at the app root on purpose: it
          // injects Google's ~96 KB gsi/client script on mount, and this modal is
          // the only consumer. Mounting it here means anonymous visitors (most of
          // our search traffic) never download it.
          <GoogleOAuthProvider clientId={env.googleClientId}>
            <div className="auth-google-slot" ref={slotRef}>
              <GoogleLogin
                onSuccess={handleSuccess}
                onError={() => setErrorMessage('Google login failed. Please try again.')}
                useOneTap={false}
                text="continue_with"
                shape="pill"
                size="large"
                width={String(buttonWidth)}
              />
            </div>
          </GoogleOAuthProvider>
        ) : (
          <div className="auth-config-warning">
            Add <code>VITE_GOOGLE_CLIENT_ID</code> in <code>.env</code> to enable Google login.
          </div>
        )}

        {isSubmitting ? <div className="auth-note">Signing you in...</div> : null}
        {errorMessage ? <div className="auth-config-warning">{errorMessage}</div> : null}

        <div className="auth-note">
          Your session is verified on the backend before private access is granted.
        </div>
      </section>
    </div>
  )
}
