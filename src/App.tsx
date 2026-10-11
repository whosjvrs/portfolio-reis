import Header from './layouts/Header'
import PageShell from './layouts/PageShell'
import HeroSection from './sections/HeroSection'

function App() {
  return (
    <PageShell>
      <Header />
      <main>
        <HeroSection />
      </main>
    </PageShell>
  )
}

export default App
