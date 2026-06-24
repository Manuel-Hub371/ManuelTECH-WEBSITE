/**
 * Service store — API-driven without localStorage fallback.
 */
import {
  fetchServices,
  apiCreateService,
  apiUpdateService,
  apiDeleteService,
  type AdminService,
  type CreateServicePayload,
  type UpdateServicePayload,
} from './api'
import type { ServiceCategory } from '../data/services'

/* ─── Adapters ──────────────────────────────────────────────────── */

function toCategory(a: AdminService): ServiceCategory {
  return {
    id: a.slug,         // public pages use 'id' = slug
    slug: a.slug,
    title: a.title,
    icon: a.icon,
    description: a.description,
    items: a.items ?? [],
    detail: {
      headline: a.headline,
      body: a.body ?? [],
      whoIsItFor: a.whoIsItFor ?? [],
      outcomes: a.outcomes ?? [],
      process: a.process ?? [],
      faqs: a.faqs ?? [],
      relatedIds: a.relatedIds ?? [],
      image: a.image ?? '',
      accentColor: a.accentColor,
      textAccent: a.textAccent,
      borderAccent: a.borderAccent,
    },
  }
}

function toPayload(s: ServiceCategory, sortOrder = 0): CreateServicePayload {
  return {
    slug: s.slug,
    title: s.title,
    icon: s.icon,
    description: s.description,
    accentColor: s.detail.accentColor,
    textAccent: s.detail.textAccent,
    borderAccent: s.detail.borderAccent,
    image: s.detail.image || null,
    headline: s.detail.headline,
    body: s.detail.body,
    whoIsItFor: s.detail.whoIsItFor,
    outcomes: s.detail.outcomes,
    items: s.items.map(item => ({ name: item.name, description: item.description ?? '' })),
    process: s.detail.process,
    faqs: s.detail.faqs,
    relatedIds: s.detail.relatedIds,
    sortOrder,
  }
}

/* ─── Public API ────────────────────────────────────────────────── */

export async function loadServices(): Promise<ServiceCategory[]> {
  const data = await fetchServices()
  return data.map(toCategory)
}

export async function createService(service: ServiceCategory, sortOrder = 0): Promise<ServiceCategory> {
  const created = await apiCreateService(toPayload(service, sortOrder))
  return toCategory(created)
}

export async function updateService(id: string, changes: Partial<ServiceCategory> & { _adminId?: string }): Promise<ServiceCategory> {
  // Always fetch fresh from API to resolve the real MongoDB _id by slug
  const data = await fetchServices()
  const existing = data.find((s) => s.slug === id || s.id === changes._adminId)
  if (!existing) throw new Error(`Service "${id}" not found in database`)

  // Use the API's real id — never use a slug as a Mongo ObjectId
  const mongoId = existing.id

  const catExisting = toCategory(existing)
  const merged: ServiceCategory = {
    ...catExisting,
    ...changes,
    detail: { ...catExisting.detail, ...(changes.detail ?? {}) },
  }

  const payload: UpdateServicePayload = toPayload(merged, existing.sortOrder)
  const updated = await apiUpdateService(mongoId, payload)
  return toCategory(updated)
}

export async function deleteService(adminId: string, _slug: string): Promise<void> {
  await apiDeleteService(adminId)
}

/* ─── Icon options available in this lucide-react version ────────── */
export const ICON_OPTIONS = [
  'Globe', 'Code2', 'Brain', 'Palette', 'Bot', 'GraduationCap',
  'Layers', 'Cpu', 'Database', 'Shield', 'Zap', 'Settings',
  'BarChart', 'Users', 'Award', 'Briefcase', 'Lightbulb', 'Rocket',
] as const

/* ─── Accent colour presets ─────────────────────────────────────── */
export const ACCENT_PRESETS = [
  { label: 'Blue (Primary)', accentColor: 'bg-primary-600', textAccent: 'text-primary-600', borderAccent: 'border-l-primary-600' },
  { label: 'Sky', accentColor: 'bg-sky-600', textAccent: 'text-sky-600', borderAccent: 'border-l-sky-500' },
  { label: 'Violet', accentColor: 'bg-violet-600', textAccent: 'text-violet-600', borderAccent: 'border-l-violet-600' },
  { label: 'Rose', accentColor: 'bg-rose-600', textAccent: 'text-rose-600', borderAccent: 'border-l-rose-500' },
  { label: 'Amber', accentColor: 'bg-amber-500', textAccent: 'text-amber-600', borderAccent: 'border-l-amber-500' },
  { label: 'Emerald', accentColor: 'bg-emerald-600', textAccent: 'text-emerald-600', borderAccent: 'border-l-emerald-600' },
  { label: 'Slate', accentColor: 'bg-slate-700', textAccent: 'text-slate-700', borderAccent: 'border-l-slate-600' },
]
