import { Suspense, lazy } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'

const About = lazy(() => import('./components/About'))
const Menu = lazy(() => import('./components/Menu'))
const WhyDifferent = lazy(() => import('./components/WhyDifferent'))
const Gallery = lazy(() => import('./components/Gallery'))
const CtaBanner = lazy(() => import('./components/CtaBanner'))
const Testimonials = lazy(() => import('./components/Testimonials'))
const VisitUs = lazy(() => import('./components/VisitUs'))
const Newsletter = lazy(() => import('./components/Newsletter'))
const Footer = lazy(() => import('./components/Footer'))

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Suspense fallback={null}>
          <About />
          <Menu />
          <WhyDifferent />
          <Gallery />
          <CtaBanner />
          <Testimonials />
          <VisitUs />
          <Newsletter />
        </Suspense>
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
    </>
  )
}

export default App
