/**
 * Shared hook – fetches company info once and caches it module-level.
 * Returns null while loading or if the API call fails.
 * Rule: NEVER fall back to hardcoded/static data.
 */
import { useState, useEffect } from 'react'
import { loadCompanyInfo, type CompanyInfoData } from '../admin/aboutStore'

let _cache: CompanyInfoData | null = null
const _listeners: Array<(info: CompanyInfoData | null) => void> = []

function subscribe(fn: (info: CompanyInfoData | null) => void) {
  _listeners.push(fn)
  return () => {
    const i = _listeners.indexOf(fn)
    if (i !== -1) _listeners.splice(i, 1)
  }
}

async function ensureLoaded(): Promise<CompanyInfoData> {
  if (_cache !== null) return _cache
  const data = await loadCompanyInfo()
  _cache = data
  _listeners.forEach((fn) => fn(data))
  return data
}

/**
 * Returns the live company info from the API.
 * While loading or on error returns null — components must handle null gracefully.
 */
export function useCompanyInfo(): CompanyInfoData | null {
  const [info, setInfo] = useState<CompanyInfoData | null>(_cache ?? null)
  useEffect(() => {
    const unsub = subscribe(setInfo)
    // On API failure keep null — never show static fallback data
    ensureLoaded().then(setInfo).catch(() => {})
    return unsub
  }, [])
  return info
}
