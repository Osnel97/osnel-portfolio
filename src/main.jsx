import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// Self-hosted variable font (weight axis only, no italics) — bundled as a
// local asset by Vite, so this stays same-origin and needs no CSP change
// or third-party font CDN (no Google Fonts network call, no tracking).
import '@fontsource-variable/inter/wght.css'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
