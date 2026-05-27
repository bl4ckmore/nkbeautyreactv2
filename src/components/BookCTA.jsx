import { motion } from 'framer-motion'

const headline = ['Ready to feel', 'your most', 'beautiful?']
const vp = { once: false, margin: '-80px' }

export default function BookCTA() {
  return (
    <section id="book" className="relative py-36 overflow-hidden">
      {/* Background image */}
      <img
        src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1800&q=80"
        alt=""
        className="absolute inset-0 w-full h-full object-cover"
        aria-hidden="true"
      />
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-charcoal/80" />

      {/* Floating orbs */}
      <motion.div
        animate={{ y: [0, -28, 0], x: [0, 12, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-16 left-16 w-64 h-64 bg-pink-400/15 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 22, 0], x: [0, -16, 0] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
        className="absolute bottom-16 right-20 w-80 h-80 bg-rose-500/15 rounded-full blur-3xl pointer-events-none"
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5 }}
          className="inline-block text-xs font-semibold tracking-widest text-rose-400 uppercase mb-8"
        >
          Book now
        </motion.span>

        {/* Word-by-word headline */}
        <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-8">
          {headline.map((line, li) => (
            <span key={li} className="block overflow-hidden">
              {line.split(' ').map((word, wi) => (
                <motion.span
                  key={wi}
                  initial={{ y: '110%', opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={vp}
                  transition={{
                    duration: 0.65,
                    delay: 0.1 + li * 0.15 + wi * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="inline-block mr-4"
                >
                  {word}
                </motion.span>
              ))}
            </span>
          ))}
        </h2>

        {/* Blur reveal subtitle */}
        <motion.p
          initial={{ opacity: 0, filter: 'blur(8px)' }}
          whileInView={{ opacity: 1, filter: 'blur(0px)' }}
          viewport={vp}
          transition={{ duration: 0.8, delay: 0.55, ease: 'easeOut' }}
          className="text-gray-300 text-lg mb-12 max-w-md mx-auto leading-relaxed"
        >
          Our team is ready to create your next favorite look. Book in under a minute.
        </motion.p>

        {/* CTA with pulse ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={vp}
          transition={{ duration: 0.5, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative inline-block"
        >
          <motion.span
            animate={{ scale: [1, 1.35, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeOut' }}
            className="absolute inset-0 rounded-full bg-rose-400/30 pointer-events-none"
          />
          <motion.a
            href="#"
            whileHover={{ scale: 1.06, backgroundColor: '#f43f5e' }}
            whileTap={{ scale: 0.96 }}
            className="relative inline-flex items-center gap-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold text-base px-10 py-5 rounded-full shadow-xl shadow-rose-500/30 transition-all"
          >
            <span>✦</span>
            Book an Appointment
          </motion.a>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={vp}
          transition={{ delay: 0.85 }}
          className="mt-6 text-gray-500 text-xs"
        >
          Free cancellation up to 24h before · No card required
        </motion.p>
      </div>
    </section>
  )
}
