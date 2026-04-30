// À ajouter dans app/faq/page.tsx si vous le convertissez en Server Component
// OU dans un fichier app/faq/metadata.ts séparé

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ — Questions fréquentes | Prompt Architect",
  description:
    "Retrouvez les réponses aux questions les plus fréquentes sur Prompt Architect : générations, plans, paiements, compte et fonctionnalités.",
  openGraph: {
    title: "FAQ — Questions fréquentes | Prompt Architect",
    description:
      "Retrouvez les réponses aux questions les plus fréquentes sur Prompt Architect.",
    url: "https://prompt-architect.io/faq",
    siteName: "Prompt Architect",
    type: "website",
  },
  alternates: {
    canonical: "https://prompt-architect.io/faq",
  },
};
