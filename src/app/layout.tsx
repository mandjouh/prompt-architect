import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from './context/AuthContext'

const APP_URL = 'https://www.prompt-architect.io'

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: 'Prompt Architect — Génère des prompts experts en 2 minutes',
    template: '%s | Prompt Architect',
  },
  description: 'Transforme ta demande simple en prompt expert, structuré et optimisé par IA. 4 modules, 20 cas d\'usage, propulsé par Claude. Gratuit.',
  verification: {
    google: 'w13Wcx86JARneQeGERgu7-IoeydWmiDzV6Tu4QpwGSM',
  },
  keywords: [
    'prompt engineering', 'générateur de prompts', 'prompt IA', 'ChatGPT prompt',
    'Claude prompt', 'prompt expert', 'prompt architect', 'prompt business',
    'prompt marketing', 'prompt développement', 'optimiser prompt IA',
  ],
  authors: [{ name: 'Prompt Architect', url: APP_URL }],
  creator: 'Prompt Architect',
  publisher: 'Prompt Architect',
  
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    url: APP_URL,
    siteName: 'Prompt Architect',
    title: 'Prompt Architect — Génère des prompts experts en 2 minutes',
    description: 'Transforme ta demande simple en prompt expert, structuré et optimisé par IA. 4 modules, 20 cas d\'usage, propulsé par Claude.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Prompt Architect — Générateur de prompts IA experts',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prompt Architect — Génère des prompts experts en 2 minutes',
    description: 'Transforme ta demande simple en prompt expert par IA. Gratuit.',
    images: ['/og-image.png'],
    creator: '@promptarchitect',
  },
  alternates: {
    canonical: APP_URL,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#07090C" />
      </head>
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
