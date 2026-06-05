import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { ArrowLeft, Save, Eye, Star, Plus, Trash2, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react'
import { loadPosts, createPost, updatePost, slugify } from '../blogStore'
import type { BlogPost } from '../../data/blog'

const CATEGORIES = [
  'AI & Automation',
  'Software Development',
  'Web Development',
  'Robotics',
  'Creative Services',
  'Training & Education',
]

const AUTHORS = [
  { name: 'Manuel',       role: 'Founder & CEO',          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&q=80' },
  { name: 'Sarah Chen',   role: 'AI & Automation Lead',   image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&q=80' },
  { name: 'David Okonkwo',role: 'Robotics Engineer',      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&q=80' },
  { name: 'Elena Vasquez',role: 'Creative & UI/UX Lead',  image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&q=80' },
  { name: 'James Otieno', role: 'Head of Training',       image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&q=80' },
  { name: 'Priya Nair',   role: 'Full-Stack Engineer',    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&q=80' },
]

const empty: Omit<BlogPost, 'id' | 'slug'> = {
  title:       '',
  excerpt:     '',
  body:        [''],
  category:    'AI & Automation',
  tags:        [],
  author:      'Manuel',
  authorRole:  'Founder & CEO',
  authorImage: AUTHORS[0].image,
  publishedAt: new Date().toISOString().split('T')[0],
  readTime:    '5 min read',
  image:       '',
  featured:    false,
}

function estimateReadTime(body: string[]): string {
  const words = body.join(' ').split(/\s+/).length
  const mins  = Math.max(1, Math.round(words / 200))
  return `${mins} min read`
}

export default function BlogEditorPage() {
  const { id }    = useParams<{ id: string }>()
  const navigate  = useNavigate()
  const isEdit    = Boolean(id)

  const [form, setForm]       = useState<Omit<BlogPost, 'id' | 'slug'>>(empty)
  const [tagInput, setTagInput] = useState('')
  const [status, setStatus]   = useState<'idle' | 'saved' | 'error'>('idle')
  const [errors, setErrors]   = useState<Record<string, string>>({})
  const [saving, setSaving]   = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)

  /* Load existing post when editing */
  useEffect(() => {
    if (!id) return
    loadPosts().then((posts) => {
      const post = posts.find((p) => p.id === id)
      if (!post) { navigate('/admin/blog', { replace: true }); return }
      const { id: _id, slug: _slug, ...rest } = post
      setForm(rest)
    }).catch(() => navigate('/admin/blog', { replace: true }))
  }, [id, navigate])

  /* Auto-update read time when body changes */
  useEffect(() => {
    setForm((f) => ({ ...f, readTime: estimateReadTime(f.body) }))
  }, [form.body])

  /* Sync author details when author name changes */
  const handleAuthorChange = (name: string) => {
    const found = AUTHORS.find((a) => a.name === name)
    setForm((f) => ({
      ...f,
      author:      name,
      authorRole:  found?.role  ?? f.authorRole,
      authorImage: found?.image ?? f.authorImage,
    }))
  }

  /* Body paragraph helpers */
  const updateParagraph = (i: number, val: string) => {
    const body = [...form.body]
    body[i] = val
    setForm((f) => ({ ...f, body }))
  }
  const addParagraph    = () => setForm((f) => ({ ...f, body: [...f.body, ''] }))
  const removeParagraph = (i: number) => {
    if (form.body.length <= 1) return
    setForm((f) => ({ ...f, body: f.body.filter((_, idx) => idx !== i) }))
  }

  /* Tag helpers */
  const addTag = () => {
    const t = tagInput.trim()
    if (t && !form.tags.includes(t)) {
      setForm((f) => ({ ...f, tags: [...f.tags, t] }))
    }
    setTagInput('')
  }
  const removeTag = (tag: string) =>
    setForm((f) => ({ ...f, tags: f.tags.filter((t) => t !== tag) }))

  /* Validation */
  const validate = (): boolean => {
    const e: Record<string, string> = {}
    if (!form.title.trim())   e.title   = 'Title is required'
    if (!form.excerpt.trim()) e.excerpt = 'Excerpt is required'
    if (!form.image.trim())   e.image   = 'Cover image URL is required'
    if (form.body.every((p) => !p.trim())) e.body = 'At least one paragraph is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  /* Save */
  const handleSave = async () => {
    if (!validate()) return
    setSaving(true)
    setApiError(null)
    const slug = slugify(form.title)
    try {
      if (isEdit && id) {
        await updatePost(id, { ...form, slug })
      } else {
        await createPost({ slug, ...form })
      }
      setStatus('saved')
      setTimeout(() => {
        navigate('/admin/blog')
      }, 800)
    } catch (e) {
      setApiError(e instanceof Error ? e.message : 'Failed to save article')
      setStatus('error')
    } finally {
      setSaving(false)
    }
  }

  const inputClass = (field?: string) =>
    `w-full rounded-lg border ${errors[field ?? ''] ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'} px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20`

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-3">
          <Link to="/admin/blog" className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
            <ArrowLeft size={18} />
          </Link>
          <div>
            <h1 className="font-display text-2xl font-bold text-slate-900">
              {isEdit ? 'Edit Article' : 'New Article'}
            </h1>
            <p className="mt-0.5 text-sm text-slate-500">
              {isEdit ? 'Update the article content and settings' : 'Write and publish a new blog article'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {form.title && (
            <a
              href={`/blog/${slugify(form.title)}`}
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
            disabled={saving || status === 'saved'}
            className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:opacity-60"
          >
            {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
            {isEdit ? 'Save Changes' : 'Publish Article'}
          </button>
        </div>
      </div>

      {/* Status feedback */}
      {status === 'saved' && (
        <div className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <CheckCircle2 size={16} className="shrink-0" />
          Article saved successfully. Redirecting...
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

          {/* Title */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Article Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Why Every Business Needs an AI Agent in 2025"
              value={form.title}
              onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
              className={inputClass('title')}
            />
            {errors.title && <p className="mt-1 text-xs text-red-600">{errors.title}</p>}
            {form.title && (
              <p className="mt-1.5 text-xs text-slate-400">
                Slug: <span className="font-mono text-slate-600">/blog/{slugify(form.title)}</span>
              </p>
            )}
          </div>

          {/* Excerpt */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Excerpt <span className="text-red-500">*</span>
            </label>
            <p className="mb-2 text-xs text-slate-400">
              A short summary shown on the blog listing page and in previews. Keep it under 200 characters.
            </p>
            <textarea
              rows={3}
              placeholder="A compelling one or two sentence summary of the article..."
              value={form.excerpt}
              onChange={(e) => setForm((f) => ({ ...f, excerpt: e.target.value }))}
              className={inputClass('excerpt')}
            />
            <p className="mt-1 text-right text-xs text-slate-400">{form.excerpt.length} chars</p>
            {errors.excerpt && <p className="mt-1 text-xs text-red-600">{errors.excerpt}</p>}
          </div>

          {/* Body paragraphs */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <div>
                <label className="text-sm font-semibold text-slate-700">
                  Article Body <span className="text-red-500">*</span>
                </label>
                <p className="mt-0.5 text-xs text-slate-400">
                  Each block is a paragraph. Add as many as you need.
                </p>
              </div>
              <span className="text-xs text-slate-400">{form.readTime}</span>
            </div>

            {errors.body && (
              <div className="mb-3 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                <AlertCircle size={13} /> {errors.body}
              </div>
            )}

            <div className="space-y-3">
              {form.body.map((para, i) => (
                <div key={i} className="flex gap-2">
                  <div className="flex w-6 shrink-0 items-start justify-center pt-3">
                    <span className="text-xs font-bold text-slate-300">{i + 1}</span>
                  </div>
                  <textarea
                    rows={4}
                    placeholder={`Paragraph ${i + 1}...`}
                    value={para}
                    onChange={(e) => updateParagraph(i, e.target.value)}
                    className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
                  />
                  {form.body.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeParagraph(i)}
                      className="mt-2 rounded p-1.5 text-slate-300 transition hover:bg-red-50 hover:text-red-500"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addParagraph}
              className="mt-4 inline-flex items-center gap-2 rounded-lg border border-dashed border-slate-300 px-4 py-2 text-sm text-slate-500 transition hover:border-primary-400 hover:text-primary-600"
            >
              <Plus size={14} /> Add paragraph
            </button>
          </div>

          {/* Cover image */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              Cover Image URL <span className="text-red-500">*</span>
            </label>
            <p className="mb-2 text-xs text-slate-400">
              Paste a direct image URL (e.g. from Unsplash). Recommended size: 1200×630px.
            </p>
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
                alt="Cover preview"
                className="mt-3 h-40 w-full rounded-lg object-cover"
                onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
            )}
          </div>
        </div>

        {/* ── Sidebar settings ── */}
        <div className="space-y-6">

          {/* Publish settings */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">Publish Settings</h3>

            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                  className={inputClass()}
                >
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-semibold text-slate-700">Publish Date</label>
                <input
                  type="date"
                  value={form.publishedAt}
                  onChange={(e) => setForm((f) => ({ ...f, publishedAt: e.target.value }))}
                  className={inputClass()}
                />
              </div>

              {/* Featured toggle */}
              <div className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3">
                <div className="flex items-center gap-2">
                  <Star size={16} className={form.featured ? 'fill-amber-400 text-amber-400' : 'text-slate-400'} />
                  <div>
                    <p className="text-sm font-semibold text-slate-700">Featured Article</p>
                    <p className="text-xs text-slate-400">Shows in the featured section on the blog page</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setForm((f) => ({ ...f, featured: !f.featured }))}
                  className={`relative h-6 w-11 rounded-full transition-colors ${form.featured ? 'bg-amber-400' : 'bg-slate-200'}`}
                >
                  <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${form.featured ? 'translate-x-5' : 'translate-x-0.5'}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Author */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">Author</h3>
            <select
              value={form.author}
              onChange={(e) => handleAuthorChange(e.target.value)}
              className={inputClass()}
            >
              {AUTHORS.map((a) => <option key={a.name} value={a.name}>{a.name} — {a.role}</option>)}
            </select>
            {/* Author preview */}
            <div className="mt-3 flex items-center gap-3 rounded-lg bg-slate-50 px-3 py-2.5">
              <img src={form.authorImage} alt={form.author} className="h-9 w-9 rounded-full object-cover" />
              <div>
                <p className="text-sm font-semibold text-slate-900">{form.author}</p>
                <p className="text-xs text-slate-500">{form.authorRole}</p>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-bold uppercase tracking-wider text-slate-500">Tags</h3>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Add a tag..."
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addTag() } }}
                className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-primary-500"
              />
              <button
                type="button"
                onClick={addTag}
                className="rounded-lg bg-slate-100 px-3 py-2 text-sm font-semibold text-slate-600 transition hover:bg-slate-200"
              >
                Add
              </button>
            </div>
            {form.tags.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {form.tags.map((tag) => (
                  <span key={tag} className="flex items-center gap-1.5 rounded border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-600">
                    {tag}
                    <button type="button" onClick={() => removeTag(tag)} className="text-slate-400 hover:text-red-500">×</button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Save button (repeated for convenience) */}
          <button
            type="button"
            onClick={handleSave}
            disabled={saving || status === 'saved'}
            className="w-full rounded-lg bg-primary-600 py-3 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:opacity-60"
          >
            {saving
              ? <span className="flex items-center justify-center gap-2"><Loader2 size={15} className="animate-spin" /> Saving…</span>
              : isEdit ? 'Save Changes' : 'Publish Article'
            }
          </button>
        </div>
      </div>
    </div>
  )
}
