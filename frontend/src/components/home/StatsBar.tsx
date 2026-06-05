import { motion } from 'framer-motion'

const stats = [
  { value: '8+', label: 'Years of Experience' },
  { value: '50+', label: 'Projects Delivered' },
  { value: '30+', label: 'Happy Clients' },
  { value: '6', label: 'Service Areas' },
  { value: '5', label: 'Countries Served' },
]

export default function StatsBar() {
  return (
    <section className="relative z-10 -mt-1 border-y border-border bg-white shadow-sm">
      <div className="container-wide py-10">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="text-center lg:text-left"
            >
              <p className="font-display text-4xl font-bold text-primary-600">{stat.value}</p>
              <p className="mt-1 text-sm font-medium text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
