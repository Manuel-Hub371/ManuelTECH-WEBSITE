import { motion } from 'framer-motion'
import { Search, Lightbulb, Code2, LifeBuoy } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'

const steps = [
  {
    step: '01',
    icon: Search,
    title: 'Discovery',
    description: 'We learn your business, goals, and technical requirements through structured workshops — free for all new clients.',
  },
  {
    step: '02',
    icon: Lightbulb,
    title: 'Strategy & Design',
    description: 'Architecture, wireframes, and a clear project roadmap with milestones and defined deliverables.',
  },
  {
    step: '03',
    icon: Code2,
    title: 'Build & Test',
    description: 'Agile sprints with regular demos, rigorous QA, and your feedback incorporated at every stage.',
  },
  {
    step: '04',
    icon: LifeBuoy,
    title: 'Launch & Support',
    description: 'Deployment, team training, full documentation, and continuous maintenance for long-term success.',
  },
]

export default function Process() {
  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <SectionHeading
          eyebrow="How We Work"
          title="A proven process from idea to production"
          description="Transparent, collaborative, and focused on delivering value at every stage."
        />

        <div className="mt-14 grid gap-0 border border-border md:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09 }}
              className="relative border-r border-border p-8 last:border-r-0"
            >
              {/* Step number watermark */}
              <span className="absolute right-6 top-6 font-display text-6xl font-bold text-muted select-none">
                {item.step}
              </span>
              <div className="relative">
                <div className="flex h-11 w-11 items-center justify-center rounded bg-navy-900 text-white">
                  <item.icon size={20} />
                </div>
                <h3 className="mt-5 font-display text-lg font-bold text-navy-900">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
