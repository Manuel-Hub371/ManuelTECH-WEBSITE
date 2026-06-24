import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import {
  ArrowLeft, Save, Plus, Trash2, Eye,
  CheckCircle2, AlertCircle, Loader2,
} from 'lucide-react'
import {
  loadCaseStudies,
  createCaseStudy,
  updateCaseStudy,
  generateCaseStudyId,
  INDUSTRIES,
} from '../caseStudyStore'
import { loadServices } from '../serviceStore'
import type { CaseStudy } from '../../data/products'

const emptyStudy: Omit<CaseStudy, 'id'> = {
  title:       '',
  client:      '',
  category:    'Software Development',
  industry:    'Technology',
  description: '',
  challenge:   '',
  solution:    '',
  results:     [''],
  techStack:   [''],
  image:       '',
}

export default function CaseStudyEditorPage() {
  const { id }   = useParams<{ id: string }>()
  const navigate = useNavigate()
  const isEdit   = Boolean(id)
  const [categories, setCategories] = useState<string[]>([])

  useEffect(() => {
    loadServices().then((svcs) => setCategories(svcs.map((s) => s.title))).catch(() => {})
  }, [])

  const [form, setForm]         = useState<Omit<CaseStudy, 'id'>>(emptyStudy)
  const [errors, setErrors]     = useState<Record<string, string>>({})
  const [loading, setLoading]   = useState(isEdit)
  const [saving, setSaving]     = useState(false)
  const [saved, setSaved]       = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  /* Load existing study when editing */
  useEffect(() => {
    if (!id) return
    let cancelled = false
    setLoading(true)
    loadCaseStudies()
      .then((studies) => {
        if (cancelled) return
        const study = studies.find((s) => s.id === id)
        if (!study) { navigate('/admin/case-studies', { replace: true }); return }
        const { id: _id, ...rest } = study
        // Ensure at least one empty row in lists
        setForm({
          ...rest,
          results:   rest.results.length   ? rest.results   : [''],
          techStack: rest.techStack.length ? rest.techStack : [''],
        })
      })
      .catch(() => navigate('/admin/case-studies', { replace: true }))
      .finally(() => { if (!cancelled) setLoading(false) })
    return () => { cancelled = true }
  }, [id, navigate])

  /* ── List helpers ── */
  const updateItem = (field: 'results' | 'techStack', i: number, val: string) => {
    const arr = [...form[field]]; arr[i] = val
    setForm((f) => ({ ...f, [field]: arr }))
  }
  const addItem = (field: 'results' | 'techStack') =>
    setForm((f) => ({ ...f, [field]: [...f[field], ''] }))
  const removeItem = (field: 'results' | 'techStack', i: number) => {
    if (form[field].length <= 1) return
    setForm((f) => ({ ...f, [field]: f[field].filter((_, idx) => idx !== i) }))
  }

  /* ── Validation ── */
  const validate = (): boolean => {
    const e: Record<string, string> = {}
    if (!form.title.trim())       e.title       = 'Title is required'
    if (!form.client.trim())      e.client      = 'Client name is required'
    if (!form.description.trim()) e.description = 'Description is required'
    if (!form.challenge.trim())   e.challenge   = 'Challenge is required'
    if (!form.solution.trim())    e.solution    = 'Solution is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  /* ── Save ── */
  const handleSave = async () => {
    if (!validate()) return
    setSaving(true)
    setApiError(null)

    const cleaned: Omit<CaseStudy, 'id'> = {
      ...form,
      results:   form.results.filter((r) => r.trim()),
      techStack: form.techStack.filter((t) => t.trim()),
    }

    try {
      if (isEdit && id) {
        await updateCaseStudy(id, cleaned)
      } else {
        await createCaseStudy({ id: generateCaseStudyId(), ...cleaned })
      }
      setSaved(true)
      setTimeout(() => navigate('/admin/case-studies'), 800)
    } catch (e) {
      setApiError(e instanceof Error ? e.message : 'Failed to save case study')
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
        <span className="text-sm">Loading case study…</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/case-studies"
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-900">
              {isEdit ? 'Edit Case Study' : 'Add Case Study'}
            </h1>
            <p className="mt-0.5 text-sm text-slate-500">
              {isEdit ? 'Update the case study details' : 'Document a new client success story'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isEdit && (
            <a
              href={`/portfolio/case-study/${id}`}
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
            {isEdit ? 'Save Changes' : 'Add Case Study'}
          </button>
        </div>
      </div>

      {/* Success */}
      {saved && (
        <div className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <CheckCircle2 size={16} className="shrink-0" />
          Case study saved. Redirecting…
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

          {/* Overview */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">Overview</h3>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Hospital Management System"
                  value={form.title}
                  onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                  className={inputClass('title')}
                />
                {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Client Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Regional Medical Centre"
                  value={form.client}
                  onChange={(e) => setForm((f) => ({ ...f, client: e.target.value }))}
                  className={inputClass('client')}
                />
                {errors.client && <p className="mt-1 text-xs text-red-600">{errors.client}</p>}
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                  Short Description <span className="text-red-500">*</span>
                </label>
                <p className="mb-2 text-xs text-slate-400">1–2 sentences shown on the portfolio card.</p>
                <textarea
                  rows={2}
                  placeholder="Brief summary of the project and what was built."
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  className={inputClass('description')}
                />
                {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
              </div>
            </div>
          </div>

          {/* Challenge */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-1 text-sm font-bold uppercase tracking-wider text-slate-500">The Challenge</h3>
            <p className="mb-4 text-xs text-slate-400">What problem did the client face before engaging ManuelTECH?</p>
            <textarea
              rows={4}
              placeholder="Describe the client's pain points, inefficiencies, or problems that needed solving…"
              value={form.challenge}
              onChange={(e) => setForm((f) => ({ ...f, challenge: e.target.value }))}
              className={inputClass('challenge')}
            />
            {errors.challenge && <p className="mt-1 text-xs text-red-600">{errors.challenge}</p>}
          </div>

          {/* Solution */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-1 text-sm font-bold uppercase tracking-wider text-slate-500">Our Solution</h3>
            <p className="mb-4 text-xs text-slate-400">How did ManuelTECH solve it? What was built or delivered?</p>
            <textarea
              rows={5}
              placeholder="Describe the solution, approach, and what was delivered…"
              value={form.solution}
              onChange={(e) => setForm((f) => ({ ...f, solution: e.target.value }))}
              className={inputClass('solution')}
            />
            {errors.solution && <p className="mt-1 text-xs text-red-600">{errors.solution}</p>}
          </div>

          {/* Results */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-1 text-sm font-bold uppercase tracking-wider text-slate-500">Results</h3>
            <p className="mb-4 text-xs text-slate-400">Measurable outcomes. Use specific numbers where possible.</p>
            <div className="space-y-2">
              {form.results.map((result, i) => (
                <div key={i} className="flex gap-2">
                  <span className="flex w-6 shrink-0 items-center justify-center text-xs font-bold text-emerald-400">✓</span>
                  <input
                    type="text"
                    placeholder={`e.g. Patient wait times reduced by 35%`}
                    value={result}
                    onChange={(e) => updateItem('results', i, e.target.value)}
                    className="flex-1 rounded-lg border border-slate-200 px-4 py-2 text-sm outline-none focus:border-primary-500"
                  />
                  {form.results.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem('results', i)}
                      className="rounded p-1.5 text-slate-300 transition hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => addItem('results')}
              className="mt-3 inline-flex items-center gap-2 rounded-lg border border-dashed border-slate-300 px-4 py-2 text-sm text-slate-500 transition hover:border-emerald-400 hover:text-emerald-600"
            >
              <Plus size={14} /> Add result
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
                    onChange={(e) => updateItem('techStack', i, e.target.value)}
                    className="w-28 rounded-lg border border-slate-200 px-3 py-1.5 text-sm outline-none focus:border-primary-500"
                  />
                  {form.techStack.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeItem('techStack', i)}
                      className="rounded p-1 text-slate-300 transition hover:text-red-500"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addItem('techStack')}
                className="rounded-lg border border-dashed border-slate-300 px-3 py-1.5 text-sm text-slate-500 transition hover:border-primary-400 hover:text-primary-600"
              >
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
              className={inputClass()}
            />
            {form.image && (
              <img
                src={form.image}
                alt="Preview"
                className="mt-3 h-40 w-full rounded-lg object-cover grayscale"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            )}
          </div>
        </div>

        {/* ── Sidebar ── */}
        <div className="space-y-6">

          {/* Classification */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">Classification</h3>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">Service Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className={inputClass()}
                >
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">Industry</label>
                <select
                  value={form.industry}
                  onChange={(e) => setForm((f) => ({ ...f, industry: e.target.value }))}
                  className={inputClass()}
                >
                  {INDUSTRIES.map((i) => <option key={i} value={i}>{i}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* Preview card */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">Card Preview</h3>
            <div className="overflow-hidden rounded-lg border border-slate-200">
              {form.image ? (
                <img
                  src={form.image}
                  alt="preview"
                  className="aspect-video w-full object-cover grayscale"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
              ) : (
                <div className="flex aspect-video items-center justify-center bg-slate-100 text-xs text-slate-400">
                  No image
                </div>
              )}
              <div className="p-4">
                <p className="text-xs font-bold text-primary-600">{form.category || 'Category'}</p>
                <p className="mt-1 font-display font-bold text-slate-900 line-clamp-1">
                  {form.title || 'Case Study Title'}
                </p>
                <p className="mt-0.5 text-xs text-slate-500">Client: {form.client || 'Client Name'}</p>
                {form.results.filter(Boolean).length > 0 && (
                  <div className="mt-2 space-y-1">
                    {form.results.filter(Boolean).slice(0, 2).map((r) => (
                      <div key={r} className="flex items-center gap-1.5">
                        <CheckCircle2 size={11} className="shrink-0 text-emerald-600" />
                        <span className="text-xs text-emerald-800 line-clamp-1">{r}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Validation errors */}
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
              : isEdit ? 'Save Changes' : 'Add Case Study'
            }
          </button>
        </div>
      </div>
    </div>
  )
}
