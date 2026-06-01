'use client'

import { GoogleProvider }  from '../components/auth/GoogleProvider'
import { AuthProvider }    from '../components/auth/AuthProvider'
import { AppChrome }       from './AppChrome'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GoogleProvider>
      <AuthProvider>
        <AppChrome>{children}</AppChrome>
      </AuthProvider>
    </GoogleProvider>
  )
}
