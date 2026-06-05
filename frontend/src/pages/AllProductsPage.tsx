import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ExternalLink, CheckCircle2, Loader2 } from 'lucide-react'
import type { Product } from '../data/products'
import { loadProducts } from '../admin/productStore'
import CTABand from '../components/home/CTABand'

const statusColors: Record<string, string> = {
  Live:             'bg-emerald-50 text-emerald-700 border border-emerald-200',
  Beta:             'bg-amber-50 text-amber-700 border border-amber-200',
  'In Development': 'bg-slate-100 text-slate-600 border border-slate-200',
}

export default function AllProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading]   = useState(true)

  useEffect(() => {
    loadProducts()
      .then(setProducts)
      .finally(() => setLoading(false))
  }, [])
  return (
    <>
      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-navy-900">
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '28px 28px' }}
        />
        <div className="absolute left-0 top-0 h-full w-1 bg-primary-600" />
        <div className="container-wide py-24 lg:py-32">
          <Link to="/portfolio" className="mb-8 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white">
            <ArrowLeft size={15} /> Back to Portfolio
          </Link>
          <div className="max-w-2xl">
            <div className="mb-5 flex items-center gap-3">
              <span className="h-0.5 w-8 bg-primary-500" />
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-primary-400">Our Products</span>
            </div>
            <h1 className="font-display text-4xl font-bold leading-tight text-white sm:text-5xl">
              Products built by ManuelTECH.
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-slate-300">
              These are our own products — built in-house, deployed in the real world, and available
              for you to use, license, or build on top of.
            </p>
          </div>
        </div>
      </section>

      {/* ── Products grid ── */}
      <section className="section-padding bg-white">
        <div className="container-wide">
          {loading ? (
            <div className="flex items-center justify-center gap-3 py-24 text-slate-400">
              <Loader2 size={22} className="animate-spin" />
              <span className="text-sm">Loading products…</span>
            </div>
          ) : (
          <div className="space-y-px">
            {products.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={`group grid border border-border bg-white transition hover:bg-muted lg:grid-cols-5 ${product.borderAccent} border-l-4`}
              >
                <div className="overflow-hidden lg:col-span-2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="aspect-video w-full object-cover transition duration-500 group-hover:scale-105 lg:aspect-auto lg:h-full"
                  />
                </div>
                <div className="flex flex-col p-8 lg:col-span-3 lg:p-10">
                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold uppercase tracking-wider ${product.textAccent}`}>{product.category}</span>
                    <span className={`rounded border px-2 py-0.5 text-xs font-bold ${statusColors[product.status]}`}>{product.status}</span>
                  </div>
                  <h2 className="mt-2 font-display text-2xl font-bold text-navy-900 sm:text-3xl">{product.name}</h2>
                  <p className="mt-1 text-base font-medium text-muted-foreground">{product.tagline}</p>
                  <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
                  <div className="mt-5 grid grid-cols-2 gap-x-6 gap-y-1.5">
                    {product.features.slice(0, 6).map((f) => (
                      <div key={f} className="flex items-center gap-2">
                        <CheckCircle2 size={13} className={`shrink-0 ${product.textAccent}`} />
                        <span className="text-xs text-slate-600">{f}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {product.techStack.map((t) => (
                      <span key={t} className="rounded border border-border px-2 py-0.5 text-xs font-medium text-slate-500">{t}</span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border pt-6">
                    <Link to={`/portfolio/${product.id}`} className="inline-flex items-center gap-2 rounded bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-800">
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
          )}
        </div>
      </section>

      <CTABand />
    </>
  )
}
