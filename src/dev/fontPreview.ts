// Comparação temporária da fonte de texto, só em desenvolvimento (main.tsx).
// ?font=dm-sans | instrument | manrope troca o --font-body; sem o parâmetro,
// fica a pilha atual. Fontes em public/fonts/candidatas (fora do build)
const CANDIDATES = {
  'dm-sans': { family: 'DM Sans', file: 'dm-sans' },
  instrument: { family: 'Instrument Sans', file: 'instrument-sans' },
  manrope: { family: 'Manrope', file: 'manrope' },
} as const

const key = new URLSearchParams(location.search).get('font')
const font = key && key in CANDIDATES ? CANDIDATES[key as keyof typeof CANDIDATES] : undefined

if (font) {
  const faces = [400, 500]
    .map(
      (weight) => `@font-face {
  font-family: '${font.family}';
  src: url('/fonts/candidatas/${font.file}-${weight}.woff2') format('woff2');
  font-weight: ${weight};
  font-display: swap;
}`,
    )
    .join('\n')
  const style = document.createElement('style')
  style.dataset.fontPreview = key ?? ''
  style.textContent = `${faces}\n:root { --font-body: '${font.family}', system-ui, sans-serif; }`
  document.head.append(style)
}
