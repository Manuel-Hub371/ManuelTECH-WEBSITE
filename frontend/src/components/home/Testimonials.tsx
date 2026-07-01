import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { useServices, numberToWord } from '../../hooks/useServices'

const testimonials = [
  {
    quote: 'ManuelTECH delivered our school management system on time and under budget. Attendance tracking alone saved our admin team 20 hours per week.',
    name: 'Dr. James Okello',
    role: 'Principal, Greenfield Academy',
    service: 'Software Development',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&q=80',
  },
  {
    quote: 'Their AI agent handles 70% of our customer inquiries automatically. Response times dropped from hours to seconds, and satisfaction scores went up significantly.',
    name: 'Amina Hassan',
    role: 'Operations Director, RetailPlus',
    service: 'AI & Automation',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80',
  },
  {
    quote: 'The new website converts visitors into leads at twice the rate of our old one. Professional, fast, and exactly what we needed.',
    name: 'Kwame Asante',
    role: 'CEO, Asante Ventures',
    service: 'Web Development',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80',
  },
  {
    quote: 'The smart gate system transformed our facility security. Professional team, clean documentation, and excellent post-launch support.',
    name: 'Robert Mensah',
    role: 'Facilities Manager, Apex Industries',
    service: 'Robotics',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80',
  },
  {
    quote: 'Our new brand identity completely changed how clients perceive us. The pitch deck designs helped us secure our Series A funding.',
    name: 'Fatima Diallo',
    role: 'Product Manager, FinEdge',
    service: 'Creative Services',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&q=80',
  },
  {
    quote: 'We enrolled 15 staff in their web development training. Within 3 months, our team was building internal tools independently.',
    name: 'Emmanuel Boateng',
    role: 'IT Director, Horizon Group',
    service: 'Training & Education',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80',
  },
]

export default function Testimonials() {
  const services = useServices()
  return (
    <section className="section-padding bg-muted">
      <div className="container-wide">
        <SectionHeading
          eyebrow="Client Stories"
          title="Trusted by leaders across industries"
          description={services.length > 0
            ? `Real results from real clients — across all ${numberToWord(services.length)} of our service areas.`
            : "Real results from real clients — across all of our service areas."}
        />

        <div className="mt-12 grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((item, i) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="flex flex-col bg-white p-8"
            >
              {/* Large opening quote mark */}
              <span className="font-display text-5xl font-bold leading-none text-primary-100 select-none">"</span>

              <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600">
                {item.quote}
              </p>

              <div className="mt-6 flex items-center justify-between border-t border-border pt-5">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-10 w-10 rounded-full object-cover grayscale"
                  />
                  <div>
                    <p className="text-sm font-bold text-navy-900">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.role}</p>
                  </div>
                </div>
                <span className="rounded border border-border px-2.5 py-1 text-xs font-medium text-slate-500">
                  {item.service}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
