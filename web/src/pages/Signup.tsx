import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

import { useAuth } from '@/auth/AuthProvider'
import { supabase } from '@/lib/supabase'

export function Signup() {
  const { session, loading } = useAuth()
  const navigate = useNavigate()

  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [info, setInfo] = useState<string | null>(null)
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
    setInfo(null)
    setSubmitting(true)
    const { data, error: err } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName.trim() || undefined },
      },
    })
    setSubmitting(false)
    if (err) {
      setError(err.message)
      return
    }
    if (data.session) {
      navigate('/dashboard', { replace: true })
      return
    }
    setInfo('Check your email to confirm your account, then sign in.')
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-canvas bg-hero-mesh px-6">
      <Link to="/" className="mb-10 font-display text-2xl italic text-primary-bright">
        Savvy Legalis
      </Link>
      <div className="w-full max-w-md rounded-2xl border border-border bg-elevated/90 p-8 shadow-card backdrop-blur-xl">
        <h1 className="font-display text-2xl text-ink">Create account</h1>
        <p className="mt-1 font-sans text-sm text-mist">Your firm workspace is created automatically.</p>
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div>
            <label htmlFor="signup-name" className="font-label text-[10px] font-bold uppercase tracking-widest text-mist/70">
              Full name
            </label>
            <input
              id="signup-name"
              type="text"
              autoComplete="name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 font-sans text-sm text-ink outline-none ring-primary/30 transition placeholder:text-mist/40 focus:border-primary/50 focus:ring-2"
              placeholder="Ada Okonkwo"
            />
          </div>
          <div>
            <label htmlFor="signup-email" className="font-label text-[10px] font-bold uppercase tracking-widest text-mist/70">
              Email
            </label>
            <input
              id="signup-email"
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
            <label htmlFor="signup-password" className="font-label text-[10px] font-bold uppercase tracking-widest text-mist/70">
              Password
            </label>
            <input
              id="signup-password"
              type="password"
              autoComplete="new-password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 font-sans text-sm text-ink outline-none ring-primary/30 transition focus:border-primary/50 focus:ring-2"
            />
          </div>
          {error ? (
            <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 font-sans text-sm text-red-200/90">{error}</p>
          ) : null}
          {info ? (
            <p className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 font-sans text-sm text-mist">{info}</p>
          ) : null}
          <button
            type="submit"
            disabled={submitting}
            className="w-full rounded-xl bg-primary py-3.5 font-sans text-sm font-bold tracking-wide text-white shadow-lift transition hover:bg-primary-bright disabled:opacity-60"
          >
            {submitting ? 'Creating…' : 'Create account'}
          </button>
        </form>
        <p className="mt-6 text-center font-sans text-sm text-mist">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-gold underline-offset-4 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
