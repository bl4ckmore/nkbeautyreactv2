import { motion } from 'framer-motion'
import { useLang } from '../context/LanguageContext'
import { T } from '../i18n/translations'

const vp = { once: false, margin: '-80px' }

function ServiceCard({ service, index, lang }) {
  const isOdd = index % 2 === 1
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={vp}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group grid md:grid-cols-2 gap-10 items-center py-16 border-b border-gray-100 last:border-0"
    >
      <div className={isOdd ? 'md:order-2' : ''}>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-xs font-mono text-gray-400 tracking-widest">{service.id}</span>
          {service.tag && (
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-pink-100 text-rose-600">
              {service.tag}
            </span>
          )}
        </div>
        <h3 className="text-3xl md:text-4xl font-bold text-charcoal mb-4 leading-tight">
          {service.title}
        </h3>
        <p className="text-gray-500 text-lg leading-relaxed mb-8 max-w-md">
          {service.description}
        </p>
        <motion.a
          href="#services"
          whileHover={{ x: 6 }}
          className="inline-flex items-center gap-2 text-sm font-semibold text-charcoal border-b-2 border-charcoal pb-0.5 hover:border-rose-400 hover:text-rose-500 transition-colors"
        >
          {lang === 'ge' ? 'გაიგე მეტი →' : 'Learn more →'}
        </motion.a>
      </div>

      <div
        className={`relative rounded-3xl overflow-hidden h-72 md:h-96 shadow-sm group-hover:shadow-xl transition-shadow duration-500 ${isOdd ? 'md:order-1' : ''}`}
      >
        <img
          src={service.image}
          alt={service.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {service.tag && (
          <div className="absolute top-4 left-4 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm text-rose-600 shadow-sm">
            {service.tag}
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10" />
      </div>
    </motion.div>
  )
}

export default function Services() {
  const { lang } = useLang()
  const t = T[lang] || T['en']

  const services = [
    {
      id: '01',
      title: lang === 'ge' ? 'თმის და ფერის სტუდია' : 'Hair & Color Studio',
      description: lang === 'ge' 
        ? 'ზუსტი შეჭრიდან თამამ ფერებამდე — ჩვენი სტილისტები ქმნიან მიმზიდველ იმიჯს. ბალაიაჟი, მელირება, კერატინით მკურნალობა და სხვა.' 
        : 'From precision cuts to bold color transformations — our stylists craft looks that turn heads. Balayage, highlights, keratin treatments, and more.',
      image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=700&q=80',
      tag: lang === 'ge' ? 'ყველაზე პოპულარული' : 'Most Popular',
    },
    {
      id: '02',
      title: lang === 'ge' ? 'კანის და სახის თერაპია' : 'Skin & Facial Therapy',
      description: lang === 'ge'
        ? 'პერსონალიზებული სახის წმენდა, ქიმიური პილინგი და მანათობელი პროცედურები, მორგებული თქვენი კანის ტიპზე.'
        : 'Personalized facials, chemical peels, and glow treatments tailored to your skin type. Restore radiance and confidence.',
      image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=700&q=80',
      tag: lang === 'ge' ? 'ტრენდული' : 'Trending',
    },
    {
      id: '03',
      title: lang === 'ge' ? 'ნეილ არტი და სპა' : 'Nail Artistry & Spa',
      description: lang === 'ge'
        ? 'პრემიუმ მანიკიური, პედიკიური, გელის ფრჩხილები და რთული ნეილ არტი. იდეალური სარელაქსაციო სპა გამოცდილება.'
        : 'Luxurious manicures, pedicures, gel nails, and intricate nail art. Paired with a relaxing spa experience.',
      image: 'https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=700&q=80',
      tag: '',
    },
    {
      id: '04',
      title: lang === 'ge' ? 'სადღესასწაულო მაკიაჟი' : 'Bridal & Event Makeup',
      description: lang === 'ge'
        ? 'თქვენი განსაკუთრებული დღე უნაკლო მაკიაჟს იმსახურებს. ჩვენი არტისტები ქმნიან მარადიულ იმიჯს, რომელიც მთელი დღე ძლებს.'
        : 'Your big day deserves flawless makeup. Our bridal artists create timeless looks that photograph beautifully and last all day.',
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=700&q=80',
      tag: lang === 'ge' ? 'პრემიუმი' : 'Premium',
    },
  ]

  return (
    <section id="services" className="max-w-6xl mx-auto px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={vp}
        transition={{ duration: 0.5 }}
        className="mb-4"
      >
        <span className="text-xs font-semibold tracking-widest text-rose-400 uppercase">
          {t.svc_eyebrow}
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={vp}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-4xl md:text-5xl font-bold text-charcoal mb-6 leading-tight"
      >
        {t.svc_h2a}
        <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-500">
          {t.svc_h2b}
        </span>
      </motion.h2>

      <motion.a
        href="#services"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={vp}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 border border-gray-200 px-4 py-2 rounded-full hover:border-gray-400 transition-colors mb-16"
      >
        {t.svc_all} →
      </motion.a>

      {services.map((service, i) => (
        <ServiceCard key={service.id} service={service} index={i} lang={lang} />
      ))}
    </section>
  )
}