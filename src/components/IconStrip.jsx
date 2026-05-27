import { motion } from 'framer-motion'

const icons = [
  '✂️', '💅', '🌸', '💆', '👁️', '💄', '🪞', '✨',
  '🧴', '🌿', '💎', '🕯️', '🌺', '🧖', '💋', '🎀',
  '✂️', '💅', '🌸', '💆', '👁️', '💄', '🪞', '✨',
  '🧴', '🌿', '💎', '🕯️', '🌺', '🧖', '💋', '🎀',
]

const descriptionWords = [
  'Lumière', 'Beauty', 'is', 'your', 'premium', 'destination',
  'for', 'hair,', 'skin,', 'nails,', 'and', 'bridal', 'services',
  '—', 'crafted', 'for', 'every', 'version', 'of', 'you.'
]

export default function IconStrip() {
  return (
    <section className="py-24 overflow-hidden">
      {/* Scrolling icon strip — continuous, no viewport gating needed */}
      <div className="relative flex overflow-hidden mb-20">
        <motion.div
          className="flex gap-8 items-center"
          animate={{ x: ['0%', '-50%'] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        >
          {icons.map((icon, i) => (
            <div
              key={i}
              className="w-16 h-16 rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-2xl flex-shrink-0 hover:scale-110 hover:border-pink-200 hover:bg-pink-50 transition-all cursor-default"
            >
              {icon}
            </div>
          ))}
        </motion.div>
      </div>

      {/* Animated description text — each word re-animates on scroll up/down */}
      <div className="max-w-4xl mx-auto px-6">
        <p className="text-3xl md:text-4xl font-semibold text-charcoal leading-relaxed">
          {descriptionWords.map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0.15 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false, margin: '-60px' }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
              className="inline-block mr-2"
            >
              {word}
            </motion.span>
          ))}
        </p>
      </div>
    </section>
  )
}
