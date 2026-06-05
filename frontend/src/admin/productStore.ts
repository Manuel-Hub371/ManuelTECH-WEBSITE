/**
 * Product store — API-driven without localStorage fallback.
 */
import {
  fetchProducts,
  apiCreateProduct,
  apiUpdateProduct,
  apiDeleteProduct,
  type AdminProduct,
  type CreateProductPayload,
  type UpdateProductPayload,
} from './api'
import type { Product } from '../data/products'

/* ─── Type adapter ──────────────────────────────────────────────── */

function toProduct(p: AdminProduct): Product {
  return {
    id:              p.id,
    name:            p.name,
    tagline:         p.tagline,
    category:        p.category as Product['category'],
    status:          p.status as Product['status'],
    description:     p.description,
    longDescription: p.longDescription ?? '',
    features:        p.features ?? [],
    techStack:       p.techStack ?? [],
    image:           p.image ?? '',
    accentColor:     p.accentColor,
    textAccent:      p.textAccent,
    borderAccent:    p.borderAccent,
    tryUrl:          p.tryUrl ?? '',
    downloadUrl:     p.downloadUrl ?? '',
    readMoreUrl:     p.readMoreUrl ?? '',
    learnMoreUrl:    p.learnMoreUrl ?? '',
    showInPortfolio: p.showInPortfolio,
  }
}

function toPayload(p: Omit<Product, 'id'>): CreateProductPayload {
  return {
    name:            p.name,
    tagline:         p.tagline,
    category:        p.category,
    status:          p.status,
    description:     p.description,
    longDescription: p.longDescription || null,
    features:        p.features,
    techStack:       p.techStack,
    image:           p.image || null,
    accentColor:     p.accentColor,
    textAccent:      p.textAccent,
    borderAccent:    p.borderAccent,
    tryUrl:          p.tryUrl || null,
    downloadUrl:     p.downloadUrl || null,
    readMoreUrl:     p.readMoreUrl || null,
    learnMoreUrl:    p.learnMoreUrl || null,
    showInPortfolio: p.showInPortfolio,
  }
}

/* ─── Public API ────────────────────────────────────────────────── */

export async function loadProducts(): Promise<Product[]> {
  const data = await fetchProducts()
  return data.map(toProduct)
}

export async function createProduct(product: Product): Promise<Product> {
  const { id: _id, ...rest } = product
  const created = await apiCreateProduct(toPayload(rest))
  return toProduct(created)
}

export async function updateProduct(id: string, changes: Partial<Product>): Promise<Product> {
  const payload: UpdateProductPayload = {}
  if (changes.name            !== undefined) payload.name            = changes.name
  if (changes.tagline         !== undefined) payload.tagline         = changes.tagline
  if (changes.category        !== undefined) payload.category        = changes.category
  if (changes.status          !== undefined) payload.status          = changes.status
  if (changes.description     !== undefined) payload.description     = changes.description
  if (changes.longDescription !== undefined) payload.longDescription = changes.longDescription || null
  if (changes.features        !== undefined) payload.features        = changes.features
  if (changes.techStack       !== undefined) payload.techStack       = changes.techStack
  if (changes.image           !== undefined) payload.image           = changes.image || null
  if (changes.accentColor     !== undefined) payload.accentColor     = changes.accentColor
  if (changes.textAccent      !== undefined) payload.textAccent      = changes.textAccent
  if (changes.borderAccent    !== undefined) payload.borderAccent    = changes.borderAccent
  if (changes.tryUrl          !== undefined) payload.tryUrl          = changes.tryUrl || null
  if (changes.downloadUrl     !== undefined) payload.downloadUrl     = changes.downloadUrl || null
  if (changes.readMoreUrl     !== undefined) payload.readMoreUrl     = changes.readMoreUrl || null
  if (changes.learnMoreUrl    !== undefined) payload.learnMoreUrl    = changes.learnMoreUrl || null
  if (changes.showInPortfolio !== undefined) payload.showInPortfolio = changes.showInPortfolio

  const updated = await apiUpdateProduct(id, payload)
  return toProduct(updated)
}

export async function deleteProduct(id: string): Promise<void> {
  await apiDeleteProduct(id)
}

export async function togglePortfolioVisibility(id: string, current: boolean): Promise<Product> {
  return updateProduct(id, { showInPortfolio: !current })
}

/* ─── Helpers ───────────────────────────────────────────────────── */

export function generateProductId(): string {
  return `prod-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export function accentFromCategory(
  category: string,
): Pick<Product, 'accentColor' | 'textAccent' | 'borderAccent'> {
  const map: Record<string, Pick<Product, 'accentColor' | 'textAccent' | 'borderAccent'>> = {
    AI:                { accentColor: 'bg-violet-600',  textAccent: 'text-violet-600',  borderAccent: 'border-l-violet-600' },
    Software:          { accentColor: 'bg-primary-600', textAccent: 'text-primary-600', borderAccent: 'border-l-primary-600' },
    Fintech:           { accentColor: 'bg-emerald-600', textAccent: 'text-emerald-600', borderAccent: 'border-l-emerald-600' },
    'Developer Tools': { accentColor: 'bg-amber-500',   textAccent: 'text-amber-600',   borderAccent: 'border-l-amber-500' },
  }
  return map[category] ?? map['Software']
}
