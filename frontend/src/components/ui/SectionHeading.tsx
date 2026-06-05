import { motion } from 'framer-motion'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  light?: boolean
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'center',
  light = false,
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
      className={align === 'center' ? 'mx-auto max-w-3xl text-center' : 'max-w-2xl'}
    >
      {eyebrow && (
        <div className={`mb-4 flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''}`}>
          <span className="accent-line" />
          <span className={`eyebrow ${light ? '!text-primary-400' : ''}`}>{eyebrow}</span>
        </div>
      )}
      <h2
        className={`font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-[2.6rem] ${
          light ? 'text-white' : 'text-navy-900'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            light ? 'text-slate-300' : 'text-muted-foreground'
          }`}
        >
          {description}
        </p>
      )}
    </motion.div>
  )
}
