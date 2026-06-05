import { motion } from 'framer-motion'
import { useLang } from '../context/LanguageContext'

// I duplicated the array a few more times to guarantee it never runs out 
// of icons, even on massive 4K ultrawide monitors!
const baseIcons = [
  '✂️', '💅', '🌸', '💆', '👁️', '💄', '🪞', '✨',
  '🧴', '🌿', '💎', '🕯️', '🌺', '🧖', '💋', '🎀'
]
const icons = [...baseIcons, ...baseIcons, ...baseIcons, ...baseIcons]

export default function IconStrip() {
  const { lang } = useLang()

  const descriptionWordsEn = [
    'NK', 'Beauty', 'is', 'your', 'premium', 'destination',
    'for', 'hair,', 'skin,', 'nails,', 'and', 'bridal', 'services',
    '—', 'crafted', 'for', 'every', 'version', 'of', 'you.'
  ]

  const descriptionWordsGe = [
    'NK', 'Beauty', 'არის', 'თქვენი', 'პრემიუმ', 'სივრცე',
    'თმის,', 'კანის,', 'ფრჩხილების', 'და', 'სადღესასწაულო', 'სერვისებისთვის',
    '—', 'შექმნილი', 'მხოლოდ', 'თქვენთვის.'
  ]

  const descriptionWords = lang === 'ge' ? descriptionWordsGe : descriptionWordsEn

  return (
    <section className="py-24 overflow-hidden">
      {/* 
        1. Added 'py-4' so the circles have room to grow on hover without getting cut off
      */}
      <div className="relative flex overflow-hidden mb-20 py-4">
        {/* 
          2. Switched from Framer Motion to pure CSS 'animate-marquee' 
          3. Added hover pause effect so it's easier to point at
        */}
        <div className="flex w-max gap-8 items-center animate-marquee hover:[animation-play-state:paused]">
          {icons.map((icon, i) => (
            <div
              key={i}
              className="w-16 h-16 min-w-[4rem] min-h-[4rem] rounded-full bg-gray-50 border border-gray-100 flex items-center justify-center text-2xl flex-shrink-0 hover:scale-110 hover:border-pink-200 hover:bg-pink-50 transition-all cursor-default shadow-sm"
            >
              {icon}
            </div>
          ))}
        </div>
      </div>

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