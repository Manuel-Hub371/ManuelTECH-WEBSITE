/**
 * Case Study store — API-driven without localStorage fallback.
 */
import {
  fetchCaseStudies,
  apiCreateCaseStudy,
  apiUpdateCaseStudy,
  apiDeleteCaseStudy,
  type AdminCaseStudy,
  type CreateCaseStudyPayload,
  type UpdateCaseStudyPayload,
} from './api'
import type { CaseStudy } from '../data/products'

/* ─── Type adapters ─────────────────────────────────────────────── */

function toCaseStudy(s: AdminCaseStudy): CaseStudy {
  return {
    id:          s.id,
    title:       s.title,
    client:      s.client,
    category:    s.category,
    industry:    s.industry,
    description: s.description,
    challenge:   s.challenge,
    solution:    s.solution,
    results:     s.results   ?? [],
    techStack:   s.techStack ?? [],
    image:       s.image     ?? '',
  }
}

function toPayload(s: Omit<CaseStudy, 'id'>): CreateCaseStudyPayload {
  return {
    title:       s.title,
    client:      s.client,
    category:    s.category,
    industry:    s.industry,
    description: s.description,
    challenge:   s.challenge,
    solution:    s.solution,
    results:     s.results,
    techStack:   s.techStack,
    image:       s.image || null,
  }
}

/* ─── Public API ────────────────────────────────────────────────── */

export async function loadCaseStudies(): Promise<CaseStudy[]> {
  const data = await fetchCaseStudies()
  return data.map(toCaseStudy)
}

export async function createCaseStudy(study: CaseStudy): Promise<CaseStudy> {
  const { id: _id, ...rest } = study
  const created = await apiCreateCaseStudy(toPayload(rest))
  return toCaseStudy(created)
}

export async function updateCaseStudy(
  id: string,
  changes: Partial<CaseStudy>,
): Promise<CaseStudy> {
  const payload: UpdateCaseStudyPayload = {}
  if (changes.title       !== undefined) payload.title       = changes.title
  if (changes.client      !== undefined) payload.client      = changes.client
  if (changes.category    !== undefined) payload.category    = changes.category
  if (changes.industry    !== undefined) payload.industry    = changes.industry
  if (changes.description !== undefined) payload.description = changes.description
  if (changes.challenge   !== undefined) payload.challenge   = changes.challenge
  if (changes.solution    !== undefined) payload.solution    = changes.solution
  if (changes.results     !== undefined) payload.results     = changes.results
  if (changes.techStack   !== undefined) payload.techStack   = changes.techStack
  if (changes.image       !== undefined) payload.image       = changes.image || null

  const updated = await apiUpdateCaseStudy(id, payload)
  return toCaseStudy(updated)
}

export async function deleteCaseStudy(id: string): Promise<void> {
  await apiDeleteCaseStudy(id)
}

export function generateCaseStudyId(): string {
  return `cs-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`
}

export const CATEGORIES = [
  'Web Development',
  'Software Development',
  'AI & Automation',
  'Creative Services',
  'Robotics',
  'Training & Education',
] as const

export const INDUSTRIES = [
  'Healthcare',
  'Education',
  'Finance',
  'Retail',
  'Manufacturing',
  'Real Estate',
  'Logistics',
  'Technology',
  'Non-Profit',
  'Other',
] as const
