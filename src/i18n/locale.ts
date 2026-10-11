export const supportedLocales = ['pt-BR'] as const

export type Locale = (typeof supportedLocales)[number]

export const defaultLocale: Locale = 'pt-BR'
