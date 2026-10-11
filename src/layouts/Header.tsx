import { useTranslation } from 'react-i18next'
import HeaderNavigation from '../components/navigation/HeaderNavigation'
import LanguageSwitcher from '../components/navigation/LanguageSwitcher'

function Header() {
  const { t } = useTranslation()

  return (
    // Fixo logo abaixo da moldura; page-grain repete a textura sobre o fundo opaco
    <header className="page-grain sticky top-(--page-shell-gap) z-10 flex h-header border-b border-cream/10 bg-deep-blue">
      {/* Mesma margem lateral da hero: a marca alinha com o nome.
          md+: três zonas; as laterais têm 1fr cada, então a navegação fica no
          centro real da box. Abaixo de md: marca e idioma na 1ª linha, navegação na 2ª */}
      <div className="grid w-full grid-cols-[1fr_auto] content-center items-center gap-x-6 px-gutter md:grid-cols-[1fr_auto_1fr]">
        <a
          href="#top"
          aria-label={t('header.brandLabel')}
          className="justify-self-start rounded-sm font-display text-[28px] leading-none font-black tracking-normal not-italic focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cream"
        >
          {t('header.brand')}
        </a>
        <HeaderNavigation className="col-span-2 row-start-2 pb-1 md:col-span-1 md:col-start-2 md:row-start-1 md:pb-0" />
        <LanguageSwitcher className="col-start-2 row-start-1 justify-self-end md:col-start-3" />
      </div>
    </header>
  )
}

export default Header
