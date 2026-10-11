import { useTranslation } from 'react-i18next'
import { sectionHref } from '../config/sections'
import HeroAscent from '../components/hero/HeroAscent'
import ActionLink from '../components/ui/ActionLink'

function HeroSection() {
  const { t } = useTranslation()

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
    >
      {/* No desktop a linha única estica até a altura mínima; no mobile as linhas ficam naturais */}
      <div className="grid min-h-[calc(var(--page-shell-inner-height)-var(--spacing-header))] content-start lg:content-stretch lg:grid-cols-[minmax(0,45fr)_minmax(0,55fr)]">
        {/* pb maior que pt: o bloco fica levemente acima do centro */}
        <div className="flex items-center px-gutter py-12 lg:pt-12 lg:pr-12 lg:pb-24">
          <div>
            <h1
              id="hero-heading"
              className="font-display max-w-full text-[clamp(4.5rem,8.6vw,10.5rem)] leading-[0.9] font-black tracking-display not-italic"
            >
              <span className="block">{t('hero.name.first')}</span>{' '}
              <span className="block ps-[1.15em]">{t('hero.name.last')}</span>
            </h1>
            <p className="mt-5 text-2xl leading-tight font-medium text-pretty text-cream/85 lg:mt-6 2xl:text-3xl">
              {t('hero.role')}
            </p>
            <p className="mt-6 max-w-[58ch] text-lg leading-8 text-pretty text-cream/75 lg:mt-7 xl:text-xl xl:leading-9">
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
        {/* No desktop a cena ocupa a coluna inteira, sem padding, até a borda da box */}
        <div className="relative border-t border-cream/10 px-gutter py-10 lg:border-t-0 lg:border-l lg:p-0">
          <HeroAscent />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
