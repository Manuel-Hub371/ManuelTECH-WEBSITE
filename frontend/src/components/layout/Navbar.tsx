import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import Logo from '../ui/Logo'
import TopBar from './TopBar'



const navLinks = [
  { to: '/about',     label: 'About' },
  { to: '/portfolio', label: 'Portfolio' },
  { to: '/blog',      label: 'Blog' },
  { to: '/contact',   label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location.pathname])

  return (
    <header className={`fixed top-0 z-50 w-full transition-shadow duration-200 ${scrolled ? 'shadow-md' : ''}`}>
      <TopBar />

      {/* Main nav bar — always white */}
      <div className="border-b border-border bg-white">
        <nav className="container-wide flex items-center justify-between py-0">
          <Logo variant="dark" />

          {/* Desktop links */}
          <div className="hidden items-center lg:flex">
            <NavLink
              to="/"
              end
              className={({ isActive }) =>
                `border-b-2 px-5 py-5 text-sm font-medium transition ${
                  isActive ? 'border-primary-600 text-primary-600' : 'border-transparent text-slate-600 hover:text-navy-900'
                }`
              }
            >
              Home
            </NavLink>

            <NavLink
              to="/services"
              className={({ isActive }) =>
                `border-b-2 px-5 py-5 text-sm font-medium transition ${
                  isActive || location.pathname.startsWith('/services') ? 'border-primary-600 text-primary-600' : 'border-transparent text-slate-600 hover:text-navy-900'
                }`
              }
            >
              Services
            </NavLink>

            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `border-b-2 px-5 py-5 text-sm font-medium transition ${
                    isActive ? 'border-primary-600 text-primary-600' : 'border-transparent text-slate-600 hover:text-navy-900'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              to="/contact?consultation=true"
              className="rounded bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-primary-700"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            type="button"
            className="rounded p-2 text-navy-900 lg:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="border-b border-border bg-white shadow-lg lg:hidden"
          >
            <div className="container-wide divide-y divide-border">
              <NavLink to="/" end className={({ isActive }) => `block px-2 py-3.5 text-sm font-medium ${isActive ? 'text-primary-600' : 'text-slate-700'}`}>
                Home
              </NavLink>
              <NavLink to="/services" className={({ isActive }) => `block px-2 py-3.5 text-sm font-medium ${isActive ? 'text-primary-600' : 'text-slate-700'}`}>
                Services
              </NavLink>
              {navLinks.map((link) => (
                <NavLink key={link.to} to={link.to} className={({ isActive }) => `block px-2 py-3.5 text-sm font-medium ${isActive ? 'text-primary-600' : 'text-slate-700'}`}>
                  {link.label}
                </NavLink>
              ))}
              <div className="py-4">
                <Link to="/contact?consultation=true" className="block rounded bg-primary-600 px-4 py-3 text-center text-sm font-semibold text-white">
                  Get a Quote
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
