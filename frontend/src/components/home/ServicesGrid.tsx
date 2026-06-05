import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Globe, Code2, Brain, Palette, Bot, GraduationCap } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'

const services = [
  {
    icon: Globe,
    title: 'Web Development',
    description: 'Corporate websites, e-commerce platforms, web applications, and APIs — built for performance and conversion.',
    href: '/services/web-development',
    accent: 'border-l-sky-500',
  },
  {
    icon: Code2,
    title: 'Software & App Development',
    description: 'ERP systems, school and hospital platforms, inventory tools, mobile apps, and custom business software.',
    href: '/services/software-development',
    accent: 'border-l-primary-500',
  },
  {
    icon: Brain,
    title: 'AI & Automation Agents',
    description: 'Intelligent agents, chatbots, workflow automation, computer vision, and predictive analytics systems.',
    href: '/services/ai-automation',
    accent: 'border-l-violet-500',
  },
  {
    icon: Palette,
    title: 'Creative Services',
    description: 'Brand identity, UI/UX design, graphic design, motion graphics, and pitch decks that make an impression.',
    href: '/services/creative-services',
    accent: 'border-l-rose-500',
  },
  {
    icon: Bot,
    title: 'Robotics',
    description: 'Security robots, service robots, smart gate systems, IoT networks, and custom hardware solutions.',
    href: '/services/robotics',
    accent: 'border-l-amber-500',
  },
  {
    icon: GraduationCap,
    title: 'Training & Education',
    description: 'Practical tech training in web dev, AI, robotics, and design — for individuals, teams, and institutions.',
    href: '/services/training-education',
    accent: 'border-l-emerald-500',
  },
]

export default function ServicesGrid() {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            align="left"
            eyebrow="What We Do"
            title="Six service areas. One trusted partner."
            description="From building your website to training your team — ManuelTECH covers the full technology spectrum."
          />
          <Link
            to="/services"
            className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:underline"
          >
            View all services <ArrowRight size={15} />
          </Link>
        </div>

        <div className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
            >
              <Link
                to={service.href}
                className={`group flex h-full flex-col border-l-4 bg-white p-8 transition hover:bg-muted ${service.accent}`}
              >
                <div className="flex h-11 w-11 items-center justify-center rounded bg-muted text-navy-800 transition group-hover:bg-primary-600 group-hover:text-white">
                  <service.icon size={22} />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-navy-900">{service.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {service.description}
                </p>
                <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 opacity-0 transition-all group-hover:opacity-100 group-hover:gap-2">
                  Learn more <ArrowRight size={14} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA strip */}
        <div className="mt-px flex flex-col items-center justify-between gap-4 border border-border bg-navy-900 px-8 py-6 sm:flex-row">
          <p className="font-display text-base font-semibold text-white">
            Not sure which service fits your needs?
            <span className="ml-2 font-normal text-slate-300">Tell us your challenge — we'll respond within 24 hours.</span>
          </p>
          <Link
            to="/contact?consultation=true"
            className="shrink-0 inline-flex items-center gap-2 rounded bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700"
          >
            Free Consultation <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  )
}
