import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Mes Prompts Sauvegardés',
  description: "Accédez à tous vos prompts générés et sauvegardés sur Prompt Architect.",
  robots: { index: false, follow: false }, // Page privée
}

export default function MyPromptsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
