import { motion } from 'framer-motion'

const links = {
  Services: ['Hair & Color', 'Skin & Facials', 'Nails & Spa', 'Bridal'],
  Company: ['Our Story', 'Our Team', 'Gallery', 'Careers'],
  Connect: ['Instagram', 'Facebook', 'TikTok', 'Contact'],
}

const hours = [
  { days: 'Mon – Fri', time: '9am – 7pm' },
  { days: 'Saturday', time: '9am – 6pm' },
  { days: 'Sunday', time: '10am – 5pm' },
]

const headline = ['Ready to feel', 'your most', 'beautiful?']
const wordmark = 'Lumière'.split('')
const vp = { once: false, margin: '-40px' }

export default function Footer() {
  return (
    <footer className="relative bg-charcoal text-white overflow-hidden">
      {/* Background image spanning the entire footer */}
      <img
        src="https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=1800&q=80"
        alt=""
        className="absolute inset-0 w-full h-full object-cover object-center"
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-charcoal/85" />

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

      {/* ── CTA hero area ── */}
      <div id="book" className="relative pt-28 pb-16">
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.5 }}
            className="inline-block text-xs font-semibold tracking-widest text-rose-400 uppercase mb-4"
          >
            Book now
          </motion.span>

          <h2 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-4">
            {headline.map((line, li) => (
              <motion.span
                key={li}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={vp}
                transition={{ duration: 0.55, delay: li * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                {line}
              </motion.span>
            ))}
          </h2>

          <motion.p
            initial={{ opacity: 0, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, filter: 'blur(0px)' }}
            viewport={vp}
            transition={{ duration: 0.8, delay: 0.55, ease: 'easeOut' }}
            className="text-gray-300 text-lg mb-8 max-w-md mx-auto leading-relaxed"
          >
            Our team is ready to create your next favorite look. Book in under a minute.
          </motion.p>

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
      </div>

      {/* ── Big wordmark ── */}
      <div className="relative z-10 border-b border-white/10 px-6 pt-8 pb-6 max-w-6xl mx-auto">
        <h2
          aria-label="Lumière"
          className="text-[clamp(4rem,12vw,9rem)] font-bold tracking-tight leading-none text-white/10 select-none"
        >
          {wordmark.map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={vp}
              transition={{ duration: 0.55, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </h2>
      </div>

      {/* ── Links grid — 5 columns ── */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="col-span-2 md:col-span-1"
        >
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-pink-300 to-rose-400 flex items-center justify-center text-white font-bold text-xs">
              L
            </div>
            <span className="font-semibold text-base">Lumière</span>
          </div>
          <p className="text-gray-500 text-xs leading-relaxed">
            Premium beauty services crafted for every version of you.
          </p>
        </motion.div>

        {/* Services, Company, Connect */}
        {Object.entries(links).map(([category, items], ci) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.45, delay: 0.15 + ci * 0.07 }}
          >
            <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-4">
              {category}
            </p>
            <ul className="space-y-2.5">
              {items.map((item, ii) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={vp}
                  transition={{ duration: 0.35, delay: 0.2 + ci * 0.07 + ii * 0.04 }}
                >
                  <a href="#" className="text-sm text-gray-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}

        {/* Hours + Address + Phone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.45, delay: 0.36 }}
        >
          <p className="text-xs font-semibold tracking-widest text-gray-500 uppercase mb-4">Hours</p>
          <ul className="space-y-2 mb-6">
            {hours.map(({ days, time }) => (
              <li key={days} className="flex justify-between gap-3 text-xs">
                <span className="text-gray-500">{days}</span>
                <span className="text-gray-400 tabular-nums">{time}</span>
              </li>
            ))}
          </ul>
          <div className="pt-5 border-t border-white/10 space-y-2">
            <p className="text-xs text-gray-500 leading-relaxed">
              123 Bloom Avenue<br />New York, NY 10001
            </p>
            <p className="text-xs text-gray-500">(212) 555-0192</p>
          </div>
        </motion.div>
      </div>

      {/* ── Bottom bar ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={vp}
        transition={{ delay: 0.3 }}
        className="relative z-10 border-t border-white/10 px-6 py-6 max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3"
      >
        <p className="text-gray-600 text-xs">
          © {new Date().getFullYear()} Lumière Beauty Salon. All rights reserved.
        </p>
        <div className="flex gap-5 text-xs text-gray-600">
          <a href="#" className="hover:text-white transition-colors">Privacy</a>
          <a href="#" className="hover:text-white transition-colors">Terms</a>
          <a href="#" className="hover:text-white transition-colors">Accessibility</a>
        </div>
      </motion.div>
    </footer>
  )
}
