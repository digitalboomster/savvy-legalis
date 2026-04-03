import { useState } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '@/auth/AuthProvider'
import { supabase } from '@/lib/supabase'

export function Login() {
  const { session, loading } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/dashboard'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-canvas">
        <p className="font-label text-[11px] uppercase tracking-widest text-mist/60">Loading…</p>
      </div>
    )
  }

  if (session) {
    return <Navigate to="/dashboard" replace />
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setSubmitting(true)
    const { error: err } = await supabase.auth.signInWithPassword({ email, password })
    setSubmitting(false)
    if (err) {
      setError(err.message)
      return
    }
    navigate(from, { replace: true })
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-canvas bg-hero-mesh px-6">
      <Link to="/" className="mb-10 font-display text-2xl italic text-primary-bright">
        Savvy Legalis
      </Link>
      <div className="w-full max-w-md rounded-2xl border border-border bg-elevated/90 p-8 shadow-card backdrop-blur-xl">
        <h1 className="font-display text-2xl text-ink">Sign in</h1>
        <p className="mt-1 font-sans text-sm text-mist">Use your work email and password.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="login-email" className="font-label text-[10px] font-bold uppercase tracking-widest text-mist/70">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 font-sans text-sm text-ink outline-none ring-primary/30 transition placeholder:text-mist/40 focus:border-primary/50 focus:ring-2"
              placeholder="you@firm.com"
            />
          </div>
          <div>
            <label htmlFor="login-password" className="font-label text-[10px] font-bold uppercase tracking-widest text-mist/70">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 font-sans text-sm text-ink outline-none ring-primary/30 transition focus:border-primary/50 focus:ring-2"
            />
          </div>
          {error ? (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 font-sans text-sm text-red-200/90">{error}</p>
          ) : null}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-primary py-3.5 font-sans text-sm font-bold tracking-wide text-white shadow-lift transition hover:bg-primary-bright disabled:opacity-60"
          >
            {submitting ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
        <p className="mt-6 text-center font-sans text-sm text-mist">
          No account?{' '}
          <Link to="/signup" className="font-semibold text-gold underline-offset-4 hover:underline">
            Create one
          </Link>
        </p>
      </div>
    </div>
  )
}
