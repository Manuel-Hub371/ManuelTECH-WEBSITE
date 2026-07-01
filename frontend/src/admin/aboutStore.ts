/**
 * About store — API-first, no localStorage fallback.
 * Manages company info (singleton) and team members.
 */
import {
  fetchCompanyInfo,
  fetchTeamMembers,
  apiUpdateCompanyInfo,
  apiCreateTeamMember,
  apiUpdateTeamMember,
  apiDeleteTeamMember,
  type AdminCompanyInfo,
  type AdminTeamMember,
  type UpdateCompanyInfoPayload,
  type CreateTeamMemberPayload,
  type UpdateTeamMemberPayload,
} from './api'
import { coreValues } from '../data/team'

/* ─── Types ─────────────────────────────────────────────────────── */

export interface CompanyInfoData {
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
}

export interface TeamMemberData {
  id: string
  name: string
  role: string
  bio: string
  image: string
  github: string
  linkedin: string
  twitter: string
  instagram: string
  whatsapp: string
  phone: string
  portfolio: string
  email: string
  sortOrder: number
}

export { coreValues }

/* ─── Default values (kept as reference/fallback in components) ─── */

export const defaultCompanyInfo: CompanyInfoData = {
  companyName:     '',
  tagline:         '',
  heroDescription: '',
  storyParagraph1: '',
  storyParagraph2: '',
  storyParagraph3: '',
  storyImage:      '',
  founderQuote:    '',
  founderName:     '',
  mission:         '',
  vision:          '',
  statYears:       '',
  statProjects:    '',
  statClients:     '',
  statCountries:   '',
  hiringEmail:     '',
  hiringText:      '',
  contactEmail:    '',
  contactPhone:    '',
  contactWhatsapp: '',
  contactLocation: '',
  contactMapEmbed: '',
  businessHours:   '',
  socialLinkedin:  '',
  socialTwitter:   '',
  socialInstagram: '',
  socialFacebook:  '',
  socialYoutube:   '',
  socialGithub:    '',
}

/* ─── Adapters ──────────────────────────────────────────────────── */

function toInfo(a: AdminCompanyInfo): CompanyInfoData {
  return {
    companyName:     a.companyName,
    tagline:         a.tagline,
    heroDescription: a.heroDescription,
    storyParagraph1: a.storyParagraph1,
    storyParagraph2: a.storyParagraph2,
    storyParagraph3: a.storyParagraph3,
    storyImage:      a.storyImage,
    founderQuote:    a.founderQuote,
    founderName:     a.founderName,
    mission:         a.mission,
    vision:          a.vision,
    statYears:       a.statYears,
    statProjects:    a.statProjects,
    statClients:     a.statClients,
    statCountries:   a.statCountries,
    hiringEmail:     a.hiringEmail,
    hiringText:      a.hiringText,
    contactEmail:    a.contactEmail,
    contactPhone:    a.contactPhone,
    contactWhatsapp: a.contactWhatsapp,
    contactLocation: a.contactLocation,
    contactMapEmbed: a.contactMapEmbed,
    businessHours:   a.businessHours,
    socialLinkedin:  a.socialLinkedin,
    socialTwitter:   a.socialTwitter,
    socialInstagram: a.socialInstagram,
    socialFacebook:  a.socialFacebook,
    socialYoutube:   a.socialYoutube,
    socialGithub:    a.socialGithub,
  }
}

function toMember(a: AdminTeamMember): TeamMemberData {
  return {
    id:        a.id,
    name:      a.name,
    role:      a.role,
    bio:       a.bio,
    image:     a.image     ?? '',
    github:    a.github    ?? '',
    linkedin:  a.linkedin  ?? '',
    twitter:   a.twitter   ?? '',
    instagram: a.instagram ?? '',
    whatsapp:  a.whatsapp  ?? '',
    phone:     a.phone     ?? '',
    portfolio: a.portfolio ?? '',
    email:     a.email     ?? '',
    sortOrder: a.sortOrder,
  }
}

/* ─── Public API ────────────────────────────────────────────────── */

export async function loadCompanyInfo(): Promise<CompanyInfoData> {
  const data = await fetchCompanyInfo()
  return toInfo(data)
}

export async function saveCompanyInfo(info: CompanyInfoData): Promise<CompanyInfoData> {
  const payload: UpdateCompanyInfoPayload = { ...info }
  const updated = await apiUpdateCompanyInfo(payload)
  return toInfo(updated)
}

export async function loadTeamMembers(): Promise<TeamMemberData[]> {
  const data = await fetchTeamMembers()
  return data.map(toMember)
}

export async function createTeamMember(member: Omit<TeamMemberData, 'id'>): Promise<TeamMemberData> {
  const payload: CreateTeamMemberPayload = {
    ...member,
    image:     member.image     || null,
    github:    member.github    || null,
    linkedin:  member.linkedin  || null,
    twitter:   member.twitter   || null,
    instagram: member.instagram || null,
    whatsapp:  member.whatsapp  || null,
    phone:     member.phone     || null,
    portfolio: member.portfolio || null,
    email:     member.email     || null,
  }
  const created = await apiCreateTeamMember(payload)
  return toMember(created)
}

export async function updateTeamMember(id: string, changes: Partial<TeamMemberData>): Promise<TeamMemberData> {
  const payload: UpdateTeamMemberPayload = {}
  const fields = ['name','role','bio','image','github','linkedin','twitter','instagram','whatsapp','phone','portfolio','email','sortOrder'] as const
  for (const f of fields) {
    if (changes[f] !== undefined) {
      (payload as Record<string, unknown>)[f] = changes[f] || (f === 'sortOrder' ? 0 : null)
    }
  }
  const updated = await apiUpdateTeamMember(id, payload)
  return toMember(updated)
}

export async function deleteTeamMember(id: string): Promise<void> {
  await apiDeleteTeamMember(id)
}
