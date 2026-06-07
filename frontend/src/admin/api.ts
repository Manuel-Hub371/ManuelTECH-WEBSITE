import { getAdminToken, clearAdminToken } from './auth'

const API_BASE = '/api'

function parseErrorMessage(body: unknown, fallback: string): string {
  if (!body || typeof body !== 'object') return fallback
  const message = (body as { message?: string | string[] }).message
  if (Array.isArray(message)) return message.join(', ')
  if (typeof message === 'string') return message
  return fallback
}

async function adminFetch<T>(path: string): Promise<T> {
  const token = getAdminToken()
  let res: Response

  try {
    res = await fetch(`${API_BASE}${path}`, {
      headers: {
        Authorization: token ? `Bearer ${token}` : '',
      },
    })
  } catch {
    throw new Error(
      'Cannot reach the API. Start the backend: cd backend && npm run start:dev',
    )
  }

  if (res.status === 401) {
    clearAdminToken()
    window.location.href = '/admin/login'
    throw new Error('Session expired')
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(parseErrorMessage(err, `Request failed (${res.status})`))
  }

  return res.json()
}

export async function adminLogin(email: string, password: string) {
  let res: Response

  try {
    res = await fetch(`${API_BASE}/admin/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
  } catch {
    throw new Error(
      'Cannot reach the API. Start the backend: cd backend && npm run start:dev',
    )
  }

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    if (res.status === 401) {
      throw new Error('Invalid email or password')
    }
    if (res.status === 404) {
      throw new Error(
        'Login API not found. Restart the backend (npm run start:dev in the backend folder).',
      )
    }
    throw new Error(parseErrorMessage(err, 'Login failed'))
  }

  return res.json() as Promise<{ accessToken: string; expiresIn: string }>
}

export interface AdminStats {
  contacts: number
  consultations: number
  total: number
}

export interface AdminContact {
  id: string
  name: string
  email: string
  phone: string | null
  subject: string
  message: string
  createdAt: string
}

export interface AdminConsultation {
  id: string
  name: string
  email: string
  phone: string | null
  company: string | null
  serviceInterest: string | null
  preferredDate: string | null
  message: string | null
  createdAt: string
}

export const fetchAdminStats = () => adminFetch<AdminStats>('/admin/stats')
export const fetchAdminContacts = () => adminFetch<AdminContact[]>('/admin/contacts')
export const fetchAdminConsultations = () => adminFetch<AdminConsultation[]>('/admin/consultations')

/* ── Products ─────────────────────────────────────────────────────── */

export interface AdminProduct {
  id: string
  name: string
  tagline: string
  category: string
  status: string
  description: string
  longDescription: string | null
  features: string[]
  techStack: string[]
  image: string | null
  accentColor: string
  textAccent: string
  borderAccent: string
  tryUrl: string | null
  downloadUrl: string | null
  readMoreUrl: string | null
  learnMoreUrl: string | null
  showInPortfolio: boolean
  createdAt: string
  updatedAt: string
}

export type CreateProductPayload = Omit<AdminProduct, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateProductPayload = Partial<CreateProductPayload>

/** Public — no auth token needed */
async function publicFetch<T>(path: string): Promise<T> {
  let res: Response
  try {
    res = await fetch(`${API_BASE}${path}`)
  } catch {
    throw new Error(
      'Cannot reach the API. Start the backend: cd backend && npm run start:dev',
    )
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(parseErrorMessage(err, `Request failed (${res.status})`))
  }
  return res.json()
}

export const fetchProducts = () =>
  publicFetch<AdminProduct[]>('/products')

export const fetchProduct = (id: string) =>
  publicFetch<AdminProduct>(`/products/${id}`)

async function adminMutate<T>(
  path: string,
  method: 'POST' | 'PATCH' | 'DELETE' | 'PUT',
  body?: unknown,
): Promise<T> {
  const token = getAdminToken()
  let res: Response

  try {
    res = await fetch(`${API_BASE}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : '',
      },
      body: body !== undefined ? JSON.stringify(body) : undefined,
    })
  } catch {
    throw new Error(
      'Cannot reach the API. Start the backend: cd backend && npm run start:dev',
    )
  }

  if (res.status === 401) {
    clearAdminToken()
    window.location.href = '/admin/login'
    throw new Error('Session expired')
  }

  if (res.status === 204) return undefined as T

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(parseErrorMessage(err, `Request failed (${res.status})`))
  }

  return res.json()
}

