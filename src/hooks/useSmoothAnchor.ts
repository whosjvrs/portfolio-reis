import { useCallback, type MouseEvent } from 'react'
import { gsap } from '../lib/gsap'
import { headerOffset, prefersReducedMotion } from '../lib/layout'

const SCROLL = { duration: 1, ease: 'power2.inOut' }

// Rola até a seção com o offset da moldura + header, atualiza o hash e, ao
// chegar, move o foco para o título dela (h1 na hero, h2 nas demais; tabindex="-1")
export function scrollToAnchor(id: string) {
  const target = document.getElementById(id)
  if (!target) return false

  // O hash entra antes de rolar: assim a entrada anterior do histórico guarda a
  // posição de onde a pessoa saiu, e voltar/avançar restauram cada uma
  if (location.hash !== `#${id}`) history.pushState(null, '', `#${id}`)
  const focusHeading = () =>
    target.querySelector<HTMLElement>('h1, h2')?.focus({ preventScroll: true })

  if (prefersReducedMotion()) {
    const y = target.getBoundingClientRect().top + window.scrollY - headerOffset()
    window.scrollTo(0, Math.max(0, y))
    focusHeading()
  } else {
    gsap.to(window, {
      ...SCROLL,
      scrollTo: { y: target, offsetY: headerOffset() },
      onComplete: focusHeading,
    })
  }
  return true
}

// onClick para links internos (href="#id"). Âncoras que ainda não existem,
// cliques com modificador e botão do meio seguem o comportamento nativo
export function useSmoothAnchor() {
  return useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    const id = event.currentTarget.hash.slice(1)
    if (id && scrollToAnchor(id)) event.preventDefault()
  }, [])
}
