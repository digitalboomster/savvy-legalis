import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { useAuth } from '@/auth/AuthProvider'

export function ProtectedRoute() {
  const { session, loading } = useAuth()
  const location = useLocation()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas">
        <p className="font-label text-[11px] uppercase tracking-widest text-mist/60">Loading…</p>
      </div>
    )
  }

  if (!session) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  }

  return <Outlet />
}
