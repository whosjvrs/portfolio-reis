import { useTranslation } from 'react-i18next'
import { sectionHref } from '../config/sections'
import HeroLayers from '../components/hero/HeroLayers'
import ActionLink from '../components/ui/ActionLink'

function HeroSection() {
  const { t } = useTranslation()

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
    >
      {/* No desktop a linha única estica até a altura mínima; no mobile as linhas ficam naturais */}
      <div className="grid min-h-[calc(var(--page-shell-inner-height)-var(--spacing-header))] mx-auto max-w-hero content-start lg:content-stretch lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        {/* pb maior que pt: o bloco fica levemente acima do centro */}
        <div className="flex items-center px-6 py-12 sm:px-12 lg:pt-12 lg:pb-24">
          <div>
            <h1
              id="hero-heading"
              className="font-display max-w-full text-[clamp(4.5rem,11vw,13rem)] leading-[0.9] font-black tracking-display not-italic"
            >
              <span className="block">{t('hero.name.first')}</span>{' '}
              <span className="block ps-[1.15em]">{t('hero.name.last')}</span>
            </h1>
            <p className="mt-5 text-2xl leading-tight font-medium text-pretty text-cream/85 lg:mt-7 lg:text-3xl xl:text-4xl">
              {t('hero.role')}
            </p>
            <p className="mt-6 max-w-[58ch] text-lg leading-8 text-pretty text-cream/75 lg:mt-8 lg:text-xl lg:leading-9">
              {t('hero.description')}
            </p>
            <div className="mt-8 flex flex-wrap gap-4 lg:mt-10">
              <ActionLink href={sectionHref('projects')} variant="primary">
                {t('hero.projectsAction')}
              </ActionLink>
              <ActionLink href={sectionHref('contact')} variant="secondary">
                {t('hero.contactAction')}
              </ActionLink>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center border-t border-cream/10 px-6 py-10 sm:px-12 lg:border-t-0 lg:border-l lg:py-20">
          <HeroLayers />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
