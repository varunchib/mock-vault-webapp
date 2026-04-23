import { GoogleOAuthProvider } from '@react-oauth/google'
import type { ReactNode } from 'react'
import { env } from '../../lib/env'

type GoogleProviderProps = {
  children: ReactNode
}

const missingClientId = 'missing-google-client-id'

export function GoogleProvider({ children }: GoogleProviderProps) {
  return (
    <GoogleOAuthProvider clientId={env.googleClientId ?? missingClientId}>
      {children}
    </GoogleOAuthProvider>
  )
}
