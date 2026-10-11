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
- Hero com altura mínima da área visível da box (`--page-shell-inner-height` − header
  `--spacing-header`); seções seguintes têm altura natural. Header e hero dividem o
  container `max-w-hero` (`--container-hero`, 1280px) e o mesmo padding lateral.
- Linhas finas creme 10–30%, divisórias e quadros sobrepostos.
- Hero, coluna direita: três quadros em escada (sol e pico → nuvens → estrelas) com recortes
  de `src/assets/hero/paisagem-subida` (AVIF + WebP); quadro 3 aberto. Decorativo (`aria-hidden`).
- Textura: dois SVGs feTurbulence (`public/noise*.svg`) em `::before/::after`
  do `.page-shell`, `soft-light`.
- Títulos: Recoleta Black (`--font-display`, 900, woff2 local em `public/fonts`).
  Textos de apoio: pilha system-ui (`--font-body`).
- Texto creme sobre azul com no mínimo 70% de opacidade (meta AAA para texto corrido).
  70% dá 6,5:1 (AA); texto corrido em 75%+ (7,2:1, AAA). Subtítulo da hero em 85%.
- Direção em evolução: composição inspirada em cartazes emoldurados (grade, faixa
  de metadados, campo de imagem). O protótipo antigo não é referência.

## Estrutura
- `src/layouts/`: PageShell (box + textura) e Header
- `src/sections/`: seções da página (HeroSection)
- `src/components/`: `ui/` (ActionLink), `navigation/`, `hero/` (HeroAscent)
- `src/assets/`: imagens importadas pelo código (Vite gera nome com hash);
  `public/` só para o que precisa de URL fixa (fontes com preload, ruído da textura)
- `src/config/sections.ts`: fonte única das seções (ids, ordem, href)
- `src/i18n/`: config, `locale.ts` (idioma, persistência, `<html lang>`) e `locales/pt-BR/common.json`
- Ids das seções em inglês: `about`, `projects`, `contact`; hero com id `top`.

## i18n e conteúdo
- Idioma inicial: escolha salva (só ao trocar no seletor) → idioma do navegador,
  se suportado → pt-BR. pt-BR também é o fallback.
- Texto de interface (inclusive aria-label e alt) no i18n, via `t()`; chaves por
  área (`nav.*`, `hero.*`), em inglês e camelCase.
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
- Cor de destaque quente (ferrugem/terracota) em definição; uso raro e pontual.
- Faixa do topo terá seletor PT/EN à direita; inglês será o segundo idioma.
- Marca na faixa do topo: "reis", em minúsculas, Recoleta Black.

## Princípios de trabalho
- Mudanças pequenas e verificáveis no navegador (1440px e 390px).
- Rodar `npm run lint` e `npm run build` antes de concluir.
- Não adicionar dependências sem combinar antes. Nunca fazer commits automaticamente.
- Cores, raios e opacidades via tokens; evitar hex soltos em componentes.
- Animações futuras com GSAP ou Motion, sempre respeitando `prefers-reduced-motion`.
