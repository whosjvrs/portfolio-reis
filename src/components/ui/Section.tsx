import type { ReactNode } from 'react'
import { useTranslation } from 'react-i18next'
import { sectionNumber, type SectionId } from '../../config/sections'
import TranslatedText from './TranslatedText'

type SectionProps = { id: SectionId; className?: string; children?: ReactNode }

// Base das seções da página: id da lista central, nomeada pelo próprio h2.
// O título (SectionHeading) entra onde o layout da seção pedir
function Section({ id, className = '', children }: SectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className={className}>
      {children}
    </section>
  )
}

// Rótulo de catálogo ("/02", decorativo) e h2 com o título do i18n
export function SectionHeading({ id }: { id: SectionId }) {
  const { t } = useTranslation()

  return (
    <>
      <p aria-hidden="true" className="mb-4 text-sm font-semibold tracking-[0.2em] text-cream/70 tabular-nums">
        /{sectionNumber(id)}
      </p>
      <h2
        id={`${id}-heading`}
        // alvo de foco da rolagem por âncora (useSmoothAnchor); não entra no Tab
        tabIndex={-1}
        className="font-display focus:outline-none text-4xl leading-none font-black tracking-display not-italic lg:text-5xl"
      >
        <TranslatedText group="titles">{t(`sections.${id}.title`)}</TranslatedText>
      </h2>
    </>
  )
}

export default Section
