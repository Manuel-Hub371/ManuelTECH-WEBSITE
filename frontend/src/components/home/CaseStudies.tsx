import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { portfolioProjects } from '../../data/portfolio'
import SectionHeading from '../ui/SectionHeading'

const categoryColors: Record<string, string> = {
  'Web Development':      'bg-sky-50 text-sky-700',
  'Software Development': 'bg-primary-50 text-primary-700',
  'AI & Automation':      'bg-violet-50 text-violet-700',
  'Creative Services':    'bg-rose-50 text-rose-700',
  'Robotics':             'bg-amber-50 text-amber-700',
  'Training & Education': 'bg-emerald-50 text-emerald-700',
}

export default function CaseStudies() {
  const featured = portfolioProjects.slice(0, 3)

  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            align="left"
            eyebrow="Case Studies"
            title="Real projects. Measurable results."
            description="A sample of what we've delivered across our six service areas."
          />
          <Link
            to="/portfolio#case-studies"
            className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:underline"
          >
            View all projects <ArrowRight size={15} />
          </Link>
        </div>

        <div className="mt-12 grid gap-px bg-border lg:grid-cols-3">
          {featured.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.09 }}
              className="group flex flex-col bg-white"
            >
              <div className="overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="aspect-[16/9] w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-7">
                <span className={`inline-block self-start rounded px-2.5 py-1 text-xs font-semibold ${categoryColors[project.category] ?? 'bg-muted text-slate-600'}`}>
                  {project.category}
                </span>
                <h3 className="mt-3 font-display text-xl font-bold text-navy-900">{project.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {project.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {project.techStack.slice(0, 3).map((tech) => (
                    <span key={tech} className="rounded border border-border px-2 py-0.5 text-xs text-slate-500">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-4 border-t border-border pt-4">
                  <p className="text-sm font-medium text-emerald-700">{project.results}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
