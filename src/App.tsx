import Header from './layouts/Header'
import PageShell from './layouts/PageShell'
import AboutSection from './sections/AboutSection'
import HeroSection from './sections/HeroSection'

function App() {
  return (
    <PageShell>
      <Header />
      <main>
        <HeroSection />
        <AboutSection />
      </main>
    </PageShell>
  )
}

export default App
