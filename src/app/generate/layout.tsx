import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Générateur de Prompts IA Expert',
  description: "Génère des prompts experts en 2 minutes. 10 modules spécialisés — Business, Contenu Viral, Juridique, Finance, Personal Branding et plus. Propulsé par Claude.",
  openGraph: {
    title: 'Générateur de Prompts IA — Prompt Architect',
    description: "Génère des prompts experts en 2 minutes avec Claude.",
    type: 'website',
  },
}

export default function GenerateLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
