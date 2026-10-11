import { useTranslation } from 'react-i18next'

function HeaderNavigation() {
  const { t } = useTranslation()

  return (
    <nav aria-label={t('header.navigationLabel')}>
      <ul className="flex flex-wrap justify-end gap-x-4 gap-y-2 text-sm sm:gap-x-8">
        <li>
          <a
            className="rounded-sm text-cream/75 transition-colors hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
            href="#sobre"
          >
            {t('header.navigation.about')}
          </a>
        </li>
        <li>
          <a
            className="rounded-sm text-cream/75 transition-colors hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
            href="#projetos"
          >
            {t('header.navigation.projects')}
          </a>
        </li>
        <li>
          <a
            className="rounded-sm text-cream/75 transition-colors hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
            href="#contato"
          >
            {t('header.navigation.contact')}
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default HeaderNavigation
