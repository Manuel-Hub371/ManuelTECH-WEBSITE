import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { ArrowRight, CheckCircle2, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useServices } from '../hooks/useServices'
import { loadCompanyInfo, defaultCompanyInfo, type CompanyInfoData } from '../admin/aboutStore'
import type { ServiceCategory } from '../data/services'
import CTABand from '../components/home/CTABand'
const getIcon = (iconName: string) => {
  return (Icons as any)[iconName] || Icons.Code2
}

const getLightBg = (bgClass: string) => {
  if (!bgClass) return 'bg-slate-50'
  return bgClass.replace('600', '50').replace('500', '50')
}

/* ─── Sticky side nav ───────────────────────────────────────────── */
function SideNav({ active, serviceCategories }: { active: string; serviceCategories: ServiceCategory[] }) {
  return (
    <nav className="hidden w-56 shrink-0 lg:block">
      <div className="sticky top-28 space-y-0.5">
        <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Services</p>
        {serviceCategories.map((cat) => {
          const Icon = getIcon(cat.icon)
          const isActive = active === cat.id
          const textAccent = cat.detail.textAccent || 'text-primary-600'
          const borderAccent = cat.detail.borderAccent || 'border-l-primary-600'
          return (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className={`flex items-center gap-2.5 border-l-2 px-4 py-2.5 text-sm font-medium transition ${isActive
                  ? `${borderAccent} ${textAccent} bg-muted`
                  : 'border-transparent text-slate-500 hover:border-border hover:text-navy-900'
                }`}
            >
              <Icon size={15} className="shrink-0" />
              {cat.title}
            </a>
          )
        })}
        <div className="pt-4">
          <Link
            to="/contact?consultation=true"
            className="flex items-center gap-2 rounded bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700"
          >
            Get a Quote <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </nav>
  )
}

