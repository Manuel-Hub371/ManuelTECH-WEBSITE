import {
  fetchLegalDoc,
  apiUpdateLegalDoc,
  type AdminLegalDoc,
  type UpdateLegalDocPayload,
} from './api'

export interface LegalSection {
  heading: string
  paragraphs: string[]
}

export interface LegalDoc {
  id: string
  type: string
  title: string
  lastUpdated: string
  sections: LegalSection[]
}

function toLegalDoc(a: AdminLegalDoc): LegalDoc {
  return {
    id: a.id,
    type: a.type,
    title: a.title,
    lastUpdated: a.lastUpdated,
    sections: a.sections ?? [],
  }
}

export async function loadLegalDoc(type: string): Promise<LegalDoc> {
  const data = await fetchLegalDoc(type)
  return toLegalDoc(data)
}

export async function updateLegalDoc(type: string, title: string, sections: LegalSection[]): Promise<LegalDoc> {
  const payload: UpdateLegalDocPayload = {
    title,
    sections,
  }
  const updated = await apiUpdateLegalDoc(type, payload)
  return toLegalDoc(updated)
}
