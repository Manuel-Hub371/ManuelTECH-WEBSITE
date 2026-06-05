import { Link, Outlet, useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, LogOut, ExternalLink, FileText, Star, PenSquare, Package, Plus, Eye, BookOpen, Info, Users, Layers } from 'lucide-react'
import { clearAdminToken } from './auth'

const nav = [
  {
    section: 'Overview',
    items: [
      { to: '/admin',       label: 'Dashboard',  icon: LayoutDashboard, exact: true },
    ],
  },
  {
    section: 'About',
    items: [
      { to: '/admin/about/info',   label: 'Company Info', icon: Info,  exact: true },
      { to: '/admin/about/team',   label: 'Team Members', icon: Users, exact: true },
    ],
  },
  {
    section: 'Services',
    items: [
      { to: '/admin/services',     label: 'All Services', icon: Layers, exact: true },
      { to: '/admin/services/new', label: 'Add Service',  icon: Plus,   exact: false },
    ],
  },
  {
    section: 'Products',
    items: [
      { to: '/admin/products',     label: 'All Products',   icon: Package,   exact: true },
      { to: '/admin/products/new', label: 'Add Product',    icon: Plus,      exact: false },
    ],
  },
  {
    section: 'Case Studies',
    items: [
      { to: '/admin/case-studies',     label: 'All Case Studies', icon: BookOpen, exact: true },
      { to: '/admin/case-studies/new', label: 'Add Case Study',   icon: Plus,     exact: false },
    ],
  },
  {
    section: 'Blog',
    items: [
      { to: '/admin/blog',          label: 'All Articles',    icon: FileText,  exact: true },
      { to: '/admin/blog/new',      label: 'New Article',     icon: PenSquare, exact: false },
      { to: '/admin/blog/featured', label: 'Featured Manager',icon: Star,      exact: true },
    ],
  },
  {
    section: 'Legal',
    items: [
      { to: '/admin/legal',         label: 'Legal Policies',  icon: FileText,  exact: true },
    ],
  },
]

export default function AdminLayout() {
  const navigate  = useNavigate()
  const location  = useLocation()

  const handleLogout = () => {
    clearAdminToken()
    navigate('/admin/login', { replace: true })
  }

  const isActive = (to: string, exact: boolean) =>
    exact ? location.pathname === to : location.pathname.startsWith(to)

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* ── Sidebar ── */}
      <aside className="flex w-64 shrink-0 flex-col border-r border-slate-700 bg-slate-900 text-white">
        {/* Brand */}
        <div className="border-b border-slate-700 px-6 py-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">Internal</p>
          <p className="mt-1 font-display text-lg font-bold text-white">ManuelTECH Admin</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4">
          {nav.map((group) => (
            <div key={group.section} className="mb-6">
              <p className="mb-2 px-3 text-xs font-bold uppercase tracking-widest text-slate-500">
                {group.section}
              </p>
              {group.items.map((item) => {
                const active = isActive(item.to, item.exact)
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                      active
                        ? 'bg-primary-600 text-white'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <item.icon size={17} />
                    {item.label}
                  </Link>
                )
              })}
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-700 p-4 space-y-1">
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <ExternalLink size={16} />
            View public site
          </a>
          <button
            type="button"
            onClick={handleLogout}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <LogOut size={16} />
            Sign out
          </button>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4">
          <p className="text-sm text-slate-500">
            Private admin area — not visible on the public website
          </p>
          <div className="flex items-center gap-4">
            <a href="/portfolio" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 transition hover:text-primary-600">
              <Eye size={13} /> Portfolio
            </a>
            <a href="/blog" target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-400 transition hover:text-primary-600">
              <ExternalLink size={13} /> Blog
            </a>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
