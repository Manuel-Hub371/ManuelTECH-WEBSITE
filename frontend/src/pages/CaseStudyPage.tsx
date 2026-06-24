import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, CheckCircle2, Building2, Layers, Loader2 } from 'lucide-react'
import type { CaseStudy } from '../data/products'
import { loadCaseStudies } from '../admin/caseStudyStore'
import CTABand from '../components/home/CTABand'
import { useServices, buildCategoryColorMap, buildBorderAccentMap } from '../hooks/useServices'

export default function CaseStudyPage() {
  const { id }   = useParams<{ id: string }>()
  const navigate = useNavigate()
  const services = useServices()
  const categoryColors = buildCategoryColorMap(services)
  // Build accentBg from accentColor of each service
  const accentBg: Record<string, string> = Object.fromEntries(
    services.map((s) => [s.title, s.detail.accentColor || 'bg-primary-600'])
  )

  const [study, setStudy]   = useState<CaseStudy | null>(null)
  const [related, setRelated] = useState<CaseStudy[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCaseStudies().then((all) => {
      const found = all.find((s) => s.id === id)
      if (!found) { navigate('/portfolio#case-studies', { replace: true }); return }
      setStudy(found)
      setRelated(all.filter((s) => s.id !== id).slice(0, 3))
    }).finally(() => setLoading(false))
  }, [id, navigate])

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center gap-3 text-slate-400">
        <Loader2 size={22} className="animate-spin" />
        <span className="text-sm">Loading case study…</span>
      </div>
    )
  }

  if (!study) return null

  const accent   = accentBg[study.category]   ?? 'bg-primary-600'
  const catColor = categoryColors[study.category] ?? 'bg-muted text-slate-600 border-l-border'

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-navy-900">
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div className={`absolute left-0 top-0 h-full w-1 ${accent}`} />

        <div className="container-wide py-24 lg:py-32">
          <Link to="/portfolio#case-studies" className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white">
            <ArrowLeft size={15} /> Back to Case Studies
          </Link>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className={`rounded px-2.5 py-1 text-xs font-bold ${catColor.split(' ').slice(0, 2).join(' ')}`}>
                  {study.category}
                </span>
                <span className="rounded border border-white/15 px-2.5 py-1 text-xs font-medium text-slate-300">
                  {study.industry}
                </span>
              </div>
              <h1 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl">
                {study.title}
              </h1>
              <div className="mt-3 flex items-center gap-2 text-slate-400">
                <Building2 size={15} />
                <span className="text-sm font-medium">Client: {study.client}</span>
              </div>
              <p className="mt-5 text-lg leading-relaxed text-slate-300">{study.description}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              {study.image && (
                <>
                  <img src={study.image} alt={study.title} className="w-full object-cover shadow-2xl" />
                  <div className={`h-1 w-full ${accent}`} />
                </>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Full case study ── */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid gap-16 lg:grid-cols-3">
            {/* Main content */}
            <div className="space-y-12 lg:col-span-2">
              {/* Challenge */}
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span className={`h-0.5 w-8 ${accent}`} />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">The Challenge</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-navy-900">What was the problem?</h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">{study.challenge}</p>
              </div>

              {/* Solution */}
              <div>
                <div className="mb-4 flex items-center gap-3">
                  <span className={`h-0.5 w-8 ${accent}`} />
                  <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">Our Solution</span>
                </div>
                <h2 className="font-display text-2xl font-bold text-navy-900">How we solved it.</h2>
                <p className="mt-4 text-base leading-relaxed text-muted-foreground">{study.solution}</p>
              </div>

              {/* Results */}
              {study.results.length > 0 && (
                <div>
                  <div className="mb-4 flex items-center gap-3">
                    <span className={`h-0.5 w-8 ${accent}`} />
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-muted-foreground">The Results</span>
                  </div>
                  <h2 className="font-display text-2xl font-bold text-navy-900">Measurable outcomes.</h2>
                  <div className="mt-6 grid gap-px bg-border border border-border sm:grid-cols-2">
                    {study.results.map((result, i) => (
                      <motion.div
                        key={result}
                        initial={{ opacity: 0, y: 8 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.07 }}
                        className="flex items-start gap-3 bg-white p-6"
                      >
                        <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-600" />
                        <span className="text-base font-semibold text-emerald-800">{result}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Project details */}
              <div className="border border-border">
                <div className="border-b border-border bg-muted px-5 py-3">
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Project Details</p>
                </div>
                <div className="divide-y divide-border">
                  <div className="px-5 py-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Client</p>
                    <p className="mt-1 text-sm font-semibold text-navy-900">{study.client}</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Industry</p>
                    <p className="mt-1 text-sm font-semibold text-navy-900">{study.industry}</p>
                  </div>
                  <div className="px-5 py-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Service</p>
                    <p className="mt-1 text-sm font-semibold text-navy-900">{study.category}</p>
                  </div>
                </div>
              </div>

              {/* Tech stack */}
              {study.techStack.length > 0 && (
                <div className="border border-border">
                  <div className={`flex items-center gap-2 px-5 py-3 ${accent}`}>
                    <Layers size={14} className="text-white" />
                    <p className="text-xs font-bold uppercase tracking-widest text-white">Tech Stack</p>
                  </div>
                  <div className="flex flex-wrap gap-2 p-5">
                    {study.techStack.map((t) => (
                      <span key={t} className="rounded border border-border bg-muted px-3 py-1.5 text-xs font-semibold text-navy-900">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className={`p-6 text-white ${accent}`}>
                <p className="font-display font-bold">Want similar results?</p>
                <p className="mt-2 text-sm opacity-90">
                  Book a free consultation and let's discuss your project.
                </p>
                <Link
                  to="/contact?consultation=true"
                  className="mt-4 inline-flex items-center gap-2 rounded border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/20"
                >
                  Start a Project <ArrowRight size={14} />
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* ── More case studies ── */}
      {related.length > 0 && (
        <section className="section-padding bg-muted">
          <div className="container-wide">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-navy-900">More Case Studies</h2>
              <Link to="/portfolio#case-studies" className="text-sm font-semibold text-primary-600 hover:underline">
                View all →
              </Link>
            </div>
            <div className="grid gap-px bg-border border border-border sm:grid-cols-3">
              {related.map((s) => (
                <Link
                  key={s.id}
                  to={`/portfolio/case-study/${s.id}`}
                  className="group flex flex-col bg-white transition hover:bg-muted"
                >
                  <div className="overflow-hidden">
                    {s.image && (
                      <img src={s.image} alt={s.title} className="aspect-video w-full object-cover grayscale transition duration-500 group-hover:grayscale-0 group-hover:scale-105" />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className={`self-start rounded px-2 py-0.5 text-xs font-bold ${(categoryColors[s.category] ?? 'bg-muted text-slate-600').split(' ').slice(0, 2).join(' ')}`}>
                      {s.category}
                    </span>
                    <h3 className="mt-2 font-display font-bold text-navy-900 line-clamp-2">{s.title}</h3>
                    <p className="mt-1 text-xs text-muted-foreground">Client: {s.client}</p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-primary-600 opacity-0 transition group-hover:opacity-100">
                      Read More <ArrowRight size={11} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand />
    </>
  )
}
