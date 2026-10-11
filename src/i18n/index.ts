import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { defaultLocale, getInitialLocale, syncDocumentLang, type Locale } from './locale'
import common from './locales/pt-BR/common.json'

const resources = {
  'pt-BR': {
    common,
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
