'use client'

import { useEffect } from 'react'

export default function PWARegister() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then(() => console.log('SW enregistré'))
        .catch(err => console.log('SW erreur:', err))
    }
  }, [])

  return null
}
