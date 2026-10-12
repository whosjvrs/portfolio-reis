# Portfólio — João Reis

Portfólio pessoal de João Reis (estudante de Engenharia de Software). Objetivo:
atrair clientes, parceiros e colaboradores — não vagas.

## Stack
React 19 · TypeScript · Vite 8 · Tailwind CSS v4 (@tailwindcss/vite, sem
tailwind.config; tokens em `@theme` no `src/index.css`) · i18next/react-i18next · oxlint.
Scripts: `npm run dev`, `npm run lint`, `npm run build`.

## Identidade visual
- Azul profundo `#1E2C49` (`--color-deep-blue`): superfície da box principal.
- Creme `#EEEBDA` (`--color-cream`): fundo externo, textos, botão primário.
- Box azul com moldura creme de 24px (12px ≤600px, `--page-shell-gap`), borda 1px creme 14%, raio 4px.
  A moldura é fixa: `.page-frame` (position: fixed, pointer-events: none) desenha borda e
  cantos e pinta a faixa creme com uma sombra de espalhamento; o conteúdo rola por baixo
  com a rolagem nativa do documento. Não criar containers com overflow próprio
  (ScrollTrigger, sticky e âncoras dependem dela); `.page-shell` usa `overflow: clip`.
- Header sticky logo abaixo da borda da moldura (`--page-shell-inset`, já grudado no topo, não se
  move ao rolar), fundo azul e linha fina; marca → `#top`, navegação no
  centro real da box (grid 1fr/auto/1fr), idioma à direita. Abaixo de md: marca e idioma na
  1ª linha, navegação na 2ª (`--spacing-header` 6,5rem). Seções têm `scroll-margin-top`.
- Hero com altura mínima da área visível da box (`--page-shell-inner-height` − header
  `--spacing-header`); seções seguintes têm altura natural. Header e hero usam a
  mesma margem lateral `px-gutter` (`--spacing-gutter`); hero em colunas 45/55.
- Linhas finas creme 10–30%, divisórias e quadros sobrepostos.
- Hero, coluna direita: a cena ocupa a coluna, desfocada e esmaecida por deep-blue; três
  quadros em escada são lentes nítidas da mesma cena (sol e pico → nuvens → estrelas),
  quadro 3 aberto. Decorativo (`aria-hidden`). A cena é feita de camadas independentes
  numa tela comum de 1086×1448 (céu, claridade e grão em CSS, estrelas em SVG, sol,
  nuvens, montanhas distantes e principal em `src/assets/hero/`, AVIF + WebP com alfa),
  prontas para animar separadamente. Originais em `docs/referencias/camadas/`.
- Entardecer da hero (desktop, ligado à rolagem): `components/hero/useHeroDusk.ts`, chamado
  pela HeroSection. A grade da hero fica fixa (pin) logo abaixo do header por uma altura de
  tela; o entardecer ocupa 85% do trecho e os 15% finais são pausa. Anima pelas classes
  `.scene-*`, comuns a todas as cópias da cena; só transform e opacity. Fixa-se a grade, não
  a `<section>`: o pin envolve o elemento num espaçador, e assim `<main>` continua com os
  filhos que o React criou. Sem pin nem animação com `prefers-reduced-motion` ou abaixo de lg.
- Textura: dois SVGs feTurbulence (`public/noise*.svg`), `soft-light`. Presa à tela no
  retângulo da moldura (`.page-shell::before/::after`, fixed, atrás do conteúdo) e repetida
  sobre o fundo do header (`.page-grain`); as duas começam no canto da box, sem emenda.
- Títulos: Recoleta Black (`--font-display`, 900, woff2 local em `public/fonts`).
  Textos de apoio: pilha system-ui (`--font-body`), em avaliação.
- Voz de catálogo: JetBrains Mono (`--font-label`, 400 e 500, woff2 local + OFL em
  `public/fonts`, com preload por estar no header) em "/02", rótulos de metadados,
  navegação (caixa-alta 13–14px, tracking 0,12em) e seletor PT/EN. Botões e parágrafos
  usam a fonte de texto.
- Comparação da fonte de texto (temporária): em desenvolvimento, `?font=dm-sans |
  instrument | manrope` troca o `--font-body` (`src/dev/fontPreview.ts`, importado só sob
  `import.meta.env.DEV`). As candidatas ficam em `public/fonts/candidatas/` e um plugin no
  `vite.config.ts` as remove do build. Sair tudo isso quando a fonte for escolhida.
- Texto creme sobre azul com no mínimo 70% de opacidade (meta AAA para texto corrido).
  70% dá 6,5:1 (AA); texto corrido em 75%+ (7,2:1, AAA). Subtítulo da hero em 85%.
- Direção em evolução: composição inspirada em cartazes emoldurados (grade, faixa
  de metadados, campo de imagem). O protótipo antigo não é referência.

## Estrutura
- `src/layouts/`: PageShell (box + textura) e Header
- `src/sections/`: seções da página (HeroSection, AboutSection)
- `src/components/`: `ui/` (ActionLink, Section/SectionHeading, TextLink, TranslatedText),
  `navigation/` (HeaderNavigation, LanguageSwitcher), `hero/` (HeroAscent), `about/`
  (AboutPortrait, ResumeLink)
- Troca de idioma: `ui/TranslatedText` anima o texto traduzido só quando ele muda (nunca na
  montagem). Modo `type` (datilografia: navegação, subtítulo e apresentação da hero, botões,
  h2; cursor `caret` só na apresentação) e modo `fade` (0,3s: parágrafos e metadados da Sobre).
  Tempos e ordem dos grupos num só objeto, `ui/translationMotion.ts` (50ms por letra, até
  1,2s por texto, 0,12s entre grupos; ~1,5s no total). O span visível é recriado a cada texto (key) e
  dividido pelo SplitText em spans inline, letras ocultas por visibility: o layout não se
  move. No modo type o span visível é `aria-hidden` e uma cópia `sr-only` dá o nome
  acessível. Sem animação com movimento reduzido. Marca, nome e seletor não animam.
