import Navbar from './components/Navbar'
import Hero from './components/Hero'
import IconStrip from './components/IconStrip'
import Services from './components/Services'
import ForEveryClient from './components/ForEveryClient'
import Pricing from './components/Pricing'
import Blog from './components/Blog'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <IconStrip />
      <Services />
      <ForEveryClient />
      <Pricing />
      <Blog />
      <Footer />
    </div>
  )
}
