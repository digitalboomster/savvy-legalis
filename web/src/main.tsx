import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import '@/lib/supabase'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import App from './App.tsx'

const el = document.getElementById('root')
if (!el) {
  throw new Error('#root missing')
}

try {
  const root = createRoot(el)
  root.render(
    <StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </StrictMode>,
  )
} catch (e) {
  console.error(e)
  el.textContent = `Savvy Legalis failed to start: ${e instanceof Error ? e.message : String(e)}`
}
