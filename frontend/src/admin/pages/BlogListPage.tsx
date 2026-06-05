import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Star, StarOff, Pencil, Trash2, Eye, Search } from 'lucide-react'
import { loadPosts, deletePost, toggleFeatured } from '../blogStore'
import type { BlogPost } from '../../data/blog'

const categoryColors: Record<string, string> = {
  'AI & Automation':      'bg-violet-100 text-violet-700',
  'Software Development': 'bg-blue-100 text-blue-700',
  'Robotics':             'bg-amber-100 text-amber-700',
  'Creative Services':    'bg-rose-100 text-rose-700',
  'Training & Education': 'bg-emerald-100 text-emerald-700',
  'Web Development':      'bg-sky-100 text-sky-700',
}

export default function BlogListPage() {
  const [posts, setPosts]     = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch]   = useState('')
  const [confirm, setConfirm] = useState<string | null>(null)

  const load = () => {
    setLoading(true)
    loadPosts().then((data) => {
      setPosts(data)
      setLoading(false)
    }).catch(() => setLoading(false))
  }

  useEffect(() => { load() }, [])

  const filtered = posts.filter((p) =>
    p.title.toLowerCase().includes(search.toLowerCase()) ||
    p.category.toLowerCase().includes(search.toLowerCase()) ||
    p.author.toLowerCase().includes(search.toLowerCase())
  )

  const featuredCount = posts.filter((p) => p.featured).length

  const handleDelete = async (id: string) => {
    await deletePost(id)
    setConfirm(null)
    load()
  }

  const handleToggleFeatured = async (id: string) => {
    const post = posts.find((p) => p.id === id)
    if (!post) return
    await toggleFeatured(id, post.featured)
    load()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Blog Management</h1>
          <p className="mt-1 text-sm text-slate-500">
            {posts.length} article{posts.length !== 1 ? 's' : ''} · {featuredCount} featured
          </p>
        </div>
        <Link
          to="/admin/blog/new"
          className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700"
        >
          <Plus size={16} /> New Article
        </Link>
      </div>

      {/* Featured status banner */}
      {featuredCount < 3 && (
        <div className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          <Star size={16} className="mt-0.5 shrink-0 text-amber-500" />
          <span>
            You have {featuredCount} featured article{featuredCount !== 1 ? 's' : ''}.
            The blog page shows up to 3 featured posts. Mark more articles as featured to fill the section.
          </span>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search by title, category, or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm text-slate-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20"
        />
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-slate-400">Loading articles...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-slate-500">
              {search ? 'No articles match your search.' : 'No articles yet. Create your first one.'}
            </p>
            {!search && (
              <Link to="/admin/blog/new" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:underline">
                <Plus size={14} /> Create article
              </Link>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="px-5 py-3">Article</th>
                  <th className="px-5 py-3">Category</th>
                  <th className="px-5 py-3">Author</th>
                  <th className="px-5 py-3">Published</th>
                  <th className="px-5 py-3">Featured</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((post) => (
                  <tr key={post.id} className="hover:bg-slate-50">
                    {/* Title + excerpt */}
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-3">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="h-12 w-16 shrink-0 rounded object-cover"
                        />
                        <div>
                          <p className="font-semibold text-slate-900 line-clamp-1">{post.title}</p>
                          <p className="mt-0.5 text-xs text-slate-400 line-clamp-1">{post.excerpt}</p>
                          <p className="mt-0.5 text-xs text-slate-400">{post.readTime}</p>
                        </div>
                      </div>
                    </td>

                    {/* Category */}
                    <td className="px-5 py-4">
                      <span className={`rounded px-2 py-0.5 text-xs font-semibold ${categoryColors[post.category] ?? 'bg-slate-100 text-slate-600'}`}>
                        {post.category}
                      </span>
                    </td>

                    {/* Author */}
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <img src={post.authorImage} alt={post.author} className="h-7 w-7 rounded-full object-cover" />
                        <span className="text-slate-700">{post.author}</span>
                      </div>
                    </td>

                    {/* Date */}
                    <td className="whitespace-nowrap px-5 py-4 text-slate-500">
                      {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>

                    {/* Featured toggle */}
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => handleToggleFeatured(post.id)}
                        title={post.featured ? 'Remove from featured' : 'Mark as featured'}
                        className={`flex items-center gap-1.5 rounded px-2.5 py-1.5 text-xs font-semibold transition ${
                          post.featured
                            ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                            : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                      >
                        {post.featured ? <Star size={13} className="fill-amber-500 text-amber-500" /> : <StarOff size={13} />}
                        {post.featured ? 'Featured' : 'Not featured'}
                      </button>
                    </td>

                    {/* Actions */}
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <a
                          href={`/blog/${post.slug}`}
                          target="_blank"
                          rel="noreferrer"
                          title="View on site"
                          className="rounded p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                        >
                          <Eye size={15} />
                        </a>
                        <Link
                          to={`/admin/blog/edit/${post.id}`}
                          title="Edit"
                          className="rounded p-1.5 text-slate-400 transition hover:bg-primary-50 hover:text-primary-600"
                        >
                          <Pencil size={15} />
                        </Link>
                        <button
                          type="button"
                          title="Delete"
                          onClick={() => setConfirm(post.id)}
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
            <h3 className="font-display text-lg font-bold text-slate-900">Delete article?</h3>
            <p className="mt-2 text-sm text-slate-500">
              This will permanently remove the article from the blog. This action cannot be undone.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => handleDelete(confirm)}
                className="flex-1 rounded-lg bg-red-600 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Yes, delete
              </button>
              <button
                type="button"
                onClick={() => setConfirm(null)}
                className="flex-1 rounded-lg border border-slate-200 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
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
