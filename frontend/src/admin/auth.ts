const TOKEN_KEY = 'manueltech_admin_token'

export function getAdminToken(): string | null {
  return localStorage.getItem(TOKEN_KEY)
}

export function setAdminToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token)
}

export function clearAdminToken(): void {
  localStorage.removeItem(TOKEN_KEY)
}

export function isAdminAuthenticated(): boolean {
  return Boolean(getAdminToken())
}
