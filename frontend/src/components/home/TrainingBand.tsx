import { motion } from 'framer-motion'
import { GraduationCap, ArrowRight, BookOpen, Users2, Cpu } from 'lucide-react'
import { Link } from 'react-router-dom'

const programs = [
  { icon: BookOpen, title: 'Web & Software Dev',    desc: 'Full-stack bootcamps and structured courses' },
  { icon: GraduationCap, title: 'AI & Machine Learning', desc: 'Practical AI training with real projects' },
  { icon: Users2,    title: 'Corporate Upskilling', desc: 'Custom training programs for teams' },
  { icon: Cpu,       title: 'Robotics & Electronics', desc: 'Hands-on hardware and embedded systems' },
]

export default function TrainingBand() {
  return (
    <section className="bg-navy-900">
      <div className="container-wide">
        <div className="grid lg:grid-cols-2">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="border-r border-white/10 py-20 pr-0 lg:pr-16"
          >
            <div className="flex items-center gap-3 mb-5">
              <span className="h-0.5 w-8 bg-primary-500" />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary-400">Training & Education</span>
            </div>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl leading-tight">
              We don't just build technology.<br />We teach it.
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-slate-300">
              ManuelTECH runs practical, hands-on training programs for individuals, students, and
              corporate teams — taught by the same engineers who build real products.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to="/services#training"
                className="inline-flex items-center gap-2 rounded bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-700"
              >
                View Programs <ArrowRight size={16} />
              </Link>
              <Link
                to="/contact?consultation=true"
                className="inline-flex items-center gap-2 rounded border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Enroll Your Team
              </Link>
            </div>
          </motion.div>

          {/* Right — program cards */}
          <div className="grid grid-cols-2 divide-x divide-y divide-white/10 border-l border-white/10">
            {programs.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="p-8 transition hover:bg-white/5"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded bg-primary-600/20 text-primary-400">
                  <p.icon size={20} />
                </div>
                <h3 className="mt-4 font-display font-bold text-white">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
