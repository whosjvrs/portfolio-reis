import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { readdirSync, rmSync, statSync } from 'node:fs'
import { resolve } from 'node:path'
import { defineConfig, type Plugin } from 'vite'

// Tamanho real (bytes) de cada PDF em public/cv, lido no build; entra no rótulo do link
function cvSizes() {
  const dir = resolve(import.meta.dirname, 'public/cv')
  return Object.fromEntries(
    readdirSync(dir)
      .filter((file) => file.endsWith('.pdf'))
      .map((file) => [file, statSync(resolve(dir, file)).size]),
  )
}

// As fontes candidatas (public/fonts/candidatas) servem só à comparação em
// desenvolvimento; o build de produção não as leva
function dropCandidateFonts(): Plugin {
  let outDir = ''
  return {
    name: 'drop-candidate-fonts',
    apply: 'build',
    configResolved(config) {
      outDir = resolve(config.root, config.build.outDir)
    },
    closeBundle() {
      rmSync(resolve(outDir, 'fonts/candidatas'), { recursive: true, force: true })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), dropCandidateFonts()],
  define: {
    __CV_SIZES__: JSON.stringify(cvSizes()),
  },
})
