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
  companyName:     'ManuelTECH',
  tagline:         'We build technology. We teach it. We stand behind it.',
  heroDescription: 'ManuelTECH is a full-service technology company delivering web development, custom software, AI agents, robotics, creative design, and hands-on training — all under one roof, with one accountable team.',
  storyParagraph1: 'ManuelTECH was founded with a clear mission: make enterprise-grade technology accessible to organizations of every size. What began as custom software projects for local businesses has grown into a full-service technology firm spanning six disciplines.',
  storyParagraph2: 'Today we serve clients in education, healthcare, manufacturing, retail, and finance — delivering solutions that are secure, scalable, and built for the long term. We don\'t just build and leave; we train your team, support your systems, and grow with you.',
  storyParagraph3: 'Our unique combination of deep technical capability and a genuine training arm means we\'re not just a vendor — we\'re invested in building lasting capability within every organization we serve.',
  storyImage:      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=900&q=80',
  founderQuote:    'Technology should solve real problems — not create new ones.',
  founderName:     'Manuel, Founder & CEO',
  mission:         'Empower every organization with technology that actually works.',
  vision:          'The most trusted technology partner for digital transformation across Africa and global markets.',
  statYears:       '',
  statProjects:    '',
  statClients:     '',
  statCountries:   '',
  hiringEmail:     'careers@manueltech.com',
  hiringText:      'Talented engineers, designers, and educators — we\'d love to hear from you.',
  contactEmail:    'hello@manueltech.com',
  contactPhone:    '',
  contactWhatsapp: '',
  contactLocation: 'Tech Innovation Hub, Your City',
  contactMapEmbed: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.9663095343!2d-74.004258!3d40.740162!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDDCsDQ0JzI0LjYiTiA3NMKwMDAnMTUuMyJX!5e0!3m2!1sen!2sus!4v1234567890',
  businessHours:   'Mon – Fri, 9:00 AM – 6:00 PM',
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
