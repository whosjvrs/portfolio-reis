import { useTranslation } from 'react-i18next'
import HeaderNavigation from '../components/navigation/HeaderNavigation'

function Header() {
  const { t } = useTranslation()

  return (
    <header className="flex min-h-header flex-wrap items-center justify-between gap-x-6 gap-y-3 border-b border-cream/10 px-6 py-5 sm:px-12">
      <span className="font-display text-[28px] leading-none font-black tracking-normal not-italic">
        {t('header.brand')}
      </span>
      <HeaderNavigation />
    </header>
  )
}

export default Header
