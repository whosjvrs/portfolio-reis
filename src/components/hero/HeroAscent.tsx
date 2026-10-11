import type { CSSProperties, ReactNode } from 'react'
import sunAvif from '../../assets/hero/sol.avif'
import sunWebp from '../../assets/hero/sol.webp'
import cloudsAvif from '../../assets/hero/nuvens.avif'
import cloudsWebp from '../../assets/hero/nuvens.webp'
import farMountainsAvif from '../../assets/hero/montanhas-distantes.avif'
import farMountainsWebp from '../../assets/hero/montanhas-distantes.webp'
import mainMountainAvif from '../../assets/hero/montanha-principal.avif'
import mainMountainWebp from '../../assets/hero/montanha-principal.webp'

// Tela comum das camadas ilustradas (retrato); todas compartilham este quadro
const CANVAS = { width: 1086, height: 1448 }
const RATIO = CANVAS.width / CANVAS.height

// Enquadramento da tela no espaço disponível, como object-fit: cover.
// x e y vão de 0 (borda inicial) a 1 (borda final); zoom amplia a partir do cover
type Focus = { x: number; y: number; zoom?: number }

const DESKTOP_FOCUS: Focus = { x: 0.5, y: 0.5 }
const MOBILE_FOCUS: Focus = { x: 0.2, y: 0.73, zoom: 1.3 }

// Fora dos quadros a cena fica desfocada e esmaecida por uma camada azul
const BLUR_PX = 8
const DIM_OPACITY = 0.6

// O blur puxa transparência das bordas e cria um halo claro. Todas as cópias
// da cena no desktop transbordam a coluna; o overflow da coluna esconde o
// excesso e, como as cópias são idênticas, o alinhamento se mantém.
// Fixo, para que ajustes no blur não mexam no enquadramento
const BLEED: CSSProperties = { inset: '-40px' }

// Céu e claridade do horizonte, com cores tiradas da imagem aprovada
const SKY =
  'linear-gradient(to bottom, var(--color-deep-blue) 32%, color-mix(in oklab, var(--color-deep-blue) 60%, var(--color-horizon)) 44%, var(--color-horizon) 54%)'
const HORIZON_GLOW =
  'radial-gradient(ellipse 100% 22% at 0% 66%, var(--color-cream) 10%, color-mix(in srgb, var(--color-cream) 55%, transparent) 40%, color-mix(in srgb, var(--color-cream) 18%, transparent) 70%, color-mix(in srgb, var(--color-cream) 4%, transparent) 88%, transparent)'

// Mesmo ruído da textura da página, mais forte para casar com o grão das ilustrações
const SKY_GRAIN_OPACITY = 0.35

// Sol em % da tela: mesma relação com o pico que o sol da imagem provisória
const SUN = { left: 9.2, top: 70.3, width: 8.5 }

// Estrelas em px da tela, nas posições da imagem aprovada. escape: opacidade da
// cópia nítida que aparece fora do quadro 3, por cima do desfoque
type Star = { x: number; y: number; r: number; escape?: number }

const STARS: Star[] = [
  { x: 1015, y: 107, r: 2.4 },
  { x: 804, y: 151, r: 1.4 },
  { x: 1052, y: 167, r: 1.4 },
  { x: 924, y: 177, r: 2.4 },
  { x: 825, y: 206, r: 1.4 },
  { x: 1012, y: 244, r: 2.6, escape: 0.4 },
  { x: 804, y: 253, r: 1.4, escape: 0.4 },
  { x: 1055, y: 264, r: 1.4 },
  { x: 951, y: 267, r: 1.4, escape: 0.5 },
  { x: 681, y: 272, r: 2.4, escape: 0.5 },
  { x: 898, y: 281, r: 2.4, escape: 0.5 },
  { x: 854, y: 324, r: 2.6, escape: 0.7 },
  { x: 1062, y: 332, r: 1.4 },
  { x: 966, y: 335, r: 1.4, escape: 0.7 },
  { x: 745, y: 380, r: 2.4, escape: 0.85 },
  { x: 1052, y: 390, r: 1.4, escape: 0.6 },
  { x: 1012, y: 394, r: 2.6, escape: 0.7 },
  { x: 910, y: 398, r: 1.4 },
  { x: 802, y: 422, r: 2.4 },
  { x: 1048, y: 519, r: 1.4 },
  { x: 969, y: 549, r: 2.4 },
  { x: 872, y: 613, r: 2.4 },
]

// Retângulos em % da coluna direita. Escada: sol e pico → nuvens → estrelas
type Lens = { left: number; top: number; width: number; height: number; open?: boolean }

const LENSES: Lens[] = [
  { left: 4, top: 62, width: 40, height: 32 },
  { left: 38, top: 34, width: 34, height: 32 },
  // Aberto: só bordas esquerda e inferior; o céu se dissolve para cima e para a direita
  { left: 64, top: 14, width: 30, height: 28, open: true },
]

