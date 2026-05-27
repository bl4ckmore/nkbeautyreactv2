import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Check } from 'lucide-react'

const plans = [
  {
    name: 'Essential',
    price: '$65',
    desc: 'A fresh look and quick, confident maintenance.',
    features: ['Haircut & Blowout', 'Express Facial', 'Classic Manicure', 'Brow Shape'],
    cta: 'Book Essential',
    featured: false,
  },
  {
    name: 'Signature',
    price: '$145',
    desc: 'Our most loved all-in-one beauty experience.',
    features: ['Full Color & Treatment', 'Luxury Facial', 'Gel Mani + Pedi', 'Lash Lift', 'Priority Booking'],
    cta: 'Book Signature',
    featured: true,
  },
  {
    name: 'Luxury',
    price: '$280',
    desc: 'The ultimate VIP experience for special occasions.',
    features: ['Bridal Hair & Makeup', 'Full Body Spa', 'Nail Art Suite', 'Champagne Welcome', 'Private Room'],
    cta: 'Book Luxury',
    featured: false,
  },
]

const vp = { once: false, margin: '-60px' }

function PricingCard({ plan, index }) {
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springX = useSpring(rotateX, { damping: 22, stiffness: 220 })
  const springY = useSpring(rotateY, { damping: 22, stiffness: 220 })

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2)
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2)
    rotateY.set(x * 7)
    rotateX.set(-y * 7)
  }
  const handleMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60, scale: 0.94 }}
      whileInView={{ opacity: 1, y: 0, scale: plan.featured ? 1.05 : 1 }}
      viewport={vp}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 1200 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-3xl p-8 flex flex-col ${
        plan.featured
          ? 'bg-charcoal text-white shadow-2xl shadow-charcoal/20'
          : 'bg-white border border-gray-100 shadow-md'
      }`}
    >
      {plan.featured && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ delay: index * 0.1 + 0.25 }}
          className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-400 to-rose-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow"
        >
          Most Popular
        </motion.div>
      )}

      <div className="mb-6">
        <p className={`text-xs font-semibold tracking-widest uppercase mb-2 ${plan.featured ? 'text-rose-300' : 'text-rose-400'}`}>
          {plan.name}
        </p>
        <div className="flex items-end gap-1 mb-3">
          <span className={`text-5xl font-bold ${plan.featured ? 'text-white' : 'text-charcoal'}`}>
            {plan.price}
          </span>
          <span className="text-sm mb-2 text-gray-400">/session</span>
        </div>
        <p className={`text-sm leading-relaxed ${plan.featured ? 'text-gray-400' : 'text-gray-500'}`}>
          {plan.desc}
        </p>
      </div>

      <ul className="flex-1 space-y-3 mb-8">
        {plan.features.map((f, i) => (
          <motion.li
            key={f}
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={vp}
            transition={{ delay: index * 0.1 + 0.15 + i * 0.06, duration: 0.35 }}
            className="flex items-center gap-2 text-sm"
          >
            <span className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center ${
              plan.featured ? 'bg-rose-400/20' : 'bg-pink-50'
            }`}>
              <Check size={10} className={plan.featured ? 'text-rose-300' : 'text-rose-400'} />
            </span>
            <span className={plan.featured ? 'text-gray-300' : 'text-gray-600'}>{f}</span>
          </motion.li>
        ))}
      </ul>

      <motion.a
        href="#booking"
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={`text-center text-sm font-semibold py-3.5 rounded-2xl transition-all ${
          plan.featured
            ? 'bg-white text-charcoal hover:bg-gray-100'
            : 'bg-charcoal text-white hover:bg-gray-800'
        }`}
      >
        {plan.cta}
      </motion.a>
    </motion.div>
  )
}

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 bg-gray-50/60 overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="text-xs font-semibold tracking-widest text-rose-400 uppercase">
            Pricing
          </span>
        </motion.div>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-14">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={vp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold text-charcoal leading-tight"
          >
            Simple,
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-500">
              honest pricing
            </span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={vp}
            transition={{ delay: 0.25 }}
            className="text-gray-500 max-w-xs text-sm leading-relaxed md:text-right"
          >
            No hidden fees. Choose the package that fits your moment.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 items-center">
          {plans.map((plan, i) => (
            <PricingCard key={plan.name} plan={plan} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
