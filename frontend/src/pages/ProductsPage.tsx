import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ExternalLink, CheckCircle2, Filter, Clock, Calendar } from 'lucide-react'
import { completedProjects } from '../data/products'
import type { Product, CaseStudy } from '../data/products'
import type { BlogPost } from '../data/blog'
import { loadProducts } from '../admin/productStore'
import { loadCaseStudies } from '../admin/caseStudyStore'
import { loadPosts } from '../admin/blogStore'
import CTABand from '../components/home/CTABand'
import { useServices, buildCategoryColorMap, numberToWord } from '../hooks/useServices'

/* ─── helpers ───────────────────────────────────────────────────── */
const statusColors: Record<string, string> = {
  Live:             'bg-emerald-50 text-emerald-700 border border-emerald-200',
  Beta:             'bg-amber-50 text-amber-700 border border-amber-200',
  'In Development': 'bg-slate-100 text-slate-600 border border-slate-200',
}

/* ─── Page ──────────────────────────────────────────────────────── */
export default function ProductsPage() {
  const services = useServices()
  // One map for all content that stores category by service title
  const categoryColors = buildCategoryColorMap(services)
  // For blog/case study badges use the same map
  const blogCategoryColors = categoryColors
  // Project quick-filters: All + first word of each service title
  const projectFilters = ['All', ...services.map((s) => s.title.split(' ')[0])]
  // Project tile colour map keyed by first word
  const projectCategoryColors: Record<string, string> = Object.fromEntries(
    services.map((s) => {
      const key = s.title.split(' ')[0]
      const text = s.detail.textAccent   || 'text-primary-600'
      const bg   = (s.detail.accentColor || 'bg-primary-600').replace(/\d+$/, '50')
      return [key, `${text} ${bg}`]
    })
  )

  const [projectFilter, setProjectFilter]     = useState('All')
  const [portfolioProducts, setPortfolioProducts] = useState<Product[]>([])
  const [caseStudies, setCaseStudies]         = useState<CaseStudy[]>([])
  const [previewBlogPosts, setPreviewBlogPosts] = useState<BlogPost[]>([])
  const [totalPosts, setTotalPosts]           = useState(0)

  useEffect(() => {
    loadProducts().then((all) => setPortfolioProducts(all.filter((p) => p.showInPortfolio)))
    loadCaseStudies().then(setCaseStudies)
    loadPosts().then((posts) => {
      setPreviewBlogPosts(posts.slice(0, 3))
      setTotalPosts(posts.length)
    }).catch(() => {})
  }, [])

  const previewCaseStudies = caseStudies.slice(0, 3)

  const filteredProjects =
    projectFilter === 'All'
      ? completedProjects.slice(0, 6)
      : completedProjects.filter((p) => p.category === projectFilter).slice(0, 6)

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-navy-900">
        <div className="pointer-events-none absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div className="pointer-events-none absolute left-0 top-0 h-full w-1 bg-primary-600" />
        <div className="container-wide relative z-10 py-24 lg:py-32">
          <div className="max-w-3xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-0.5 w-8 bg-primary-500" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-400">Portfolio</span>
            </div>
            <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              Our work speaks<br />for itself.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-300">
              From AI products used by thousands to enterprise systems running critical operations —
              this is what ManuelTECH builds.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              {[
                { label: 'Our Products',      href: '#products' },
                { label: 'Case Studies',       href: '#case-studies' },
                { label: 'Completed Projects', href: '#projects' },
                { label: 'Insights & Blog',    href: '#blog' },
              ].map((link) => (
                <a key={link.label} href={link.href}
                  className="inline-flex items-center gap-2 rounded border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/10 hover:text-white">
                  {link.label} <ArrowRight size={13} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 1 — OUR PRODUCTS
      ══════════════════════════════════════════════════════════════ */}
      <section id="products" className="section-padding bg-white scroll-mt-20">
        <div className="container-wide">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-0.5 w-8 bg-primary-600" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary-600">Our Products</span>
              </div>
              <h2 className="font-display text-3xl font-bold leading-tight text-navy-900 sm:text-4xl">
                Products we've built and own.
              </h2>
              <p className="mt-3 max-w-xl text-base text-muted-foreground">
                Built in-house, deployed in the real world, and available for you to use or license.
              </p>
            </div>
            <Link to="/portfolio/products"
              className="shrink-0 inline-flex items-center gap-2 rounded border border-border px-5 py-2.5 text-sm font-semibold text-navy-900 transition hover:bg-navy-900 hover:text-white">
              Explore All Products <ArrowRight size={14} />
            </Link>
          </div>

          <div className="space-y-px">
            {portfolioProducts.map((product, i) => (
              <motion.div key={product.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`group grid border border-border bg-white transition hover:bg-muted lg:grid-cols-5 ${product.borderAccent} border-l-4`}
              >
                <div className="overflow-hidden lg:col-span-2">
                  <img src={product.image} alt={product.name}
                    className="aspect-video w-full object-cover transition duration-500 group-hover:scale-105 lg:aspect-auto lg:h-full" />
                </div>
                <div className="flex flex-col p-8 lg:col-span-3 lg:p-10">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold uppercase tracking-wider ${product.textAccent}`}>{product.category}</span>
                    <span className={`rounded border px-2 py-0.5 text-xs font-bold ${statusColors[product.status]}`}>{product.status}</span>
                  </div>
                  <h3 className="mt-2 font-display text-2xl font-bold text-navy-900 sm:text-3xl">{product.name}</h3>
                  <p className="mt-1 text-base font-medium text-muted-foreground">{product.tagline}</p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
                  <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-1.5">
                    {product.features.slice(0, 4).map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <CheckCircle2 size={13} className={`shrink-0 ${product.textAccent}`} />
                        <span className="text-xs text-slate-600">{f}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {product.techStack.slice(0, 5).map((t) => (
                      <span key={t} className="rounded border border-border px-2 py-0.5 text-xs font-medium text-slate-500">{t}</span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border pt-6">
                    <Link to={`/portfolio/${product.id}`}
                      className="inline-flex items-center gap-2 rounded bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-800">
                      Learn More <ArrowRight size={14} />
                    </Link>
                    {product.tryUrl && (
                      <a href={product.tryUrl} target="_blank" rel="noreferrer"
                        className={`inline-flex items-center gap-2 rounded px-5 py-2.5 text-sm font-semibold text-white transition hover:opacity-90 ${product.accentColor}`}>
                        Try {product.name} <ExternalLink size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-px flex flex-col items-center justify-between gap-4 border border-border bg-navy-900 px-8 py-6 sm:flex-row">
            <p className="font-display font-semibold text-white">
              Want to see all our products in detail?
              <span className="ml-2 font-normal text-slate-300">Explore features, demos, and licensing options.</span>
            </p>
            <Link to="/portfolio/products"
              className="shrink-0 inline-flex items-center gap-2 rounded bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700">
              Explore All Products <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 2 — CASE STUDIES
      ══════════════════════════════════════════════════════════════ */}
      <section id="case-studies" className="section-padding bg-muted scroll-mt-20">
        <div className="container-wide">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-0.5 w-8 bg-primary-600" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary-600">Case Studies</span>
              </div>
              <h2 className="font-display text-3xl font-bold leading-tight text-navy-900 sm:text-4xl">
                Real problems. Real solutions. Real results.
              </h2>
              <p className="mt-3 max-w-xl text-base text-muted-foreground">
                How we've helped organizations across industries solve their most pressing technology challenges.
              </p>
            </div>
            <Link
              to="/portfolio/case-studies"
              className="shrink-0 inline-flex items-center gap-2 rounded border border-border px-5 py-2.5 text-sm font-semibold text-navy-900 transition hover:bg-navy-900 hover:text-white"
            >
              View All Case Studies <ArrowRight size={14} />
            </Link>
          </div>

          <div className="space-y-px">
            {previewCaseStudies.map((study, i) => (
              <motion.article key={study.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="grid border border-border bg-white lg:grid-cols-5"
              >
                <div className="overflow-hidden lg:col-span-2">
                  {study.image && (
                    <img src={study.image} alt={study.title}
                      className="aspect-video w-full object-cover grayscale transition duration-500 hover:grayscale-0 lg:aspect-auto lg:h-full" />
                  )}
                </div>
                <div className="p-8 lg:col-span-3 lg:p-10">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`rounded px-2.5 py-1 text-xs font-semibold ${categoryColors[study.category] ?? 'bg-muted text-slate-600'}`}>{study.category}</span>
                    <span className="rounded border border-border px-2.5 py-1 text-xs font-medium text-slate-500">{study.industry}</span>
                  </div>
                  <h3 className="mt-3 font-display text-xl font-bold text-navy-900 sm:text-2xl">{study.title}</h3>
                  <p className="mt-0.5 text-sm font-medium text-muted-foreground">Client: {study.client}</p>
                  <div className="mt-5 grid gap-4 border-t border-border pt-5 sm:grid-cols-2">
                    <div>
                      <p className="mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">Challenge</p>
                      <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">{study.challenge}</p>
                    </div>
                    <div>
                      <p className="mb-1.5 text-xs font-bold uppercase tracking-wider text-slate-400">Results</p>
                      <div className="space-y-1.5">
                        {study.results.slice(0, 2).map((r) => (
                          <div key={r} className="flex items-start gap-2">
                            <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-emerald-600" />
                            <span className="text-xs font-medium text-emerald-800">{r}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 border-t border-border pt-5">
                    <div className="flex flex-wrap gap-1.5">
                      {study.techStack.slice(0, 3).map((t) => (
                        <span key={t} className="rounded border border-border bg-muted px-2 py-0.5 text-xs font-medium text-slate-500">{t}</span>
                      ))}
                    </div>
                    <div className="mt-4">
                      <Link
                        to={`/portfolio/case-study/${study.id}`}
                        className="inline-flex items-center gap-2 rounded bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-800"
                      >
                        Read Full Case Study <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {caseStudies.length > 3 && (
            <div className="mt-px flex flex-col items-center justify-between gap-4 border border-border bg-navy-900 px-8 py-6 sm:flex-row">
              <p className="font-display font-semibold text-white">
                Showing 3 of {caseStudies.length} case studies.
                <span className="ml-2 font-normal text-slate-300">See the full breakdown of every engagement.</span>
              </p>
              <Link
                to="/portfolio/case-studies"
                className="shrink-0 inline-flex items-center gap-2 rounded bg-primary-600 px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700"
              >
                View All Case Studies <ArrowRight size={15} />
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 3 — COMPLETED PROJECTS
      ══════════════════════════════════════════════════════════════ */}
      <section id="projects" className="section-padding bg-white scroll-mt-20">
        <div className="container-wide">
          <div className="mb-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-0.5 w-8 bg-primary-600" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary-600">Completed Projects</span>
              </div>
              <h2 className="font-display text-3xl font-bold leading-tight text-navy-900 sm:text-4xl">
                The broader body of work.
              </h2>
              <p className="mt-3 max-w-xl text-base text-muted-foreground">
                A selection of client projects delivered across all {numberToWord(services.length)} service areas.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Filter size={14} className="text-muted-foreground" />
              <div className="flex flex-wrap gap-1.5">
                {projectFilters.map((f) => (
                  <button key={f} type="button" onClick={() => setProjectFilter(f)}
                    className={`rounded px-3 py-1.5 text-xs font-semibold transition ${
                      projectFilter === f ? 'bg-navy-900 text-white' : 'border border-border text-slate-600 hover:border-navy-900 hover:text-navy-900'
                    }`}>
                    {f}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={projectFilter}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid gap-px bg-border border border-border sm:grid-cols-2 lg:grid-cols-3"
            >
              {filteredProjects.map((project, i) => (
                <motion.div key={project.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="flex flex-col bg-white p-7 transition hover:bg-muted"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className={`rounded px-2.5 py-1 text-xs font-bold ${projectCategoryColors[project.category] ?? 'bg-muted text-slate-600'}`}>
                      {project.category}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">{project.year}</span>
                  </div>
                  <h3 className="mt-3 font-display font-bold text-navy-900">{project.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.techStack.map((t) => (
                      <span key={t} className="rounded border border-border px-2 py-0.5 text-xs text-slate-500">{t}</span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="mt-px flex flex-col items-center justify-between gap-4 border border-border bg-muted px-7 py-5 sm:flex-row">
            <p className="text-sm text-muted-foreground">
              Showing {filteredProjects.length} of {completedProjects.length} projects. Many are under NDA.
            </p>
            <Link to="/portfolio/projects"
              className="shrink-0 inline-flex items-center gap-2 rounded bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-800">
              View All Projects <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SECTION 4 — BLOG / INSIGHTS
      ══════════════════════════════════════════════════════════════ */}
      <section id="blog" className="section-padding bg-muted scroll-mt-20">
        <div className="container-wide">
          <div className="mb-12 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
            <div>
              <div className="mb-4 flex items-center gap-3">
                <span className="h-0.5 w-8 bg-primary-600" />
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-primary-600">Insights & Research</span>
              </div>
              <h2 className="font-display text-3xl font-bold leading-tight text-navy-900 sm:text-4xl">
                What we've learned building real technology.
              </h2>
              <p className="mt-3 max-w-xl text-base text-muted-foreground">
                Insights from our engineers, designers, and educators — drawn from years of building
                software, AI systems, robotics, and training programs.
              </p>
            </div>
            <Link to="/blog"
              className="shrink-0 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:underline">
              View All Articles <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid gap-px bg-border border border-border sm:grid-cols-2 lg:grid-cols-3">
            {previewBlogPosts.map((post: BlogPost, i: number) => (
              <motion.div key={post.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Link to={`/blog/${post.slug}`}
                  className="group flex h-full flex-col bg-white transition hover:bg-muted">
                  <div className="overflow-hidden">
                    <img src={post.image} alt={post.title}
                      className="aspect-[16/9] w-full object-cover transition duration-500 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <div className="flex items-center gap-2">
                      <span className={`rounded px-2 py-0.5 text-xs font-bold ${blogCategoryColors[post.category] ?? 'bg-muted text-slate-600'}`}>
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock size={10} /> {post.readTime}
                      </span>
                    </div>
                    <h3 className="mt-3 font-display text-lg font-bold leading-snug text-navy-900 group-hover:text-primary-600 transition line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center justify-between border-t border-border pt-4">
                      <div className="flex items-center gap-2">
                        <img src={post.authorImage} alt={post.author} className="h-7 w-7 rounded-full object-cover grayscale" />
                        <div>
                          <p className="text-xs font-semibold text-navy-900">{post.author}</p>
                          <p className="text-xs text-muted-foreground">
                            <Calendar size={9} className="mr-0.5 inline" />
                            {new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                          </p>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 opacity-0 transition group-hover:opacity-100">
                        Read More <ArrowRight size={11} />
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-px flex items-center justify-between border border-border bg-white px-7 py-5">
            <p className="text-sm text-muted-foreground">
              Showing 3 of {totalPosts} articles.
            </p>
            <Link to="/blog"
              className="inline-flex items-center gap-2 rounded bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700">
              Read All Articles <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <CTABand />
    </>
  )
}
