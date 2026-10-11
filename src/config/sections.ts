export const sections = [{ id: 'about' }, { id: 'projects' }, { id: 'contact' }] as const

export type SectionId = (typeof sections)[number]['id']

export const sectionHref = (id: SectionId) => `#${id}`
