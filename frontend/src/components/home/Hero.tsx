import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCompanyInfo } from '../../hooks/useCompanyInfo'
import { useServices } from '../../hooks/useServices'

const getIcon = (iconName: string) => (Icons as any)[iconName] || Icons.Code2

export default function Hero() {
  const info     = useCompanyInfo()  // null while loading — never shows static defaults
  const services = useServices()     // cached — instant if already fetched

  const stats = info ? [
    { value: info.statProjects, label: 'Projects Delivered' },
    { value: info.statClients, label: 'Clients Served' },
    { value: info.statYears, label: 'Years Experience' },
    { value: info.statCountries, label: 'Countries' },
  ] : []
  return (
    <section className="relative overflow-hidden bg-navy-900">
      {/* Subtle background texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />
      {/* Right-side image panel */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[45%] lg:block">
        <img
          src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=1200&q=85"
          alt="ManuelTECH team at work"
          className="h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/60 to-transparent" />
      </div>

      <div className="container-wide relative z-10">
        <div className="py-28 lg:py-36 lg:pr-[48%]">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mb-6 flex items-center gap-3"
          >
            <span className="h-0.5 w-8 bg-primary-500" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-400">
              {services.slice(0, 3).map(s => {
                const title = s.title.toLowerCase()
                if (title.includes('web') || title.includes('software') || title.includes('ai') || title.includes('robotics')) return 'Technology'
                if (title.includes('creative') || title.includes('design')) return 'Design'
                if (title.includes('training') || title.includes('education')) return 'Education'
                return s.title.split(' ')[0]
              }).filter((v, idx, self) => self.indexOf(v) === idx).join(' · ')}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="font-display text-4xl font-bold leading-[1.1] text-white sm:text-5xl lg:text-[3.4rem]"
          >
            Technology solutions<br />
            that move your<br />
            <span className="text-primary-400">business forward.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.16 }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-slate-300"
          >
            {info?.heroDescription}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.24 }}
            className="mt-10 flex flex-wrap gap-4"
          >
            <Link
              to="/contact?consultation=true"
              className="inline-flex items-center gap-2 rounded bg-primary-600 px-7 py-3.5 text-base font-semibold text-white transition hover:bg-primary-700"
            >
              Get a Free Consultation
              <ArrowRight size={18} />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 rounded border border-white/25 px-7 py-3.5 text-base font-semibold text-white transition hover:border-white hover:bg-white/10"
            >
              Our Services
            </Link>
          </motion.div>

          {/* Service tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.36 }}
            className="mt-12 flex flex-wrap gap-2"
          >
            {services.map((s) => {
              const IconComp = getIcon(s.icon)
              return (
                <span
                  key={s.slug}
                  className="inline-flex items-center gap-1.5 rounded border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300"
                >
                  <IconComp size={12} className="text-primary-400" />
                  {s.title}
                </span>
              )
            })}
          </motion.div>
        </div>

        {/* Stats bar — sits at the bottom of the hero */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.44 }}
          className="border-t border-white/10"
        >
          {stats.length > 0 && (
            <div className="grid grid-cols-2 divide-x divide-white/10 sm:grid-cols-4">
              {stats.filter(s => s.value).map((s) => (
                <div key={s.label} className="px-6 py-6 lg:px-10">
                  <p className="font-display text-3xl font-bold text-white">{s.value}</p>
                  <p className="mt-1 text-xs font-medium uppercase tracking-wider text-slate-400">{s.label}</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
