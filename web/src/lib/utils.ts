import type { User } from '@supabase/supabase-js'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/** Avatar initials from profile metadata or email. */
export function userInitials(user: User): string {
  const raw = user.user_metadata?.full_name
  const name = typeof raw === 'string' ? raw.trim() : ''
  if (name) {
    const parts = name.split(/\s+/).filter(Boolean)
    if (parts.length >= 2) {
      const a = parts[0]![0]
      const b = parts[1]![0]
      if (a && b) return (a + b).toUpperCase()
    }
    return name.slice(0, 2).toUpperCase()
  }
  const email = user.email ?? '?'
  return email.slice(0, 2).toUpperCase()
}

export function userDisplayLabel(user: User): string {
  const raw = user.user_metadata?.full_name
  if (typeof raw === 'string' && raw.trim()) return raw.trim()
  return user.email ?? 'Account'
}
