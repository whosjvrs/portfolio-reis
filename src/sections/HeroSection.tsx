import { useTranslation } from 'react-i18next'
import HeroLayers from '../components/hero/HeroLayers'
import ActionLink from '../components/ui/ActionLink'

function HeroSection() {
  const { t } = useTranslation()

  return (
    <section
      id="inicio"
      aria-labelledby="hero-heading"
    >
      <div className="grid lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
        <div className="flex items-center px-6 py-12 sm:px-12 lg:py-20">
          <div className="max-w-[620px]">
            <h1
              id="hero-heading"
              className="font-display max-w-full text-[clamp(4.5rem,10vw,11.25rem)] leading-[0.9] font-black tracking-normal not-italic"
            >
              <span className="block">{t('hero.name.first')}</span>{' '}
              <span className="block ps-[0.7em] sm:ps-[1.2em]">
                {t('hero.name.last')}
              </span>
            </h1>
            <p className="mt-4 text-2xl leading-tight font-medium text-cream/60 lg:text-3xl">
              {t('hero.role')}
            </p>
            <p className="mt-6 max-w-[440px] text-lg leading-8 text-cream/75">
              {t('hero.description')}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ActionLink href="#projetos" variant="primary">
                {t('hero.projectsAction')}
              </ActionLink>
              <ActionLink href="#contato" variant="secondary">
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
