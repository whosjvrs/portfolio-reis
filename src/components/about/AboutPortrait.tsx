// Quadro do retrato (4:5), na linguagem das lentes da hero. Ainda sem foto.
// Três camadas preparadas para a luz da próxima etapa, por ora inativas:
// foto, "noite" (véu azul) e "luz" (gradiente radial na cor de destaque)
function AboutPortrait({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`relative aspect-4/5 overflow-hidden rounded-sm border border-cream/25 ${className}`}>
      <div className="portrait-photo absolute inset-0" />
      <div className="portrait-night absolute inset-0 bg-deep-blue opacity-0" />
      <div className="portrait-light absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,var(--color-accent),transparent_70%)] opacity-0" />
    </div>
  )
}

export default AboutPortrait
