import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Calendar } from 'lucide-react'
import { loadPosts } from '../admin/blogStore'
import type { BlogPost } from '../data/blog'
import CTABand from '../components/home/CTABand'

const categories = [
  'All',
  'AI & Automation',
  'Software Development',
  'Robotics',
  'Creative Services',
  'Training & Education',
  'Web Development',
]

const categoryColors: Record<string, string> = {
  'AI & Automation':      'bg-violet-50 text-violet-700',
  'Software Development': 'bg-primary-50 text-primary-700',
  'Robotics':             'bg-amber-50 text-amber-700',
  'Creative Services':    'bg-rose-50 text-rose-700',
  'Training & Education': 'bg-emerald-50 text-emerald-700',
  'Web Development':      'bg-sky-50 text-sky-700',
}

export default function BlogPage() {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState('All')

  useEffect(() => {
    loadPosts()
      .then((posts) => {
        setAllPosts(posts)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message || 'Failed to load blog posts')
        setLoading(false)
      })
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center bg-muted py-24">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-slate-500">Loading insights...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-[400px] items-center justify-center bg-muted py-24">
        <div className="text-center text-rose-600">
          <p className="text-lg font-bold">Error loading articles</p>
          <p className="mt-2 text-sm text-slate-500">{error}</p>
        </div>
      </div>
    )
  }

  const featured = allPosts.filter((p) => p.featured)
  const filtered  =
    activeCategory === 'All'
      ? allPosts
      : allPosts.filter((p) => p.category === activeCategory)

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-navy-900">
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div className="pointer-events-none absolute left-0 top-0 h-full w-1 bg-primary-600" />
        <div className="container-wide relative z-10 py-24 lg:py-32">
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-0.5 w-8 bg-primary-500" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-400">
                Insights & Research
              </span>
            </div>
            <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              What we've learned<br />building real technology.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-300">
              Insights from ManuelTECH's engineers, designers, and educators — drawn from years of
              building software, AI systems, robotics, and training programs.
            </p>
          </div>
        </div>
      </section>

      {/* ── Featured posts ── */}
      {featured.length > 0 && (
        <section className="section-padding bg-white">
          <div className="container-wide">
            <div className="mb-8 flex items-center gap-3">
              <span className="h-0.5 w-8 bg-primary-600" />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary-600">Featured</span>
            </div>

            <div className="grid gap-px bg-border border border-border lg:grid-cols-3">
              {/* Large featured post */}
              <Link
                to={`/blog/${featured[0].slug}`}
                className="group col-span-1 flex flex-col bg-white transition hover:bg-muted lg:col-span-2"
              >
                <div className="overflow-hidden">
                  <img
                    src={featured[0].image}
                    alt={featured[0].title}
                    className="aspect-[16/9] w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-8">
                  <div className="flex items-center gap-3">
                    <span className={`rounded px-2.5 py-1 text-xs font-bold ${categoryColors[featured[0].category] ?? 'bg-muted text-slate-600'}`}>
                      {featured[0].category}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock size={11} /> {featured[0].readTime}
                    </span>
                  </div>
                  <h2 className="mt-3 font-display text-2xl font-bold leading-snug text-navy-900 transition group-hover:text-primary-600">
                    {featured[0].title}
                  </h2>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                    {featured[0].excerpt}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-border pt-5">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={featured[0].authorImage}
                        alt={featured[0].author}
                        className="h-8 w-8 rounded-full object-cover grayscale"
                      />
                      <div>
                        <p className="text-xs font-semibold text-navy-900">{featured[0].author}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(featured[0].publishedAt).toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric',
                          })}
                        </p>
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 opacity-0 transition group-hover:opacity-100">
                      Read More <ArrowRight size={12} />
                    </span>
                  </div>
                </div>
              </Link>

              {/* Smaller featured posts */}
              {featured.length > 1 && (
                <div className="flex flex-col gap-px bg-border">
                  {featured.slice(1, 3).map((post) => (
                    <Link
                      key={post.id}
                      to={`/blog/${post.slug}`}
                      className="group flex flex-1 flex-col bg-white p-6 transition hover:bg-muted"
                    >
                      <span className={`self-start rounded px-2.5 py-1 text-xs font-bold ${categoryColors[post.category] ?? 'bg-muted text-slate-600'}`}>
                        {post.category}
                      </span>
                      <h3 className="mt-3 font-display text-lg font-bold leading-snug text-navy-900 transition line-clamp-2 group-hover:text-primary-600">
                        {post.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                        <div className="flex items-center gap-2">
                          <img
                            src={post.authorImage}
                            alt={post.author}
                            className="h-7 w-7 rounded-full object-cover grayscale"
                          />
                          <span className="text-xs font-medium text-navy-900">{post.author}</span>
                        </div>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock size={11} /> {post.readTime}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ── All posts with filter ── */}
      <section className="section-padding bg-muted">
        <div className="container-wide">
          <div className="mb-8 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span className="h-0.5 w-8 bg-primary-600" />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary-600">
                All Articles
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`rounded px-3 py-1.5 text-xs font-semibold transition ${
                    activeCategory === cat
                      ? 'bg-navy-900 text-white'
                      : 'border border-border bg-white text-slate-600 hover:border-navy-900 hover:text-navy-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="rounded border border-border bg-white px-8 py-16 text-center">
              <p className="text-slate-500">No articles in this category yet.</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
                className="grid gap-px bg-border border border-border sm:grid-cols-2 lg:grid-cols-3"
              >
                {filtered.map((post, i) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={`/blog/${post.slug}`}
                      className="group flex h-full flex-col bg-white transition hover:bg-muted"
                    >
                      <div className="overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="aspect-[16/9] w-full object-cover transition duration-500 group-hover:scale-105"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-6">
                        <div className="flex items-center gap-2">
                          <span className={`rounded px-2 py-0.5 text-xs font-bold ${categoryColors[post.category] ?? 'bg-muted text-slate-600'}`}>
                            {post.category}
                          </span>
                          <span className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock size={10} /> {post.readTime}
                          </span>
                        </div>
                        <h3 className="mt-3 font-display text-lg font-bold leading-snug text-navy-900 transition line-clamp-2 group-hover:text-primary-600">
                          {post.title}
                        </h3>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                          <div className="flex items-center gap-2">
                            <img
                              src={post.authorImage}
                              alt={post.author}
                              className="h-7 w-7 rounded-full object-cover grayscale"
                            />
                            <div>
                              <p className="text-xs font-semibold text-navy-900">{post.author}</p>
                              <p className="text-xs text-muted-foreground">
                                <Calendar size={9} className="mr-0.5 inline" />
                                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                                  month: 'short', year: 'numeric',
                                })}
                              </p>
                            </div>
                          </div>
                          <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 opacity-0 transition group-hover:opacity-100">
                            Read <ArrowRight size={11} />
                          </span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>

      <CTABand />
    </>
  )
}
