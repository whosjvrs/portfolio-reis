import { useTranslation } from 'react-i18next'
import AboutPortrait from '../components/about/AboutPortrait'
import ResumeLink from '../components/about/ResumeLink'
import Section, { SectionHeading } from '../components/ui/Section'
import TextLink from '../components/ui/TextLink'
import TranslatedText from '../components/ui/TranslatedText'
import { GITHUB_URL } from '../config/links'

const PARAGRAPHS = ['background', 'work', 'approach', 'goals'] as const

// Rótulos de metadados: voz de catálogo, caixa-alta pequena com tracking amplo
const METADATA = 'font-label text-xs leading-5 font-medium tracking-[0.18em] text-cream/70 uppercase'

function AboutSection() {
  const { t } = useTranslation()

  return (
    // lg+: altura mínima da área visível abaixo do header, com o conteúdo centralizado;
    // assim a âncora sempre para sob o header e a seção inteira cabe numa tela
    <Section
      id="about"
      className="border-t border-cream/10 px-gutter py-16 lg:flex lg:min-h-[calc(var(--page-shell-inner-height)-var(--spacing-header))] lg:flex-col lg:justify-center lg:py-12"
    >
      {/* lg+: retrato e rótulo à esquerda, texto à direita. Abaixo: quadro contido em
          cima, rótulo na horizontal, texto embaixo. A ordem do DOM é a de leitura */}
      <div className="grid w-full gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-x-16 xl:gap-x-24">
        {/* @container: o rótulo vertical mede a altura do quadro pela largura (4:5 → 125cqw) */}
        <div className="@container relative w-full self-start lg:max-w-sm 2xl:max-w-lg">
          {/* Abaixo de lg o quadro fica contido; os rótulos usam a largura toda */}
          <AboutPortrait className="max-w-60 lg:max-w-none" />
          {/* Ordem de leitura: curso, depois lugar */}
          <p className={`mt-4 ${METADATA}`}>
            <TranslatedText mode="fade" group="body">
              {t('sections.about.program')}
            </TranslatedText>
          </p>
          {/* lg+: vertical, de baixo para cima, colado ao lado direito do quadro */}
          <p className={`mt-1 lg:absolute lg:top-0 lg:left-full lg:mt-0 lg:ml-4 lg:h-[125cqw] lg:rotate-180 lg:[writing-mode:vertical-rl] ${METADATA}`}>
            <TranslatedText mode="fade" group="body">
              {t('sections.about.place')}
            </TranslatedText>
          </p>
        </div>

        <div>
          <SectionHeading id="about" />
          {/* Cor do texto de apoio da hero, em corpo menor para a seção caber na tela.
              Medida em rem, não em ch: não muda com a fonte de texto */}
          <div className="mt-6 max-w-[42rem] space-y-4 text-[17px] leading-[1.6] text-pretty text-cream/75">
            {PARAGRAPHS.map((key) => (
              <p key={key}>
                <TranslatedText mode="fade" group="body">
                  {t(`sections.about.paragraphs.${key}`)}
                </TranslatedText>
              </p>
            ))}
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
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
