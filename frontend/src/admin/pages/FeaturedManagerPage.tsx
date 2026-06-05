import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Star, StarOff, ArrowUp, ArrowDown, Eye, Pencil, Info } from 'lucide-react'
import { loadPosts, updatePost, toggleFeatured } from '../blogStore'
import type { BlogPost } from '../../data/blog'

const categoryColors: Record<string, string> = {
  'AI & Automation':      'bg-violet-100 text-violet-700',
  'Software Development': 'bg-blue-100 text-blue-700',
  'Robotics':             'bg-amber-100 text-amber-700',
  'Creative Services':    'bg-rose-100 text-rose-700',
  'Training & Education': 'bg-emerald-100 text-emerald-700',
  'Web Development':      'bg-sky-100 text-sky-700',
}

export default function FeaturedManagerPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])

  const load = () => {
    loadPosts().then((data) => {
      setPosts(data)
    }).catch(() => {})
  }

  useEffect(() => { load() }, [])

  const featured    = posts.filter((p) => p.featured)
  const notFeatured = posts.filter((p) => !p.featured)

  const handleToggle = async (id: string) => {
    const post = posts.find((p) => p.id === id)
    if (!post) return
    await toggleFeatured(id, post.featured)
    load()
  }

  /* Move a featured post up or down in the list by swapping publishedAt dates */
  const moveFeatured = async (id: string, dir: 'up' | 'down') => {
    const featuredIds = featured.map((p) => p.id)
    const idx = featuredIds.indexOf(id)
    if (dir === 'up' && idx === 0) return
    if (dir === 'down' && idx === featuredIds.length - 1) return

    const swapId = dir === 'up' ? featuredIds[idx - 1] : featuredIds[idx + 1]
    const postA = posts.find((p) => p.id === id)
    const postB = posts.find((p) => p.id === swapId)
    if (!postA || !postB) return


    try {
      const dateA = postA.publishedAt
      const dateB = postB.publishedAt
      // Swap dates to change sorting order
      await updatePost(postA.id, { publishedAt: dateB })
      await updatePost(postB.id, { publishedAt: dateA })
      load()
    } catch { /* ignore */ }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900">Featured Articles</h1>
        <p className="mt-1 text-sm text-slate-500">
          Control which articles appear in the featured section on the blog page. The blog page shows the first 3 featured articles.
        </p>
      </div>

      {/* Info banner */}
      <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-800">
        <Info size={16} className="mt-0.5 shrink-0" />
        <div>
          <p className="font-semibold">How featured articles work</p>
          <p className="mt-0.5 text-blue-700">
            The blog page displays the first 3 featured articles in a prominent section at the top.
            The first featured article gets the large card; the next two get smaller cards.
            Use the arrows to reorder them.
          </p>
        </div>
      </div>

      {/* Featured articles */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-slate-900">
            Currently Featured
            <span className="ml-2 rounded-full bg-amber-100 px-2.5 py-0.5 text-sm font-semibold text-amber-700">
              {featured.length} / 3 shown
            </span>
          </h2>
        </div>

        {featured.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <Star size={24} className="mx-auto text-slate-300" />
            <p className="mt-3 text-sm text-slate-500">No featured articles yet.</p>
            <p className="text-xs text-slate-400">Mark articles as featured from the list below.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {featured.map((post, i) => (
              <div
                key={post.id}
                className={`flex items-center gap-4 rounded-xl border bg-white p-4 shadow-sm ${
                  i < 3 ? 'border-amber-200' : 'border-slate-200 opacity-60'
                }`}
              >
                {/* Position badge */}
                <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  i === 0 ? 'bg-amber-400 text-white' :
                  i === 1 ? 'bg-amber-200 text-amber-800' :
                  i === 2 ? 'bg-amber-100 text-amber-700' :
                  'bg-slate-100 text-slate-500'
                }`}>
                  {i + 1}
                </div>

                {/* Thumbnail */}
                <img src={post.image} alt={post.title} className="h-14 w-20 shrink-0 rounded object-cover" />

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-slate-900 truncate">{post.title}</p>
                  <div className="mt-1 flex items-center gap-2">
                    <span className={`rounded px-2 py-0.5 text-xs font-semibold ${categoryColors[post.category] ?? 'bg-slate-100 text-slate-600'}`}>
                      {post.category}
                    </span>
                    <span className="text-xs text-slate-400">{post.readTime}</span>
                    {i >= 3 && (
                      <span className="rounded bg-slate-100 px-2 py-0.5 text-xs text-slate-500">
                        Not shown (position {i + 1})
                      </span>
                    )}
                  </div>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-1">
                  <button type="button" onClick={() => moveFeatured(post.id, 'up')} disabled={i === 0}
                    className="rounded p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-30">
                    <ArrowUp size={15} />
                  </button>
                  <button type="button" onClick={() => moveFeatured(post.id, 'down')} disabled={i === featured.length - 1}
                    className="rounded p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 disabled:opacity-30">
                    <ArrowDown size={15} />
                  </button>
                  <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer"
                    className="rounded p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700">
                    <Eye size={15} />
                  </a>
                  <Link to={`/admin/blog/edit/${post.id}`}
                    className="rounded p-1.5 text-slate-400 transition hover:bg-primary-50 hover:text-primary-600">
                    <Pencil size={15} />
                  </Link>
                  <button type="button" onClick={() => handleToggle(post.id)}
                    className="rounded p-1.5 text-amber-500 transition hover:bg-amber-50 hover:text-amber-700"
                    title="Remove from featured">
                    <StarOff size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Not featured */}
      <div>
        <h2 className="mb-4 font-display text-lg font-bold text-slate-900">
          All Other Articles
          <span className="ml-2 text-sm font-normal text-slate-400">— click the star to feature</span>
        </h2>

        {notFeatured.length === 0 ? (
          <p className="text-sm text-slate-500">All articles are currently featured.</p>
        ) : (
          <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-5 py-3">Article</th>
                    <th className="px-5 py-3">Category</th>
                    <th className="px-5 py-3">Author</th>
                    <th className="px-5 py-3 text-right">Feature</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {notFeatured.map((post) => (
                    <tr key={post.id} className="hover:bg-slate-50">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <img src={post.image} alt={post.title} className="h-10 w-14 shrink-0 rounded object-cover" />
                          <div>
                            <p className="font-semibold text-slate-900 line-clamp-1">{post.title}</p>
                            <p className="text-xs text-slate-400">{post.readTime}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className={`rounded px-2 py-0.5 text-xs font-semibold ${categoryColors[post.category] ?? 'bg-slate-100 text-slate-600'}`}>
                          {post.category}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-slate-600">{post.author}</td>
                      <td className="px-5 py-4 text-right">
                        <button type="button" onClick={() => handleToggle(post.id)}
                          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-700">
                          <Star size={13} /> Mark as Featured
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
