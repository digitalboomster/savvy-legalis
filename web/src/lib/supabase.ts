import { createClient } from '@supabase/supabase-js'

import type { Database } from '@/types/database'

const url = import.meta.env.VITE_SUPABASE_URL
const anon = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!url || !anon) {
  console.warn(
    '[Savvy Legalis] Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY — copy web/.env.example to web/.env.local',
  )
}

/** Browser client — uses publishable/anon key; RLS applies. */
export const supabase = createClient<Database>(url ?? '', anon ?? '')
