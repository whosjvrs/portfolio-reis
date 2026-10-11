import i18n from 'i18next'

export const supportedLocales = ['pt-BR'] as const

export type Locale = (typeof supportedLocales)[number]

export const defaultLocale: Locale = 'pt-BR'

const storageKey = 'locale'

function isLocale(value: unknown): value is Locale {
  return supportedLocales.includes(value as Locale)
}

// localStorage pode estar indisponível (modo privado, dados bloqueados)
export function getInitialLocale(): Locale {
  try {
    const stored = localStorage.getItem(storageKey)
    if (isLocale(stored)) return stored
  } catch {
    // segue com o idioma padrão
  }
  return defaultLocale
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
