import { ArrowRight, Phone, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCompanyInfo } from '../../hooks/useCompanyInfo'

export default function CTABand() {
  const info = useCompanyInfo()  // null while loading — never shows static defaults

  return (
    <section className="bg-navy-900">
      <div className="container-wide">
        <div className="grid items-center gap-10 py-20 lg:grid-cols-2 lg:py-24">
          {/* Left */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="h-0.5 w-8 bg-primary-500" />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary-400">
                Ready to get started?
              </span>
            </div>
            <h2 className="font-display text-3xl font-bold text-white sm:text-4xl leading-tight">
              Let's build something<br />great together.
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Whether you need a website, a custom system, an AI agent, or want to train your team —
              book a free consultation and let's map out the path forward.
            </p>
          </div>

          {/* Right — action buttons */}
          <div className="flex flex-col gap-4 lg:items-end">
            <Link
              to="/contact?consultation=true"
              className="inline-flex items-center gap-2 rounded bg-primary-600 px-8 py-4 text-base font-semibold text-white transition hover:bg-primary-700"
            >
              Book Free Consultation <ArrowRight size={18} />
            </Link>
            <div className="flex flex-wrap gap-4">
              {info?.contactPhone && (
                <a
                  href={`tel:${info.contactPhone.replace(/[^\d+]/g, '')}`}
                  className="inline-flex items-center gap-2 rounded border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  <Phone size={16} />
                  Call Us
                </a>
              )}
              {info?.contactWhatsapp && (
                <a
                  href={info.contactWhatsapp}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded border border-emerald-500/30 bg-emerald-500/10 px-6 py-3 text-sm font-semibold text-emerald-300 transition hover:bg-emerald-500/20"
                >
                  <MessageCircle size={16} />
                  WhatsApp
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
