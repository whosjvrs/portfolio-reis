import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { readdirSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig } from 'vite'

// Tamanho real (bytes) de cada PDF em public/cv, lido no build; entra no rótulo do link
function cvSizes() {
  const dir = resolve(import.meta.dirname, 'public/cv')
  return Object.fromEntries(
    readdirSync(dir)
      .filter((file) => file.endsWith('.pdf'))
      .map((file) => [file, statSync(resolve(dir, file)).size]),
  )
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  define: {
    __CV_SIZES__: JSON.stringify(cvSizes()),
  },
})
