import type { RefObject } from 'react'
import { gsap, useGSAP } from '../../lib/gsap'
import { headerOffset, MOTION_QUERY } from '../../lib/layout'

// Entardecer ligado à rolagem da hero. Cada camada tem uma classe comum a todas
// as cópias da cena (fundo, lentes, estrelas que escapam), então se movem juntas
export const DUSK = {
  // Descida em % da altura do próprio sol até sumir atrás das montanhas: o canal
  // alfa cobre o disco inteiro a partir de ~80%; 90% dá margem
  sunYPercent: 90,
  glowOpacity: 0.2,
  // Deriva em % da largura da tela; a camada começa 40px (o transbordo) fora da
  // coluna, então a borda esquerda continua escondida até ~3,6%
  cloudsXPercent: 3,
  duskOpacity: 0.3,
  starsOpacity: { from: 0.5, to: 1 },
  scrub: 0.6,
  // A hero fica fixa por uma altura de tela; o entardecer ocupa 85% desse trecho
  // e nos 15% finais a cena fica parada, já anoitecida
  pinLength: '+=100%',
  animated: 0.85,
}

// Fixa a hero e liga o entardecer à rolagem. Chamado por quem é dono do elemento
// fixado (HeroSection): o ref de um ancestral só existe depois dos efeitos dos filhos
export function useHeroDusk(pin: RefObject<HTMLElement | null>) {
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      // Só no desktop (lg) e sem pedido de movimento reduzido; fora disso não há
      // fixação nem animação, e a cena fica no estado inicial, com o sol visível
      mm.add(MOTION_QUERY, () => {
        const tween = { duration: DUSK.animated }
        gsap
          .timeline({
            defaults: { ease: 'none' },
            scrollTrigger: {
              trigger: pin.current,
              // Topo da hero na base do header fixo, medida a cada refresh. O header
              // já está grudado no topo, então isso dá start 0: a hero engata sem se mover
              start: () => `top ${headerOffset()}px`,
              end: DUSK.pinLength,
              pin: true,
              // Aplica a fixação um pouco antes, para um giro rápido da roda não passar dela
              anticipatePin: 1,
              scrub: DUSK.scrub,
              invalidateOnRefresh: true,
            },
          })
          .to('.scene-sun', { ...tween, yPercent: DUSK.sunYPercent }, 0)
          .to('.scene-glow', { ...tween, opacity: DUSK.glowOpacity }, 0)
          .to('.scene-clouds', { ...tween, xPercent: DUSK.cloudsXPercent }, 0)
          .to('.scene-dusk', { ...tween, opacity: DUSK.duskOpacity }, 0)
          .to('.scene-stars', { ...tween, opacity: DUSK.starsOpacity.to }, 0)
          // Pausa final: nada muda até o fim do trecho fixo
          .to({}, { duration: 1 - DUSK.animated })
      })
    },
    // Escopo: as classes .scene-* das cópias da cena dentro do elemento fixado
    { scope: pin },
  )
}
