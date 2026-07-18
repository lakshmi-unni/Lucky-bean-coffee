import { Suspense, lazy } from 'react'
import Navbar from './components/sections/Navbar'
import Hero from './components/sections/Hero'

const About = lazy(() => import('./components/sections/About'))
const Menu = lazy(() => import('./components/sections/Menu'))
const WhyDifferent = lazy(() => import('./components/sections/WhyDifferent'))
const Gallery = lazy(() => import('./components/sections/Gallery'))
const CtaBanner = lazy(() => import('./components/sections/CtaBanner'))
const Testimonials = lazy(() => import('./components/sections/Testimonials'))
const VisitUs = lazy(() => import('./components/sections/VisitUs'))
const Newsletter = lazy(() => import('./components/sections/Newsletter'))
const Footer = lazy(() => import('./components/sections/Footer'))

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
