import { Link } from 'react-router-dom'
import type { ReactNode } from 'react'

interface ButtonProps {
  children: ReactNode
  to?: string
  href?: string
  variant?: 'primary' | 'secondary' | 'outline' | 'white' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  disabled?: boolean
}

const variants = {
  primary:  'bg-primary-600 text-white hover:bg-primary-700 active:bg-primary-800',
  secondary:'bg-navy-900 text-white hover:bg-navy-800',
  outline:  'border border-navy-900/20 bg-transparent text-navy-900 hover:bg-navy-900 hover:text-white',
  white:    'bg-white text-navy-900 hover:bg-slate-50',
  ghost:    'bg-transparent text-primary-600 hover:bg-primary-50',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-3.5 text-base',
}

export default function Button({
  children,
  to,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  type = 'button',
  disabled,
}: ButtonProps) {
  const base = `inline-flex items-center justify-center gap-2 rounded font-semibold tracking-wide transition-all duration-150 ${variants[variant]} ${sizes[size]} ${className} disabled:opacity-50 disabled:pointer-events-none`

  if (to) return <Link to={to} className={base}>{children}</Link>
  if (href) return <a href={href} target="_blank" rel="noreferrer" className={base}>{children}</a>
  return <button type={type} onClick={onClick} disabled={disabled} className={base}>{children}</button>
}
