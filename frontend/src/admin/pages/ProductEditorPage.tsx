import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft, Save, Plus, Trash2, Eye,
  CheckCircle2, AlertCircle, Loader2,
} from 'lucide-react'
import { loadProducts, createProduct, updateProduct, accentFromCategory } from '../productStore'
import type { Product } from '../../data/products'

const CATEGORIES: Product['category'][] = ['AI', 'Software', 'Fintech', 'Developer Tools']
const STATUSES: Product['status'][]     = ['Live', 'Beta', 'In Development']

const emptyProduct: Omit<Product, 'id'> = {
  name:            '',
  tagline:         '',
  category:        'Software',
  status:          'In Development',
  description:     '',
  longDescription: '',
  features:        [''],
  techStack:       [''],
  image:           '',
  accentColor:     'bg-primary-600',
  textAccent:      'text-primary-600',
  borderAccent:    'border-l-primary-600',
  tryUrl:          '',
  downloadUrl:     '',
  readMoreUrl:     '',
  learnMoreUrl:    '',
  showInPortfolio: true,
}

export default function ProductEditorPage() {
  const { id }   = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEdit   = Boolean(id)

  const [form, setForm]       = useState<Omit<Product, 'id'>>(emptyProduct)
  const [errors, setErrors]   = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving]   = useState(false)
  const [saved, setSaved]     = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  /* Load existing product when editing */
  useEffect(() => {
    if (!id) return
    let cancelled = false
    setLoading(true)
    loadProducts()
      .then((products) => {
        if (cancelled) return
        const product = products.find((p) => p.id === id)
        if (!product) { navigate('/admin/products', { replace: true }); return }
        const { id: _id, ...rest } = product
        setForm(rest)
      })
      .catch(() => navigate('/admin/products', { replace: true }))
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [id, navigate])

  /* Auto-update accent colors when category changes */
  const handleCategoryChange = (cat: Product['category']) => {
    const accent = accentFromCategory(cat)
    setForm((f) => ({ ...f, category: cat, ...accent }))
  }

  /* Feature helpers */
  const updateFeature = (i: number, val: string) => {
    const features = [...form.features]; features[i] = val
    setForm((f) => ({ ...f, features }))
  }
  const addFeature    = () => setForm((f) => ({ ...f, features: [...f.features, ''] }))
  const removeFeature = (i: number) => {
    if (form.features.length <= 1) return
    setForm((f) => ({ ...f, features: f.features.filter((_, idx) => idx !== i) }))
  }

  /* Tech stack helpers */
  const updateTech = (i: number, val: string) => {
    const techStack = [...form.techStack]; techStack[i] = val
    setForm((f) => ({ ...f, techStack }))
  }
  const addTech    = () => setForm((f) => ({ ...f, techStack: [...f.techStack, ''] }))
  const removeTech = (i: number) => {
    if (form.techStack.length <= 1) return
    setForm((f) => ({ ...f, techStack: f.techStack.filter((_, idx) => idx !== i) }))
  }

  /* Validation */
  const validate = (): boolean => {
    const e: Record<string, string> = {}
    if (!form.name.trim())        e.name        = 'Product name is required'
    if (!form.tagline.trim())     e.tagline     = 'Tagline is required'
    if (!form.description.trim()) e.description = 'Short description is required'
    if (!form.image.trim())       e.image       = 'Cover image URL is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  /* Save */
  const handleSave = async () => {
    if (!validate()) return
    setSaving(true)
    setApiError(null)

    const cleanedForm = {
      ...form,
      features:    form.features.filter((f) => f.trim()),
      techStack:   form.techStack.filter((t) => t.trim()),
      learnMoreUrl: form.readMoreUrl, // keep in sync
    }

    try {
      if (isEdit && id) {
        await updateProduct(id, cleanedForm)
      } else {
        // id will be assigned by the backend; pass a placeholder
        await createProduct({ id: '', ...cleanedForm })
      }
      setSaved(true)
      setTimeout(() => navigate('/admin/products'), 800)
    } catch (e) {
      setApiError(e instanceof Error ? e.message : 'Failed to save product')
    } finally {
      setSaving(false)
    }
  }

  const inputClass = (field?: string) =>
    `w-full rounded-lg border ${errors[field ?? ''] ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'} px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20`

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-3 py-24 text-slate-400">
        <Loader2 size={22} className="animate-spin" />
        <span className="text-sm">Loading product…</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <Link to="/admin/products" className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-900">
              {isEdit ? 'Edit Product' : 'Add New Product'}
            </h1>
            <p className="mt-0.5 text-sm text-slate-500">
              {isEdit ? 'Update product details and links' : 'Add a new product to the portfolio'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isEdit && form.readMoreUrl && (
            <a
              href={form.readMoreUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
            >
              <Eye size={15} /> Preview
            </a>
          )}
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || saved}
            className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:opacity-60"
          >
            {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
            {isEdit ? 'Save Changes' : 'Add Product'}
          </button>
        </div>
      </div>

      {/* Success */}
      {saved && (
        <div className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <CheckCircle2 size={16} className="shrink-0" />
          Product saved. Redirecting…
        </div>
      )}

      {/* API error */}
      {apiError && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          {apiError}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* ── Main content ── */}
        <div className="space-y-6 lg:col-span-2">

          {/* Basic info */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">Basic Information</h3>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Product Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. EDITH AI"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className={inputClass('name')}
                />
                {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Tagline <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Your intelligent AI assistant — always on, always learning."
                  value={form.tagline}
                  onChange={(e) => setForm((f) => ({ ...f, tagline: e.target.value }))}
                  className={inputClass('tagline')}
                />
                {errors.tagline && <p className="mt-1 text-xs text-red-600">{errors.tagline}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Short Description <span className="text-red-500">*</span>
                </label>
                <p className="mb-2 text-xs text-slate-400">Shown on the portfolio card. 2–3 sentences.</p>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  className={inputClass('description')}
                />
                {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Full Description
                </label>
                <p className="mb-2 text-xs text-slate-400">Shown on the product detail page. Be thorough.</p>
                <textarea
                  rows={6}
                  value={form.longDescription}
                  onChange={(e) => setForm((f) => ({ ...f, longDescription: e.target.value }))}
                  className={inputClass()}
                />
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">Key Features</h3>
            <div className="space-y-2">
              {form.features.map((feat, i) => (
                <div key={i} className="flex gap-2">
                  <span className="flex w-6 shrink-0 items-center justify-center text-xs font-bold text-slate-300">{i + 1}</span>
                  <input
                    type="text"
                    placeholder={`Feature ${i + 1}`}
                    value={feat}
                    onChange={(e) => updateFeature(i, e.target.value)}
                    className="flex-1 rounded-lg border border-slate-200 px-4 py-2 text-sm outline-none focus:border-primary-500"
                  />
                  {form.features.length > 1 && (
                    <button type="button" onClick={() => removeFeature(i)}
                      className="rounded p-1.5 text-slate-300 transition hover:bg-red-50 hover:text-red-500">
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button type="button" onClick={addFeature}
              className="mt-3 inline-flex items-center gap-2 rounded-lg border border-dashed border-slate-300 px-4 py-2 text-sm text-slate-500 transition hover:border-primary-400 hover:text-primary-600">
              <Plus size={14} /> Add feature
            </button>
          </div>

          {/* Tech stack */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">Tech Stack</h3>
            <div className="flex flex-wrap gap-2">
              {form.techStack.map((tech, i) => (
                <div key={i} className="flex items-center gap-1">
                  <input
                    type="text"
                    placeholder="e.g. React"
                    value={tech}
                    onChange={(e) => updateTech(i, e.target.value)}
                    className="w-28 rounded-lg border border-slate-200 px-3 py-1.5 text-sm outline-none focus:border-primary-500"
                  />
                  {form.techStack.length > 1 && (
                    <button type="button" onClick={() => removeTech(i)}
                      className="rounded p-1 text-slate-300 transition hover:text-red-500">
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={addTech}
                className="rounded-lg border border-dashed border-slate-300 px-3 py-1.5 text-sm text-slate-500 transition hover:border-primary-400 hover:text-primary-600">
                <Plus size={14} />
              </button>
            </div>
          </div>

          {/* Cover image */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">Cover Image</h3>
            <input
              type="url"
              placeholder="https://images.unsplash.com/photo-..."
              value={form.image}
              onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
              className={inputClass('image')}
            />
            {errors.image && <p className="mt-1 text-xs text-red-600">{errors.image}</p>}
            {form.image && (
              <img
                src={form.image}
                alt="Preview"
                className="mt-3 h-40 w-full rounded-lg object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            )}
          </div>
        </div>

        {/* ── Sidebar ── */}
        <div className="space-y-6">

          {/* Product settings */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">Product Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => handleCategoryChange(e.target.value as Product['category'])}
                  className={inputClass()}
                >
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as Product['status'] }))}
                  className={inputClass()}
                >
                  {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>

              {/* Show in portfolio toggle */}
              <div className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3">
                <div>
                  <p className="text-sm font-semibold text-slate-700">Show on Portfolio</p>
                  <p className="text-xs text-slate-400">Visible on the public portfolio page</p>
                </div>
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, showInPortfolio: !f.showInPortfolio }))}
                  className={`relative h-6 w-11 rounded-full transition-colors ${form.showInPortfolio ? 'bg-emerald-500' : 'bg-slate-200'}`}
                >
                  <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${form.showInPortfolio ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Links */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-1 text-sm font-bold uppercase tracking-wider text-slate-500">Product Links</h3>
            <p className="mb-4 text-xs text-slate-400">These links appear as buttons on the product card and detail page.</p>

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">Read More URL</label>
                <p className="mb-1.5 text-xs text-slate-400">
                  Use <code className="rounded bg-slate-100 px-1">/portfolio/{'{id}'}</code> for the internal detail page, or an external URL.
                </p>
                <input
                  type="text"
                  placeholder="/portfolio/edith-ai or https://..."
                  value={form.readMoreUrl ?? ''}
                  onChange={(e) => setForm((f) => ({ ...f, readMoreUrl: e.target.value, learnMoreUrl: e.target.value }))}
                  className={inputClass()}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">Try Product URL</label>
                <p className="mb-1.5 text-xs text-slate-400">Link to try the product online (web app, demo, etc.).</p>
                <input
                  type="url"
                  placeholder="https://app.yourproduct.com"
                  value={form.tryUrl ?? ''}
                  onChange={(e) => setForm((f) => ({ ...f, tryUrl: e.target.value }))}
                  className={inputClass()}
                />
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">Download URL</label>
                <p className="mb-1.5 text-xs text-slate-400">Link to download the product (app store, GitHub release, etc.).</p>
                <input
                  type="url"
                  placeholder="https://github.com/... or https://play.google.com/..."
                  value={form.downloadUrl ?? ''}
                  onChange={(e) => setForm((f) => ({ ...f, downloadUrl: e.target.value }))}
                  className={inputClass()}
                />
              </div>
            </div>

            {/* Link preview */}
            {(form.readMoreUrl || form.tryUrl || form.downloadUrl) && (
              <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="mb-2 text-xs font-semibold text-slate-500">Button preview on product card:</p>
                <div className="flex flex-wrap gap-2">
                  {form.readMoreUrl && (
                    <span className="rounded bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white">
                      Learn More →
                    </span>
                  )}
                  {form.tryUrl && (
                    <span className={`rounded px-3 py-1.5 text-xs font-semibold text-white ${form.accentColor}`}>
                      Try {form.name || 'Product'} ↗
                    </span>
                  )}
                  {form.downloadUrl && (
                    <span className="rounded border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700">
                      Download ↓
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Validation errors summary */}
          {Object.keys(errors).length > 0 && (
            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-red-700">
                <AlertCircle size={15} /> Please fix the following:
              </div>
              <ul className="mt-2 space-y-1">
                {Object.values(errors).map((e) => (
                  <li key={e} className="text-xs text-red-600">• {e}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Save button */}
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || saved}
            className="w-full rounded-lg bg-primary-600 py-3 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:opacity-60"
          >
            {saving
              ? <span className="flex items-center justify-center gap-2"><Loader2 size={15} className="animate-spin" /> Saving…</span>
              : isEdit ? 'Save Changes' : 'Add Product'
            }
          </button>
        </div>
      </div>
    </div>
  )
}