export const apiCreateProduct = (payload: CreateProductPayload) =>
  adminMutate<AdminProduct>('/products', 'POST', payload)

export const apiUpdateProduct = (id: string, payload: UpdateProductPayload) =>
  adminMutate<AdminProduct>(`/products/${id}`, 'PATCH', payload)

export const apiDeleteProduct = (id: string) =>
  adminMutate<void>(`/products/${id}`, 'DELETE')

/* ── Case Studies ─────────────────────────────────────────────────── */

export interface AdminCaseStudy {
  id: string
  title: string
  client: string
  category: string
  industry: string
  description: string
  challenge: string
  solution: string
  results: string[]
  techStack: string[]
  image: string | null
  createdAt: string
  updatedAt: string
}

export type CreateCaseStudyPayload = Omit<AdminCaseStudy, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateCaseStudyPayload = Partial<CreateCaseStudyPayload>

export const fetchCaseStudies = () =>
  publicFetch<AdminCaseStudy[]>('/case-studies')

export const fetchCaseStudy = (id: string) =>
  publicFetch<AdminCaseStudy>(`/case-studies/${id}`)

export const apiCreateCaseStudy = (payload: CreateCaseStudyPayload) =>
  adminMutate<AdminCaseStudy>('/case-studies', 'POST', payload)

export const apiUpdateCaseStudy = (id: string, payload: UpdateCaseStudyPayload) =>
  adminMutate<AdminCaseStudy>(`/case-studies/${id}`, 'PATCH', payload)

export const apiDeleteCaseStudy = (id: string) =>
  adminMutate<void>(`/case-studies/${id}`, 'DELETE')

/* ── About ────────────────────────────────────────────────────────── */

export interface AdminCompanyInfo {
  id: string
  companyName: string
  tagline: string
  heroDescription: string
  storyParagraph1: string
  storyParagraph2: string
  storyParagraph3: string
  storyImage: string
  founderQuote: string
  founderName: string
  mission: string
  vision: string
  statYears: string
  statProjects: string
  statClients: string
  statCountries: string
  hiringEmail: string
  hiringText: string
  /* Contact */
  contactEmail: string
  contactPhone: string
  contactWhatsapp: string
  contactLocation: string
  contactMapEmbed: string
  businessHours: string
  /* Social */
  socialLinkedin: string
  socialTwitter: string
  socialInstagram: string
  socialFacebook: string
  socialYoutube: string
  socialGithub: string
  updatedAt: string
}

export interface AdminTeamMember {
  id: string
  name: string
  role: string
  bio: string
  image: string | null
  github: string | null
  linkedin: string | null
  twitter: string | null
  instagram: string | null
  whatsapp: string | null
  phone: string | null
  portfolio: string | null
  email: string | null
  sortOrder: number
  createdAt: string
  updatedAt: string
}

export type UpdateCompanyInfoPayload = Partial<Omit<AdminCompanyInfo, 'id' | 'updatedAt'>>
export type CreateTeamMemberPayload = Omit<AdminTeamMember, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateTeamMemberPayload = Partial<CreateTeamMemberPayload>

export const fetchCompanyInfo = () =>
  publicFetch<AdminCompanyInfo>('/about/info')

export const fetchTeamMembers = () =>
  publicFetch<AdminTeamMember[]>('/about/team')

export const apiUpdateCompanyInfo = (payload: UpdateCompanyInfoPayload) =>
  adminMutate<AdminCompanyInfo>('/about/info', 'PUT', payload)

