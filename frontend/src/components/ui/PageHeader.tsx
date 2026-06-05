import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

interface PageHeaderProps {
  title: string
  description: string
  breadcrumbs?: { label: string; to?: string }[]
}

export default function PageHeader({ title, description, breadcrumbs }: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden bg-navy-900 pt-28 pb-16 lg:pt-32 lg:pb-20">
      {/* Dot grid texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />
      {/* Left accent bar */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-1 bg-primary-600" />

      <div className="container-wide relative z-10">
        {breadcrumbs && (
          <nav className="mb-6 flex items-center gap-1 text-xs text-slate-500" aria-label="Breadcrumb">
            <Link to="/" className="transition hover:text-white">Home</Link>
            {breadcrumbs.map((crumb) => (
              <span key={crumb.label} className="flex items-center gap-1">
                <ChevronRight size={12} />
                {crumb.to
                  ? <Link to={crumb.to} className="transition hover:text-white">{crumb.label}</Link>
                  : <span className="text-slate-300">{crumb.label}</span>
                }
              </span>
            ))}
          </nav>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
          className="max-w-3xl"
        >
          <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 text-lg leading-relaxed text-slate-300">{description}</p>
        </motion.div>
      </div>
    </section>
  )
}
