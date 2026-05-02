import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Mon Profil',
  description: "Gérez votre compte Prompt Architect — solde de crédits, historique, abonnement et paramètres.",
  robots: { index: false, follow: false }, // Page privée
}

export default function ProfileLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
