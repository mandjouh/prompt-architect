'use client'

import { useEffect } from 'react'
import { trackEvent } from '../lib/plausible'

// Écoute les clics sur les éléments avec data-track
// Compatible avec les Server Components (pas besoin de 'use client' sur la landing)
export default function PlausibleTracker() {
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-track]') as HTMLElement | null
      if (!target) return
      const event = target.dataset.track
      const props = target.dataset.trackProps
      if (event) {
        trackEvent(event, props ? JSON.parse(props) : undefined)
      }
    }
    document.addEventListener('click', handler)
    return () => document.removeEventListener('click', handler)
  }, [])

  return null
}
