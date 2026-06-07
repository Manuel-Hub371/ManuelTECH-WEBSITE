const API_BASE =
  import.meta.env.VITE_API_BASE_URL ||
  (import.meta.env.PROD ? 'https://manueltech.onrender.com/api' : '/api')

export interface ContactPayload {
  name: string
  email: string
  phone?: string
  subject: string
  message: string
}

export interface ConsultationPayload {
  name: string
  email: string
  phone?: string
  company?: string
  serviceInterest?: string
  preferredDate?: string
  message?: string
}

async function post<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ message: 'Request failed' }))
    throw new Error(err.message || `HTTP ${res.status}`)
  }

  return res.json()
}

export const submitContact = (data: ContactPayload) =>
  post<{ success: boolean; message: string }>('/contact', data)

export const submitConsultation = (data: ConsultationPayload) =>
  post<{ success: boolean; message: string }>('/consultation', data)
