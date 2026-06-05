import { useState, useEffect } from 'react'
import { Save, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react'
import { loadCompanyInfo, saveCompanyInfo, defaultCompanyInfo, type CompanyInfoData } from '../aboutStore'

export default function AboutInfoPage() {
  const [form, setForm]         = useState<CompanyInfoData>(defaultCompanyInfo)
  const [loading, setLoading]   = useState(true)
  const [saving, setSaving]     = useState(false)
  const [saved, setSaved]       = useState(false)
  const [error, setError]       = useState<string | null>(null)

  useEffect(() => {
    loadCompanyInfo()
      .then(setForm)
      .finally(() => setLoading(false))
  }, [])

  const set = (field: keyof CompanyInfoData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSave = async () => {
    setSaving(true)
    setSaved(false)
    setError(null)
    try {
      await saveCompanyInfo(form)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const inputClass = 'w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20'
  const taClass    = `${inputClass} resize-none`

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-3 py-24 text-slate-400">
        <Loader2 size={22} className="animate-spin" />
        <span className="text-sm">Loading company info…</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Company Info</h1>
          <p className="mt-1 text-sm text-slate-500">Edit the content shown on the public About page.</p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:opacity-60"
        >
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
          Save Changes
        </button>
      </div>

      {saved && (
        <div className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <CheckCircle2 size={16} className="shrink-0" /> Changes saved successfully.
        </div>
      )}
      {error && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          <AlertCircle size={16} className="mt-0.5 shrink-0" /> {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-2">

        {/* ── Hero ── */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">Hero Section</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Company Name</label>
              <input type="text" value={form.companyName} onChange={set('companyName')} className={inputClass} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Tagline</label>
              <input type="text" value={form.tagline} onChange={set('tagline')} className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Hero Description</label>
              <textarea rows={3} value={form.heroDescription} onChange={set('heroDescription')} className={taClass} />
            </div>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">Stats</h3>
          <div className="grid grid-cols-2 gap-4">
            {([
              ['statYears',     'Years in Business'],
              ['statProjects',  'Projects Delivered'],
              ['statClients',   'Clients Worldwide'],
              ['statCountries', 'Countries Served'],
            ] as [keyof CompanyInfoData, string][]).map(([field, label]) => (
              <div key={field}>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</label>
                <input type="text" value={form[field] as string} onChange={set(field)} placeholder="e.g. 50+" className={inputClass} />
              </div>
            ))}
          </div>
        </div>

        {/* ── Mission & Vision ── */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">Mission & Vision</h3>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Mission Statement</label>
              <textarea rows={3} value={form.mission} onChange={set('mission')} className={taClass} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Vision Statement</label>
              <textarea rows={3} value={form.vision} onChange={set('vision')} className={taClass} />
            </div>
          </div>
        </div>

        {/* ── Our Story ── */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">Our Story</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Story Image URL</label>
              <input type="url" value={form.storyImage} onChange={set('storyImage')} placeholder="https://images.unsplash.com/..." className={inputClass} />
              {form.storyImage && (
                <img src={form.storyImage} alt="preview" className="mt-2 h-32 w-full rounded-lg object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
              )}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Founder Quote</label>
              <textarea rows={2} value={form.founderQuote} onChange={set('founderQuote')} className={taClass} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Quote Attribution</label>
              <input type="text" value={form.founderName} onChange={set('founderName')} placeholder="e.g. Manuel, Founder & CEO" className={inputClass} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Story Paragraph 1</label>
              <textarea rows={4} value={form.storyParagraph1} onChange={set('storyParagraph1')} className={taClass} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Story Paragraph 2</label>
              <textarea rows={4} value={form.storyParagraph2} onChange={set('storyParagraph2')} className={taClass} />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Story Paragraph 3</label>
              <textarea rows={4} value={form.storyParagraph3} onChange={set('storyParagraph3')} className={taClass} />
            </div>
          </div>
        </div>

        {/* ── Hiring ── */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">Hiring Strip</h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Careers Email</label>
              <input type="email" value={form.hiringEmail} onChange={set('hiringEmail')} placeholder="careers@manueltech.com" className={inputClass} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Hiring Message</label>
              <input type="text" value={form.hiringText} onChange={set('hiringText')} className={inputClass} />
            </div>
          </div>
        </div>

        {/* ── Contact Details ── */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">Contact Details</h3>
          <p className="mb-4 text-xs text-slate-400">These appear on the Contact page and in the footer.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Contact Email</label>
              <input type="email" value={form.contactEmail} onChange={set('contactEmail')} placeholder="hello@manueltech.com" className={inputClass} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Phone Number</label>
              <input type="tel" value={form.contactPhone} onChange={set('contactPhone')} placeholder="+233 XX XXX XXXX" className={inputClass} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">WhatsApp Link</label>
              <input type="url" value={form.contactWhatsapp} onChange={set('contactWhatsapp')} placeholder="https://wa.me/233..." className={inputClass} />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Business Hours</label>
              <input type="text" value={form.businessHours} onChange={set('businessHours')} placeholder="Mon – Fri, 9:00 AM – 6:00 PM" className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Office Location</label>
              <input type="text" value={form.contactLocation} onChange={set('contactLocation')} placeholder="123 Tech Street, Accra, Ghana" className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Google Maps Embed URL</label>
              <p className="mb-1.5 text-xs text-slate-400">
                Go to Google Maps → Share → Embed a map → copy the <code className="rounded bg-slate-100 px-1">src</code> URL from the iframe code.
              </p>
              <input type="url" value={form.contactMapEmbed} onChange={set('contactMapEmbed')} placeholder="https://www.google.com/maps/embed?pb=..." className={inputClass} />
              {form.contactMapEmbed && (
                <div className="mt-2 overflow-hidden rounded-lg border border-slate-200">
                  <iframe src={form.contactMapEmbed} width="100%" height="180" style={{ border: 0 }} loading="lazy" title="Map preview" />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Social Media ── */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">Social Media</h3>
          <p className="mb-4 text-xs text-slate-400">Full URLs to your social profiles. Leave blank to hide from the footer.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            {([
              ['socialLinkedin',  'LinkedIn',  'https://linkedin.com/company/manueltech'],
              ['socialTwitter',   'Twitter / X', 'https://twitter.com/manueltech'],
              ['socialInstagram', 'Instagram', 'https://instagram.com/manueltech'],
              ['socialFacebook',  'Facebook',  'https://facebook.com/manueltech'],
              ['socialYoutube',   'YouTube',   'https://youtube.com/@manueltech'],
              ['socialGithub',    'GitHub',    'https://github.com/manueltech'],
            ] as [keyof CompanyInfoData, string, string][]).map(([field, label, placeholder]) => (
              <div key={field}>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">{label}</label>
                <input type="url" value={form[field] as string} onChange={set(field)} placeholder={placeholder} className={inputClass} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom save */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:opacity-60"
        >
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
          Save All Changes
        </button>
      </div>
    </div>
  )
}
