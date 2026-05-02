'use client'

import { useEffect } from 'react'

// Pour activer Tawk.to :
// 1. Créer un compte sur tawk.to
// 2. Récupérer ton Property ID et Widget ID
// 3. Remplacer TAWK_PROPERTY_ID et TAWK_WIDGET_ID
const TAWK_PROPERTY_ID = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID
const TAWK_WIDGET_ID = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID ?? 'default'

export default function TawkTo() {
  useEffect(() => {
    if (!TAWK_PROPERTY_ID) return // Ne pas charger si pas configuré

    const script = document.createElement('script')
    script.async = true
    script.src = `https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}`
    script.charset = 'UTF-8'
    script.setAttribute('crossorigin', '*')
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return null
}
