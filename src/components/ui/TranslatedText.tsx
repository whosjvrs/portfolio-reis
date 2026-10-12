import { useRef } from 'react'
import { gsap, SplitText, useGSAP } from '../../lib/gsap'
import { prefersReducedMotion } from '../../lib/layout'
import './TranslatedText.css'
import { groupDelay, TRANSLATION_MOTION, type MotionGroup } from './translationMotion'

type TranslatedTextProps = {
  children: string
  // type: letra a letra (rótulos, títulos, frases); fade: esmaecimento (parágrafos longos)
  mode?: 'type' | 'fade'
  // Grupo na sequência da troca (navegação → … → parágrafos); define o atraso
  group: MotionGroup
  // Traço piscando na letra atual durante a datilografia
  caret?: boolean
}

// Texto traduzido que anima quando muda (troca de idioma), nunca na montagem.
// O span visível é recriado a cada texto (key) e só ele é dividido pelo SplitText:
// o React nunca atualiza nós que o SplitText alterou. As letras ficam ocultas e são
// reveladas com o texto final já no lugar, então o layout não se move.
// No modo type, leitores de tela leem a cópia sr-only, sempre o texto inteiro.
function TranslatedText({ children: text, mode = 'type', group, caret = false }: TranslatedTextProps) {
  const visual = useRef<HTMLSpanElement>(null)
  // Texto já exibido: na montagem é o próprio texto, então não anima
  const shown = useRef(text)

  useGSAP(
    () => {
      if (shown.current === text) return
      shown.current = text
      const el = visual.current
      if (!el || prefersReducedMotion()) return
      const delay = groupDelay(group)

      if (mode === 'fade') {
        gsap.from(el, { ...TRANSLATION_MOTION.fade, delay, autoAlpha: 0 })
        return
      }

      // tag span: letras inline, sem inline-block, para não mudar quebras nem
      // kerning; aria none: a acessibilidade fica com a cópia sr-only
      const split = SplitText.create(el, { type: 'words,chars', tag: 'span', aria: 'none' })
      const chars = split.chars as HTMLElement[]
      const step = Math.min(TRANSLATION_MOTION.charStep, TRANSLATION_MOTION.maxDuration / chars.length)
      gsap.set(chars, { visibility: 'hidden' })

      const tl = gsap.timeline({ delay })
      chars.forEach((char, i) => {
        const at = i * step
        tl.set(char, { visibility: 'inherit' }, at)
        if (caret) {
          tl.call(() => {
            chars[i - 1]?.classList.remove('type-caret')
            char.classList.add('type-caret')
          }, undefined, at)
        }
      })
      // Ao terminar, volta ao texto simples (o cursor some com a divisão)
      tl.call(() => split.revert(), undefined, chars.length * step)
    },
    // Nova troca no meio da animação: o contexto anterior é revertido (timeline
    // interrompida, divisão desfeita) antes de a nova começar
    { dependencies: [text], revertOnUpdate: true },
  )

  if (mode === 'fade') {
    return (
      <span key={text} ref={visual}>
        {text}
      </span>
    )
  }

  return (
    <>
      <span className="sr-only select-none">{text}</span>
      <span key={text} ref={visual} aria-hidden="true">
        {text}
      </span>
    </>
  )
}

export default TranslatedText
