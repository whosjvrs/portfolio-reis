// Animação da troca de idioma (TranslatedText): todos os tempos num só lugar
export const TRANSLATION_MOTION = {
  // Datilografia: intervalo por letra nos textos curtos; os longos aceleram para
  // caber em maxDuration, então a duração não cresce com o tamanho
  charStep: 0.05,
  maxDuration: 1.2,
  // Os grupos começam em sequência, separados por este intervalo (total ~1,5s)
  groupStagger: 0.12,
  groups: ['nav', 'role', 'description', 'actions', 'titles', 'body'] as const,
  // Esmaecimento dos parágrafos longos
  fade: { duration: 0.3, ease: 'power1.out' },
}

export type MotionGroup = (typeof TRANSLATION_MOTION.groups)[number]

export const groupDelay = (group: MotionGroup) =>
  TRANSLATION_MOTION.groups.indexOf(group) * TRANSLATION_MOTION.groupStagger
