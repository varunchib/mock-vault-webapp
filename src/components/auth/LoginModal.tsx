import { GoogleLogin, type CredentialResponse } from '@react-oauth/google'
import { X } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
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

  if (!open) return null

  const handleSuccess = async (response: CredentialResponse) => {
    if (!response.credential) return
    setErrorMessage(null)
    setIsSubmitting(true)

    try {
      await loginWithGoogleCredential(response.credential)
      onClose()
      navigate('/dashboard')
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

        <div className="auth-mark">P</div>
        <h2 id="auth-title">Login to continue</h2>
        <p>
          Use Google to save mock attempts, unlock gated PDFs, and keep your PYQ progress synced.
        </p>

        {env.googleClientId ? (
          <div className="auth-google-slot">
            <GoogleLogin
              onSuccess={handleSuccess}
              onError={() => setErrorMessage('Google login failed. Please try again.')}
              useOneTap={false}
              text="continue_with"
              shape="pill"
              size="large"
              width="320"
            />
          </div>
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
