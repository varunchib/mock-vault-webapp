import { BrowserRouter, useLocation } from 'react-router-dom'
import { GoogleProvider } from './components/auth/GoogleProvider'
import { AuthProvider } from './components/auth/AuthProvider'
import { Navbar } from './components/layout/Navbar'
import { Footer } from './components/layout/Footer'
import { AppRoutes } from './routes/AppRoutes'

function AppChrome() {
  const location = useLocation()
  const isDashboard = location.pathname.startsWith('/dashboard')

  return (
    <>
      {!isDashboard ? <Navbar /> : null}
      <main>
        <AppRoutes />
      </main>
      {!isDashboard ? <Footer /> : null}
    </>
  )
}

export default function App() {
  return (
    <GoogleProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppChrome />
        </BrowserRouter>
      </AuthProvider>
    </GoogleProvider>
  )
}
