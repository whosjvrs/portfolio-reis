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
- Header sticky logo abaixo da moldura, fundo azul e linha fina; marca → `#top`, navegação no
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
- Entardecer da hero (desktop, ligado à rolagem): GSAP + ScrollTrigger com `useGSAP`; anima
  pelas classes `.scene-*`, comuns a todas as cópias da cena. Só transform e opacity.
  Sem animação com `prefers-reduced-motion` ou abaixo de lg (cena no estado inicial).
- Textura: dois SVGs feTurbulence (`public/noise*.svg`), `soft-light`. Presa à tela no
  retângulo da moldura (`.page-shell::before/::after`, fixed, atrás do conteúdo) e repetida
  sobre o fundo do header (`.page-grain`); as duas começam no canto da box, sem emenda.
- Títulos: Recoleta Black (`--font-display`, 900, woff2 local em `public/fonts`).
  Textos de apoio: pilha system-ui (`--font-body`).
- Texto creme sobre azul com no mínimo 70% de opacidade (meta AAA para texto corrido).
  70% dá 6,5:1 (AA); texto corrido em 75%+ (7,2:1, AAA). Subtítulo da hero em 85%.
- Direção em evolução: composição inspirada em cartazes emoldurados (grade, faixa
  de metadados, campo de imagem). O protótipo antigo não é referência.

## Estrutura
- `src/layouts/`: PageShell (box + textura) e Header
- `src/sections/`: seções da página (HeroSection, AboutSection)
- `src/components/`: `ui/` (ActionLink, Section), `navigation/` (HeaderNavigation,
  LanguageSwitcher), `hero/` (HeroAscent)
- Seções depois da hero usam `ui/Section`: `<section id aria-labelledby>` + h2 `${id}-heading`,
  título em `sections.${id}.title`. Hierarquia: h1 (nome, na hero) → h2 por seção.
- Sobre: título só; `min-h-svh` provisório para dar rolagem ao entardecer, sai quando
  houver conteúdo.
- `src/assets/`: imagens importadas pelo código (Vite gera nome com hash);
  `public/` só para o que precisa de URL fixa (fontes com preload, ruído da textura)
- `src/lib/gsap.ts`: registro único dos plugins do GSAP; importar gsap daqui
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
- Rodar `npm run lint` e `npm run build` antes de concluir.
- Não adicionar dependências sem combinar antes. Nunca fazer commits automaticamente.
- Cores, raios e opacidades via tokens; evitar hex soltos em componentes.
- Animações com GSAP (via `src/lib/gsap.ts`), sempre respeitando `prefers-reduced-motion`.
