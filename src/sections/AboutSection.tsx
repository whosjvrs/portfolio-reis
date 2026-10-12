import { useTranslation } from 'react-i18next'
import AboutPortrait from '../components/about/AboutPortrait'
import ResumeLink from '../components/about/ResumeLink'
import Section, { SectionHeading } from '../components/ui/Section'
import TextLink from '../components/ui/TextLink'
import TranslatedText from '../components/ui/TranslatedText'
import { GITHUB_URL } from '../config/links'

const PARAGRAPHS = ['background', 'work', 'approach', 'goals'] as const

function AboutSection() {
  const { t } = useTranslation()

  return (
    <Section id="about" className="border-t border-cream/10 px-gutter py-16 lg:py-24">
      {/* lg+: retrato e rótulo à esquerda, texto à direita. Abaixo: quadro contido em
          cima, rótulo na horizontal, texto embaixo. A ordem do DOM é a de leitura */}
      <div className="grid gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-x-16 xl:gap-x-24">
        <div className="relative w-full self-start lg:max-w-md 2xl:max-w-lg">
          {/* Abaixo de lg o quadro fica contido; o rótulo usa a largura toda */}
          <AboutPortrait className="max-w-60 lg:max-w-none" />
          {/* lg+: vertical, de baixo para cima, colado ao lado direito do quadro */}
          <p className="mt-4 text-xs leading-5 font-semibold tracking-[0.2em] text-cream/70 uppercase lg:absolute lg:top-0 lg:left-full lg:mt-0 lg:ml-5 lg:h-full lg:rotate-180 lg:[writing-mode:vertical-rl]">
            <TranslatedText mode="fade" group="body">
              {t('sections.about.label')}
            </TranslatedText>
          </p>
        </div>

        <div>
          <SectionHeading id="about" />
          {/* Mesma escala e cor do texto de apoio da hero; medida de ~62ch */}
          <div className="mt-8 max-w-[62ch] space-y-6 text-lg leading-8 text-pretty text-cream/75 lg:mt-10 xl:text-xl xl:leading-9">
            {PARAGRAPHS.map((key) => (
              <p key={key}>
                <TranslatedText mode="fade" group="body">
                  {t(`sections.about.paragraphs.${key}`)}
                </TranslatedText>
              </p>
            ))}
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3">
            <li>
              <TextLink href={GITHUB_URL} external>
                {t('links.github')}
              </TextLink>
            </li>
            <ResumeLink />
          </ul>
        </div>
      </div>
    </Section>
  )
}

export default AboutSection
