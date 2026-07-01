import { Mail, Phone, MessageCircle } from 'lucide-react'
import { useCompanyInfo } from '../../hooks/useCompanyInfo'

export default function TopBar() {
  const info = useCompanyInfo()  // null while loading — never shows static defaults

  // Don't render the bar at all until company info is loaded
  if (!info) return null

  // If no contact details exist in the database, hide the bar
  if (!info.contactEmail && !info.contactPhone && !info.contactWhatsapp) return null

  return (
    <div className="hidden border-b border-white/10 bg-navy-950 lg:block">
      <div className="container-wide flex items-center justify-between py-2.5 text-xs text-slate-400">
        <p>
          ManuelTECH — all under one roof
        </p>
        <div className="flex items-center gap-6">
          {info.contactEmail && (
            <a
              href={`mailto:${info.contactEmail}`}
              className="flex items-center gap-1.5 transition hover:text-white"
            >
              <Mail size={13} />
              {info.contactEmail}
            </a>
          )}
          {info.contactPhone && (
            <a
              href={`tel:${info.contactPhone}`}
              className="flex items-center gap-1.5 transition hover:text-white"
            >
              <Phone size={13} />
              {info.contactPhone}
            </a>
          )}
          {info.contactWhatsapp && (
            <a
              href={info.contactWhatsapp}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 transition hover:text-emerald-300"
            >
              <MessageCircle size={13} />
              WhatsApp
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
