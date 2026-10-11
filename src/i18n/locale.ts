import i18n from 'i18next'

export const supportedLocales = ['pt-BR'] as const

export type Locale = (typeof supportedLocales)[number]

export const defaultLocale: Locale = 'pt-BR'

const storageKey = 'locale'

function isLocale(value: unknown): value is Locale {
  return supportedLocales.includes(value as Locale)
}

// Aceita a tag exata ('en-US') ou só o idioma base ('pt-PT' → 'pt-BR')
function matchLocale(tag: string): Locale | undefined {
  const normalized = tag.toLowerCase()
  const base = normalized.split('-')[0]
  return (
    supportedLocales.find((locale) => locale.toLowerCase() === normalized) ??
    supportedLocales.find((locale) => locale.toLowerCase().split('-')[0] === base)
  )
}

function getBrowserLocale(): Locale | undefined {
  const tags = navigator.languages?.length ? navigator.languages : [navigator.language]
  for (const tag of tags) {
    const locale = tag && matchLocale(tag)
    if (locale) return locale
  }
  return undefined
}

// Ordem: escolha salva → idioma do navegador → padrão.
// localStorage pode estar indisponível (modo privado, dados bloqueados)
export function getInitialLocale(): Locale {
  try {
    const stored = localStorage.getItem(storageKey)
    if (isLocale(stored)) return stored
  } catch {
    // segue para o idioma do navegador
  }
  return getBrowserLocale() ?? defaultLocale
}

export function syncDocumentLang(locale: string) {
  document.documentElement.lang = locale
}

// Para o seletor PT/EN: salva só a escolha explícita do visitante
export async function changeLocale(locale: Locale) {
  try {
    localStorage.setItem(storageKey, locale)
  } catch {
    // a troca vale só para esta visita
  }
  await i18n.changeLanguage(locale)
}
