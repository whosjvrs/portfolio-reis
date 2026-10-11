import { useTranslation } from 'react-i18next'
import HeaderNavigation from '../components/navigation/HeaderNavigation'

function Header() {
  const { t } = useTranslation()

  return (
    <header className="flex min-h-header border-b border-cream/10">
      {/* Mesma margem lateral da hero: a marca alinha com o nome */}
      <div className="flex w-full flex-wrap items-center justify-between gap-x-6 gap-y-3 px-gutter py-5">
        <span className="font-display text-[28px] leading-none font-black tracking-normal not-italic">
          {t('header.brand')}
        </span>
        <HeaderNavigation />
      </div>
    </header>
  )
}

export default Header
