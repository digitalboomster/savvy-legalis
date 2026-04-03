import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { AuthProvider } from '@/auth/AuthProvider'
import { ProtectedRoute } from '@/auth/ProtectedRoute'
import { Shell } from '@/components/Shell'
import { Dashboard } from '@/pages/Dashboard'
import { Draft } from '@/pages/Draft'
import { Landing } from '@/pages/Landing'
import { Login } from '@/pages/Login'
import { Matters } from '@/pages/Matters'
import { Platform } from '@/pages/Platform'
import { Research } from '@/pages/Research'
import { Review } from '@/pages/Review'
import { Settings } from '@/pages/Settings'
import { Signup } from '@/pages/Signup'
import { Support } from '@/pages/Support'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/platform" element={<Platform />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<Shell />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/research" element={<Research />} />
              <Route path="/review" element={<Review />} />
              <Route path="/draft" element={<Draft />} />
              <Route path="/matters" element={<Matters />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/support" element={<Support />} />
            </Route>
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
