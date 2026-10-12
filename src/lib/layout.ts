// Distância do topo da tela até a base do header quando fixo (moldura + header).
// Usa o top do sticky e a altura reais, então acompanha o gap da moldura e o
// header de duas linhas, e vale mesmo antes de o header grudar
export function headerOffset() {
  const header = document.querySelector('header')
  if (!header) return 0
  return parseFloat(getComputedStyle(header).top) + header.offsetHeight
}

// Fixação e entardecer da hero: só no desktop (lg) e sem movimento reduzido
export const MOTION_QUERY = '(min-width: 64rem) and (prefers-reduced-motion: no-preference)'

// Rolagem por âncora: suave em qualquer largura; instantânea só com movimento reduzido
export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches
