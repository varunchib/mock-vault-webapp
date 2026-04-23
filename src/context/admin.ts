import { env } from '../lib/env'
import type { AuthUser } from './auth-core'

export function isAdminUser(user: AuthUser | null) {
  if (!user) return false
  if (env.adminEmails.length === 0) return false
  return env.adminEmails.includes(user.email.toLowerCase())
}
