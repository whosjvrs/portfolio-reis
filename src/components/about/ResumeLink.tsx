import { useTranslation } from 'react-i18next'
import { RESUME } from '../../config/links'
import type { Locale } from '../../i18n/locale'
import TextLink from '../ui/TextLink'

// Currículo em PDF do idioma atual, baixado com o nome do arquivo; sem arquivo
// configurado para o idioma, não aparece
function ResumeLink({ className = '' }: { className?: string }) {
  const { t, i18n } = useTranslation()
  const locale = i18n.resolvedLanguage as Locale
  const resume = RESUME[locale]
  if (!resume) return null

  // KB e MB decimais (1000), como os gerenciadores de arquivos mostram
  const kb = resume.sizeBytes / 1000
  const size =
    kb < 1000
      ? `${Math.round(kb)} KB`
      : `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(kb / 1000)} MB`

  return (
    <li className={className}>
      <TextLink href={resume.url} download={resume.fileName} type="application/pdf" hrefLang={locale}>
        {t('links.resume', { size })}
      </TextLink>
    </li>
  )
}

export default ResumeLink
