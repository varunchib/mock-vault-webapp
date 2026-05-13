import type { AuthUser } from './auth-core'

export function isAdminUser(user: AuthUser | null) {
  if (!user) return false
  return user.role === 'admin'
}

export function homePathForUser(user: AuthUser | null) {
  return isAdminUser(user) ? '/admin' : '/dashboard'
}
