import { useState } from 'react'
import { LanguageProvider } from './context/LanguageContext'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import IconStrip from './components/IconStrip'
import Services from './components/Services'
import ForEveryClient from './components/ForEveryClient'
import Pricing from './components/Pricing'
import Blog from './components/Blog'
import Footer from './components/Footer'
import BookingModal from './components/BookingModal'

export default function App() {
  const [booking, setBooking] = useState(null) // null | { preService }
  const openBooking  = (svc = null) => setBooking({ preService: svc })
  const closeBooking = ()            => setBooking(null)

  return (
    <LanguageProvider>
      <AuthProvider>
        <div className="min-h-screen bg-white">
          <Navbar onBook={() => openBooking()} />
          <Hero onBook={openBooking} />
          <IconStrip />
          <Services />
          <ForEveryClient />
          <Pricing onBook={openBooking} />
          <Blog />
          <Footer onBook={openBooking} />
        </div>
        {booking !== null && (
          <BookingModal preService={booking.preService} onClose={closeBooking} />
        )}
      </AuthProvider>
    </LanguageProvider>
  )
}