type FrameProps = { focus?: Focus; style?: CSSProperties; children: ReactNode }

// Posiciona a tela das camadas cobrindo o elemento (unidades cq do próprio container)
function SceneFrame({ focus = DESKTOP_FOCUS, style, children }: FrameProps) {
  const width = `(max(100cqw, 100cqh * ${RATIO}) * ${focus.zoom ?? 1})`
  return (
    <div className="absolute inset-0" style={{ containerType: 'size', ...style }}>
      <div
        className="absolute"
        style={{
          width: `calc${width}`,
          aspectRatio: `${CANVAS.width} / ${CANVAS.height}`,
          left: `calc((100cqw - ${width}) * ${focus.x})`,
          top: `calc((100cqh - ${width} / ${RATIO}) * ${focus.y})`,
        }}
      >
        {children}
      </div>
    </div>
  )
}

type LayerProps = { avif: string; webp: string; className: string; style?: CSSProperties }

function LayerImage({ avif, webp, className, style }: LayerProps) {
  return (
    <picture>
      <source srcSet={avif} type="image/avif" />
      <img src={webp} alt="" className={className} style={style} />
    </picture>
  )
}

function Stars({ stars, crisp = false }: { stars: Star[]; crisp?: boolean }) {
  return (
    <svg
      viewBox={`0 0 ${CANVAS.width} ${CANVAS.height}`}
      className="absolute inset-0 h-full w-full fill-cream"
    >
      {stars.map((star) => (
        <circle
          key={`${star.x}:${star.y}`}
          cx={star.x}
          cy={star.y}
          r={star.r}
          opacity={crisp ? star.escape : undefined}
        />
      ))}
    </svg>
  )
}

// Fonte única da cena. Fundo, quadros e mobile usam estas mesmas camadas, então
// ficam sempre alinhados. Cada camada é um elemento próprio, pronto para receber
// transform e opacity separadamente na animação
function AscentScene({ focus, style }: { focus?: Focus; style?: CSSProperties }) {
  return (
    <SceneFrame focus={focus} style={style}>
      {/* isolate: o grão em soft-light age só sobre o céu */}
      <div className="absolute inset-0 isolate">
        <div className="absolute inset-0" style={{ background: SKY }} />
        <div className="absolute inset-0" style={{ background: HORIZON_GLOW }} />
        <div
          className="absolute inset-0 mix-blend-soft-light"
          style={{
            backgroundImage: "url('/noise.svg')",
            backgroundSize: '180px 180px',
            opacity: SKY_GRAIN_OPACITY,
          }}
        />
      </div>
      <Stars stars={STARS} />
      <LayerImage
        avif={sunAvif}
        webp={sunWebp}
        className="absolute aspect-square"
        style={{ left: `${SUN.left}%`, top: `${SUN.top}%`, width: `${SUN.width}%` }}
      />
      <LayerImage avif={cloudsAvif} webp={cloudsWebp} className="absolute inset-0 h-full w-full" />
      <LayerImage
        avif={farMountainsAvif}
        webp={farMountainsWebp}
        className="absolute inset-0 h-full w-full"
      />
      <LayerImage
        avif={mainMountainAvif}
        webp={mainMountainWebp}
        className="absolute inset-0 h-full w-full"
      />
    </SceneFrame>
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
  return (
    <div aria-hidden="true" className="pointer-events-none">
      {/* Mobile: um quadro só, com sol, pico e nuvens */}
      <div className="relative h-60 w-full overflow-hidden rounded-sm border border-cream/25 lg:hidden">
        <AscentScene focus={MOBILE_FOCUS} />
      </div>

      <div
        className="absolute inset-0 hidden overflow-hidden lg:block"
        style={{ '--scene-blur': `${BLUR_PX}px` } as CSSProperties}
      >
        <AscentScene style={{ ...BLEED, filter: 'blur(var(--scene-blur))' }} />
        <div className="absolute inset-0 bg-deep-blue" style={{ opacity: DIM_OPACITY }} />

        {/* Lentes: cópias nítidas da mesma cena, recortadas no retângulo pelo
            invólucro do tamanho da coluna (o recorte não acompanha o transbordo) */}
        {LENSES.map((lens) => (
          <div
            key={`${lens.left}:${lens.top}`}
            className="absolute inset-0"
            style={
              lens.open
                ? openLensMask(lens)
                : { clipPath: `inset(${insetOf(lens)} round 4px)` }
            }
          >
            <AscentScene style={BLEED} />
          </div>
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

        {/* Estrelas que escapam do quadro 3: cópias nítidas, na mesma tela da cena */}
        <SceneFrame style={BLEED}>
          <Stars stars={STARS.filter((star) => star.escape)} crisp />
        </SceneFrame>
      </div>
    </div>
  )
}

export default HeroAscent
