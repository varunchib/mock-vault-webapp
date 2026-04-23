import { createContext } from 'react'

export type AuthUser = {
  id: string
  email: string
  name: string
  avatarUrl?: string
}

export type AuthContextValue = {
  user: AuthUser | null
  isAuthenticated: boolean
  loginWithGoogleCredential: (credential: string) => void
  logout: () => void
}

export const AuthContext = createContext<AuthContextValue | null>(null)
