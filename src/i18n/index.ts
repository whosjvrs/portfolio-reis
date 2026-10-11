import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { defaultLocale, getInitialLocale, syncDocumentLang, type Locale } from './locale'
import en from './locales/en/common.json'
import common from './locales/pt-BR/common.json'

const resources = {
  'pt-BR': {
    common,
  },
  en: {
    common: en,
  },
} satisfies Record<Locale, { common: typeof common }>

i18n.on('languageChanged', syncDocumentLang)

void i18n.use(initReactI18next).init({
  lng: getInitialLocale(),
  fallbackLng: defaultLocale,
  defaultNS: 'common',
  resources,
  interpolation: {
    escapeValue: false,
  },
})

export default i18n
