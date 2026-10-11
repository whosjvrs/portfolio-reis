import { useTranslation } from 'react-i18next'
import { sectionHref, sections } from '../../config/sections'

function HeaderNavigation() {
  const { t } = useTranslation()

  return (
    <nav aria-label={t('nav.label')}>
      <ul className="flex flex-wrap justify-end gap-x-4 gap-y-2 text-[15px] sm:gap-x-8 lg:text-base">
        {sections.map(({ id }) => (
          <li key={id}>
            <a
              className="rounded-sm text-cream/75 transition-colors hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
              href={sectionHref(id)}
            >
              {t(`nav.${id}`)}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default HeaderNavigation
