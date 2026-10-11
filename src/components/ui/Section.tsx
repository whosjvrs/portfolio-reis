import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import type { SectionId } from '../../config/sections'

type SectionProps = { id: SectionId; className?: string; children?: ReactNode }

// Base das seções da página: id da lista central e título do i18n.
// O visual das seções ainda será definido
function Section({ id, className = '', children }: SectionProps) {
  const { t } = useTranslation()
  const headingId = `${id}-heading`

  return (
    <section id={id} aria-labelledby={headingId} className={className}>
      <h2
        id={headingId}
        className="font-display text-4xl leading-none font-black tracking-display not-italic lg:text-5xl"
      >
        {t(`sections.${id}.title`)}
      </h2>
      {children}
    </section>
  )
}

export default Section
