import type { CSSProperties } from 'react'
import landscapeAvif from '../../assets/hero/paisagem-subida.avif'
import landscapeWebp from '../../assets/hero/paisagem-subida.webp'

// Dimensões reais da imagem; todas as coordenadas abaixo estão nesse espaço
const IMAGE = { width: 1536, height: 1024 }

type Frame = {
  // Recorte da imagem: canto superior esquerdo e tamanho
  crop: { x: number; y: number; w: number; h: number }
  // Posição do quadro na composição
  at: { x: number; y: number }
  // Quadro aberto: só bordas esquerda e inferior, céu dissolvendo no azul da box
  open?: boolean
}

// Subida em escada: sol e pico → nuvens → estrelas
const FRAMES: Frame[] = [
  { crop: { x: 280, y: 400, w: 400, h: 540 }, at: { x: 0, y: 560 } },
  { crop: { x: 620, y: 220, w: 400, h: 540 }, at: { x: 260, y: 280 } },
  { crop: { x: 1000, y: 0, w: 400, h: 540 }, at: { x: 520, y: 0 }, open: true },
]

// Estrelas que escapam do quadro 3, relativas ao canto superior direito dele
const ESCAPING_STARS = [
  { dx: -90, dy: -30, r: 5, opacity: 0.85 },
  { dx: 20, dy: -25, r: 4, opacity: 0.7 },
  { dx: -30, dy: -75, r: 4, opacity: 0.6 },
  { dx: 45, dy: -110, r: 4.5, opacity: 0.5 },
  { dx: -65, dy: -150, r: 3.5, opacity: 0.4 },
  { dx: 10, dy: -175, r: 3.5, opacity: 0.3 },
  { dx: 50, dy: -205, r: 3, opacity: 0.2 },
]

const bounds = {
  width: Math.max(...FRAMES.map((frame) => frame.at.x + frame.crop.w)),
  height: Math.max(...FRAMES.map((frame) => frame.at.y + frame.crop.h)),
}

const percent = (value: number, total: number) => `${(value / total) * 100}%`

function Landscape({ className, style }: { className?: string; style?: CSSProperties }) {
  return (
    <picture>
      <source srcSet={landscapeAvif} type="image/avif" />
      <img
        src={landscapeWebp}
        alt=""
        width={IMAGE.width}
        height={IMAGE.height}
        className={className}
        style={style}
      />
    </picture>
  )
}

function HeroAscent() {
  const lastFrame = FRAMES[FRAMES.length - 1]
  const starsOrigin = { x: lastFrame.at.x + lastFrame.crop.w, y: lastFrame.at.y }

  return (
    <div aria-hidden="true" className="pointer-events-none w-full">
      {/* Mobile, provisório: um quadro só, com sol, pico e nuvens */}
      <div className="relative h-60 w-full overflow-hidden rounded-sm border border-cream/25 lg:hidden">
        <Landscape className="h-full w-full origin-[35%_70%] scale-160 object-cover object-[35%_70%]" />
      </div>

      <div
        className="relative hidden w-full lg:block"
        style={{ aspectRatio: `${bounds.width} / ${bounds.height}` }}
      >
        {FRAMES.map((frame) => (
          <div
            key={frame.crop.x}
            className={`absolute overflow-hidden border-cream/25 ${
              frame.open
                ? 'border-b border-l mask-t-from-65% mask-r-from-65%'
                : 'rounded-sm border'
            }`}
            style={{
              left: percent(frame.at.x, bounds.width),
              top: percent(frame.at.y, bounds.height),
              width: percent(frame.crop.w, bounds.width),
              height: percent(frame.crop.h, bounds.height),
            }}
          >
            <Landscape
              className="absolute h-auto max-w-none"
              style={{
                width: percent(IMAGE.width, frame.crop.w),
                left: `-${percent(frame.crop.x, frame.crop.w)}`,
                top: `-${percent(frame.crop.y, frame.crop.h)}`,
              }}
            />
          </div>
        ))}
        <svg
          className="absolute inset-0 h-full w-full overflow-visible"
          viewBox={`0 0 ${bounds.width} ${bounds.height}`}
        >
          {ESCAPING_STARS.map((star) => (
            <circle
              key={`${star.dx}:${star.dy}`}
              cx={starsOrigin.x + star.dx}
              cy={starsOrigin.y + star.dy}
              r={star.r}
              className="fill-cream"
              opacity={star.opacity}
            />
          ))}
        </svg>
      </div>
    </div>
  )
}

export default HeroAscent
