import type { Locale } from '../i18n/locale'

// URLs externas do site, num só lugar

export const GITHUB_URL = 'https://github.com/whosjvrs'

export type ResumeFile = {
  url: string
  // Tamanho do PDF em KB, conferido no arquivo; entra no rótulo do link
  sizeKB: number
}

// Currículo em PDF por idioma. Sem entrada para o idioma atual, o link não aparece
export const RESUME: Partial<Record<Locale, ResumeFile>> = {}
