import type { Metadata } from 'next'
import { ReactNode } from 'react'

export const metadata: Metadata = {
  title: 'Blog — Prompt Engineering et IA',
  description: "Guides, tutoriels et conseils pour maîtriser le prompt engineering et tirer le meilleur de Claude, ChatGPT et les IA en 2026.",
  openGraph: {
    title: 'Blog Prompt Architect — Prompt Engineering et IA',
    description: "Guides et tutoriels pour maîtriser le prompt engineering en 2026.",
  },
}

export default function BlogLayout({ children }: { children: ReactNode }) {
  return <>{children}</>
}
