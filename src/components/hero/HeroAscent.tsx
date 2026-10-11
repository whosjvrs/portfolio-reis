import type { CSSProperties } from 'react'
import landscapeAvif from '../../assets/hero/paisagem-subida.avif'
import landscapeWebp from '../../assets/hero/paisagem-subida.webp'

// Dimensões reais da imagem
const IMAGE = { width: 1536, height: 1024 }

// Ponto de foco do object-fit: cover; preserva o sol (≈24% da largura) e as nuvens
const DESKTOP_FOCUS = '40% 50%'
const MOBILE_FOCUS = '35% 70%'

// Opacidade da camada azul que esmaece a cena fora dos quadros
const DIM_OPACITY = 0.55

// Retângulos em % da coluna direita. Escada: sol e pico → nuvens → estrelas
type Lens = { left: number; top: number; width: number; height: number; open?: boolean }

const LENSES: Lens[] = [
  { left: 6, top: 56, width: 40, height: 34 },
  { left: 34, top: 34, width: 38, height: 32 },
  // Aberto: só bordas esquerda e inferior; o céu se dissolve para cima e para a direita
  { left: 62, top: 14, width: 33, height: 30, open: true },
]

// Estrelas que escapam do quadro 3, em % da coluna, a partir do canto superior direito dele
const ESCAPING_STARS = [
  { dx: -6, dy: -2, size: 4, opacity: 0.85 },
  { dx: 1, dy: -3, size: 3, opacity: 0.7 },
  { dx: -3, dy: -6, size: 3, opacity: 0.6 },
  { dx: 2.5, dy: -8, size: 3.5, opacity: 0.5 },
  { dx: -5, dy: -10, size: 2.5, opacity: 0.4 },
  { dx: 1, dy: -11.5, size: 2.5, opacity: 0.3 },
]

type SceneProps = { focus?: string; className?: string; style?: CSSProperties }

// Fonte única da cena. Fundo, quadros e mobile usam esta mesma camada,
// então ficam sempre alinhados; no futuro ela pode virar várias camadas.
function AscentScene({ focus = DESKTOP_FOCUS, className = '', style }: SceneProps) {
  return (
    <picture>
      <source srcSet={landscapeAvif} type="image/avif" />
      <img
        src={landscapeWebp}
        alt=""
        width={IMAGE.width}
        height={IMAGE.height}
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
        style={{ objectPosition: focus, ...style }}
      />
    </picture>
  )
}

const insetOf = ({ left, top, width, height }: Lens) =>
  `${top}% ${100 - left - width}% ${100 - top - height}% ${left}%`

// O quadro aberto não usa clip-path: uma máscara em gradiente, dimensionada e
// posicionada no retângulo, recorta e dissolve ao mesmo tempo
function openLensMask(lens: Lens): CSSProperties {
  // Em mask-position, x% desloca (100% − largura) × x; convertendo para o deslocamento real
  const x = (lens.left / (100 - lens.width)) * 100
  const y = (lens.top / (100 - lens.height)) * 100
  const mask =
    'linear-gradient(to top, #000 65%, transparent), linear-gradient(to right, #000 65%, transparent)'
  return {
    maskImage: mask,
    maskSize: `${lens.width}% ${lens.height}%`,
    maskPosition: `${x}% ${y}%`,
    maskRepeat: 'no-repeat',
    maskComposite: 'intersect',
  }
}

function HeroAscent() {
  const lastLens = LENSES[LENSES.length - 1]
  const starsOrigin = { x: lastLens.left + lastLens.width, y: lastLens.top }

  return (
    <div aria-hidden="true" className="pointer-events-none">
      {/* Mobile, provisório: um quadro só, com sol, pico e nuvens */}
      <div className="relative h-60 w-full overflow-hidden rounded-sm border border-cream/25 lg:hidden">
        <AscentScene focus={MOBILE_FOCUS} className="origin-[35%_70%] scale-160" />
      </div>

      <div className="absolute inset-0 hidden overflow-hidden lg:block">
        <AscentScene />
        <div className="absolute inset-0 bg-deep-blue" style={{ opacity: DIM_OPACITY }} />

        {/* Lentes: cópias da mesma cena, do tamanho da coluna, recortadas no retângulo */}
        {LENSES.map((lens) => (
          <AscentScene
            key={`${lens.left}:${lens.top}`}
            style={
              lens.open
                ? openLensMask(lens)
                : { clipPath: `inset(${insetOf(lens)} round 4px)` }
            }
          />
        ))}

        {LENSES.map((lens) => (
          <div
            key={`border-${lens.left}:${lens.top}`}
            className={`absolute border-cream/25 ${
              lens.open ? 'border-b border-l mask-t-from-65% mask-r-from-65%' : 'rounded-sm border'
            }`}
            style={{
              left: `${lens.left}%`,
              top: `${lens.top}%`,
              width: `${lens.width}%`,
              height: `${lens.height}%`,
            }}
          />
        ))}

        {ESCAPING_STARS.map((star) => (
          <span
            key={`${star.dx}:${star.dy}`}
            className="absolute rounded-full bg-cream"
            style={{
              left: `${starsOrigin.x + star.dx}%`,
              top: `${starsOrigin.y + star.dy}%`,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default HeroAscent
