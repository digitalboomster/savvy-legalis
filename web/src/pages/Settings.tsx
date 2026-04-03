import { useEffect, useState } from 'react'

import { useAuth } from '@/auth/AuthProvider'
import { supabase } from '@/lib/supabase'

export function Settings() {
  const { user } = useAuth()
  const [fullName, setFullName] = useState('')
  const [firmName, setFirmName] = useState('')
  const [firmId, setFirmId] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    if (!user) return
    let cancelled = false
    void (async () => {
      const { data, error: qErr } = await supabase
        .from('profiles')
        .select('full_name, firm_id, firms(name)')
        .eq('id', user.id)
        .single()

      if (cancelled) return
      if (qErr) {
        setError(qErr.message)
        setLoading(false)
        return
      }

      setFullName(data.full_name ?? '')
      setFirmId(data.firm_id)
      const embedded = data.firms as { name: string } | null
      setFirmName(embedded?.name ?? '')
      setLoading(false)
    })()
    return () => {
      cancelled = true
    }
  }, [user])

  async function handleSave(e: React.FormEvent) {
    e.preventDefault()
    if (!user || !firmId) return
    setSaving(true)
    setError(null)
    setSaved(false)

    const trimmedName = fullName.trim()
    const trimmedFirm = firmName.trim()

    const { error: pErr } = await supabase
      .from('profiles')
      .update({ full_name: trimmedName || null })
      .eq('id', user.id)
    if (pErr) {
      setError(pErr.message)
      setSaving(false)
      return
    }

    const { error: fErr } = await supabase.from('firms').update({ name: trimmedFirm }).eq('id', firmId)
    if (fErr) {
      setError(fErr.message)
      setSaving(false)
      return
    }

    const { error: uErr } = await supabase.auth.updateUser({
      data: { full_name: trimmedName },
    })
    if (uErr) {
      setError(uErr.message)
      setSaving(false)
      return
    }

    setSaving(false)
    setSaved(true)
  }

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="font-display text-4xl text-ink">Firm & user settings</h1>
      <p className="mt-2 max-w-2xl font-sans text-mist">
        Firm profile, NBA registration, usage meters, and plan tier — light-on-dark refined panels.
      </p>

      {loading ? (
        <p className="mt-10 font-label text-[11px] uppercase tracking-widest text-mist/60">Loading settings…</p>
      ) : (
        <form onSubmit={handleSave} className="mt-10 grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6 rounded-2xl border border-border bg-elevated p-8 shadow-card">
            <h2 className="font-display text-xl text-ink">Firm profile</h2>
            <div className="h-24 w-24 rounded-xl border border-border bg-surface" />
            <div className="space-y-5">
              <div>
                <label htmlFor="settings-firm-name" className="font-label text-[10px] font-bold uppercase tracking-widest text-mist/70">
                  Firm name
                </label>
                <input
                  id="settings-firm-name"
                  type="text"
                  value={firmName}
                  onChange={(e) => setFirmName(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 font-sans text-sm text-ink outline-none ring-primary/30 transition focus:border-primary/50 focus:ring-2"
                  required
                />
              </div>
              <div>
                <p className="font-label text-[10px] font-bold uppercase tracking-widest text-mist/70">NBA registration</p>
                <div className="mt-2 border-b border-line pb-2 font-sans text-sm text-mist/50">—</div>
              </div>
              <div>
                <label htmlFor="settings-full-name" className="font-label text-[10px] font-bold uppercase tracking-widest text-mist/70">
                  Your full name
                </label>
                <input
                  id="settings-full-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-border bg-surface px-4 py-3 font-sans text-sm text-ink outline-none ring-primary/30 transition focus:border-primary/50 focus:ring-2"
                />
              </div>
            </div>
            {error ? (
              <p className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 font-sans text-sm text-red-200/90">{error}</p>
            ) : null}
            {saved ? (
              <p className="font-sans text-sm text-primary-bright">Changes saved.</p>
            ) : null}
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-primary px-6 py-3 font-sans text-sm font-bold tracking-wide text-white shadow-lift transition hover:bg-primary-bright disabled:opacity-60"
            >
              {saving ? 'Saving…' : 'Save changes'}
            </button>
          </div>
          <div className="rounded-2xl border border-border bg-surface p-8">
            <h2 className="font-display text-xl text-ink">Billing & usage</h2>
            <p className="mt-2 font-sans text-sm text-mist">Plan · tokens · storage meters (CAM-style card).</p>
            <div className="mt-6 h-2 overflow-hidden rounded-full bg-line">
              <div className="h-full w-[42%] rounded-full bg-primary" />
            </div>
          </div>
        </form>
      )}
    </div>
  )
}
