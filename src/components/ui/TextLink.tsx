import type { ComponentPropsWithoutRef } from 'react'
import { useTranslation } from 'react-i18next'

type TextLinkProps = ComponentPropsWithoutRef<'a'> & {
  // Abre em nova aba, com seta ↗ e aviso para leitores de tela
  external?: boolean
}

// Link discreto de texto (não botão): sublinhado fino que se acende no hover
function TextLink({ external = false, className = '', children, ...props }: TextLinkProps) {
  const { t } = useTranslation()

  return (
    <a
      className={`rounded-sm text-base font-semibold text-cream/85 underline decoration-cream/30 underline-offset-[6px] transition-colors hover:text-cream hover:decoration-cream/70 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream ${className}`}
      {...(external && { target: '_blank', rel: 'noopener noreferrer' })}
      {...props}
    >
      {children}
      {external && (
        <>
          {/* inline-block: o sublinhado do link não passa pela seta */}
          <span aria-hidden="true" className="ms-1.5 inline-block">↗</span>
          <span className="sr-only"> {t('links.newTab')}</span>
        </>
      )}
    </a>
  )
}

export default TextLink
