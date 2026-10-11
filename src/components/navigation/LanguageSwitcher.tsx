import { Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { changeLocale, type Locale } from '../../i18n/locale'

// Rótulo curto visível e nome do idioma (na própria língua) para leitores de tela
const LANGUAGES = [
  { locale: 'pt-BR', short: 'PT', nameKey: 'ptBR' },
  { locale: 'en', short: 'EN', nameKey: 'en' },
] as const satisfies readonly { locale: Locale; short: string; nameKey: string }[]

function LanguageSwitcher({ className = '' }: { className?: string }) {
  const { t, i18n } = useTranslation()

  return (
    <div role="group" aria-label={t('language.label')} className={`flex items-center ${className}`}>
      {LANGUAGES.map(({ locale, short, nameKey }, index) => {
        const active = i18n.resolvedLanguage === locale
        return (
          <Fragment key={locale}>
            {index > 0 && (
              <span aria-hidden="true" className="px-1 text-cream/40">
                /
              </span>
            )}
            <button
              type="button"
              lang={locale}
              aria-pressed={active}
              aria-label={t(`language.options.${nameKey}`)}
              onClick={() => void changeLocale(locale)}
              className={`min-h-11 cursor-pointer rounded-sm px-1.5 text-[15px] font-semibold tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cream lg:text-base ${
                active ? 'text-accent' : 'text-cream/70 hover:text-cream'
              }`}
            >
              {short}
            </button>
          </Fragment>
        )
      })}
    </div>
  )
}

export default LanguageSwitcher
