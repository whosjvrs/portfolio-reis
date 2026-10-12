import type { Locale } from '../i18n/locale'

// URLs externas e arquivos para download, num só lugar

export const GITHUB_URL = 'https://github.com/whosjvrs'

export type ResumeFile = {
  url: string
  // Nome sugerido no download (atributo download)
  fileName: string
  // Tamanho real do arquivo, medido no build; entra no rótulo do link
  sizeBytes: number
}

// Arquivo ausente em public/cv: sem entrada, e o link não aparece
function cv(fileName: string): ResumeFile | undefined {
  const sizeBytes = __CV_SIZES__[fileName]
  return sizeBytes ? { url: `/cv/${fileName}`, fileName, sizeBytes } : undefined
}

// Currículo em PDF por idioma (public/cv). Sem entrada para o idioma atual, o link não aparece
export const RESUME: Partial<Record<Locale, ResumeFile>> = {
  'pt-BR': cv('joao-reis-curriculo.pdf'),
  en: cv('joao-reis-resume.pdf'),
}
