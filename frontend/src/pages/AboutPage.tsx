import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import {
  ArrowRight,
  CheckCircle2, MapPin, Users, Briefcase, Award,
  Link2, AtSign, Camera, Phone,
  Mail, MessageCircle, Code2, Globe
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { coreValues, loadCompanyInfo, loadTeamMembers, defaultCompanyInfo, type CompanyInfoData, type TeamMemberData } from '../admin/aboutStore'
import { useServices, numberToWord } from '../hooks/useServices'
import CTABand from '../components/home/CTABand'

/* ─── static data ───────────────────────────────────────────────── */
const getMilestones = (serviceCount: number) => [
  { year: '2016', title: 'Founded',           desc: 'ManuelTECH started as a freelance software studio, building custom systems for local businesses and schools.' },
  { year: '2018', title: 'First Enterprise Client', desc: 'Delivered a full hospital management system — our first large-scale enterprise deployment across multiple departments.' },
  { year: '2020', title: 'AI Division Launched',    desc: 'Expanded into AI chatbots, automation agents, and machine learning solutions as demand for intelligent systems grew.' },
  { year: '2022', title: 'Robotics Lab Opened',     desc: 'Launched our robotics R&D lab, building smart gate systems, security robots, and autonomous patrol units.' },
  { year: '2023', title: 'Training Academy',        desc: 'Launched structured training programs for individuals, corporate teams, and institutions — taught by our own engineers.' },
  { year: '2024', title: 'Regional Expansion',      desc: `Now serving clients across 5 countries with a growing team of 20+ specialists across ${serviceCount > 0 ? numberToWord(serviceCount) : 'six'} service disciplines.` },
]

const differentiators = (serviceCount: number) => [
  `${serviceCount > 0 ? numberToWord(serviceCount, true) : 'Six'} service areas under one roof — no vendor juggling`,
  'Dedicated project teams, not rotating contractors',
  'We train your team alongside building your product',
  'Post-launch support included in every engagement',
  'Transparent, fixed-price proposals within 48 hours',
  'Proven track record across 5 countries and 50+ projects',
]

/* ─── Social link helper ────────────────────────────────────────── */
const SOCIAL: { key: keyof TeamMemberData; icon: React.ElementType; label: string }[] = [
  { key: 'email',     icon: Mail,          label: 'Email'     },
  { key: 'phone',     icon: Phone,         label: 'Phone'     },
  { key: 'whatsapp',  icon: MessageCircle, label: 'WhatsApp'  },
  { key: 'linkedin',  icon: Link2,         label: 'LinkedIn'  },
  { key: 'github',    icon: Code2,         label: 'GitHub'    },
  { key: 'twitter',   icon: AtSign,        label: 'Twitter'   },
  { key: 'instagram', icon: Camera,        label: 'Instagram' },
  { key: 'portfolio', icon: Globe,         label: 'Portfolio' },
]

function socialHref(key: keyof TeamMemberData, val: string): string {
  if (key === 'email') return `mailto:${val}`
  if (key === 'phone') return `tel:${val}`
  return val
}

/* ─── Page ──────────────────────────────────────────────────────── */
export default function AboutPage() {
  const [info, setInfo]           = useState<CompanyInfoData>(defaultCompanyInfo)
  const [members, setMembers]     = useState<TeamMemberData[]>([])
  const services                  = useServices()

  useEffect(() => {
    loadCompanyInfo().then(setInfo)
    loadTeamMembers().then(setMembers)
  }, [])

  const stats = [
    { value: info.statYears,     label: 'Years in Business', icon: Briefcase },
    { value: info.statProjects,  label: 'Projects Delivered', icon: Award },
    { value: info.statClients,   label: 'Clients Worldwide',  icon: Users },
    { value: info.statCountries, label: 'Countries Served',   icon: MapPin },
  ]

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-navy-900">
        <div className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
        <div className="pointer-events-none absolute left-0 top-0 h-full w-1 bg-primary-600" />
        <div className="container-wide relative z-10 py-24 lg:py-32">
          <div className="grid items-end gap-12 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-0.5 w-8 bg-primary-500" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-400">About {info.companyName}</span>
              </div>
              <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
                {info.tagline.split('.').map((line, i) => (
                  <span key={i}>{line.trim()}{i < info.tagline.split('.').length - 2 ? '.' : ''}<br /></span>
                ))}
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-300">{info.heroDescription}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/contact?consultation=true"
                  className="inline-flex items-center gap-2 rounded bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-700">
                  Work With Us <ArrowRight size={15} />
                </Link>
                <Link to="/services"
                  className="inline-flex items-center gap-2 rounded border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                  Our Services
                </Link>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.15 }}
              className="grid grid-cols-2 gap-px bg-white/10 border border-white/10">
              {stats.filter(s => s.value).map((s) => (
                <div key={s.label} className="flex flex-col gap-2 bg-navy-800/60 px-8 py-8">
                  <s.icon size={20} className="text-primary-400" />
                  <p className="font-display text-4xl font-bold text-white">{s.value}</p>
                  <p className="text-sm font-medium text-slate-300">{s.label}</p>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Our Story ── */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid items-start gap-16 lg:grid-cols-2">
            <motion.div initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <img src={info.storyImage || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80'}
                alt="ManuelTECH team" className="w-full object-cover shadow-lg" />
              {info.founderQuote && (
                <div className="absolute -bottom-0 left-0 right-0 border-l-4 border-primary-600 bg-navy-900 px-6 py-5">
                  <p className="font-display text-sm font-semibold leading-snug text-white">"{info.founderQuote}"</p>
                  <p className="mt-1.5 text-xs text-slate-400">— {info.founderName}</p>
                </div>
              )}
            </motion.div>

            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-0.5 w-8 bg-primary-600" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary-600">Our Story</span>
              </div>
              <h2 className="font-display text-3xl font-bold leading-tight text-navy-900 sm:text-4xl">
                Built on engineering excellence and a passion for impact
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-muted-foreground">
                {info.storyParagraph1 && <p>{info.storyParagraph1}</p>}
                {info.storyParagraph2 && <p>{info.storyParagraph2}</p>}
                {info.storyParagraph3 && <p>{info.storyParagraph3}</p>}
              </div>
              <div className="mt-8 grid grid-cols-2 gap-px bg-border border border-border sm:grid-cols-3">
                {services.map((s) => {
                  const IconComp = (Icons as any)[s.icon] || Icons.Code2
                  const border = s.detail.borderAccent || 'border-l-primary-600'
                  return (
                    <div key={s.slug} className={`flex items-center gap-2.5 border-l-4 bg-white px-4 py-3.5 ${border}`}>
                      <IconComp size={15} className="shrink-0 text-navy-700" />
                      <span className="text-xs font-semibold text-navy-900">{s.title}</span>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <section className="section-padding bg-muted">
        <div className="container-wide">
          <div className="grid gap-px bg-border border border-border lg:grid-cols-2">
            <div className="bg-white p-10 lg:p-14">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-0.5 w-8 bg-primary-600" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary-600">Our Mission</span>
              </div>
              <h2 className="font-display text-2xl font-bold leading-tight text-navy-900 sm:text-3xl">
                {info.mission || 'Empower every organization with technology that actually works.'}
              </h2>
            </div>
            <div className="bg-navy-900 p-10 lg:p-14">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-0.5 w-8 bg-primary-400" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary-400">Our Vision</span>
              </div>
              <h2 className="font-display text-2xl font-bold leading-tight text-white sm:text-3xl">
                {info.vision || 'The most trusted technology partner for digital transformation.'}
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline ── */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="mb-12 flex items-center gap-3">
            <span className="h-0.5 w-8 bg-primary-600" />
            <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary-600">Our Journey</span>
          </div>
          <div className="grid gap-0 border border-border lg:grid-cols-3">
            {getMilestones(services.length).map((m, i) => (
              <motion.div key={m.year}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                className="relative border-b border-r border-border bg-white p-8 last:border-b-0 lg:border-b-0 lg:[&:nth-child(3n)]:border-r-0">
                <div className="mb-4 flex items-center gap-3">
                  <span className="font-display text-4xl font-bold text-primary-600">{m.year}</span>
                  <span className="h-px flex-1 bg-border" />
                </div>
                <h3 className="font-display text-lg font-bold text-navy-900">{m.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="section-padding bg-muted">
        <div className="container-wide">
          <div className="grid items-start gap-16 lg:grid-cols-3">
            <div className="lg:sticky lg:top-28">
              <div className="mb-4 flex items-center gap-3">
                <span className="h-0.5 w-8 bg-primary-600" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary-600">Our Values</span>
              </div>
              <h2 className="font-display text-3xl font-bold leading-tight text-navy-900 sm:text-4xl">
                The principles that guide every decision.
              </h2>
              <p className="mt-4 text-base leading-relaxed text-muted-foreground">
                These aren't aspirational statements on a wall. They're the standards we hold ourselves to on every project, with every client, every day.
              </p>
            </div>
            <div className="space-y-0 border border-border bg-white lg:col-span-2">
              {coreValues.map((value, i) => (
                <motion.div key={value.title}
                  initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                  className="flex items-start gap-5 border-b border-border p-7 last:border-0">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-primary-600 font-display text-sm font-bold text-white">
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-navy-900">{value.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Why ManuelTECH ── */}
      <section className="section-padding bg-navy-900">
        <div className="container-wide">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-0.5 w-8 bg-primary-500" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary-400">Why Choose Us</span>
              </div>
              <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
                What makes {info.companyName} different.
              </h2>
              <ul className="mt-8 space-y-0 border border-white/10">
                {differentiators(services.length).map((point, i) => (
                  <motion.li key={point}
                    initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                    className="flex items-start gap-4 border-b border-white/10 px-6 py-4 last:border-0">
                    <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-primary-400" />
                    <span className="text-sm leading-relaxed text-slate-200">{point}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
            <motion.div initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="relative">
              <img src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&q=80"
                alt="ManuelTECH team at work" className="w-full object-cover shadow-2xl" />
              <div className="absolute bottom-0 left-0 right-0 grid grid-cols-3 divide-x divide-white/20 bg-navy-950/90 backdrop-blur-sm">
                {[{ v: '50+', l: 'Projects' }, { v: '98%', l: 'Satisfaction' }, { v: '48h', l: 'Quote Time' }].map((s) => (
                  <div key={s.l} className="px-5 py-4 text-center">
                    <p className="font-display text-2xl font-bold text-white">{s.v}</p>
                    <p className="text-xs text-slate-400">{s.l}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Team ── */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-0.5 w-8 bg-primary-600" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary-600">Our Team</span>
              </div>
              <h2 className="font-display text-3xl font-bold leading-tight text-navy-900 sm:text-4xl">
                The people behind the work.
              </h2>
              <p className="mt-3 max-w-xl text-base text-muted-foreground">
                A multidisciplinary team of engineers, designers, AI specialists, roboticists, and educators.
              </p>
            </div>
            <Link to="/contact"
              className="shrink-0 inline-flex items-center gap-2 rounded border border-navy-900/20 px-5 py-2.5 text-sm font-semibold text-navy-900 transition hover:bg-navy-900 hover:text-white">
              Work With Us <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid gap-px bg-border border border-border sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member, i) => {
              const activeLinks = SOCIAL.filter(({ key }) => member[key])
              return (
                <motion.div key={member.id}
                  initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="group bg-white">
                  <div className="overflow-hidden">
                    {member.image ? (
                      <img src={member.image} alt={member.name}
                        className="aspect-[4/3] w-full object-cover object-top grayscale transition duration-500 group-hover:grayscale-0" />
                    ) : (
                      <div className="aspect-[4/3] w-full bg-slate-100 flex items-center justify-center">
                        <Users size={32} className="text-slate-300" />
                      </div>
                    )}
                  </div>
                  <div className="border-t border-border p-6">
                    <h3 className="font-display text-lg font-bold text-navy-900">{member.name}</h3>
                    <p className="mt-0.5 text-sm font-semibold text-primary-600">{member.role}</p>
                    {member.bio && (
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
                    )}
                    {/* Social links */}
                    {activeLinks.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
                        {activeLinks.map(({ key, icon: Icon, label }) => {
                          const val = member[key] as string
                          return (
                            <a key={key}
                              href={socialHref(key, val)}
                              target={key === 'email' || key === 'phone' ? undefined : '_blank'}
                              rel="noreferrer"
                              title={label}
                              className="flex items-center justify-center rounded-lg border border-slate-200 p-2 text-slate-400 transition hover:border-primary-400 hover:text-primary-600"
                            >
                              <Icon size={15} />
                            </a>
                          )
                        })}
                      </div>
                    )}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Hiring strip */}
          <div className="mt-px flex flex-col items-center justify-between gap-4 border border-border bg-muted px-8 py-6 sm:flex-row">
            <div>
              <p className="font-display font-bold text-navy-900">We're growing.</p>
              <p className="text-sm text-muted-foreground">{info.hiringText || "Talented engineers, designers, and educators — we'd love to hear from you."}</p>
            </div>
            <a href={`mailto:${info.hiringEmail || 'careers@manueltech.com'}`}
              className="shrink-0 inline-flex items-center gap-2 rounded bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-800">
              View Open Roles <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ── Industries ── */}
      <section className="border-y border-border bg-muted py-14">
        <div className="container-wide">
          <p className="mb-8 text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">Industries We've Served</p>
          <div className="grid grid-cols-2 gap-px bg-border border border-border sm:grid-cols-4 lg:grid-cols-8">
            {['Education','Healthcare','Manufacturing','Retail','Enterprise','Smart Homes','Finance','Logistics'].map((ind) => (
              <div key={ind} className="bg-white px-4 py-5 text-center">
                <span className="text-xs font-semibold text-slate-600">{ind}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