export const apiCreateTeamMember = (payload: CreateTeamMemberPayload) =>
  adminMutate<AdminTeamMember>('/about/team', 'POST', payload)

export const apiUpdateTeamMember = (id: string, payload: UpdateTeamMemberPayload) =>
  adminMutate<AdminTeamMember>(`/about/team/${id}`, 'PATCH', payload)

export const apiDeleteTeamMember = (id: string) =>
  adminMutate<void>(`/about/team/${id}`, 'DELETE')

/* ── Services ─────────────────────────────────────────────────────── */

export interface AdminService {
  id: string
  slug: string
  title: string
  icon: string
  description: string
  accentColor: string
  textAccent: string
  borderAccent: string
  image: string | null
  headline: string
  body: string[]
  whoIsItFor: string[]
  outcomes: string[]
  items: { name: string; description: string }[]
  process: { title: string; desc: string }[]
  faqs: { q: string; a: string }[]
  relatedIds: string[]
  sortOrder: number
  createdAt: string
  updatedAt: string
}

export type CreateServicePayload = Omit<AdminService, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateServicePayload = Partial<CreateServicePayload>

export const fetchServices = () =>
  publicFetch<AdminService[]>('/services')

export const fetchServiceBySlug = (slug: string) =>
  publicFetch<AdminService>(`/services/by-slug/${slug}`)

export const apiCreateService = (payload: CreateServicePayload) =>
  adminMutate<AdminService>('/services', 'POST', payload)

export const apiUpdateService = (id: string, payload: UpdateServicePayload) =>
  adminMutate<AdminService>(`/services/${id}`, 'PATCH', payload)

export const apiDeleteService = (id: string) =>
  adminMutate<void>(`/services/${id}`, 'DELETE')

/* ── Blog ─────────────────────────────────────────────────────────── */

export interface AdminBlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  body: string[]
  category: string
  tags: string[]
  author: string
  authorRole: string
  authorImage: string
  publishedAt: string
  readTime: string
  image: string
  featured: boolean
  createdAt: string
  updatedAt: string
}

export type CreateBlogPostPayload = Omit<AdminBlogPost, 'id' | 'createdAt' | 'updatedAt'>
export type UpdateBlogPostPayload = Partial<CreateBlogPostPayload>

export const fetchBlogPosts = () =>
  publicFetch<AdminBlogPost[]>('/blog')

export const fetchBlogPost = (id: string) =>
  publicFetch<AdminBlogPost>(`/blog/${id}`)

export const fetchBlogPostBySlug = (slug: string) =>
  publicFetch<AdminBlogPost>(`/blog/by-slug/${slug}`)

export const apiCreateBlogPost = (payload: CreateBlogPostPayload) =>
  adminMutate<AdminBlogPost>('/blog', 'POST', payload)

export const apiUpdateBlogPost = (id: string, payload: UpdateBlogPostPayload) =>
  adminMutate<AdminBlogPost>(`/blog/${id}`, 'PATCH', payload)

export const apiDeleteBlogPost = (id: string) =>
  adminMutate<void>(`/blog/${id}`, 'DELETE')

/* ── Legal Docs ───────────────────────────────────────────────────── */

export interface AdminLegalSection {
  heading: string
  paragraphs: string[]
}

export interface AdminLegalDoc {
  id: string
  type: string
  title: string
  lastUpdated: string
  sections: AdminLegalSection[]
  createdAt: string
  updatedAt: string
}

export interface UpdateLegalDocPayload {
  title: string
  sections: AdminLegalSection[]
}

export const fetchLegalDoc = (type: string) =>
  publicFetch<AdminLegalDoc>(`/legal/${type}`)

export const apiUpdateLegalDoc = (type: string, payload: UpdateLegalDocPayload) =>
  adminMutate<AdminLegalDoc>(`/legal/${type}`, 'PUT', payload)


