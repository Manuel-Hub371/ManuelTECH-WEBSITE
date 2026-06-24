import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { ArrowRight, ArrowLeft, CheckCircle2, Users, Layers, Loader2 } from 'lucide-react'
import type { ServiceCategory } from '../data/services'
import { useServices } from '../hooks/useServices'
import CTABand from '../components/home/CTABand'

export default function ServiceDetailPage() {
  const { slug }   = useParams<{ slug: string }>()
  const navigate   = useNavigate()
  const cats       = useServices()
  const [service, setService]   = useState<ServiceCategory | null>(null)
  const [related, setRelated]   = useState<ServiceCategory[]>([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    if (cats.length > 0) {
      const found = cats.find((s) => s.slug === slug)
      if (!found) { navigate('/services', { replace: true }); return }
      setService(found)
      setRelated(cats.filter((s) => found.detail.relatedIds.some(rid => s.slug.includes(rid) || s.id.includes(rid))).slice(0, 3))
      setLoading(false)
    }
  }, [slug, navigate, cats])

  if (loading) return (
    <div className="flex min-h-[60vh] items-center justify-center gap-3 text-slate-400">
      <Loader2 size={22} className="animate-spin" /><span className="text-sm">Loading…</span>
    </div>
  )
  if (!service) return null

  const { detail } = service
  const IconComponent = ((Icons as any)[service.icon] || Icons.Code2) as React.ComponentType<{ size?: number; className?: string }>

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-navy-900">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div className={`pointer-events-none absolute left-0 top-0 h-full w-1 ${detail.accentColor}`} />

        <div className="container-wide relative z-10 py-24 lg:py-32">
          {/* Back */}
          <Link
            to="/services"
            className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={15} /> All Services
          </Link>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="mb-5 flex items-center gap-3">
                <div className={`flex h-12 w-12 items-center justify-center ${detail.accentColor}`}>
                  <IconComponent size={24} className="text-white" />
                </div>
                <div>
                  <p className={`text-xs font-bold uppercase tracking-[0.2em] ${detail.textAccent.replace('600', '400')}`}>
                    ManuelTECH Service
                  </p>
                  <h1 className="font-display text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
                    {service.title}
                  </h1>
                </div>
              </div>

              <p className="mt-4 text-xl font-semibold leading-snug text-slate-200">
                {detail.headline}
              </p>
              <p className="mt-4 text-base leading-relaxed text-slate-400">{service.description}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  to="/contact?consultation=true"
                  className={`inline-flex items-center gap-2 rounded px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 ${detail.accentColor}`}
                >
                  Get a Free Quote <ArrowRight size={15} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Talk to an Expert
                </Link>
              </div>
            </motion.div>

            {/* Right — image */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <img
                src={detail.image}
                alt={service.title}
                className="w-full object-cover shadow-2xl"
              />
              <div className={`h-1 w-full ${detail.accentColor}`} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── About this service ── */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid gap-16 lg:grid-cols-3">
            {/* Body text */}
            <div className="lg:col-span-2">
              <div className="mb-5 flex items-center gap-3">
                <span className={`h-0.5 w-8 ${detail.accentColor}`} />
                <span className={`text-xs font-bold uppercase tracking-[0.18em] ${detail.textAccent}`}>
                  Overview
                </span>
              </div>
              <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
                {detail.body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* What's included */}
              <div className="mt-12">
                <div className="mb-5 flex items-center gap-3">
                  <span className={`h-0.5 w-8 ${detail.accentColor}`} />
                  <span className={`text-xs font-bold uppercase tracking-[0.18em] ${detail.textAccent}`}>
                    What's Included
                  </span>
                </div>
                <div className="grid gap-px bg-border border border-border sm:grid-cols-2">
                  {service.items.map((item, i) => (
                    <motion.div
                      key={item.name}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 }}
                      className="bg-white p-6 transition hover:bg-muted"
                    >
                      <div className="flex items-start gap-3">
                        <span className={`mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full ${detail.accentColor}`} />
                        <div>
                          <h3 className="font-display text-sm font-bold text-navy-900">{item.name}</h3>
                          {item.description && (
                            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.description}</p>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Who is it for */}
              <div className="border border-border">
                <div className={`flex items-center gap-2 px-5 py-3 ${detail.accentColor}`}>
                  <Users size={15} className="text-white" />
                  <p className="text-xs font-bold uppercase tracking-widest text-white">Who Is This For?</p>
                </div>
                <ul className="divide-y divide-border">
                  {detail.whoIsItFor.map((item) => (
                    <li key={item} className="flex items-start gap-3 px-5 py-3.5">
                      <CheckCircle2 size={14} className={`mt-0.5 shrink-0 ${detail.textAccent}`} />
                      <span className="text-sm text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quick CTA */}
              <div className={`p-6 text-white ${detail.accentColor}`}>
                <p className="font-display font-bold">Ready to get started?</p>
                <p className="mt-2 text-sm opacity-90">
                  Book a free consultation — no commitment, just clarity on how we can help.
                </p>
                <Link
                  to="/contact?consultation=true"
                  className="mt-4 inline-flex items-center gap-2 rounded border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/20"
                >
                  Book Free Consultation <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Key Outcomes ── */}
      <section className="section-padding bg-muted">
        <div className="container-wide">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className={`h-0.5 w-8 ${detail.accentColor}`} />
                <span className={`text-xs font-bold uppercase tracking-[0.18em] ${detail.textAccent}`}>
                  Key Outcomes
                </span>
              </div>
              <h2 className="font-display text-3xl font-bold leading-tight text-navy-900 sm:text-4xl">
                What you get when you work with us.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                These are the concrete results our clients see — not promises, but outcomes we've
                delivered repeatedly across similar engagements.
              </p>
            </div>
            <div className="grid gap-px bg-border border border-border sm:grid-cols-2">
              {detail.outcomes.map((outcome, i) => (
                <motion.div
                  key={outcome}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-3 bg-white p-6"
                >
                  <CheckCircle2 size={16} className={`mt-0.5 shrink-0 ${detail.textAccent}`} />
                  <span className="text-sm font-medium leading-relaxed text-navy-900">{outcome}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Our Process ── */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="mb-10 flex items-center gap-3">
            <span className={`h-0.5 w-8 ${detail.accentColor}`} />
            <span className={`text-xs font-bold uppercase tracking-[0.18em] ${detail.textAccent}`}>
              How We Deliver It
            </span>
          </div>
          <h2 className="mb-10 font-display text-3xl font-bold leading-tight text-navy-900 sm:text-4xl">
            Our process for {service.title.toLowerCase()}.
          </h2>

          <div className="grid gap-px bg-border border border-border sm:grid-cols-2 lg:grid-cols-5">
            {detail.process.map((step, i) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="relative bg-white p-7"
              >
                <span className="font-display text-5xl font-bold text-muted select-none">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="mt-3 font-display font-bold text-navy-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section-padding bg-muted">
        <div className="container-wide">
          <div className="grid gap-16 lg:grid-cols-3">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className={`h-0.5 w-8 ${detail.accentColor}`} />
                <span className={`text-xs font-bold uppercase tracking-[0.18em] ${detail.textAccent}`}>FAQ</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-navy-900">
                Common questions about {service.title.toLowerCase()}.
              </h2>
              <p className="mt-3 text-sm text-muted-foreground">
                Still have questions? We're happy to answer them directly.
              </p>
              <a
                href="mailto:hello@manueltech.com"
                className={`mt-5 inline-flex items-center gap-2 text-sm font-semibold hover:underline ${detail.textAccent}`}
              >
                hello@manueltech.com <ArrowRight size={14} />
              </a>
            </div>

            <div className="border border-border bg-white lg:col-span-2">
              {detail.faqs.map((faq, i) => (
                <details key={i} className="group border-b border-border last:border-0">
                  <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-sm font-semibold text-navy-900 marker:content-none hover:bg-muted">
                    {faq.q}
                    <span className={`ml-4 shrink-0 transition group-open:rotate-45 ${detail.textAccent}`}>+</span>
                  </summary>
                  <p className="border-t border-border bg-muted/50 px-6 py-4 text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Related Services ── */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Layers size={16} className="text-muted-foreground" />
              <h2 className="font-display text-xl font-bold text-navy-900">Related Services</h2>
            </div>
            <Link to="/services" className="text-sm font-semibold text-primary-600 hover:underline">
              All services →
            </Link>
          </div>

          <div className="grid gap-px bg-border border border-border sm:grid-cols-3">
            {related.map((rel) => {
              const RelIcon = ((Icons as any)[rel.icon] || Icons.Code2) as React.ComponentType<{ size?: number; className?: string }>
              return (
                <Link
                  key={rel.id}
                  to={`/services/${rel.slug}`}
                  className={`group flex flex-col border-l-4 bg-white p-7 transition hover:bg-muted ${rel.detail.borderAccent}`}
                >
                  <div className={`flex h-10 w-10 items-center justify-center ${rel.detail.accentColor}`}>
                    <RelIcon size={18} className="text-white" />
                  </div>
                  <h3 className="mt-4 font-display font-bold text-navy-900">{rel.title}</h3>
                  <p className="mt-1.5 flex-1 text-sm text-muted-foreground">{rel.description}</p>
                  <span className={`mt-4 inline-flex items-center gap-1 text-xs font-semibold opacity-0 transition group-hover:opacity-100 ${rel.detail.textAccent}`}>
                    Learn more <ArrowRight size={12} />
                  </span>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
