import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Menu from './components/Menu'
import WhyDifferent from './components/WhyDifferent'
import CtaBanner from './components/CtaBanner'
import Testimonials from './components/Testimonials'
import VisitUs from './components/VisitUs'
import Newsletter from './components/Newsletter'
import Footer from './components/Footer'

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Menu />
        <WhyDifferent />
        <CtaBanner />
        <Testimonials />
        <VisitUs />
        <Newsletter />
      </main>
      <Footer />
    </>
  )
}

export default App
