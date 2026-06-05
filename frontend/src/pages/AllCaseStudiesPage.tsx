import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, CheckCircle2, Loader2 } from 'lucide-react'
import type { CaseStudy } from '../data/products'
import { loadCaseStudies } from '../admin/caseStudyStore'
import CTABand from '../components/home/CTABand'

const categoryColors: Record<string, string> = {
  'Web Development':      'bg-sky-50 text-sky-700',
  'Software Development': 'bg-primary-50 text-primary-700',
  'AI & Automation':      'bg-violet-50 text-violet-700',
  'Creative Services':    'bg-rose-50 text-rose-700',
  'Robotics':             'bg-amber-50 text-amber-700',
  'Training & Education': 'bg-emerald-50 text-emerald-700',
}

const accentLeft: Record<string, string> = {
  'Web Development':      'border-l-sky-500',
  'Software Development': 'border-l-primary-600',
  'AI & Automation':      'border-l-violet-600',
  'Creative Services':    'border-l-rose-500',
  'Robotics':             'border-l-amber-500',
  'Training & Education': 'border-l-emerald-500',
}

export default function AllCaseStudiesPage() {
  const [studies, setStudies] = useState<CaseStudy[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCaseStudies()
      .then(setStudies)
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-navy-900">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div className="absolute left-0 top-0 h-full w-1 bg-primary-600" />
        <div className="container-wide py-24 lg:py-32">
          <Link
            to="/portfolio"
            className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={15} /> Back to Portfolio
          </Link>
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-0.5 w-8 bg-primary-500" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-400">Case Studies</span>
            </div>
            <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              Real problems.<br />Real results.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-300">
              A full look at how ManuelTECH has helped organizations across industries solve their
              most pressing technology challenges — with measurable outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* ── Case studies list ── */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          {loading ? (
            <div className="flex items-center justify-center gap-3 py-24 text-slate-400">
              <Loader2 size={22} className="animate-spin" />
              <span className="text-sm">Loading case studies…</span>
            </div>
          ) : studies.length === 0 ? (
            <div className="py-24 text-center">
              <p className="text-slate-500">No case studies published yet. Check back soon.</p>
            </div>
          ) : (
            <div className="space-y-px">
              {studies.map((study, i) => (
                <motion.article
                  key={study.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className={`group grid border border-border bg-white transition hover:bg-muted lg:grid-cols-5 border-l-4 ${accentLeft[study.category] ?? 'border-l-primary-600'}`}
                >
                  {/* Image */}
                  <div className="overflow-hidden lg:col-span-2">
                    {study.image ? (
                      <img
                        src={study.image}
                        alt={study.title}
                        className="aspect-video w-full object-cover grayscale transition duration-500 group-hover:grayscale-0 group-hover:scale-105 lg:aspect-auto lg:h-full"
                      />
                    ) : (
                      <div className="aspect-video w-full bg-slate-100 lg:aspect-auto lg:h-full" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex flex-col p-8 lg:col-span-3 lg:p-10">
                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`rounded px-2.5 py-1 text-xs font-semibold ${categoryColors[study.category] ?? 'bg-muted text-slate-600'}`}>
                        {study.category}
                      </span>
                      <span className="rounded border border-border px-2.5 py-1 text-xs font-medium text-slate-500">
                        {study.industry}
                      </span>
                    </div>

                    {/* Title */}
                    <h2 className="mt-3 font-display text-2xl font-bold text-navy-900 sm:text-3xl">
                      {study.title}
                    </h2>
                    <p className="mt-0.5 text-sm font-medium text-muted-foreground">
                      Client: {study.client}
                    </p>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                      {study.description}
                    </p>

                    {/* Challenge + Results */}
                    <div className="mt-5 grid gap-4 border-t border-border pt-5 sm:grid-cols-2">
                      <div>
                        <p className="mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">Challenge</p>
                        <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
                          {study.challenge}
                        </p>
                      </div>
                      <div>
                        <p className="mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">Results</p>
                        <div className="space-y-1.5">
                          {study.results.slice(0, 3).map((r) => (
                            <div key={r} className="flex items-start gap-2">
                              <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-emerald-600" />
                              <span className="text-xs font-medium text-emerald-800">{r}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Tech stack + CTA */}
                    <div className="mt-5 border-t border-border pt-5">
                      <div className="flex flex-wrap gap-1.5">
                        {study.techStack.slice(0, 4).map((t) => (
                          <span key={t} className="rounded border border-border bg-muted px-2 py-0.5 text-xs font-medium text-slate-500">
                            {t}
                          </span>
                        ))}
                      </div>
                      <div className="mt-4">
                        <Link
                          to={`/portfolio/case-study/${study.id}`}
                          className="inline-flex items-center gap-2 rounded bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-800"
                        >
                          Read Full Case Study <ArrowRight size={14} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          )}
        </div>
      </section>

      <CTABand />
    </>
  )
}
