import { Component, type ErrorInfo, type ReactNode } from 'react'

type Props = { children: ReactNode }
type State = { error: Error | null }

export class ErrorBoundary extends Component<Props, State> {
  state: State = { error: null }

  static getDerivedStateFromError(error: Error): State {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('[Savvy Legalis]', error, info.componentStack)
  }

  render() {
    if (this.state.error) {
      return (
        <div className="min-h-screen bg-canvas px-6 py-16 text-ink">
          <h1 className="font-display text-2xl">Something went wrong</h1>
          <p className="mt-3 max-w-lg font-sans text-sm text-mist">
            The app hit a runtime error. Open the browser console for details, or reload the page.
          </p>
          <pre className="mt-6 max-h-64 overflow-auto rounded-xl border border-border bg-elevated p-4 font-mono text-xs text-red-300/90">
            {this.state.error.message}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}
