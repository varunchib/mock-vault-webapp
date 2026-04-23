import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { jwtDecode } from 'jwt-decode'
import { AuthContext, type AuthUser, type AuthContextValue } from '../../context/auth-core'

type GoogleCredentialPayload = {
  sub: string
  email: string
  name: string
  picture?: string
  exp: number
}

type StoredSession = {
  user: AuthUser
  credential: string
  expiresAt: number
}

const storageKey = 'pyqvault.google.session'

function readStoredSession(): StoredSession | null {
  const raw = window.localStorage.getItem(storageKey)
  if (!raw) return null

  try {
    const parsed = JSON.parse(raw) as StoredSession
    if (!parsed.expiresAt || parsed.expiresAt <= Date.now()) {
      window.localStorage.removeItem(storageKey)
      return null
    }
    return parsed
  } catch {
    window.localStorage.removeItem(storageKey)
    return null
  }
}

function userFromCredential(credential: string): StoredSession {
  const payload = jwtDecode<GoogleCredentialPayload>(credential)

  return {
    credential,
    expiresAt: payload.exp * 1000,
    user: {
      id: payload.sub,
      email: payload.email,
      name: payload.name,
      avatarUrl: payload.picture,
    },
  }
}

function getInitialUser() {
  const session = readStoredSession()
  return session?.user ?? null
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(getInitialUser)

  const value = useMemo<AuthContextValue>(() => ({
    user,
    isAuthenticated: Boolean(user),
    loginWithGoogleCredential: (credential: string) => {
      const session = userFromCredential(credential)
      window.localStorage.setItem(storageKey, JSON.stringify(session))
      setUser(session.user)
    },
    logout: () => {
      window.localStorage.removeItem(storageKey)
      setUser(null)
    },
  }), [user])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
