import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const clients = [
  {
    id: 0,
    type: 'Bride & Wedding',
    headline: 'Your perfect day, perfectly styled.',
    description:
      'Our bridal team specializes in creating unforgettable looks for your wedding day — from trial runs to the final touch-up.',
    href: '#clients',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 1,
    type: 'Everyday Glam',
    headline: 'Look stunning, every single day.',
    description:
      "Whether it's a blowout before work or a fresh mani on the weekend — we make everyday feel like a special occasion.",
    href: '#clients',
    image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=700&q=80',
  },
  {
    id: 2,
    type: 'Corporate & Events',
    headline: 'Look powerful, feel confident.',
    description:
      'Professional styling for photoshoots, corporate events, galas, and everything in between. Arrive camera-ready.',
    href: '#clients',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80',
  },
]

const vp = { once: false, margin: '-80px' }

export default function ForEveryClient() {
  const [active, setActive] = useState(0)

  const prev = () => setActive((a) => (a === 0 ? clients.length - 1 : a - 1))
  const next = () => setActive((a) => (a === clients.length - 1 ? 0 : a + 1))

  return (
    <section id="clients" className="py-24 bg-gray-50/50 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="text-xs font-semibold tracking-widest text-rose-400 uppercase">
            Built for every client
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl md:text-5xl font-bold text-charcoal mb-2 leading-tight"
        >
          Beauty for
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-500">
            every occasion
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={vp}
          transition={{ delay: 0.25 }}
          className="text-gray-500 text-lg mb-12 max-w-lg"
        >
          Whether you're walking down the aisle or stepping into the boardroom — we have the perfect service for you.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-8 items-center"
        >
          {/* Visual panel */}
          <div className="relative h-80 md:h-[440px]">
            <AnimatePresence mode="wait">
              {clients.map((c, i) =>
                i === active ? (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, x: 40, scale: 0.97 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    exit={{ opacity: 0, x: -40, scale: 0.97 }}
                    transition={{ duration: 0.4, ease: 'easeInOut' }}
                    className="absolute inset-0 rounded-3xl overflow-hidden shadow-lg"
                  >
                    <img
                      src={c.image}
                      alt={c.type}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                    <div className="absolute bottom-5 left-5">
                      <span className="text-white text-sm font-semibold bg-white/20 backdrop-blur-sm px-3 py-1.5 rounded-full">
                        {c.type}
                      </span>
                    </div>
                  </motion.div>
                ) : null
              )}
            </AnimatePresence>
          </div>

          {/* Text content */}
          <div>
            <div className="flex gap-2 mb-6 flex-wrap">
              {clients.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => setActive(i)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full transition-all ${
                    i === active
                      ? 'bg-charcoal text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {c.type}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
              >
                <h3 className="text-2xl md:text-3xl font-bold text-charcoal mb-4 leading-snug">
                  {clients[active].headline}
                </h3>
                <p className="text-gray-500 text-base leading-relaxed mb-6">
                  {clients[active].description}
                </p>
                <motion.a
                  href={clients[active].href}
                  whileHover={{ x: 4 }}
                  className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal"
                >
                  View case →
                </motion.a>
              </motion.div>
            </AnimatePresence>

            <div className="flex gap-2 mt-8">
              <motion.button
                onClick={prev}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-gray-400 hover:bg-gray-50 transition-all"
              >
                <ChevronLeft size={16} />
              </motion.button>
              <motion.button
                onClick={next}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center hover:border-gray-400 hover:bg-gray-50 transition-all"
              >
                <ChevronRight size={16} />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
