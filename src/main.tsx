import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './i18n'
import './index.css'
import App from './App.tsx'

// Comparação de fontes de texto (?font=…); o bloco some do build de produção
if (import.meta.env.DEV) void import('./dev/fontPreview')

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
