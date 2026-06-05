import { GraduationCap, HeartPulse, Factory, ShoppingBag, Building2, Home, Landmark, Truck } from 'lucide-react'

const industries = [
  { icon: GraduationCap, name: 'Education' },
  { icon: HeartPulse,    name: 'Healthcare' },
  { icon: Factory,       name: 'Manufacturing' },
  { icon: ShoppingBag,   name: 'Retail & E-commerce' },
  { icon: Building2,     name: 'Enterprise' },
  { icon: Home,          name: 'Smart Homes' },
  { icon: Landmark,      name: 'Finance & Banking' },
  { icon: Truck,         name: 'Logistics' },
]

export default function Industries() {
  return (
    <section className="border-y border-border bg-muted py-14">
      <div className="container-wide">
        <p className="mb-8 text-center text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
          Industries We Serve
        </p>
        <div className="grid grid-cols-4 divide-x divide-border border border-border bg-white lg:grid-cols-8">
          {industries.map((ind) => (
            <div
              key={ind.name}
              className="flex flex-col items-center gap-2.5 px-4 py-6 text-center transition hover:bg-muted"
            >
              <ind.icon size={22} className="text-navy-700" />
              <span className="text-xs font-medium leading-tight text-slate-600">{ind.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
