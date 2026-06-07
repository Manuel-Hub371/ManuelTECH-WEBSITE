import { useState, useEffect } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { loadLegalDoc, type LegalDoc } from '../admin/legalStore'
import PageHeader from '../components/ui/PageHeader'

interface LegalPageProps {
  type?: string
}

export default function LegalPage({ type: propType }: LegalPageProps) {
  const params = useParams()
  const type = propType || params.type || ''

  const [doc, setDoc] = useState<LegalDoc | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const validTypes = ['privacy', 'terms', 'cookies', 'disclaimer']
  if (!validTypes.includes(type)) {
    return <Navigate to="/" replace />
  }

  useEffect(() => {
    setLoading(true)
    setError(null)
    loadLegalDoc(type)
      .then((data) => {
        setDoc(data)
        setLoading(false)
      })
      .catch((err) => {
        setError(err.message || 'Failed to load policy content')
        setLoading(false)
      })
  }, [type])

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center bg-slate-50">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-500 border-t-transparent"></div>
      </div>
    )
  }

  if (error || !doc) {
    return (
      <div className="flex min-h-[400px] flex-col items-center justify-center bg-slate-50 px-4 text-center">
        <p className="text-lg font-semibold text-red-600">Error</p>
        <p className="mt-2 text-sm text-slate-500">{error || 'Document not found'}</p>
      </div>
    )
  }

  const formattedDate = doc.lastUpdated
    ? `Last updated: ${new Date(doc.lastUpdated).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}`
    : ''

  return (
    <>
      <PageHeader
        title={doc.title}
        description={formattedDate}
        breadcrumbs={[{ label: 'About', to: '/about' }, { label: doc.title }]}
      />
      <section className="section-padding bg-slate-50">
        <div className="container-wide">
          <div className="grid gap-12 lg:grid-cols-12">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-4 lg:sticky lg:top-28">
              <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
                <h4 className="font-display text-sm font-bold uppercase tracking-wider text-navy-950">
                  Document Index
                </h4>
                <ul className="mt-4 space-y-2">
                  {doc.sections.map((section, idx) => (
                    <li key={idx}>
                      <a
                        href={`#section-${idx}`}
                        className="block rounded px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-50 hover:text-primary-600 font-medium"
                      >
                        {section.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-8">
              <div className="rounded-lg border border-slate-200 bg-white p-8 shadow-sm sm:p-12">
                <div className="prose prose-slate max-w-none">
                  {doc.sections.length === 0 ? (
                    <p className="text-slate-500 italic">No content sections defined.</p>
                  ) : (
                    doc.sections.map((section, idx) => (
                      <div
                        key={idx}
                        id={`section-${idx}`}
                        className="mb-10 last:mb-0 scroll-mt-28"
                      >
                        <h2 className="font-display text-2xl font-bold text-navy-950 border-b border-slate-100 pb-3 mb-4">
                          {section.heading}
                        </h2>
                        {section.paragraphs.map((p, pIdx) => (
                          <p
                            key={pIdx}
                            className="text-slate-600 text-base leading-relaxed mb-4 last:mb-0"
                          >
                            {p}
                          </p>
                        ))}
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
