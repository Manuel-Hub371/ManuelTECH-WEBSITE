import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, MapPin, MessageCircle, Share2, Rss, Globe, Link2, AtSign, Camera } from 'lucide-react'
import Logo from '../ui/Logo'
import { loadCompanyInfo, defaultCompanyInfo, type CompanyInfoData } from '../../admin/aboutStore'

const footerLinks = {
  company: [
    { label: 'About Us',          to: '/about' },
    { label: 'Portfolio',         to: '/portfolio' },
    { label: 'Blog',              to: '/blog' },
    { label: 'Contact',           to: '/contact' },
    { label: 'Book Consultation', to: '/contact?consultation=true' },
  ],
  services: [
    { label: 'Web Development',      to: '/services#web' },
    { label: 'Software & Apps',      to: '/services#software' },
    { label: 'AI & Automation',      to: '/services#ai' },
    { label: 'Creative Services',    to: '/services#creative' },
    { label: 'Robotics',             to: '/services#robotics' },
    { label: 'Training & Education', to: '/services#training' },
  ],
}

export default function Footer() {
  const [info, setInfo] = useState<CompanyInfoData>(defaultCompanyInfo)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    loadCompanyInfo().then(setInfo)
  }, [])

  /* Build social links from store — only show ones that have a URL */
  const socialLinks = [
    { icon: Link2,         href: info.socialLinkedin,  label: 'LinkedIn'    },
    { icon: AtSign,        href: info.socialTwitter,   label: 'Twitter / X' },
    { icon: Camera,        href: info.socialInstagram, label: 'Instagram'   },
    { icon: Share2,        href: info.socialFacebook,  label: 'Facebook'    },
    { icon: Rss,           href: info.socialYoutube,   label: 'YouTube'     },
    { icon: Globe,         href: info.socialGithub,    label: 'GitHub'      },
  ].filter((s) => s.href)

  return (
    <footer className="bg-navy-950 text-slate-400">
      {/* Main footer grid */}
      <div className="container-wide py-16">
        <div className="grid gap-12 lg:grid-cols-12">
          {/* Brand col */}
          <div className="lg:col-span-4">
            <Logo variant="light" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed">
              ManuelTECH delivers web development, custom software, AI agents, automation, robotics,
              creative design, and technology training — everything your organization needs to grow.
            </p>
            {socialLinks.length > 0 && (
              <div className="mt-6 flex gap-2">
                {socialLinks.map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={label}
                    className="flex h-9 w-9 items-center justify-center border border-white/10 text-slate-400 transition hover:border-primary-500 hover:text-white"
                  >
                    <Icon size={16} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Links */}
          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-5">
            <div>
              <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-white">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm transition hover:text-white">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="sm:col-span-2">
              <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-white">Services</h4>
              <ul className="grid grid-cols-2 gap-x-4 gap-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm transition hover:text-white">{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact + newsletter */}
          <div className="lg:col-span-3">
            <h4 className="mb-4 text-xs font-bold uppercase tracking-widest text-white">Get in Touch</h4>
            <ul className="space-y-3 text-sm">
              {info.contactEmail && (
                <li className="flex gap-3">
                  <Mail size={15} className="mt-0.5 shrink-0 text-primary-500" />
                  <a href={`mailto:${info.contactEmail}`} className="transition hover:text-white">{info.contactEmail}</a>
                </li>
              )}
              {info.contactPhone && (
                <li className="flex gap-3">
                  <Phone size={15} className="mt-0.5 shrink-0 text-primary-500" />
                  <a href={`tel:${info.contactPhone}`} className="transition hover:text-white">{info.contactPhone}</a>
                </li>
              )}
              {info.contactWhatsapp && (
                <li className="flex gap-3">
                  <MessageCircle size={15} className="mt-0.5 shrink-0 text-emerald-500" />
                  <a href={info.contactWhatsapp} target="_blank" rel="noreferrer" className="transition hover:text-white">WhatsApp Us</a>
                </li>
              )}
              {info.contactLocation && (
                <li className="flex gap-3">
                  <MapPin size={15} className="mt-0.5 shrink-0 text-primary-500" />
                  <span>{info.contactLocation}</span>
                </li>
              )}
            </ul>

            <div className="mt-8">
              <h4 className="mb-3 text-xs font-bold uppercase tracking-widest text-white">Newsletter</h4>
              {subscribed ? (
                <p className="rounded border border-emerald-700 bg-emerald-900/30 px-4 py-3 text-sm text-emerald-300">
                  ✓ You're subscribed — thanks!
                </p>
              ) : (
                <form
                  className="flex gap-0"
                  onSubmit={(e) => {
                    e.preventDefault()
                    if (email.trim()) {
                      setSubscribed(true)
                      setEmail('')
                    }
                  }}
                >
                  <input
                    type="email"
                    required
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 border border-white/10 bg-white/5 px-3 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none focus:border-primary-500"
                  />
                  <button
                    type="submit"
                    className="border border-primary-600 bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="container-wide flex flex-col items-center justify-between gap-3 py-5 sm:flex-row">
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} {info.companyName || 'ManuelTECH'}. All rights reserved.</p>
          <div className="flex gap-5 text-xs text-slate-500">
            <Link to="/privacy" className="transition hover:text-white">Privacy Policy</Link>
            <Link to="/terms" className="transition hover:text-white">Terms of Service</Link>
            <Link to="/cookies" className="transition hover:text-white">Cookie Policy</Link>
            <Link to="/disclaimer" className="transition hover:text-white">Disclaimer</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
