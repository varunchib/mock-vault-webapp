import { createContext } from 'react'

export type AuthUser = {
  id: string
  email: string
  name: string
  avatarUrl?: string
  role: 'user' | 'admin'
}

export type AuthContextValue = {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  loginWithGoogleCredential: (credential: string) => Promise<void>
  logout: () => Promise<void>
}

export const AuthContext = createContext<AuthContextValue | null>(null)
