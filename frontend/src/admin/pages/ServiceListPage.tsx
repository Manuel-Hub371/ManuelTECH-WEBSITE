import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Pencil, Trash2, ExternalLink, Loader2, AlertCircle, Layers } from 'lucide-react'
import * as Icons from 'lucide-react'
import { loadServices, deleteService } from '../serviceStore'
import type { ServiceCategory } from '../../data/services'
import { fetchServices } from '../api'

export default function ServiceListPage() {
  const [services, setServices] = useState<(ServiceCategory & { _adminId?: string })[]>([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState<string | null>(null)
  const [confirm, setConfirm]   = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      // Load categories + fetch admin IDs (UUIDs) from API for delete
      const [cats, apiServices] = await Promise.all([
        loadServices(),
        fetchServices().catch(() => []),
      ])
      // Merge API UUIDs into the category list
      const merged = cats.map((cat) => {
        const api = apiServices.find((s) => s.slug === cat.slug)
        return { ...cat, _adminId: api?.id }
      })
      setServices(merged)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load services')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const handleDelete = async (svc: ServiceCategory & { _adminId?: string }) => {
    if (!svc._adminId) {
      // offline-only entry — just remove from localStorage
      setServices((prev) => prev.filter((s) => s.slug !== svc.slug))
      setConfirm(null)
      return
    }
    setDeleting(true)
    try {
      await deleteService(svc._adminId, svc.slug)
      setServices((prev) => prev.filter((s) => s.slug !== svc.slug))
      setConfirm(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to delete')
    } finally {
      setDeleting(false)
    }
  }

  const confirmSvc = services.find((s) => s.slug === confirm)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Services</h1>
          <p className="mt-1 text-sm text-slate-500">
            {loading ? 'Loading…' : `${services.length} service${services.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        <Link
          to="/admin/services/new"
          className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700"
        >
          <Plus size={16} /> Add Service
        </Link>
      </div>

      {error && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          <AlertCircle size={16} className="mt-0.5 shrink-0" /> {error}
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center gap-3 p-12 text-slate-400">
            <Loader2 size={20} className="animate-spin" />
            <span className="text-sm">Loading services…</span>
          </div>
        ) : services.length === 0 ? (
          <div className="p-12 text-center">
            <Layers size={32} className="mx-auto mb-3 text-slate-300" />
            <p className="text-slate-500">No services yet.</p>
            <Link to="/admin/services/new" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:underline">
              <Plus size={14} /> Add your first service
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3">Service</th>
                  <th className="px-5 py-3">Slug / URL</th>
                  <th className="px-5 py-3">Items</th>
                  <th className="px-5 py-3">FAQs</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {services.map((svc) => {
                  const IconComp = (Icons as unknown as Record<string, React.ComponentType<{size?: number; className?: string}>>)[svc.icon] ?? Icons.Code2
                  return (
                    <tr key={svc.slug} className="hover:bg-slate-50">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-white ${svc.detail.accentColor}`}>
                            <IconComp size={16} />
                          </div>
                          <div>
                            <p className="font-semibold text-slate-900">{svc.title}</p>
                            <p className="mt-0.5 text-xs text-slate-400 line-clamp-1">{svc.description}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <code className="rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600">
                          /services/{svc.slug}
                        </code>
                      </td>
                      <td className="px-5 py-4">
                        <span className="rounded bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
                          {svc.items.length} items
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                          {svc.detail.faqs.length} FAQs
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center justify-end gap-2">
                          <a href={`/services/${svc.slug}`} target="_blank" rel="noreferrer"
                            className="rounded p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
                            <ExternalLink size={15} />
                          </a>
                          <Link to={`/admin/services/edit/${svc.slug}`}
                            className="rounded p-1.5 text-slate-400 transition hover:bg-primary-50 hover:text-primary-600">
                            <Pencil size={15} />
                          </Link>
                          <button type="button" onClick={() => setConfirm(svc.slug)}
                            className="rounded p-1.5 text-slate-400 transition hover:bg-red-50 hover:text-red-600">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Delete confirm */}
      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-6 shadow-2xl">
            <h3 className="font-display text-lg font-bold text-slate-900">Delete service?</h3>
            {confirmSvc && <p className="mt-1 text-sm font-medium text-slate-600">"{confirmSvc.title}"</p>}
            <p className="mt-2 text-sm text-slate-500">This will permanently remove the service. Cannot be undone.</p>
            <div className="mt-6 flex gap-3">
              <button type="button" disabled={deleting}
                onClick={() => confirmSvc && handleDelete(confirmSvc)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60">
                {deleting ? <Loader2 size={15} className="animate-spin" /> : null} Yes, delete
              </button>
              <button type="button" disabled={deleting} onClick={() => setConfirm(null)}
                className="flex-1 rounded-lg border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-60">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
