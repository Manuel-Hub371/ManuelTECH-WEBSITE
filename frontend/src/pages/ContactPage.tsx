import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, MessageCircle, Calendar, CheckCircle, AlertCircle, Clock } from 'lucide-react'
import { submitContact, submitConsultation } from '../api/client'
import PageHeader from '../components/ui/PageHeader'
import Button from '../components/ui/Button'
import { useCompanyInfo } from '../hooks/useCompanyInfo'
import { useServices } from '../hooks/useServices'

type FormMode = 'contact' | 'consultation'

export default function ContactPage() {
  const [searchParams] = useSearchParams()
  const [mode, setMode] = useState<FormMode>('contact')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const info     = useCompanyInfo()  // null while loading — never shows static defaults
  const services = useServices()

  if (!info || services.length === 0) {
    return null
  }

  const [contactForm, setContactForm] = useState({
    name: '', email: '', phone: '', subject: '', message: '',
  })
  const [consultForm, setConsultForm] = useState({
    name: '', email: '', phone: '', company: '', serviceInterest: '', preferredDate: '', message: '',
  })

  useEffect(() => {
    if (searchParams.get('consultation') === 'true') setMode('consultation')
  }, [searchParams])

  const inputClass =
    'w-full rounded-lg border border-border bg-white px-4 py-3 text-foreground placeholder:text-slate-400 outline-none transition focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20'

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      await submitContact(contactForm)
      setStatus('success')
      setContactForm({ name: '', email: '', phone: '', subject: '', message: '' })
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Failed to send message')
    }
  }

  const handleConsultSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      await submitConsultation(consultForm)
      setStatus('success')
      setConsultForm({ name: '', email: '', phone: '', company: '', serviceInterest: '', preferredDate: '', message: '' })
    } catch (err) {
      setStatus('error')
      setErrorMsg(err instanceof Error ? err.message : 'Failed to book consultation')
    }
  }

  // Only show contact details that exist in the DB — no hardcoded fallbacks
  const contactInfo = [
    info?.contactEmail    ? { icon: Mail,          label: 'Email',          value: info.contactEmail,    href: `mailto:${info.contactEmail}` }    : null,
    info?.contactPhone    ? { icon: Phone,         label: 'Phone',          value: info.contactPhone,    href: `tel:${info.contactPhone}` }        : null,
    info?.contactWhatsapp ? { icon: MessageCircle, label: 'WhatsApp',       value: 'Chat with us',       href: info.contactWhatsapp }              : null,
    info?.businessHours   ? { icon: Clock,         label: 'Business Hours', value: info.businessHours,   href: undefined }                         : null,
    info?.contactLocation ? { icon: MapPin,        label: 'Office',         value: info.contactLocation, href: undefined }                         : null,
  ].filter(Boolean) as { icon: React.ElementType; label: string; value: string; href: string | undefined }[]

  return (
    <>
      <PageHeader
        title="Contact Us"
        description="Get in touch for project inquiries, partnerships, or schedule a free consultation with our team."
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid gap-16 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <h2 className="font-display text-2xl font-bold text-navy-900">We&apos;d love to hear from you</h2>
              <p className="mt-3 text-muted-foreground">
                Whether you have a project in mind or need expert advice, our team responds within one business day.
              </p>

              <ul className="mt-10 space-y-6">
                {contactInfo.map((item) => (
                  <li key={item.label} className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-600">
                      <item.icon size={22} />
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{item.label}</p>
                      {item.href ? (
                        <a href={item.href} className="mt-0.5 block font-medium text-navy-900 hover:text-primary-600 transition">
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-0.5 font-medium text-navy-900">{item.value}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              {info?.contactMapEmbed && (
                <div className="mt-10 overflow-hidden rounded-2xl border border-border shadow-sm">
                  <iframe
                    title="ManuelTECH office location"
                    src={info.contactMapEmbed}
                    width="100%"
                    height="240"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                  />
                </div>
              )}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:col-span-3"
            >
              <div className="mb-6 inline-flex rounded-lg border border-border bg-muted p-1">
                <button
                  type="button"
                  onClick={() => { setMode('contact'); setStatus('idle') }}
                  className={`rounded-md px-5 py-2.5 text-sm font-semibold transition ${
                    mode === 'contact' ? 'bg-white text-navy-900 shadow-sm' : 'text-muted-foreground'
                  }`}
                >
                  Send a Message
                </button>
                <button
                  type="button"
                  onClick={() => { setMode('consultation'); setStatus('idle') }}
                  className={`flex items-center gap-2 rounded-md px-5 py-2.5 text-sm font-semibold transition ${
                    mode === 'consultation' ? 'bg-white text-navy-900 shadow-sm' : 'text-muted-foreground'
                  }`}
                >
                  <Calendar size={16} />
                  Book Consultation
                </button>
              </div>

              {status === 'success' && (
                <div className="mb-6 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-emerald-800">
                  <CheckCircle size={22} />
                  <span className="text-sm font-medium">
                    {mode === 'consultation'
                      ? 'Consultation booked! We\'ll confirm your appointment shortly.'
                      : 'Message sent! Our team will respond within 24 hours.'}
                  </span>
                </div>
              )}

              {status === 'error' && (
                <div className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-800">
                  <AlertCircle size={22} />
                  <span className="text-sm">{errorMsg}</span>
                </div>
              )}

              <div className="card-elevated p-8 lg:p-10">
                {mode === 'contact' ? (
                  <form onSubmit={handleContactSubmit} className="space-y-5">
                    <h3 className="font-display text-xl font-bold text-navy-900">Contact Form</h3>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">Full Name *</label>
                        <input required className={inputClass} value={contactForm.name} onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })} />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">Email *</label>
                        <input required type="email" className={inputClass} value={contactForm.email} onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })} />
                      </div>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">Phone</label>
                        <input className={inputClass} value={contactForm.phone} onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })} />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">Subject *</label>
                        <input required className={inputClass} value={contactForm.subject} onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })} />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">Message *</label>
                      <textarea required rows={5} className={inputClass} value={contactForm.message} onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })} />
                    </div>
                    <Button type="submit" disabled={status === 'loading'} size="lg">
                      {status === 'loading' ? 'Sending...' : 'Send Message'}
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={handleConsultSubmit} className="space-y-5">
                    <h3 className="font-display text-xl font-bold text-navy-900">Book a Free Consultation</h3>
                    <p className="text-sm text-muted-foreground">No commitment required. Tell us about your project and we&apos;ll schedule a call.</p>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">Full Name *</label>
                        <input required className={inputClass} value={consultForm.name} onChange={(e) => setConsultForm({ ...consultForm, name: e.target.value })} />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">Email *</label>
                        <input required type="email" className={inputClass} value={consultForm.email} onChange={(e) => setConsultForm({ ...consultForm, email: e.target.value })} />
                      </div>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">Phone</label>
                        <input className={inputClass} value={consultForm.phone} onChange={(e) => setConsultForm({ ...consultForm, phone: e.target.value })} />
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">Company</label>
                        <input className={inputClass} value={consultForm.company} onChange={(e) => setConsultForm({ ...consultForm, company: e.target.value })} />
                      </div>
                    </div>
                    <div className="grid gap-5 sm:grid-cols-2">
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">Service Interest</label>
                        <select className={inputClass} value={consultForm.serviceInterest} onChange={(e) => setConsultForm({ ...consultForm, serviceInterest: e.target.value })}>
                          <option value="">Select a service</option>
                          {services.map((s) => (
                            <option key={s.slug} value={s.slug}>{s.title}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="mb-1.5 block text-sm font-medium text-slate-700">Preferred Date</label>
                        <input type="date" className={inputClass} value={consultForm.preferredDate} onChange={(e) => setConsultForm({ ...consultForm, preferredDate: e.target.value })} />
                      </div>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-sm font-medium text-slate-700">Project Details</label>
                      <textarea rows={4} className={inputClass} value={consultForm.message} onChange={(e) => setConsultForm({ ...consultForm, message: e.target.value })} />
                    </div>
                    <Button type="submit" disabled={status === 'loading'} size="lg">
                      {status === 'loading' ? 'Submitting...' : 'Book Free Consultation'}
                    </Button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
