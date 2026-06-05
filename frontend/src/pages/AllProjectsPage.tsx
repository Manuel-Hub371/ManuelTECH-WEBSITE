import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, Filter } from 'lucide-react'
import { completedProjects } from '../data/products'
import CTABand from '../components/home/CTABand'

const projectCategoryColors: Record<string, string> = {
  Web:      'text-sky-600 bg-sky-50',
  Software: 'text-primary-600 bg-primary-50',
  AI:       'text-violet-600 bg-violet-50',
  Creative: 'text-rose-600 bg-rose-50',
  Robotics: 'text-amber-600 bg-amber-50',
  Training: 'text-emerald-600 bg-emerald-50',
}

const filters = ['All', 'Web', 'Software', 'AI', 'Creative', 'Robotics', 'Training']

export default function AllProjectsPage() {
  const [active, setActive] = useState('All')

  const filtered = active === 'All'
    ? completedProjects
    : completedProjects.filter((p) => p.category === active)

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-navy-900">
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div className="absolute left-0 top-0 h-full w-1 bg-primary-600" />
        <div className="container-wide py-24 lg:py-32">
          <Link to="/portfolio" className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white">
            <ArrowLeft size={15} /> Back to Portfolio
          </Link>
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-0.5 w-8 bg-primary-500" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-400">Completed Projects</span>
            </div>
            <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              The full body of work.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-300">
              Every project we've delivered — across web, software, AI, creative, robotics, and training.
              Many more are under NDA and not listed here.
            </p>
          </div>
        </div>
      </section>

      {/* ── Projects ── */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          {/* Filter */}
          <div className="mb-8 flex flex-wrap items-center gap-3">
            <Filter size={14} className="text-muted-foreground" />
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setActive(f)}
                className={`rounded px-3 py-1.5 text-xs font-semibold transition ${
                  active === f
                    ? 'bg-navy-900 text-white'
                    : 'border border-border text-slate-600 hover:border-navy-900 hover:text-navy-900'
                }`}
              >
                {f}
              </button>
            ))}
            <span className="ml-auto text-xs text-muted-foreground">
              {filtered.length} project{filtered.length !== 1 ? 's' : ''}
            </span>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid gap-px bg-border border border-border sm:grid-cols-2 lg:grid-cols-3"
            >
              {filtered.map((project, i) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="flex flex-col bg-white p-7 transition hover:bg-muted"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className={`rounded px-2.5 py-1 text-xs font-bold ${projectCategoryColors[project.category] ?? 'bg-muted text-slate-600'}`}>
                      {project.category}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">{project.year}</span>
                  </div>
                  <h3 className="mt-3 font-display font-bold text-navy-900">{project.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.techStack.map((t) => (
                      <span key={t} className="rounded border border-border px-2 py-0.5 text-xs text-slate-500">{t}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="mt-px border border-border bg-muted px-7 py-5">
            <p className="text-sm text-muted-foreground">
              Showing {filtered.length} of {completedProjects.length} projects. Many client engagements are under NDA.
            </p>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
