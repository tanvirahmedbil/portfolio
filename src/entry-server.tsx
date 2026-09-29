// Build-time render: scripts/prerender.mjs injects this HTML into dist/index.html,
// so crawlers get the full page text without running JavaScript.
import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import App from './App.tsx'

export function render() {
  return renderToString(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
