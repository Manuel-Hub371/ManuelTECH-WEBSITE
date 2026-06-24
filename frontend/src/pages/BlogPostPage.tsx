import { useState, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Clock, Calendar, Tag } from 'lucide-react'
import { loadPosts } from '../admin/blogStore'
import type { BlogPost } from '../data/blog'
import CTABand from '../components/home/CTABand'
import { useServices, buildCategoryColorMap } from '../hooks/useServices'

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const services = useServices()
  const categoryColors = buildCategoryColorMap(services)
  const [post, setPost] = useState<BlogPost | null>(null)
  const [suggested, setSuggested] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    setLoading(true)
    loadPosts()
      .then((allPosts) => {
        const found = allPosts.find((p) => p.slug === slug)
        if (!found) {
          setError(true)
          setLoading(false)
          return
        }
        setPost(found)
        const related = allPosts.filter((p) => p.id !== found.id && p.category === found.category).slice(0, 2)
        const others  = allPosts.filter((p) => p.id !== found.id && p.category !== found.category).slice(0, 2 - related.length)
        setSuggested([...related, ...others].slice(0, 3))
        setLoading(false)
      })
      .catch(() => {
        setError(true)
        setLoading(false)
      })
  }, [slug])

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center bg-muted py-24">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-slate-500">Loading article...</p>
        </div>
      </div>
    )
  }

  if (error || !post) return <Navigate to="/blog" replace />


  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-navy-900">
        <div className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div className="pointer-events-none absolute left-0 top-0 h-full w-1 bg-primary-600" />

        <div className="container-wide relative z-10 py-20 lg:py-28">
          <Link to="/blog" className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white">
            <ArrowLeft size={15} /> Back to Blog
          </Link>

          <div className="max-w-3xl">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <span className={`rounded border px-2.5 py-1 text-xs font-bold ${categoryColors[post.category] ?? 'bg-muted text-slate-600 border-border'}`}>
                {post.category}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-400">
                <Calendar size={12} />
                {new Date(post.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <span className="flex items-center gap-1.5 text-xs text-slate-400">
                <Clock size={12} />
                {post.readTime}
              </span>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-5xl"
            >
              {post.title}
            </motion.h1>

            <p className="mt-5 text-lg leading-relaxed text-slate-300">{post.excerpt}</p>

            {/* Author */}
            <div className="mt-8 flex items-center gap-4 border-t border-white/10 pt-6">
              <img src={post.authorImage} alt={post.author} className="h-12 w-12 rounded-full object-cover grayscale" />
              <div>
                <p className="font-semibold text-white">{post.author}</p>
                <p className="text-sm text-slate-400">{post.authorRole} · ManuelTECH</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Cover image ── */}
      <div className="border-b border-border">
        <img src={post.image} alt={post.title} className="h-72 w-full object-cover lg:h-96" />
      </div>

      {/* ── Article body ── */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid gap-16 lg:grid-cols-3">
            {/* Article */}
            <article className="lg:col-span-2">
              <div className="space-y-5 text-base leading-relaxed text-slate-700">
                {post.body.map((para, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                  >
                    {para}
                  </motion.p>
                ))}
              </div>

              {/* Tags */}
              <div className="mt-10 flex flex-wrap items-center gap-2 border-t border-border pt-8">
                <Tag size={14} className="text-muted-foreground" />
                {post.tags.map((tag) => (
                  <span key={tag} className="rounded border border-border px-3 py-1 text-xs font-medium text-slate-600">
                    {tag}
                  </span>
                ))}
              </div>

              {/* Author bio */}
              <div className="mt-8 flex gap-5 border border-border bg-muted p-6">
                <img src={post.authorImage} alt={post.author} className="h-16 w-16 shrink-0 rounded-full object-cover" />
                <div>
                  <p className="font-display font-bold text-navy-900">{post.author}</p>
                  <p className="text-sm font-medium text-primary-600">{post.authorRole}</p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Part of the ManuelTECH team — building technology, training talent, and sharing what we learn along the way.
                  </p>
                </div>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Share / CTA */}
              <div className="border border-border bg-navy-900 p-6 text-white">
                <p className="font-display font-bold">Found this useful?</p>
                <p className="mt-2 text-sm text-slate-300">
                  We publish insights from our real project experience. No fluff, no theory — just what we've learned building real systems.
                </p>
                <Link
                  to="/blog"
                  className="mt-4 inline-flex items-center gap-2 rounded border border-white/20 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/10"
                >
                  Read More Articles <ArrowRight size={14} />
                </Link>
              </div>

              {/* Work with us */}
              <div className="border border-border bg-primary-600 p-6 text-white">
                <p className="font-display font-bold">Work with ManuelTECH</p>
                <p className="mt-2 text-sm opacity-90">
                  Ready to apply these ideas to your business? Let's talk.
                </p>
                <Link
                  to="/contact?consultation=true"
                  className="mt-4 inline-flex items-center gap-2 rounded border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/20"
                >
                  Book Free Consultation <ArrowRight size={14} />
                </Link>
              </div>

              {/* More from this category */}
              {suggested.length > 0 && (
                <div className="border border-border">
                  <div className="border-b border-border bg-muted px-5 py-3">
                    <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">More Articles</p>
                  </div>
                  {suggested.map((s) => (
                    <Link
                      key={s.id}
                      to={`/blog/${s.slug}`}
                      className="flex gap-4 border-b border-border p-4 transition last:border-0 hover:bg-muted"
                    >
                      <img src={s.image} alt={s.title} className="h-14 w-14 shrink-0 object-cover" />
                      <div>
                        <p className="text-xs font-semibold text-primary-600">{s.category}</p>
                        <p className="mt-0.5 text-sm font-semibold leading-snug text-navy-900 line-clamp-2">{s.title}</p>
                        <p className="mt-1 text-xs text-muted-foreground">{s.readTime}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
