import { Link } from 'react-router-dom'

interface LogoProps {
  variant?: 'light' | 'dark'
  className?: string
}

export default function Logo({ variant = 'dark', className = '' }: LogoProps) {
  const isLight = variant === 'light'

  return (
    <Link to="/" className={`flex items-center gap-2.5 ${className}`}>
      {/* Square mark */}
      <div className={`flex h-9 w-9 items-center justify-center ${isLight ? 'bg-primary-600' : 'bg-primary-600'}`}>
        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
          <path d="M4 6h16M4 12h10M4 18h16" stroke="#fff" strokeWidth="2.5" strokeLinecap="square" />
        </svg>
      </div>
      {/* Wordmark */}
      <div className="leading-none">
        <span className={`block font-display text-[1.15rem] font-bold tracking-tight ${isLight ? 'text-white' : 'text-navy-900'}`}>
          Manuel<span className="text-primary-600">TECH</span>
        </span>
        <span className={`block text-[9px] font-semibold uppercase tracking-[0.22em] ${isLight ? 'text-slate-400' : 'text-muted-foreground'}`}>
          Technology Solutions
        </span>
      </div>
    </Link>
  )
}
