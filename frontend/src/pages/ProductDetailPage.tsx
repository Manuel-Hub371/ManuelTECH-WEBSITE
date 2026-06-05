import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ArrowLeft, CheckCircle2, ExternalLink, Layers, Loader2 } from 'lucide-react'
import type { Product } from '../data/products'
import { loadProducts } from '../admin/productStore'
import CTABand from '../components/home/CTABand'

const statusColors: Record<string, string> = {
  Live:             'bg-emerald-50 text-emerald-700 border-emerald-200',
  Beta:             'bg-amber-50 text-amber-700 border-amber-200',
  'In Development': 'bg-slate-100 text-slate-600 border-slate-200',
}

export default function ProductDetailPage() {
  const { id }   = useParams<{ id: string }>()
  const navigate = useNavigate()

  const [product, setProduct]   = useState<Product | null>(null)
  const [others, setOthers]     = useState<Product[]>([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    loadProducts().then((all) => {
      const found = all.find((p) => p.id === id)
      if (!found) { navigate('/portfolio', { replace: true }); return }
      setProduct(found)
      setOthers(all.filter((p) => p.id !== id).slice(0, 3))
    }).finally(() => setLoading(false))
  }, [id, navigate])

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center gap-3 text-slate-400">
        <Loader2 size={22} className="animate-spin" />
        <span className="text-sm">Loading product…</span>
      </div>
    )
  }

  if (!product) return null

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-navy-900">
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div className={`absolute left-0 top-0 h-full w-1 ${product.accentColor}`} />

        <div className="container-wide py-24 lg:py-32">
          <Link
            to="/portfolio"
            className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"
          >
            <ArrowLeft size={15} /> Back to Portfolio
          </Link>

          <div className="grid items-center gap-12 lg:grid-cols-2">
            {/* Left */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              <div className="mb-4 flex items-center gap-3">
                <span className={`h-0.5 w-8 ${product.accentColor}`} />
                <span className={`text-xs font-bold uppercase tracking-[0.2em] ${product.textAccent.replace('600', '400')}`}>
                  {product.category}
                </span>
              </div>

              <div className="flex items-start gap-4">
                <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
                  {product.name}
                </h1>
                <span className={`mt-2 shrink-0 rounded border px-2.5 py-1 text-xs font-bold ${statusColors[product.status]}`}>
                  {product.status}
                </span>
              </div>

              <p className="mt-3 text-lg font-medium text-slate-300">{product.tagline}</p>
              <p className="mt-5 text-base leading-relaxed text-slate-400">{product.description}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                {product.tryUrl && (
                  <a
                    href={product.tryUrl}
                    target="_blank"
                    rel="noreferrer"
                    className={`inline-flex items-center gap-2 rounded px-6 py-3 text-sm font-semibold text-white transition hover:opacity-90 ${product.accentColor}`}
                  >
                    Try {product.name} <ExternalLink size={15} />
                  </a>
                )}
                <Link
                  to="/contact?consultation=true"
                  className="inline-flex items-center gap-2 rounded border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                >
                  Request a Demo <ArrowRight size={15} />
                </Link>
              </div>
            </motion.div>

            {/* Right — product image */}
            <motion.div
              initial={{ opacity: 0, x: 16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="relative"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full object-cover shadow-2xl"
              />
              <div className={`absolute bottom-0 left-0 right-0 h-1 ${product.accentColor}`} />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── About the product ── */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          <div className="grid gap-16 lg:grid-cols-3">
            {/* Long description */}
            <div className="lg:col-span-2">
              <div className="mb-5 flex items-center gap-3">
                <span className={`h-0.5 w-8 ${product.accentColor}`} />
                <span className={`text-xs font-bold uppercase tracking-[0.18em] ${product.textAccent}`}>
                  About {product.name}
                </span>
              </div>
              <h2 className="font-display text-2xl font-bold text-navy-900 sm:text-3xl">
                What is {product.name}?
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                {product.longDescription}
              </p>

              {/* Features */}
              <div className="mt-10">
                <h3 className="mb-5 font-display text-lg font-bold text-navy-900">Key Features</h3>
                <div className="grid gap-px bg-border border border-border sm:grid-cols-2">
                  {product.features.map((f, i) => (
                    <motion.div
                      key={f}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.04 }}
                      className="flex items-start gap-3 bg-white p-5"
                    >
                      <CheckCircle2 size={16} className={`mt-0.5 shrink-0 ${product.textAccent}`} />
                      <span className="text-sm leading-relaxed text-slate-700">{f}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Tech stack */}
              <div className="border border-border bg-muted p-6">
                <div className="mb-4 flex items-center gap-2">
                  <Layers size={15} className="text-muted-foreground" />
                  <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Tech Stack</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.techStack.map((t) => (
                    <span key={t} className="rounded border border-border bg-white px-3 py-1.5 text-xs font-semibold text-navy-900">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="border border-border bg-muted p-6">
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-muted-foreground">Product Status</p>
                <span className={`inline-block rounded border px-3 py-1.5 text-sm font-bold ${statusColors[product.status]}`}>
                  {product.status}
                </span>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  {product.status === 'Live' && 'This product is fully deployed and serving active users.'}
                  {product.status === 'Beta' && 'This product is in active beta. Early access available.'}
                  {product.status === 'In Development' && 'This product is currently in development. Join the waitlist.'}
                </p>
              </div>

              {/* CTA */}
              <div className={`p-6 text-white ${product.accentColor}`}>
                <p className="font-display font-bold">Interested in {product.name}?</p>
                <p className="mt-2 text-sm opacity-90">
                  Book a free demo and see how it can work for your organization.
                </p>
                <Link
                  to="/contact?consultation=true"
                  className="mt-4 inline-flex items-center gap-2 rounded border border-white/30 bg-white/10 px-4 py-2.5 text-sm font-semibold transition hover:bg-white/20"
                >
                  Book a Demo <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Other products ── */}
      {others.length > 0 && (
        <section className="section-padding bg-muted">
          <div className="container-wide">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="font-display text-xl font-bold text-navy-900">Other Products</h2>
              <Link to="/portfolio" className="text-sm font-semibold text-primary-600 hover:underline">
                View all →
              </Link>
            </div>
            <div className="grid gap-px bg-border border border-border sm:grid-cols-3">
              {others.map((p) => (
                <Link
                  key={p.id}
                  to={`/portfolio/${p.id}`}
                  className={`group flex flex-col border-l-4 bg-white p-6 transition hover:bg-muted ${p.borderAccent}`}
                >
                  <span className={`text-xs font-bold uppercase tracking-wider ${p.textAccent}`}>{p.category}</span>
                  <h3 className="mt-2 font-display font-bold text-navy-900">{p.name}</h3>
                  <p className="mt-1.5 flex-1 text-sm text-muted-foreground line-clamp-2">{p.tagline}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-primary-600 opacity-0 transition group-hover:opacity-100">
                    Learn more <ArrowRight size={12} />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTABand />
    </>
  )
}
