import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import * as Icons from 'lucide-react'
import { ArrowRight } from 'lucide-react'
import Button from '../ui/Button'
import SectionHeading from '../ui/SectionHeading'
import { useServices } from '../../hooks/useServices'

const getIcon = (iconName: string) => (Icons as any)[iconName] || Icons.Code2

export default function AboutIntro() {
  const pillars = useServices()

  // Dynamically join service titles to make the description 100% real-time
  const servicesList = pillars.length > 0
    ? pillars.map(p => p.title).slice(0, -1).join(', ') + ', and ' + pillars[pillars.length - 1].title
    : 'Web Development, Software & App Development, AI & Automation Agents, Creative Services, Robotics, and Training & Education'

  const description = `ManuelTECH delivers ${servicesList.toLowerCase().replace('ai', 'AI')} — everything your organization needs to compete and grow in a digital-first world.`

  return (
    <section className="section-padding bg-white">
      <div className="container-wide">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Who We Are"
              title="A full-service technology company built for real outcomes"
              description={description}
            />

            {/* Service pillars */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              {pillars.map((p) => {
                const PIcon = getIcon(p.icon)
                return (
                  <div
                    key={p.slug}
                    className="flex flex-col items-center gap-2 rounded-xl border border-border bg-muted/50 px-3 py-4 text-center"
                  >
                    <PIcon size={20} className="text-primary-600" />
                    <span className="text-xs font-medium leading-tight text-navy-900">{p.title}</span>
                  </div>
                )
              })}
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                { title: 'Who we help', text: 'Schools, hospitals, enterprises, startups, and growing SMBs.' },
                { title: 'How we work', text: 'Agile delivery with dedicated project managers and engineers.' },
              ].map((item) => (
                <div key={item.title} className="rounded-xl border border-border bg-muted/50 p-5">
                  <h3 className="font-display font-semibold text-navy-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Button to="/about" variant="secondary">
                Our Story & Team
                <ArrowRight size={18} />
              </Button>
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
              alt="ManuelTECH professionals collaborating"
              className="rounded-2xl shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 hidden max-w-xs rounded-xl border border-border bg-white p-6 shadow-xl sm:block">
              <p className="font-display text-base font-bold leading-snug text-navy-900">
                &ldquo;Technology should solve real problems — not create new ones.&rdquo;
              </p>
              <p className="mt-2 text-sm text-muted-foreground">— Manuel, Founder & CEO</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
