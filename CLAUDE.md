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
- Box azul com moldura creme de 24px (12px ≤600px), borda 1px creme 14%, raio 4px.
- Linhas finas creme 10–20%, divisórias e painéis geométricos sobrepostos.
- Textura: dois SVGs feTurbulence (`public/noise*.svg`) em `::before/::after`
  do `.page-shell`, `soft-light`.
- Títulos: Recoleta Black (900, woff2 local em `public/fonts`). Textos de apoio: pilha system-ui.
- Texto creme sobre azul com no mínimo 70% de opacidade (meta AAA para texto corrido).
- Direção em evolução: composição inspirada em cartazes emoldurados (grade, faixa
  de metadados, campo de imagem). O protótipo antigo não é referência.

## Estrutura
- `src/layouts/`: PageShell (box + textura) e Header
- `src/sections/`: seções da página (HeroSection)
- `src/components/`: `ui/` (ActionLink), `navigation/`, `hero/` (HeroLayers)
- `src/i18n/`: config e `locales/pt-BR/common.json`

## i18n
- pt-BR é o idioma inicial e o fallback.
- Todo texto visível e de acessibilidade (aria-label, alt) passa por `t()`.
- Chaves agrupadas por área (`header.*`, `hero.*`), em inglês e camelCase.

## Conteúdo
- Escrita natural em parágrafos, com informações concretas.
- Nunca inventar resultados, métricas, funcionalidades ou impactos dos projetos
  (Habilittare, Papyrus, Moti).
- Evitar frases publicitárias e listas genéricas de conceitos.

## Decisões tomadas
- Nome na hero: "João" na 1ª linha e "Reis" deslocado abaixo do "ã"; texto real em h1. Preservar.
- Textura: será reforçada (grão mais presente e pontos claros, como papel tingido)
  em etapa dedicada, com referências em docs/referencias/. Não alterar fora dela.
- Recoleta Black continua como fonte de display.
- Cor de destaque quente (ferrugem/terracota) em definição; uso raro e pontual.
- Faixa do topo terá seletor PT/EN à direita; inglês será o segundo idioma.

## Princípios de trabalho
- Mudanças pequenas e verificáveis no navegador (1440px e 390px).
- Rodar `npm run lint` e `npm run build` antes de concluir.
- Não adicionar dependências sem combinar antes. Nunca fazer commits automaticamente.
- Cores, raios e opacidades via tokens; evitar hex soltos em componentes.
- Animações futuras com GSAP ou Motion, sempre respeitando `prefers-reduced-motion`.
