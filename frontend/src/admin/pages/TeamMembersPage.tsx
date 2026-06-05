import { useState, useEffect, useCallback } from 'react'
import {
  Plus, Pencil, Trash2, Loader2, AlertCircle, Users,
  Code2, Link2, AtSign, Camera, Phone, Globe, Mail,
  MessageCircle, X, Save, CheckCircle2,
} from 'lucide-react'
import {
  loadTeamMembers, createTeamMember, updateTeamMember,
  deleteTeamMember, type TeamMemberData,
} from '../aboutStore'

/* ─── Social link config ─────────────────────────────────────────── */
const SOCIAL_FIELDS: {
  key: keyof TeamMemberData
  label: string
  icon: React.ElementType
  placeholder: string
  type?: string
}[] = [
  { key: 'email',     label: 'Email',           icon: Mail,          placeholder: 'name@example.com',          type: 'email' },
  { key: 'phone',     label: 'Phone / WhatsApp', icon: Phone,         placeholder: '+233 XX XXX XXXX',          type: 'tel'   },
  { key: 'whatsapp',  label: 'WhatsApp Link',    icon: MessageCircle, placeholder: 'https://wa.me/233...'                      },
  { key: 'linkedin',  label: 'LinkedIn',         icon: Link2,         placeholder: 'https://linkedin.com/in/...'               },
  { key: 'github',    label: 'GitHub',           icon: Code2,         placeholder: 'https://github.com/...'                    },
  { key: 'twitter',   label: 'Twitter / X',      icon: AtSign,        placeholder: 'https://twitter.com/...'                   },
  { key: 'instagram', label: 'Instagram',        icon: Camera,        placeholder: 'https://instagram.com/...'                 },
  { key: 'portfolio', label: 'Portfolio Website', icon: Globe,        placeholder: 'https://yoursite.com'                      },
]

const emptyMember: Omit<TeamMemberData, 'id'> = {
  name: '', role: '', bio: '', image: '',
  github: '', linkedin: '', twitter: '', instagram: '',
  whatsapp: '', phone: '', portfolio: '', email: '',
  sortOrder: 0,
}

/* ─── Member modal ───────────────────────────────────────────────── */
function MemberModal({
  initial,
  onSave,
  onClose,
}: {
  initial: Omit<TeamMemberData, 'id'> & { id?: string }
  onSave: (data: Omit<TeamMemberData, 'id'> & { id?: string }) => Promise<void>
  onClose: () => void
}) {
  const [form, setForm]     = useState(initial)
  const [saving, setSaving] = useState(false)
  const [error, setError]   = useState<string | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const set = (field: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [field]: e.target.value }))

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.role.trim()) e.role = 'Role is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSave = async () => {
    if (!validate()) return
    setSaving(true)
    setError(null)
    try {
      await onSave(form)
      onClose()
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const inputClass = (field?: string) =>
    `w-full rounded-lg border ${errors[field ?? ''] ? 'border-red-400 bg-red-50' : 'border-slate-200 bg-white'} px-4 py-2.5 text-sm text-slate-900 outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20`

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/40 backdrop-blur-sm p-4 pt-10">
      <div className="w-full max-w-2xl rounded-xl border border-slate-200 bg-white shadow-2xl">
        {/* Modal header */}
        <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4">
          <h2 className="font-display text-lg font-bold text-slate-900">
            {form.id ? 'Edit Team Member' : 'Add Team Member'}
          </h2>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-6 p-6">
          {error && (
            <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
              <AlertCircle size={15} className="mt-0.5 shrink-0" /> {error}
            </div>
          )}

          {/* Basic info */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input type="text" value={form.name} onChange={set('name')} placeholder="e.g. Sarah Chen" className={inputClass('name')} />
              {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">
                Role / Title <span className="text-red-500">*</span>
              </label>
              <input type="text" value={form.role} onChange={set('role')} placeholder="e.g. AI & Automation Lead" className={inputClass('role')} />
              {errors.role && <p className="mt-1 text-xs text-red-600">{errors.role}</p>}
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Bio</label>
              <textarea rows={3} value={form.bio} onChange={set('bio')} placeholder="Short bio shown on the About page…" className={inputClass()} />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Photo URL</label>
              <input type="url" value={form.image} onChange={set('image')} placeholder="https://images.unsplash.com/..." className={inputClass()} />
              {form.image && (
                <img src={form.image} alt="preview" className="mt-2 h-20 w-20 rounded-full object-cover object-top"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }} />
              )}
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-slate-700">Display Order</label>
              <input type="number" min={0} value={form.sortOrder} onChange={(e) => setForm((f) => ({ ...f, sortOrder: Number(e.target.value) }))} className={inputClass()} />
              <p className="mt-1 text-xs text-slate-400">Lower number = shown first</p>
            </div>
          </div>

          {/* Social links */}
          <div>
            <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">Social & Contact Links</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {SOCIAL_FIELDS.map(({ key, label, icon: Icon, placeholder, type }) => (
                <div key={key}>
                  <label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-slate-700">
                    <Icon size={13} className="text-slate-400" /> {label}
                  </label>
                  <input
                    type={type ?? 'url'}
                    value={(form[key] as string) ?? ''}
                    onChange={set(key)}
                    placeholder={placeholder}
                    className={inputClass()}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal footer */}
        <div className="flex items-center justify-end gap-3 border-t border-slate-200 px-6 py-4">
          <button type="button" onClick={onClose} className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50">
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:opacity-60"
          >
            {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
            {form.id ? 'Save Changes' : 'Add Member'}
          </button>
        </div>
      </div>
    </div>
  )
}