- Seções depois da hero usam `ui/Section` (`<section id aria-labelledby>`) e põem o
  `SectionHeading` onde o layout pedir: rótulo de catálogo "/02" (decorativo, número pela
  ordem em `config/sections.ts`; a hero é a 01) + h2 `${id}-heading` com `sections.${id}.title`.
  Hierarquia: h1 (nome, na hero) → h2 por seção.
- Sobre: lg+ em duas colunas (5/7), com altura mínima da área visível abaixo do header e
  conteúdo centralizado (py-12): a âncora sempre para sob o header. Esquerda: quadro do
  retrato 4:5 (384px de largura; 512px em 2xl), borda creme 25% como as lentes, ainda sem
  foto, com camadas inativas `.portrait-photo`, `.portrait-night` e `.portrait-light` para
  a luz da próxima etapa. Metadados: curso abaixo do quadro, na horizontal; lugar ao lado,
  na vertical (altura do quadro via `125cqw`). Direita: "/02", h2, quatro parágrafos (17px,
  entrelinha 1,6, creme 75%, medida máxima 42rem) e links discretos (`ui/TextLink`).
  Abaixo de lg: quadro contido em cima, metadados na horizontal, texto embaixo; flui.
  Encaixe medido (conteúdo de "/02" aos links): 1440×900 → 608px de 762px, sobra 58px
  além do padding (~2 linhas); 1920×1080 → 676px de 942px.
- `src/config/links.ts`: URLs externas (GitHub) e o currículo em PDF por idioma
  (`public/cv/`). O tamanho real é lido no build (`__CV_SIZES__`, definido no
  `vite.config.ts`) e entra no rótulo ("Currículo (PDF, 117 KB)"); o link usa `download`
  com o nome do arquivo. Sem arquivo para o idioma, o link não aparece. Links
  externos: nova aba, seta ↗ decorativa e aviso sr-only (`links.newTab`).
- `src/assets/`: imagens importadas pelo código (Vite gera nome com hash);
  `public/` só para o que precisa de URL fixa (fontes com preload, ruído da textura)
- `src/lib/gsap.ts`: registro único dos plugins do GSAP (ScrollTrigger, ScrollToPlugin, SplitText) e
  refresh após as fontes; importar gsap daqui
- `src/lib/layout.ts`: `headerOffset()` (moldura + header, medido no DOM) e consultas de movimento
- `src/hooks/useSmoothAnchor.ts`: padrão para links internos (`onClick` em `href="#id"`): rolagem
  suave de 1s com offset do header, hash via pushState antes de rolar (voltar/avançar
  restauram a posição) e foco no h1/h2 de destino (`tabIndex={-1}`). Instantânea com movimento
  reduzido. Âncoras inexistentes seguem o comportamento nativo.
- `src/config/sections.ts`: fonte única das seções (ids, ordem, href)
- `src/i18n/`: config, `locale.ts` (idioma, persistência, `<html lang>`) e
  `locales/{pt-BR,en}/common.json` (mesma forma; o tsc acusa chave faltando)
- Ids das seções em inglês: `about`, `projects`, `contact`; hero com id `top`.

## i18n e conteúdo
- Idioma inicial: escolha salva (só ao trocar no seletor) → idioma do navegador,
  se suportado → pt-BR. pt-BR também é o fallback.
- Texto de interface (inclusive aria-label e alt) no i18n, via `t()`; chaves por
  área (`nav.*`, `hero.*`, `sections.*`), em inglês e camelCase.
- Texto editorial dos projetos em `src/content/` (estrutura a definir com o conteúdo).
- Escrita natural em parágrafos, com informações concretas.
- Nunca inventar resultados, métricas, funcionalidades ou impactos dos projetos
  (Habilittare, Papyrus, Moti).
- Projetos: destacar origem e contexto (cliente, faculdade retomado, autoral);
  nunca organizar a apresentação por stack.
- Evitar frases publicitárias e listas genéricas de conceitos.

## Decisões tomadas
- Nome na hero: "João" na 1ª linha e "Reis" deslocado abaixo do "ã"; texto real em h1. Preservar.
- Textura: será reforçada (grão mais presente e pontos claros, como papel tingido)
  em etapa dedicada, com referências em docs/referencias/. Não alterar fora dela.
- Recoleta Black continua como fonte de display.
- Cor de destaque quente: `--color-accent` (#E87F4F, cor média do sol da hero); uso raro e
  pontual. Contraste 5,0:1 sobre o azul (AA para texto), 2,3:1 sobre o creme (só decorativo).
- Seletor PT/EN à direita do header: botões com aria-pressed, ativo em `--color-accent`,
  inativo em creme 70%; nomes dos idiomas na própria língua (`lang` em cada botão).
- Marca na faixa do topo: "reis", em minúsculas, Recoleta Black.

## Princípios de trabalho
- Mudanças pequenas e verificáveis no navegador (1440px e 390px).
- Não gerar screenshots por padrão: verificar por medições (DOM, getBoundingClientRect,
  estilos computados, árvore de acessibilidade). Screenshots só quando pedidas; a revisão
  visual é feita pelo João no navegador.
- Rodar `npm run lint` e `npm run build` antes de concluir.
- Não adicionar dependências sem combinar antes. Nunca fazer commits automaticamente.
- Cores, raios e opacidades via tokens; evitar hex soltos em componentes.
- Animações com GSAP (via `src/lib/gsap.ts`), sempre respeitando `prefers-reduced-motion`.
