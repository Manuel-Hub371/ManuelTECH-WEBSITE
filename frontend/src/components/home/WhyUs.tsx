import { motion } from 'framer-motion'
import { ShieldCheck, Zap, Users2, LifeBuoy, Layers, GraduationCap } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading'
import { useServices } from '../../hooks/useServices'

export default function WhyUs() {
  const services = useServices()

  // Dynamically build the services list for the description to ensure real-time accuracy
  const servicesList = services.length > 0
    ? services.map(s => s.title.split(' ')[0]).slice(0, -1).join(', ') + ', and ' + services[services.length - 1].title.split(' ')[0]
    : 'web, software, AI, design, robotics, and training'

  const reasons = [
    {
      icon: Layers,
      title: 'Full-Spectrum Capability',
      description: `${servicesList} — all under one roof. No need to juggle multiple vendors.`,
    },
    {
      icon: Zap,
      title: 'Fast, Agile Delivery',
      description: 'Focused sprints with regular demos so you see progress every week, not just at the end.',
    },
    {
      icon: ShieldCheck,
      title: 'Built for the Long Term',
      description: 'Clean architecture, thorough documentation, and scalable code your team can maintain and grow.',
    },
    {
      icon: Users2,
      title: 'Dedicated Project Teams',
      description: 'A named project manager and engineers assigned to you — not a rotating pool of contractors.',
    },
    {
      icon: LifeBuoy,
      title: 'Post-Launch Support',
      description: "We don't disappear after go-live. Maintenance, updates, and support are part of every engagement.",
    },
    {
      icon: GraduationCap,
      title: 'We Also Teach',
      description: 'Beyond building, we train your team and the next generation of tech talent through structured programs.',
    },
  ]
  return (
    <section className="section-padding bg-muted">
      <div className="container-wide">
        <div className="grid items-start gap-16 lg:grid-cols-2">
          {/* Left — image + quote */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative hidden lg:block"
          >
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
              alt="ManuelTECH team collaborating"
              className="w-full rounded object-cover shadow-lg"
            />
            {/* Quote block */}
            <div className="absolute -bottom-8 left-8 right-8 border-l-4 border-primary-600 bg-white px-6 py-5 shadow-lg">
              <p className="font-display text-base font-semibold leading-snug text-navy-900">
                "Technology should solve real problems — not create new ones."
              </p>
              <p className="mt-2 text-sm text-muted-foreground">— Manuel, Founder & CEO</p>
            </div>
          </motion.div>

          {/* Right — reasons */}
          <div>
            <SectionHeading
              align="left"
              eyebrow="Why ManuelTECH"
              title="More than a vendor — a technology partner"
              description="We combine deep technical expertise with a genuine commitment to your outcomes."
            />
            <div className="mt-10 space-y-6">
              {reasons.map((item, i) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06 }}
                  className="flex gap-4 border-b border-border pb-6 last:border-0 last:pb-0"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-primary-600 text-white">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <h3 className="font-display font-bold text-navy-900">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
