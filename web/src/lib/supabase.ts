import { createClient } from '@supabase/supabase-js'

import type { Database } from '@/types/database'

const envUrl = import.meta.env.VITE_SUPABASE_URL?.trim()
const envAnon = import.meta.env.VITE_SUPABASE_ANON_KEY?.trim()

/** True when both URL and anon key are set (e.g. Vercel env + redeploy). */
export const isSupabaseConfigured = Boolean(envUrl && envAnon)

/**
 * createClient throws if url is empty — Vercel builds without env vars would crash on load.
 * Placeholders satisfy the constructor; real requests only work after env is configured.
 */
const url = envUrl ?? 'https://placeholder.supabase.co'
const anon = envAnon ?? 'sb_publishable_placeholder_set_vite_supabase_env'

if (!isSupabaseConfigured) {
  console.warn(
    '[Savvy Legalis] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY missing — set them in Vercel → Settings → Environment Variables, then redeploy.',
  )
}

/** Browser client — uses publishable/anon key; RLS applies when configured. */
export const supabase = createClient<Database>(url, anon)
