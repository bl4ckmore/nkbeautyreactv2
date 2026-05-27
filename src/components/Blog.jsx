import { motion } from 'framer-motion'

const posts = [
  {
    category: 'Hair',
    date: 'May 2026',
    title: '5 Secrets to a Perfect Balayage',
    excerpt:
      "The art of balayage goes beyond technique — it is about understanding light, shadow, and the unique texture of each client's hair.",
    image: 'https://images.unsplash.com/photo-1562322140-8baeececf3df?auto=format&fit=crop&w=600&q=80',
  },
  {
    category: 'Skin',
    date: 'April 2026',
    title: 'Morning Routine for Glowing Skin',
    excerpt:
      "A consistent morning routine is your skin's best friend. We break down the 5 steps our estheticians swear by every single day.",
    image: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&w=600&q=80',
  },
  {
    category: 'Bridal',
    date: 'March 2026',
    title: 'Your Bridal Makeup Timeline',
    excerpt:
      "From the trial run to the wedding morning — here's how we work with brides to create flawless, long-lasting looks that photograph beautifully.",
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=600&q=80',
  },
]

const vp = { once: false, margin: '-60px' }

function BlogCard({ post, index }) {
  return (
    <motion.article
      initial={{ opacity: 0, clipPath: 'inset(40px 0 0 0 round 24px)' }}
      whileInView={{ opacity: 1, clipPath: 'inset(0px 0 0 0 round 24px)' }}
      viewport={vp}
      transition={{ duration: 0.65, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
      className="group bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 flex flex-col"
    >
      <div className="relative h-52 overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <span className="absolute top-4 left-4 text-xs font-semibold px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-sm text-rose-500">
          {post.category}
        </span>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <p className="text-xs text-gray-400 mb-3">{post.date}</p>
        <h3 className="text-lg font-bold text-charcoal mb-2 leading-snug group-hover:text-rose-500 transition-colors">
          {post.title}
        </h3>
        <p className="text-sm text-gray-500 leading-relaxed flex-1">{post.excerpt}</p>
        <motion.a
          href="#blog"
          whileHover={{ x: 4 }}
          className="inline-flex items-center gap-1 mt-5 text-xs font-semibold text-charcoal"
        >
          Read more →
        </motion.a>
      </div>
    </motion.article>
  )
}

export default function Blog() {
  return (
    <section id="blog" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={vp}
          transition={{ duration: 0.5 }}
          className="mb-4"
        >
          <span className="text-xs font-semibold tracking-widest text-rose-400 uppercase">
            Blog
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
            Beauty tips
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-500">
              & stories
            </span>
          </motion.h2>
          <motion.a
            href="#blog"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={vp}
            transition={{ delay: 0.25 }}
            whileHover={{ x: 4 }}
            className="text-sm font-medium text-gray-500 hover:text-charcoal transition-colors flex items-center gap-1"
          >
            View all posts →
          </motion.a>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <BlogCard key={post.title} post={post} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
