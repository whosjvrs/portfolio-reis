import { useTranslation } from 'react-i18next'
import { sectionHref, sections } from '../../config/sections'
import { useSmoothAnchor } from '../../hooks/useSmoothAnchor'
import TranslatedText from '../ui/TranslatedText'

function HeaderNavigation({ className = '' }: { className?: string }) {
  const { t } = useTranslation()
  const onAnchorClick = useSmoothAnchor()

  return (
    <nav aria-label={t('header.navigationLabel')} className={className}>
      <ul className="flex flex-wrap gap-x-6 gap-y-2 font-label text-[13px] tracking-[0.12em] uppercase sm:gap-x-8 md:justify-center lg:text-sm">
        {sections.map(({ id }) => (
          <li key={id}>
            <a
              className="rounded-sm text-cream/75 transition-colors hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
              href={sectionHref(id)}
              onClick={onAnchorClick}
            >
              <TranslatedText group="nav">{t(`nav.${id}`)}</TranslatedText>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default HeaderNavigation
