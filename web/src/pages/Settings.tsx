import { useState } from 'react'

import { mockSettingsDefaults } from '@/mocks/workspace'

export function Settings() {
  const [fullName, setFullName] = useState<string>(mockSettingsDefaults.fullName)
  const [firmName, setFirmName] = useState<string>(mockSettingsDefaults.firmName)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  function handleSave(e: React.FormEvent) {
    e.preventDefault()
    setSaving(true)
    setSaved(false)
    window.setTimeout(() => {
      setSaving(false)
      setSaved(true)
    }, 400)
  }

  return (
    <div className="mx-auto max-w-6xl">
      <h1 className="font-display text-4xl text-ink">Firm & user settings</h1>
      <p className="mt-2 max-w-2xl font-sans text-mist">
        Firm profile, NBA registration, usage meters, and plan tier — light-on-dark refined panels (demo: local only).
      </p>

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
          {saved ? (
            <p className="font-sans text-sm text-primary-bright">Saved (demo — not persisted).</p>
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
    </div>
  )
}
