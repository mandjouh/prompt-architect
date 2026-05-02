import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Tarifs — Plans et Crédits Pay-as-you-go',
  description: "Plans Prompt Architect à partir de 0$/mois. Abonnements Standard, Pro, Premium ou packs crédits flexibles. Commence gratuitement avec 5 générations.",
  openGraph: {
    title: 'Tarifs Prompt Architect — Plans et Crédits',
    description: "Plans à partir de 0$/mois. Commence gratuitement.",
  },
}

export default function PricingLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
