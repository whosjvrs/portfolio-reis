import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { sectionHref } from '../config/sections'
import HeroAscent from '../components/hero/HeroAscent'
import { useHeroDusk } from '../components/hero/useHeroDusk'
import ActionLink from '../components/ui/ActionLink'
import TranslatedText from '../components/ui/TranslatedText'
import { useSmoothAnchor } from '../hooks/useSmoothAnchor'

function HeroSection() {
  const { t } = useTranslation()
  const onAnchorClick = useSmoothAnchor()
  // A grade é o elemento fixado durante o entardecer (não a <section>: o pin a
  // envolve num espaçador, e assim o React continua dono dos filhos de <main>)
  const pinRef = useRef<HTMLDivElement>(null)
  useHeroDusk(pinRef)

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
    >
      {/* No desktop a linha única estica até a altura mínima; no mobile as linhas ficam naturais */}
      <div ref={pinRef} className="grid min-h-[calc(var(--page-shell-inner-height)-var(--spacing-header))] content-start lg:content-stretch lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)]">
        {/* pb maior que pt: o bloco fica levemente acima do centro */}
        <div className="flex items-center px-gutter py-12 lg:pt-12 lg:pr-12 lg:pb-24">
          <div>
            <h1
              id="hero-heading"
              tabIndex={-1}
              className="font-display focus:outline-none max-w-full text-[clamp(4.5rem,8.6vw,10.5rem)] leading-[0.9] font-black tracking-display not-italic"
            >
              <span className="block">{t('hero.name.first')}</span>{' '}
              <span className="block ps-[1.15em]">{t('hero.name.last')}</span>
            </h1>
            <p className="mt-5 text-2xl leading-tight font-medium text-pretty text-cream/85 lg:mt-6 2xl:text-3xl">
              <TranslatedText group="role">{t('hero.role')}</TranslatedText>
            </p>
            {/* Medida em rem (não em ch, que muda com a fonte). Com 39rem, a 20px, nenhum
                idioma deixa palavra sozinha na última linha (faixa segura: 38,5–40,5rem) */}
            <p className="mt-6 max-w-[39rem] text-lg leading-8 text-pretty text-cream/75 lg:mt-7 xl:text-xl xl:leading-9">
              <TranslatedText group="description" caret>
                {t('hero.description')}
              </TranslatedText>
            </p>
            <div className="mt-8 flex flex-wrap gap-4 lg:mt-10">
              <ActionLink href={sectionHref('projects')} onClick={onAnchorClick} variant="primary">
                <TranslatedText group="actions">{t('hero.projectsAction')}</TranslatedText>
              </ActionLink>
              <ActionLink href={sectionHref('contact')} onClick={onAnchorClick} variant="secondary">
                <TranslatedText group="actions">{t('hero.contactAction')}</TranslatedText>
              </ActionLink>
            </div>
          </div>
        </div>
        {/* No desktop a cena ocupa a coluna inteira, sem padding, até a borda da box */}
        <div className="relative border-t border-cream/10 px-gutter py-10 lg:border-t-0 lg:border-l lg:p-0">
          <HeroAscent />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
