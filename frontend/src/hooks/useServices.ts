/**
 * Shared hook – fetches services once and caches them in a module-level
 * variable so every component that calls this in the same session reuses
 * the same data without extra network requests.
 */
import { useState, useEffect } from 'react'
import { loadServices } from '../admin/serviceStore'
import { serviceCategories } from '../data/services'
import type { ServiceCategory } from '../data/services'

let _cache: ServiceCategory[] | null = null
const _listeners: Array<(s: ServiceCategory[]) => void> = []

function subscribe(fn: (s: ServiceCategory[]) => void) {
  _listeners.push(fn)
  return () => {
    const i = _listeners.indexOf(fn)
    if (i !== -1) _listeners.splice(i, 1)
  }
}

async function ensureLoaded() {
  if (_cache !== null) return _cache
  const data = await loadServices()
  _cache = data
  _listeners.forEach((fn) => fn(data))
  return data
}

export function useServices(): ServiceCategory[] {
  const [services, setServices] = useState<ServiceCategory[]>(_cache ?? [])
  useEffect(() => {
    const unsub = subscribe(setServices)
    ensureLoaded()
      .then(setServices)
      .catch(() => {
        if (_cache === null) {
          setServices(serviceCategories)
        }
      })
    return unsub
  }, [])
  return services
}

export function numberToWord(n: number, capitalize = false): string {
  const words = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten']
  const word = words[n] || String(n)
  if (capitalize && word.length > 0) {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }
  return word
}

/**
 * Build a colour-lookup map from the live service list so badge/pill
 * components can resolve a category name -> Tailwind classes.
 * Falls back to a default if the service isn't found.
 */
export function buildCategoryColorMap(
  services: ServiceCategory[],
): Record<string, string> {
  const map: Record<string, string> = {}
  for (const s of services) {
    const bg   = s.detail.accentColor  || 'bg-primary-600'
    const text = s.detail.textAccent   || 'text-primary-600'
    // Convert bg-{color}-600 -> bg-{color}-50 for light pill backgrounds
    const lightBg = bg.replace(/\d+$/, '50')
    map[s.title] = `${lightBg} ${text}`
  }
  return map
}

export function buildBorderAccentMap(
  services: ServiceCategory[],
): Record<string, string> {
  const map: Record<string, string> = {}
  for (const s of services) {
    map[s.title] = s.detail.borderAccent || 'border-l-primary-600'
  }
  return map
}
