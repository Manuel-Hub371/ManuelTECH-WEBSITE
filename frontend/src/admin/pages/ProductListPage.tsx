import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Eye, EyeOff, Pencil, Trash2, ExternalLink, Globe, Download, Loader2, AlertCircle } from 'lucide-react'
import { loadProducts, deleteProduct, togglePortfolioVisibility } from '../productStore'
import type { Product } from '../../data/products'

const statusColors: Record<string, string> = {
  Live:             'bg-emerald-100 text-emerald-700',
  Beta:             'bg-amber-100 text-amber-700',
  'In Development': 'bg-slate-100 text-slate-600',
}

const categoryColors: Record<string, string> = {
  AI:               'bg-violet-100 text-violet-700',
  Software:         'bg-blue-100 text-blue-700',
  Fintech:          'bg-emerald-100 text-emerald-700',
  'Developer Tools':'bg-amber-100 text-amber-700',
}

export default function ProductListPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState<string | null>(null)
  const [confirm, setConfirm]   = useState<string | null>(null)
  const [toggling, setToggling] = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setProducts(await loadProducts())
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load products')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  const handleToggle = async (product: Product) => {
    setToggling(product.id)
    try {
      const updated = await togglePortfolioVisibility(product.id, product.showInPortfolio)
      setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)))
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to update product')
    } finally {
      setToggling(null)
    }
  }

  const handleDelete = async (id: string) => {
    setDeleting(true)
    try {
      await deleteProduct(id)
      setProducts((prev) => prev.filter((p) => p.id !== id))
      setConfirm(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to delete product')
    } finally {
      setDeleting(false)
    }
  }

  const portfolioCount = products.filter((p) => p.showInPortfolio).length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Product Management</h1>
          <p className="mt-1 text-sm text-slate-500">
            {loading ? 'Loading…' : `${products.length} product${products.length !== 1 ? 's' : ''} · ${portfolioCount} shown on portfolio`}
          </p>
        </div>
        <Link
          to="/admin/products/new"
          className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700"
        >
          <Plus size={16} /> Add Product
        </Link>
      </div>

      {/* Error banner */}
      {error && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          <AlertCircle size={16} className="mt-0.5 shrink-0 text-red-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Portfolio visibility info */}
      {!loading && !error && (
        <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
          <Eye size={16} className="mt-0.5 shrink-0 text-blue-500" />
          <span>
            <strong>{portfolioCount}</strong> product{portfolioCount !== 1 ? 's are' : ' is'} currently visible on the portfolio page.
            Use the eye icon to show or hide products from the public portfolio.
          </span>
        </div>
      )}

      {/* Products table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="flex items-center justify-center gap-3 p-12 text-slate-400">
            <Loader2 size={20} className="animate-spin" />
            <span className="text-sm">Loading products…</span>
          </div>
        ) : products.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-slate-500">No products yet.</p>
            <Link to="/admin/products/new" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:underline">
              <Plus size={14} /> Add your first product
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3">Product</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3">Links</th>
                  <th className="px-5 py-3">Portfolio</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {products.map((product) => (
                  <tr key={product.id} className="hover:bg-slate-50">
                    {/* Product info */}
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-3">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-12 w-16 shrink-0 rounded object-cover"
                          />
                        ) : (
                          <div className="h-12 w-16 shrink-0 rounded bg-slate-100" />
                        )}
                        <div>
                          <p className="font-semibold text-slate-900">{product.name}</p>
                          <p className="mt-0.5 text-xs text-slate-400 line-clamp-1">{product.tagline}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-4">
                      <span className={`rounded px-2 py-0.5 text-xs font-semibold ${categoryColors[product.category] ?? 'bg-slate-100 text-slate-600'}`}>
                        {product.category}
                      </span>
                    </td>

                    {/* Status */}
                    <td className="px-5 py-4">
                      <span className={`rounded px-2 py-0.5 text-xs font-semibold ${statusColors[product.status] ?? 'bg-slate-100 text-slate-600'}`}>
                        {product.status}
                      </span>
                    </td>

                    {/* Links */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        {product.readMoreUrl && (
                          <a
                            href={product.readMoreUrl}
                            target="_blank"
                            rel="noreferrer"
                            title="Read More link"
                            className="flex items-center gap-1 rounded border border-slate-200 px-2 py-1 text-xs text-slate-600 transition hover:border-primary-400 hover:text-primary-600"
                          >
                            <Globe size={11} /> Read More
                          </a>
                        )}
                        {(product.tryUrl || product.downloadUrl) && (
                          <a
                            href={product.tryUrl || product.downloadUrl}
                            target="_blank"
                            rel="noreferrer"
                            title="Try / Download link"
                            className="flex items-center gap-1 rounded border border-slate-200 px-2 py-1 text-xs text-slate-600 transition hover:border-emerald-400 hover:text-emerald-600"
                          >
                            <Download size={11} /> Try/Download
                          </a>
                        )}
                        {!product.readMoreUrl && !product.tryUrl && !product.downloadUrl && (
                          <span className="text-xs text-slate-400">No links</span>
                        )}
                      </div>
                    </td>

                    {/* Portfolio visibility toggle */}
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => handleToggle(product)}
                        disabled={toggling === product.id}
                        title={product.showInPortfolio ? 'Hide from portfolio' : 'Show on portfolio'}
                        className={`flex items-center gap-1.5 rounded px-2.5 py-1.5 text-xs font-semibold transition disabled:opacity-60 ${
                          product.showInPortfolio
                            ? 'bg-emerald-100 text-emerald-700 hover:bg-emerald-200'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                      >
                        {toggling === product.id ? (
                          <Loader2 size={13} className="animate-spin" />
                        ) : product.showInPortfolio ? (
                          <><Eye size={13} /> Visible</>
                        ) : (
                          <><EyeOff size={13} /> Hidden</>
                        )}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        {product.readMoreUrl && (
                          <a
                            href={product.readMoreUrl}
                            target="_blank"
                            rel="noreferrer"
                            title="View on site"
                            className="rounded p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                          >
                            <ExternalLink size={15} />
                          </a>
                        )}
                        <Link
                          to={`/admin/products/edit/${product.id}`}
                          title="Edit"
                          className="rounded p-1.5 text-slate-400 transition hover:bg-primary-50 hover:text-primary-600"
                        >
                          <Pencil size={15} />
                        </Link>
                        <button
                          type="button"
                          title="Delete"
                          onClick={() => setConfirm(product.id)}
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
            <h3 className="font-display text-lg font-bold text-slate-900">Delete product?</h3>
            <p className="mt-2 text-sm text-slate-500">
              This will permanently remove the product. This action cannot be undone.
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