/* ─── Mobile top nav ────────────────────────────────────────────── */
function MobileNav({ serviceCategories }: { serviceCategories: ServiceCategory[] }) {
  return (
    <div className="sticky top-[57px] z-30 border-b border-border bg-white shadow-sm lg:hidden">
      <div className="container-wide">
        <div className="flex gap-0 overflow-x-auto">
          {serviceCategories.map((cat) => {
            const Icon = getIcon(cat.icon)
            return (
              <a
                key={cat.id}
                href={`#${cat.id}`}
                className="flex shrink-0 items-center gap-1.5 border-b-2 border-transparent px-4 py-3.5 text-xs font-semibold text-slate-500 transition hover:border-primary-600 hover:text-navy-900"
              >
                <Icon size={13} />
                {cat.title.split(' ')[0]}
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}

/* ─── Individual service section ────────────────────────────────── */
function ServiceSection({ category, index, info }: { category: ServiceCategory; index: number; info: CompanyInfoData }) {
  const IconComponent = ((Icons as any)[category.icon] || Icons.Code2) as React.ComponentType<{ size?: number; className?: string }>
  const accent = {
    border: category.detail.borderAccent || 'border-l-primary-600',
    bg: category.detail.accentColor || 'bg-primary-600',
    text: category.detail.textAccent || 'text-primary-600',
    light: getLightBg(category.detail.accentColor),
  }
  const sectionOutcomes = category.detail.outcomes ?? []
  const isEven = index % 2 === 0

  return (
    <motion.section
      id={category.id}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      className="scroll-mt-28 border-b border-border pb-20 last:border-0"
    >
      {/* Section header */}
      <div className={`flex items-start gap-4 border-l-4 pl-6 ${accent.border}`}>
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center ${accent.light} ${accent.text}`}>
          <IconComponent size={24} />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            Service {String(index + 1).padStart(2, '0')}
          </p>
          <h2 className="font-display text-2xl font-bold text-navy-900 sm:text-3xl">{category.title}</h2>
        </div>
      </div>

      {/* Two-column body */}
      <div className={`mt-10 grid gap-12 lg:grid-cols-5 ${isEven ? '' : 'lg:flex-row-reverse'}`}>

        {/* Left — description + outcomes */}
        <div className="lg:col-span-2">
          <p className="text-base leading-relaxed text-muted-foreground">{category.description}</p>

          <div className="mt-8">
            <p className="mb-4 text-xs font-bold uppercase tracking-widest text-navy-900">Key Outcomes</p>
            <ul className="space-y-3">
              {sectionOutcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-3">
                  <CheckCircle2 size={16} className={`mt-0.5 shrink-0 ${accent.text}`} />
                  <span className="text-sm leading-relaxed text-slate-600">{outcome}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to={`/services/${category.slug}`}
              className={`inline-flex items-center gap-2 rounded px-5 py-2.5 text-sm font-semibold text-white transition ${accent.bg} hover:opacity-90`}
            >
              Read More <ArrowRight size={14} />
            </Link>
            <Link
              to="/contact?consultation=true"
              className="inline-flex items-center gap-2 rounded border border-border px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-navy-900 hover:text-navy-900"
            >
              Get a Quote
            </Link>
            {info.contactPhone && (
              <a
                href={`tel:${info.contactPhone.replace(/[^\d+]/g, '')}`}
                className="inline-flex items-center gap-2 rounded border border-border px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-navy-900 hover:text-navy-900"
              >
                <Phone size={14} />
                Call Us
              </a>
            )}
          </div>
        </div>

        {/* Right — service items list */}
        <div className="lg:col-span-3">
          <div className="grid gap-px bg-border border border-border sm:grid-cols-2">
            {category.items.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="group bg-white p-6 transition hover:bg-muted"
              >
                <div className="flex items-start gap-3">
                  <span className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${accent.bg}`} />
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
    </motion.section>
  )
}

/* ─── Page ──────────────────────────────────────────────────────── */
export default function ServicesPage() {
  const serviceCategories = useServices()
  const [activeSection, setActiveSection] = useState('')
  const [info, setInfo] = useState<CompanyInfoData>(defaultCompanyInfo)
  const observerRef = useRef<IntersectionObserver | null>(null)

  useEffect(() => {
    loadCompanyInfo().then(setInfo).catch(() => {})
  }, [])

  useEffect(() => {
    if (serviceCategories.length && !activeSection) {
      setActiveSection(serviceCategories[0].id)
    }
  }, [serviceCategories, activeSection])

  useEffect(() => {
    if (!serviceCategories.length) return
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id)
        })
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )
    serviceCategories.forEach((cat) => {
      const el = document.getElementById(cat.id)
      if (el) observerRef.current?.observe(el)
    })
    return () => observerRef.current?.disconnect()
  }, [serviceCategories])

  return (
    <>
      {/* ── Page hero ── */}
      <section className="relative overflow-hidden bg-navy-900">
        <div className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div className="pointer-events-none absolute left-0 top-0 h-full w-1 bg-primary-600" />

        <div className="container-wide relative z-10 py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-0.5 w-8 bg-primary-500" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-400">Our Services</span>
            </div>
            <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              {serviceCategories.length > 0 ? serviceCategories.length : 'Full-spectrum'} disciplines.<br />One accountable partner.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-300">
              From building your first website to deploying AI agents and training your team —
              ManuelTECH delivers across the full technology spectrum with a single point of contact.
            </p>

            {/* Service quick-links */}
            <div className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3">
              {serviceCategories.map((cat) => {
                const Icon = getIcon(cat.icon)
                const textAccent = cat.detail.textAccent || 'text-primary-600'
                return (
                  <a
                    key={cat.id}
                    href={`#${cat.id}`}
                    className="flex items-center gap-2.5 border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white"
                  >
                    <Icon size={15} className={textAccent.replace('600', '400')} />
                    {cat.title}
                  </a>
                )
              })}
            </div>          </div>
        </div>
      </section>

      {/* ── Mobile tab nav ── */}
      <MobileNav serviceCategories={serviceCategories} />

      {/* ── Main content: sticky side nav + sections ── */}
      <div className="bg-white">
        <div className="container-wide py-20">
          <div className="flex gap-16">
            <SideNav active={activeSection} serviceCategories={serviceCategories} />

            <div className="min-w-0 flex-1 space-y-20">
              {serviceCategories.map((cat, i) => (
              <ServiceSection key={cat.id} category={cat} index={i} info={info} />
            ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Proof strip ── */}
      <section className="border-y border-border bg-muted py-16">
        <div className="container-wide">
          <div className="grid gap-px bg-border border border-border sm:grid-cols-2 lg:grid-cols-4">
            {[
              { value: info.statProjects || '50+', label: 'Projects Delivered', sub: 'Across all service areas' },
              { value: '98%', label: 'Client Satisfaction', sub: 'Based on post-project surveys' },
              { value: '48h', label: 'Quote Turnaround', sub: 'From brief to detailed proposal' },
              { value: info.statYears ? `${info.statYears} Yrs` : '8+ Yrs', label: 'Experience', sub: `Serving clients in ${info.statCountries || '5'} countries` },
            ].map((stat) => (
              <div key={stat.label} className="bg-white px-8 py-8">
                <p className="font-display text-4xl font-bold text-navy-900">{stat.value}</p>
                <p className="mt-1 text-sm font-bold text-navy-900">{stat.label}</p>
                <p className="mt-1 text-xs text-muted-foreground">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── How we deliver ── */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid items-start gap-16 lg:grid-cols-2">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-0.5 w-8 bg-primary-600" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary-600">Our Approach</span>
              </div>
              <h2 className="font-display text-3xl font-bold text-navy-900 sm:text-4xl leading-tight">
                The same rigorous process,<br />every service, every time.
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
                Regardless of whether we're building a website, deploying an AI agent, or running a
                training program — our delivery process is consistent, transparent, and accountable.
              </p>
              <div className="mt-8">
                <Link
                  to="/contact?consultation=true"
                  className="inline-flex items-center gap-2 rounded bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-700"
                >
                  Start a Project <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            <div className="grid gap-px bg-border border border-border sm:grid-cols-2">
              {[
                { step: '01', title: 'Discovery', desc: 'We learn your goals, constraints, and success criteria through structured workshops — free for all new clients.' },
                { step: '02', title: 'Strategy & Design', desc: 'Solution architecture, wireframes, and a clear project roadmap with milestones and defined deliverables.' },
                { step: '03', title: 'Build & Test', desc: 'Agile sprints with regular demos, rigorous QA, and your feedback incorporated at every stage.' },
                { step: '04', title: 'Launch & Support', desc: 'Deployment, team training, full documentation, and continuous maintenance for long-term success.' },
              ].map((item) => (
                <div key={item.step} className="bg-white p-7">
                  <span className="font-display text-5xl font-bold text-muted select-none">{item.step}</span>
                  <h3 className="mt-3 font-display text-base font-bold text-navy-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ strip ── */}
      <section className="section-padding bg-muted">
        <div className="container-wide">
          <div className="grid gap-16 lg:grid-cols-3">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-0.5 w-8 bg-primary-600" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary-600">Common Questions</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-navy-900">
                Questions about our services?
              </h2>
              <p className="mt-3 text-muted-foreground">
                Can't find what you're looking for? Reach out directly — we respond within one business day.
              </p>
              <a
                href="mailto:hello@manueltech.com"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:underline"
              >
                hello@manueltech.com <ArrowRight size={14} />
              </a>
            </div>

            <div className="space-y-0 border border-border bg-white lg:col-span-2">
              {[
                {
                  q: 'Can you handle multiple services for the same project?',
                  a: 'Yes — in fact, most of our clients engage us across two or more service areas. We coordinate everything internally so you have one point of contact.',
                },
                {
                  q: 'How long does a typical project take?',
                  a: 'It depends on scope. A corporate website takes 3–6 weeks. A custom ERP or AI system typically runs 3–6 months. We provide a detailed timeline in every proposal.',
                },
                {
                  q: 'Do you offer post-launch support?',
                  a: 'Yes. Every engagement includes a support period, and we offer ongoing maintenance retainers for clients who need continuous updates and monitoring.',
                },
                {
                  q: 'Can you train our internal team after building the system?',
                  a: 'Absolutely. Our Training & Education division runs structured handover programs so your team can operate and maintain what we build.',
                },
                {
                  q: 'How do you price your services?',
                  a: 'We price per project based on scope, not hourly. After a free discovery call, we send a fixed-price proposal within 48 hours — no surprises.',
                },
              ].map((faq, i) => (
                <details
                  key={i}
                  className="group border-b border-border last:border-0"
                >
                  <summary className="flex cursor-pointer items-center justify-between px-6 py-5 text-sm font-semibold text-navy-900 marker:content-none hover:bg-muted">
                    {faq.q}
                    <span className="ml-4 shrink-0 text-primary-600 transition group-open:rotate-45">+</span>
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

      <CTABand />
    </>
  )
}
