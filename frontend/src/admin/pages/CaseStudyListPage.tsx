import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import {
  Plus, Pencil, Trash2, ExternalLink,
  Loader2, AlertCircle, BookOpen,
} from 'lucide-react'
import { loadCaseStudies, deleteCaseStudy } from '../caseStudyStore'
import type { CaseStudy } from '../../data/products'

const categoryColors: Record<string, string> = {
  'Web Development':      'bg-sky-100 text-sky-700',
  'Software Development': 'bg-blue-100 text-blue-700',
  'AI & Automation':      'bg-violet-100 text-violet-700',
  'Creative Services':    'bg-rose-100 text-rose-700',
  'Robotics':             'bg-amber-100 text-amber-700',
  'Training & Education': 'bg-emerald-100 text-emerald-700',
}

export default function CaseStudyListPage() {
  const [studies, setStudies]   = useState<CaseStudy[]>([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState<string | null>(null)
  const [confirm, setConfirm]   = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setStudies(await loadCaseStudies())
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load case studies')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const handleDelete = async (id: string) => {
    setDeleting(true)
    try {
      await deleteCaseStudy(id)
      setStudies((prev) => prev.filter((s) => s.id !== id))
      setConfirm(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to delete case study')
    } finally {
      setDeleting(false)
    }
  }

  const confirmStudy = studies.find((s) => s.id === confirm)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Case Studies</h1>
          <p className="mt-1 text-sm text-slate-500">
            {loading ? 'Loading…' : `${studies.length} case stud${studies.length !== 1 ? 'ies' : 'y'}`}
          </p>
        </div>
        <Link
          to="/admin/case-studies/new"
          className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700"
        >
          <Plus size={16} /> Add Case Study
        </Link>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-500" />
          {error}
        </div>
      )}

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center gap-3 p-12 text-slate-400">
            <Loader2 size={20} className="animate-spin" />
            <span className="text-sm">Loading case studies…</span>
          </div>
        ) : studies.length === 0 ? (
          <div className="p-12 text-center">
            <BookOpen size={32} className="mx-auto mb-3 text-slate-300" />
            <p className="text-slate-500">No case studies yet.</p>
            <Link
              to="/admin/case-studies/new"
              className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:underline"
            >
              <Plus size={14} /> Add your first case study
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3">Title</th>
                  <th className="px-5 py-3">Client</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Industry</th>
                  <th className="px-5 py-3">Results</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {studies.map((study) => (
                  <tr key={study.id} className="hover:bg-slate-50">
                    {/* Title + image */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {study.image ? (
                          <img
                            src={study.image}
                            alt={study.title}
                            className="h-10 w-14 shrink-0 rounded object-cover grayscale"
                          />
                        ) : (
                          <div className="h-10 w-14 shrink-0 rounded bg-slate-100" />
                        )}
                        <p className="font-semibold text-slate-900 line-clamp-1">{study.title}</p>
                      </div>
                    </td>

                    {/* Client */}
                    <td className="px-5 py-4 text-slate-600">{study.client}</td>

                    {/* Category */}
                    <td className="px-5 py-4">
                      <span className={`rounded px-2 py-0.5 text-xs font-semibold ${categoryColors[study.category] ?? 'bg-slate-100 text-slate-600'}`}>
                        {study.category}
                      </span>
                    </td>

                    {/* Industry */}
                    <td className="px-5 py-4 text-slate-500 text-xs">{study.industry}</td>

                    {/* Results count */}
                    <td className="px-5 py-4">
                      <span className="rounded bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                        {study.results.length} result{study.results.length !== 1 ? 's' : ''}
                      </span>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`/portfolio/case-study/${study.id}`}
                          target="_blank"
                          rel="noreferrer"
                          title="View on site"
                          className="rounded p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                        >
                          <ExternalLink size={15} />
                        </a>
                        <Link
                          to={`/admin/case-studies/edit/${study.id}`}
                          title="Edit"
                          className="rounded p-1.5 text-slate-400 transition hover:bg-primary-50 hover:text-primary-600"
                        >
                          <Pencil size={15} />
                        </Link>
                        <button
                          type="button"
                          title="Delete"
                          onClick={() => setConfirm(study.id)}
                          className="rounded p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-6 shadow-2xl">
            <h3 className="font-display text-lg font-bold text-slate-900">Delete case study?</h3>
            {confirmStudy && (
              <p className="mt-1 text-sm font-medium text-slate-600">"{confirmStudy.title}"</p>
            )}
            <p className="mt-2 text-sm text-slate-500">
              This will permanently remove the case study. This action cannot be undone.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                disabled={deleting}
                onClick={() => handleDelete(confirm)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
              >
                {deleting ? <Loader2 size={15} className="animate-spin" /> : null}
                Yes, delete
              </button>
              <button
                type="button"
                disabled={deleting}
                onClick={() => setConfirm(null)}
                className="flex-1 rounded-lg border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
