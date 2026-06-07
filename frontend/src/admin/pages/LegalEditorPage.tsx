import { useState, useEffect } from 'react'
import { Save, CheckCircle2, AlertCircle, Loader2, Plus, Trash2, ArrowUp, ArrowDown, FileText } from 'lucide-react'
import { loadLegalDoc, updateLegalDoc, type LegalDoc } from '../legalStore'

const DOC_TABS = [
  { type: 'privacy', label: 'Privacy Policy' },
  { type: 'terms', label: 'Terms & Conditions' },
  { type: 'cookies', label: 'Cookie Policy' },
  { type: 'disclaimer', label: 'Disclaimer' },
]

export default function LegalEditorPage() {
  const [activeTab, setActiveTab] = useState('privacy')
  const [doc, setDoc] = useState<LegalDoc | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDoc(activeTab)
  }, [activeTab])

  const fetchDoc = (type: string) => {
    setLoading(true)
    setError(null)
    loadLegalDoc(type)
      .then((data) => {
        setDoc(data)
      })
      .catch((err) => {
        setError(err.message || 'Failed to load policy document.')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  const handleSave = async () => {
    if (!doc) return
    setSaving(true)
    setSaved(false)
    setError(null)
    try {
      const updated = await updateLegalDoc(doc.type, doc.title, doc.sections)
      setDoc(updated)
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save document.')
    } finally {
      setSaving(false)
    }
  }

  // Title edit
  const handleTitleChange = (val: string) => {
    if (!doc) return
    setDoc({ ...doc, title: val })
  }

  // Section Heading edit
  const handleSectionHeadingChange = (secIdx: number, val: string) => {
    if (!doc) return
    const newSections = [...doc.sections]
    newSections[secIdx] = { ...newSections[secIdx], heading: val }
    setDoc({ ...doc, sections: newSections })
  }

  // Section Paragraph edit
  const handleParagraphChange = (secIdx: number, pIdx: number, val: string) => {
    if (!doc) return
    const newSections = [...doc.sections]
    const newParagraphs = [...newSections[secIdx].paragraphs]
    newParagraphs[pIdx] = val
    newSections[secIdx] = { ...newSections[secIdx], paragraphs: newParagraphs }
    setDoc({ ...doc, sections: newSections })
  }

  // Add section
  const addSection = () => {
    if (!doc) return
    const newSections = [...doc.sections, { heading: 'New Section Heading', paragraphs: [''] }]
    setDoc({ ...doc, sections: newSections })
  }

  // Remove section
  const removeSection = (secIdx: number) => {
    if (!doc) return
    const newSections = doc.sections.filter((_, idx) => idx !== secIdx)
    setDoc({ ...doc, sections: newSections })
  }

  // Add paragraph
  const addParagraph = (secIdx: number) => {
    if (!doc) return
    const newSections = [...doc.sections]
    newSections[secIdx] = {
      ...newSections[secIdx],
      paragraphs: [...newSections[secIdx].paragraphs, ''],
    }
    setDoc({ ...doc, sections: newSections })
  }

  // Remove paragraph
  const removeParagraph = (secIdx: number, pIdx: number) => {
    if (!doc) return
    const newSections = [...doc.sections]
    newSections[secIdx] = {
      ...newSections[secIdx],
      paragraphs: newSections[secIdx].paragraphs.filter((_, idx) => idx !== pIdx),
    }
    setDoc({ ...doc, sections: newSections })
  }

  // Move section (up or down)
  const moveSection = (secIdx: number, direction: 'up' | 'down') => {
    if (!doc) return
    const newSections = [...doc.sections]
    const targetIdx = direction === 'up' ? secIdx - 1 : secIdx + 1
    if (targetIdx < 0 || targetIdx >= newSections.length) return

    // Swap
    const temp = newSections[secIdx]
    newSections[secIdx] = newSections[targetIdx]
    newSections[targetIdx] = temp

    setDoc({ ...doc, sections: newSections })
  }

  const inputClass =
    'w-full rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20'
  const taClass = `${inputClass} resize-y`

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Legal Policies</h1>
          <p className="mt-1 text-sm text-slate-500">Edit legal documentation, disclaimers, and user policies.</p>
        </div>
        <button
          type="button"
          onClick={handleSave}
          disabled={saving || !doc}
          className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:opacity-60"
        >
          {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
          Save Policy
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex gap-6" aria-label="Tabs">
          {DOC_TABS.map((tab) => (
            <button
              key={tab.type}
              onClick={() => setActiveTab(tab.type)}
              className={`pb-4 text-sm font-semibold transition border-b-2 ${activeTab === tab.type
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {saved && (
        <div className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <CheckCircle2 size={16} className="shrink-0" /> Changes saved successfully.
        </div>
      )}
      {error && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          <AlertCircle size={16} className="mt-0.5 shrink-0" /> {error}
        </div>
      )}

      {loading ? (
        <div className="flex items-center justify-center gap-3 py-24 text-slate-400">
          <Loader2 size={22} className="animate-spin" />
          <span className="text-sm">Loading policy content…</span>
        </div>
      ) : (
        doc && (
          <div className="space-y-6">
            {/* Title Block */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Document Title</label>
              <input
                type="text"
                value={doc.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className={inputClass}
                placeholder="e.g. Privacy Policy"
              />
            </div>

            {/* Sections Editor */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500">Document Sections</h3>
                <button
                  type="button"
                  onClick={addSection}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                >
                  <Plus size={14} /> Add Section
                </button>
              </div>

              {doc.sections.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50/50 py-12 text-center text-slate-400">
                  <FileText size={36} className="text-slate-300 mb-2" />
                  <p className="text-sm">No sections defined yet.</p>
                  <button
                    type="button"
                    onClick={addSection}
                    className="mt-3 text-xs font-bold text-primary-600 hover:text-primary-700"
                  >
                    Add a new section
                  </button>
                </div>
              ) : (
                doc.sections.map((section, secIdx) => (
                  <div key={secIdx} className="group/sec relative rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-slate-300">
                    {/* Section Top Controls */}
                    <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50/50 px-6 py-4 rounded-t-xl">
                      <div className="flex-1 mr-4">
                        <input
                          type="text"
                          value={section.heading}
                          onChange={(e) => handleSectionHeadingChange(secIdx, e.target.value)}
                          className={`${inputClass} border-transparent bg-transparent px-0 py-1 font-semibold text-slate-900 focus:border-slate-200 focus:bg-white focus:px-3 focus:py-1.5`}
                          placeholder="Section Heading"
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          type="button"
                          onClick={() => moveSection(secIdx, 'up')}
                          disabled={secIdx === 0}
                          className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30"
                          title="Move Up"
                        >
                          <ArrowUp size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveSection(secIdx, 'down')}
                          disabled={secIdx === doc.sections.length - 1}
                          className="p-1 text-slate-400 hover:text-slate-600 disabled:opacity-30"
                          title="Move Down"
                        >
                          <ArrowDown size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeSection(secIdx)}
                          className="p-1 text-slate-400 hover:text-red-600"
                          title="Delete Section"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>

                    {/* Section Paragraphs */}
                    <div className="p-6 space-y-4">
                      <div className="space-y-3">
                        {section.paragraphs.map((para, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-3">
                            <textarea
                              rows={2}
                              value={para}
                              onChange={(e) => handleParagraphChange(secIdx, pIdx, e.target.value)}
                              className={`${taClass} flex-1`}
                              placeholder="Type paragraph content..."
                            />
                            <button
                              type="button"
                              onClick={() => removeParagraph(secIdx, pIdx)}
                              className="mt-2.5 p-1 text-slate-300 transition hover:text-red-500"
                              title="Delete Paragraph"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={() => addParagraph(secIdx)}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-primary-600 hover:text-primary-700"
                      >
                        <Plus size={12} /> Add Paragraph
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bottom Controls */}
            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={handleSave}
                disabled={saving}
                className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:opacity-60"
              >
                {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                Save Policy Changes
              </button>
            </div>
          </div>
        )
      )}
    </div>
  )
}
