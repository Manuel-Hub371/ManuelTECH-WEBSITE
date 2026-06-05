import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import * as Icons from 'lucide-react'
import {
  ArrowLeft, Save, Plus, Trash2, CheckCircle2,
  AlertCircle, Loader2, Eye,
} from 'lucide-react'
import {
  loadServices, createService, updateService,
  ACCENT_PRESETS, ICON_OPTIONS,
} from '../serviceStore'
import { fetchServices } from '../api'
import type { ServiceCategory } from '../../data/services'

type Tab = 'basic' | 'items' | 'detail' | 'process' | 'faqs'

const emptyService: ServiceCategory = {
  id: '', slug: '', title: '', icon: 'Code2', description: '',
  items: [{ name: '', description: '' }],
  detail: {
    headline: '', body: [''], whoIsItFor: [''], outcomes: [''],
    process: [{ title: '', desc: '' }],
    faqs: [{ q: '', a: '' }],
    relatedIds: [],
    image: '',
    accentColor: 'bg-primary-600',
    textAccent: 'text-primary-600',
    borderAccent: 'border-l-primary-600',
  },
}

const inputClass = 'w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20'
const taClass = `${inputClass} resize-none`
const labelClass = 'mb-1.5 block text-sm font-semibold text-slate-700'

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">{title}</h3>
      {children}
    </div>
  )
}

function StringListEditor({
  label, items, onChange, placeholder,
}: {
  label: string
  items: string[]
  onChange: (items: string[]) => void
  placeholder?: string
}) {
  const update = (i: number, v: string) => { const a = [...items]; a[i] = v; onChange(a) }
  const add    = () => onChange([...items, ''])
  const remove = (i: number) => { if (items.length > 1) onChange(items.filter((_, idx) => idx !== i)) }
  return (
    <div>
      <label className={labelClass}>{label}</label>
      <div className="space-y-2">
        {items.map((item, i) => (
          <div key={i} className="flex gap-2">
            <input type="text" value={item} placeholder={placeholder}
              onChange={(e) => update(i, e.target.value)}
              className="flex-1 rounded-lg border border-slate-200 px-4 py-2 text-sm outline-none focus:border-primary-500" />
            {items.length > 1 && (
              <button type="button" onClick={() => remove(i)}
                className="rounded p-1.5 text-slate-300 transition hover:bg-red-50 hover:text-red-500">
                <Trash2 size={14} />
              </button>
            )}
          </div>
        ))}
      </div>
      <button type="button" onClick={add}
        className="mt-2 inline-flex items-center gap-2 rounded-lg border border-dashed border-slate-300 px-4 py-2 text-sm text-slate-500 transition hover:border-primary-400 hover:text-primary-600">
        <Plus size={14} /> Add
      </button>
    </div>
  )
}

