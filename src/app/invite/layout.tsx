import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Parrainage — 5 crédits offerts à toi et ton ami',
  description: "Invite un ami sur Prompt Architect et gagnez 5 crédits chacun. Simple, gratuit, immédiat. Programme de parrainage sans limite.",
  openGraph: {
    title: 'Parrainage Prompt Architect — 5 crédits offerts',
    description: "Invite un ami et gagnez 5 crédits chacun. Inscription gratuite.",
  },
}

export default function InviteLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