/* ─── Main page ──────────────────────────────────────────────────── */
export default function TeamMembersPage() {
  const [members, setMembers]   = useState<TeamMemberData[]>([])
  const [loading, setLoading]   = useState(true)
  const [error, setError]       = useState<string | null>(null)
  const [modal, setModal]       = useState<(Omit<TeamMemberData, 'id'> & { id?: string }) | null>(null)
  const [confirm, setConfirm]   = useState<string | null>(null)
  const [deleting, setDeleting] = useState(false)
  const [justSaved, setJustSaved] = useState(false)

  const load = useCallback(async () => {
    setLoading(true)
    setError(null)
    try { setMembers(await loadTeamMembers()) }
    catch (e) { setError(e instanceof Error ? e.message : 'Failed to load') }
    finally { setLoading(false) }
  }, [])

  useEffect(() => { load() }, [load])

  const handleSave = async (data: Omit<TeamMemberData, 'id'> & { id?: string }) => {
    if (data.id) {
      const updated = await updateTeamMember(data.id, data)
      setMembers((prev) => prev.map((m) => (m.id === data.id ? updated : m)))
    } else {
      const created = await createTeamMember(data)
      setMembers((prev) => [...prev, created])
    }
    setJustSaved(true)
    setTimeout(() => setJustSaved(false), 2500)
  }

  const handleDelete = async (id: string) => {
    setDeleting(true)
    try {
      await deleteTeamMember(id)
      setMembers((prev) => prev.filter((m) => m.id !== id))
      setConfirm(null)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to delete')
    } finally {
      setDeleting(false)
    }
  }

  const confirmMember = members.find((m) => m.id === confirm)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-display text-2xl font-bold text-slate-900">Team Members</h1>
          <p className="mt-1 text-sm text-slate-500">
            {loading ? 'Loading…' : `${members.length} member${members.length !== 1 ? 's' : ''}`}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setModal({ ...emptyMember })}
          className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700"
        >
          <Plus size={16} /> Add Member
        </button>
      </div>

      {justSaved && (
        <div className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          <CheckCircle2 size={16} className="shrink-0" /> Member saved successfully.
        </div>
      )}
      {error && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
          <AlertCircle size={16} className="mt-0.5 shrink-0" /> {error}
        </div>
      )}

      {/* Members grid */}
      {loading ? (
        <div className="flex items-center justify-center gap-3 py-16 text-slate-400">
          <Loader2 size={20} className="animate-spin" />
          <span className="text-sm">Loading team members…</span>
        </div>
      ) : members.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-12 text-center shadow-sm">
          <Users size={32} className="mx-auto mb-3 text-slate-300" />
          <p className="text-slate-500">No team members yet.</p>
          <button
            type="button"
            onClick={() => setModal({ ...emptyMember })}
            className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:underline"
          >
            <Plus size={14} /> Add your first member
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {members.map((member) => {
            const links = SOCIAL_FIELDS.filter(({ key }) => member[key])
            return (
              <div key={member.id} className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
                {/* Photo */}
                <div className="relative">
                  {member.image ? (
                    <img src={member.image} alt={member.name}
                      className="aspect-[4/3] w-full object-cover object-top grayscale" />
                  ) : (
                    <div className="aspect-[4/3] w-full bg-slate-100 flex items-center justify-center">
                      <Users size={32} className="text-slate-300" />
                    </div>
                  )}
                  {/* Action buttons overlay */}
                  <div className="absolute right-2 top-2 flex gap-1.5">
                    <button
                      type="button"
                      onClick={() => setModal({ ...member })}
                      className="rounded-lg bg-white/90 p-1.5 text-slate-600 shadow transition hover:bg-white hover:text-primary-600"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirm(member.id)}
                      className="rounded-lg bg-white/90 p-1.5 text-slate-600 shadow transition hover:bg-white hover:text-red-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <p className="font-display font-bold text-slate-900">{member.name}</p>
                  <p className="mt-0.5 text-sm font-semibold text-primary-600">{member.role}</p>
                  {member.bio && (
                    <p className="mt-2 text-xs leading-relaxed text-slate-500 line-clamp-2">{member.bio}</p>
                  )}

                  {/* Social links */}
                  {links.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-1.5 border-t border-slate-100 pt-3">
                      {links.map(({ key, label, icon: Icon }) => {
                        const val = member[key] as string
                        const href = key === 'email'
                          ? `mailto:${val}`
                          : key === 'phone'
                          ? `tel:${val}`
                          : val
                        return (
                          <a
                            key={key}
                            href={href}
                            target={key === 'email' || key === 'phone' ? undefined : '_blank'}
                            rel="noreferrer"
                            title={label}
                            className="flex items-center gap-1 rounded border border-slate-200 px-2 py-1 text-xs text-slate-500 transition hover:border-primary-400 hover:text-primary-600"
                          >
                            <Icon size={11} />
                            <span>{label}</span>
                          </a>
                        )
                      })}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Add/Edit modal */}
      {modal && (
        <MemberModal
          initial={modal}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}

      {/* Delete confirmation */}
      {confirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-xl border border-slate-200 bg-white p-6 shadow-2xl">
            <h3 className="font-display text-lg font-bold text-slate-900">Remove team member?</h3>
            {confirmMember && (
              <p className="mt-1 text-sm font-medium text-slate-600">{confirmMember.name} — {confirmMember.role}</p>
            )}
            <p className="mt-2 text-sm text-slate-500">This will permanently remove them from the team page.</p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                disabled={deleting}
                onClick={() => handleDelete(confirm)}
                className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-red-600 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 disabled:opacity-60"
              >
                {deleting ? <Loader2 size={15} className="animate-spin" /> : null}
                Yes, remove
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
