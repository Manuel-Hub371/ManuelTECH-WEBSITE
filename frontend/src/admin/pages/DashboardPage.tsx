import { useEffect, useState } from 'react'
import { Mail, Calendar, Inbox } from 'lucide-react'
import {
  fetchAdminStats,
  fetchAdminContacts,
  fetchAdminConsultations,
  type AdminContact,
  type AdminConsultation,
  type AdminStats,
} from '../api'

function formatDate(iso: string) {
  return new Date(iso).toLocaleString(undefined, {
    dateStyle: 'medium',
    timeStyle: 'short',
  })
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [contacts, setContacts] = useState<AdminContact[]>([])
  const [consultations, setConsultations] = useState<AdminConsultation[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    Promise.all([fetchAdminStats(), fetchAdminContacts(), fetchAdminConsultations()])
      .then(([s, c, q]) => {
        setStats(s)
        setContacts(c)
        setConsultations(q)
      })
      .catch((err) => setError(err instanceof Error ? err.message : 'Failed to load data'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <p className="text-slate-500">Loading dashboard...</p>
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">{error}</div>
    )
  }

  const statCards = [
    { label: 'Contact messages', value: stats?.contacts ?? 0, icon: Mail, color: 'bg-blue-500' },
    { label: 'Consultation requests', value: stats?.consultations ?? 0, icon: Calendar, color: 'bg-emerald-500' },
    { label: 'Total submissions', value: stats?.total ?? 0, icon: Inbox, color: 'bg-violet-500' },
  ]

  return (
    <div className="space-y-10">
      <div>
        <h1 className="font-display text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-slate-500">Submissions from the public contact and consultation forms</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {statCards.map((card) => (
          <div key={card.label} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-500">{card.label}</p>
                <p className="mt-1 font-display text-3xl font-bold text-slate-900">{card.value}</p>
              </div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${card.color} text-white`}>
                <card.icon size={24} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <section>
        <h2 className="font-display text-lg font-bold text-slate-900">Contact messages</h2>
        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {contacts.length === 0 ? (
            <p className="p-8 text-center text-sm text-slate-500">No contact messages yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Subject</th>
                    <th className="px-6 py-3">Message</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {contacts.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50">
                      <td className="whitespace-nowrap px-6 py-4 text-slate-500">{formatDate(row.createdAt)}</td>
                      <td className="px-6 py-4 font-medium text-slate-900">{row.name}</td>
                      <td className="px-6 py-4">
                        <a href={`mailto:${row.email}`} className="text-primary-600 hover:underline">
                          {row.email}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-slate-700">{row.subject}</td>
                      <td className="max-w-xs truncate px-6 py-4 text-slate-600" title={row.message}>
                        {row.message}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <section>
        <h2 className="font-display text-lg font-bold text-slate-900">Consultation requests</h2>
        <div className="mt-4 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          {consultations.length === 0 ? (
            <p className="p-8 text-center text-sm text-slate-500">No consultation requests yet.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-slate-200 bg-slate-50 text-xs uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-3">Date</th>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Email</th>
                    <th className="px-6 py-3">Company</th>
                    <th className="px-6 py-3">Service</th>
                    <th className="px-6 py-3">Preferred date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {consultations.map((row) => (
                    <tr key={row.id} className="hover:bg-slate-50">
                      <td className="whitespace-nowrap px-6 py-4 text-slate-500">{formatDate(row.createdAt)}</td>
                      <td className="px-6 py-4 font-medium text-slate-900">{row.name}</td>
                      <td className="px-6 py-4">
                        <a href={`mailto:${row.email}`} className="text-primary-600 hover:underline">
                          {row.email}
                        </a>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{row.company || '—'}</td>
                      <td className="px-6 py-4 capitalize text-slate-600">{row.serviceInterest || '—'}</td>
                      <td className="px-6 py-4 text-slate-600">{row.preferredDate || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