export default function ServiceEditorPage() {
  const { slug }  = useParams<{ slug: string }>()
  const navigate  = useNavigate()
  const isEdit    = Boolean(slug)

  const [form, setForm]         = useState<ServiceCategory>(emptyService)
  const [adminId, setAdminId]   = useState<string | undefined>()
  const [tab, setTab]           = useState<Tab>('basic')
  const [loading, setLoading]   = useState(isEdit)
  const [saving, setSaving]     = useState(false)
  const [saved, setSaved]       = useState(false)
  const [errors, setErrors]     = useState<Record<string, string>>({})
  const [apiError, setApiError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return
    let cancelled = false
    setLoading(true)
    Promise.all([loadServices(), fetchServices().catch(() => [])])
      .then(([cats, apiSvcs]) => {
        if (cancelled) return
        const cat = cats.find((s) => s.slug === slug)
        const api = apiSvcs.find((s) => s.slug === slug)
        if (!cat) { navigate('/admin/services', { replace: true }); return }
        setForm({
          ...cat,
          detail: {
            ...cat.detail,
            body:       cat.detail.body.length       ? cat.detail.body       : [''],
            whoIsItFor: cat.detail.whoIsItFor.length ? cat.detail.whoIsItFor : [''],
            outcomes:   cat.detail.outcomes.length   ? cat.detail.outcomes   : [''],
            process:    cat.detail.process.length    ? cat.detail.process    : [{ title: '', desc: '' }],
            faqs:       cat.detail.faqs.length       ? cat.detail.faqs       : [{ q: '', a: '' }],
          },
          items: cat.items.length ? cat.items : [{ name: '', description: '' }],
        })
        if (api) setAdminId(api.id)
      })
      .catch(() => navigate('/admin/services', { replace: true }))
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [slug, navigate])

  const setDetail = (key: keyof ServiceCategory['detail'], value: unknown) =>
    setForm((f) => ({ ...f, detail: { ...f.detail, [key]: value } }))

  const applyAccent = (preset: typeof ACCENT_PRESETS[number]) => {
    setForm((f) => ({
      ...f,
      detail: { ...f.detail, accentColor: preset.accentColor, textAccent: preset.textAccent, borderAccent: preset.borderAccent },
    }))
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.title.trim())       e.title       = 'Title is required'
    if (!form.slug.trim())        e.slug        = 'Slug is required'
    if (!form.description.trim()) e.description = 'Description is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSave = async () => {
    if (!validate()) { setTab('basic'); return }
    setSaving(true); setApiError(null)
    try {
      const cleaned: ServiceCategory = {
        ...form,
        items:  form.items.filter((i) => i.name.trim()),
        detail: {
          ...form.detail,
          body:       form.detail.body.filter(Boolean),
          whoIsItFor: form.detail.whoIsItFor.filter(Boolean),
          outcomes:   form.detail.outcomes.filter(Boolean),
          process:    form.detail.process.filter((p) => p.title.trim()),
          faqs:       form.detail.faqs.filter((f) => f.q.trim()),
        },
      }
      if (isEdit && (adminId || slug)) {
        await updateService(slug!, { ...cleaned, _adminId: adminId })
      } else {
        await createService(cleaned)
      }
      setSaved(true)
      setTimeout(() => navigate('/admin/services'), 800)
    } catch (e) {
      setApiError(e instanceof Error ? e.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return (
    <div className="flex items-center justify-center gap-3 py-24 text-slate-400">
      <Loader2 size={22} className="animate-spin" /><span className="text-sm">Loading…</span>
    </div>
  )

  const tabs: { id: Tab; label: string }[] = [
    { id: 'basic',   label: 'Basic Info' },
    { id: 'items',   label: 'Sub-Services' },
    { id: 'detail',  label: 'Detail Page' },
    { id: 'process', label: 'Process Steps' },
    { id: 'faqs',    label: 'FAQs' },
  ]

  const IconComp = (Icons as unknown as Record<string, React.ComponentType<{size?: number; className?: string}>>)[form.icon] ?? Icons.Code2

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <Link to="/admin/services" className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-900">
              {isEdit ? 'Edit Service' : 'Add Service'}
            </h1>
            <p className="mt-0.5 text-sm text-slate-500">
              {isEdit ? `Editing /${form.slug}` : 'Create a new service page'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isEdit && (
            <a href={`/services/${form.slug}`} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50">
              <Eye size={15} /> Preview
            </a>
          )}
          <button type="button" onClick={handleSave} disabled={saving || saved}
            className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:opacity-60">
            {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
            {isEdit ? 'Save Changes' : 'Create Service'}
          </button>
        </div>
      </div>

      {saved && (
        <div className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <CheckCircle2 size={16} className="shrink-0" /> Service saved. Redirecting…
        </div>
      )}
      {apiError && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          <AlertCircle size={16} className="mt-0.5 shrink-0" /> {apiError}
        </div>
      )}

      {/* Tabs */}
      <div className="flex gap-1 overflow-x-auto rounded-xl border border-slate-200 bg-slate-50 p-1">
        {tabs.map((t) => (
          <button key={t.id} type="button" onClick={() => setTab(t.id)}
            className={`shrink-0 rounded-lg px-4 py-2 text-sm font-semibold transition ${
              tab === t.id ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'
            }`}>
            {t.label}
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">

          {/* ── BASIC TAB ── */}
          {tab === 'basic' && (
            <SectionCard title="Basic Information">
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Title <span className="text-red-500">*</span></label>
                    <input type="text" value={form.title} placeholder="e.g. Web Development"
                      onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                      className={`${inputClass} ${errors.title ? 'border-red-400 bg-red-50' : ''}`} />
                    {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
                  </div>
                  <div>
                    <label className={labelClass}>URL Slug <span className="text-red-500">*</span></label>
                    <input type="text" value={form.slug} placeholder="e.g. web-development"
                      onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') }))}
                      className={`${inputClass} ${errors.slug ? 'border-red-400 bg-red-50' : ''}`} />
                    {errors.slug && <p className="mt-1 text-xs text-red-600">{errors.slug}</p>}
                    {form.slug && <p className="mt-1 text-xs text-slate-400">/services/{form.slug}</p>}
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Short Description <span className="text-red-500">*</span></label>
                  <textarea rows={2} value={form.description} placeholder="One sentence shown on the services list page."
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    className={`${taClass} ${errors.description ? 'border-red-400 bg-red-50' : ''}`} />
                  {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
                </div>
                <div>
                  <label className={labelClass}>Detail Page Headline</label>
                  <input type="text" value={form.detail.headline} placeholder="Bold statement shown at the top of the detail page."
                    onChange={(e) => setDetail('headline', e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className={labelClass}>Cover Image URL</label>
                  <input type="url" value={form.detail.image} placeholder="https://images.unsplash.com/..."
                    onChange={(e) => setDetail('image', e.target.value)} className={inputClass} />
                  {form.detail.image && (
                    <img src={form.detail.image} alt="preview"
                      className="mt-2 h-32 w-full rounded-lg object-cover"
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
                  )}
                </div>
                <div>
                  <label className={labelClass}>Icon</label>
                  <div className="flex flex-wrap gap-2">
                    {ICON_OPTIONS.map((name) => {
                      const IC = (Icons as unknown as Record<string, React.ComponentType<{size?: number; className?: string}>>)[name] ?? Icons.Code2
                      return (
                        <button key={name} type="button" onClick={() => setForm((f) => ({ ...f, icon: name }))}
                          title={name}
                          className={`flex h-10 w-10 items-center justify-center rounded-lg border transition ${
                            form.icon === name ? `${form.detail.accentColor} border-transparent text-white` : 'border-slate-200 text-slate-500 hover:border-primary-400'
                          }`}>
                          <IC size={18} />
                        </button>
                      )
                    })}
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Accent Colour</label>
                  <div className="flex flex-wrap gap-2">
                    {ACCENT_PRESETS.map((p) => (
                      <button key={p.label} type="button" onClick={() => applyAccent(p)}
                        className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-xs font-semibold transition ${
                          form.detail.accentColor === p.accentColor ? 'border-slate-400 ring-2 ring-slate-300' : 'border-slate-200 hover:border-slate-400'
                        }`}>
                        <span className={`h-4 w-4 rounded-full ${p.accentColor}`} />
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </SectionCard>
          )}

          {/* ── ITEMS TAB ── */}
          {tab === 'items' && (
            <SectionCard title="Sub-Services / What's Included">
              <p className="mb-4 text-xs text-slate-400">These appear as the grid of service items on the detail page.</p>
              <div className="space-y-3">
                {form.items.map((item, i) => (
                  <div key={i} className="grid gap-3 rounded-lg border border-slate-200 p-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-slate-600">Item Name</label>
                      <input type="text" value={item.name} placeholder="e.g. E-Commerce Platforms"
                        onChange={(e) => { const a = [...form.items]; a[i] = { ...a[i], name: e.target.value }; setForm((f) => ({ ...f, items: a })) }}
                        className={inputClass} />
                    </div>
                    <div>
                      <label className="mb-1 block text-xs font-semibold text-slate-600">Description</label>
                      <div className="flex gap-2">
                        <input type="text" value={item.description} placeholder="Short description"
                          onChange={(e) => { const a = [...form.items]; a[i] = { ...a[i], description: e.target.value }; setForm((f) => ({ ...f, items: a })) }}
                          className={inputClass} />
                        {form.items.length > 1 && (
                          <button type="button" onClick={() => setForm((f) => ({ ...f, items: f.items.filter((_, idx) => idx !== i) }))}
                            className="rounded p-2 text-slate-300 transition hover:bg-red-50 hover:text-red-500">
                            <Trash2 size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button type="button"
                onClick={() => setForm((f) => ({ ...f, items: [...f.items, { name: '', description: '' }] }))}
                className="mt-3 inline-flex items-center gap-2 rounded-lg border border-dashed border-slate-300 px-4 py-2 text-sm text-slate-500 transition hover:border-primary-400 hover:text-primary-600">
                <Plus size={14} /> Add Item
              </button>
            </SectionCard>
          )}

          {/* ── DETAIL TAB ── */}
          {tab === 'detail' && (
            <div className="space-y-6">
              <SectionCard title="Body Paragraphs">
                <p className="mb-4 text-xs text-slate-400">These paragraphs appear in the "Overview" section of the detail page.</p>
                <StringListEditor label="" items={form.detail.body}
                  onChange={(v) => setDetail('body', v)}
                  placeholder="Paragraph text…" />
              </SectionCard>
              <SectionCard title="Who Is It For">
                <StringListEditor label="" items={form.detail.whoIsItFor}
                  onChange={(v) => setDetail('whoIsItFor', v)}
                  placeholder="e.g. Businesses that need a professional online presence" />
              </SectionCard>
              <SectionCard title="Key Outcomes">
                <StringListEditor label="" items={form.detail.outcomes}
                  onChange={(v) => setDetail('outcomes', v)}
                  placeholder="e.g. Faster page loads & better SEO rankings" />
              </SectionCard>
            </div>
          )}

          {/* ── PROCESS TAB ── */}
          {tab === 'process' && (
            <SectionCard title="Process Steps">
              <p className="mb-4 text-xs text-slate-400">Shown in the "How We Deliver It" section. Typically 4–5 steps.</p>
              <div className="space-y-3">
                {form.detail.process.map((step, i) => (
                  <div key={i} className="rounded-lg border border-slate-200 p-4">
                    <div className="flex items-center justify-between gap-3 mb-3">
                      <span className="font-display text-sm font-bold text-slate-400">Step {String(i + 1).padStart(2, '0')}</span>
                      {form.detail.process.length > 1 && (
                        <button type="button"
                          onClick={() => setDetail('process', form.detail.process.filter((_, idx) => idx !== i))}
                          className="rounded p-1 text-slate-300 transition hover:text-red-500">
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-slate-600">Step Title</label>
                        <input type="text" value={step.title} placeholder="e.g. Discovery & Brief"
                          onChange={(e) => { const a = [...form.detail.process]; a[i] = { ...a[i], title: e.target.value }; setDetail('process', a) }}
                          className={inputClass} />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-slate-600">Description</label>
                        <input type="text" value={step.desc} placeholder="What happens in this step"
                          onChange={(e) => { const a = [...form.detail.process]; a[i] = { ...a[i], desc: e.target.value }; setDetail('process', a) }}
                          className={inputClass} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button type="button"
                onClick={() => setDetail('process', [...form.detail.process, { title: '', desc: '' }])}
                className="mt-3 inline-flex items-center gap-2 rounded-lg border border-dashed border-slate-300 px-4 py-2 text-sm text-slate-500 transition hover:border-primary-400 hover:text-primary-600">
                <Plus size={14} /> Add Step
              </button>
            </SectionCard>
          )}

          {/* ── FAQS TAB ── */}
          {tab === 'faqs' && (
            <SectionCard title="Frequently Asked Questions">
              <div className="space-y-4">
                {form.detail.faqs.map((faq, i) => (
                  <div key={i} className="rounded-lg border border-slate-200 p-4">
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <span className="text-xs font-bold text-slate-400">FAQ {i + 1}</span>
                      {form.detail.faqs.length > 1 && (
                        <button type="button"
                          onClick={() => setDetail('faqs', form.detail.faqs.filter((_, idx) => idx !== i))}
                          className="rounded p-1 text-slate-300 transition hover:text-red-500">
                          <Trash2 size={13} />
                        </button>
                      )}
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-slate-600">Question</label>
                        <input type="text" value={faq.q} placeholder="e.g. How long does a website take to build?"
                          onChange={(e) => { const a = [...form.detail.faqs]; a[i] = { ...a[i], q: e.target.value }; setDetail('faqs', a) }}
                          className={inputClass} />
                      </div>
                      <div>
                        <label className="mb-1 block text-xs font-semibold text-slate-600">Answer</label>
                        <textarea rows={3} value={faq.a} placeholder="Detailed answer…"
                          onChange={(e) => { const a = [...form.detail.faqs]; a[i] = { ...a[i], a: e.target.value }; setDetail('faqs', a) }}
                          className={taClass} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button type="button"
                onClick={() => setDetail('faqs', [...form.detail.faqs, { q: '', a: '' }])}
                className="mt-3 inline-flex items-center gap-2 rounded-lg border border-dashed border-slate-300 px-4 py-2 text-sm text-slate-500 transition hover:border-primary-400 hover:text-primary-600">
                <Plus size={14} /> Add FAQ
              </button>
            </SectionCard>
          )}
        </div>

        {/* ── Sidebar ── */}
        <div className="space-y-6">
          {/* Live preview card */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">Preview</p>
            <div className={`flex items-center gap-3 border-l-4 pl-4 ${form.detail.borderAccent}`}>
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center text-white ${form.detail.accentColor}`}>
                <IconComp size={18} />
              </div>
              <div>
                <p className={`text-xs font-bold uppercase tracking-wider ${form.detail.textAccent}`}>{form.title || 'Service Title'}</p>
                <p className="mt-0.5 text-xs text-slate-500 line-clamp-2">{form.description || 'Short description…'}</p>
              </div>
            </div>
          </div>

          {/* Errors */}
          {Object.keys(errors).length > 0 && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-red-700">
                <AlertCircle size={15} /> Fix the following:
              </div>
              <ul className="mt-2 space-y-1">
                {Object.values(errors).map((e) => (
                  <li key={e} className="text-xs text-red-600">• {e}</li>
                ))}
              </ul>
            </div>
          )}

          <button type="button" onClick={handleSave} disabled={saving || saved}
            className="w-full rounded-lg bg-primary-600 py-3 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:opacity-60">
            {saving
              ? <span className="flex items-center justify-center gap-2"><Loader2 size={15} className="animate-spin" /> Saving…</span>
              : isEdit ? 'Save Changes' : 'Create Service'
            }
          </button>
        </div>
      </div>
    </div>
  )
}
