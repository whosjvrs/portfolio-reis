import { useTranslation } from 'react-i18next'
import { RESUME } from '../../config/links'
import type { Locale } from '../../i18n/locale'
import TextLink from '../ui/TextLink'

// Currículo em PDF do idioma atual; enquanto não houver arquivo configurado, não aparece
function ResumeLink({ className = '' }: { className?: string }) {
  const { t, i18n } = useTranslation()
  const locale = i18n.resolvedLanguage as Locale
  const resume = RESUME[locale]
  if (!resume) return null

  const size =
    resume.sizeKB < 1000
      ? `${Math.round(resume.sizeKB)} KB`
      : `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(resume.sizeKB / 1000)} MB`

  return (
    <li className={className}>
      <TextLink href={resume.url} type="application/pdf" hrefLang={locale}>
        {t('links.resume', { size })}
      </TextLink>
    </li>
  )
}

export default ResumeLink
