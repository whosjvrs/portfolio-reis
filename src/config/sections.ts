export const sections = [{ id: 'about' }, { id: 'projects' }, { id: 'contact' }] as const

export type SectionId = (typeof sections)[number]['id']

export const sectionHref = (id: SectionId) => `#${id}`

// Número de catálogo da seção ("/02"): a hero é a 01, as seções seguem a lista
export const sectionNumber = (id: SectionId) =>
  String(sections.findIndex((section) => section.id === id) + 2).padStart(2, '0')
