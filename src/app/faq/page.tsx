"use client";

import { useState } from "react";
import Link from "next/link";

const faqs = [
  {
    category: "Général",
    items: [
      {
        q: "Qu'est-ce que Prompt Architect ?",
        a: "Prompt Architect est un outil SaaS qui vous aide à créer des prompts optimisés pour l'IA. En quelques secondes, notre moteur génère des prompts clairs, précis et efficaces adaptés à votre contexte.",
      },
      {
        q: "Comment ça fonctionne ?",
        a: "Décrivez simplement ce que vous souhaitez accomplir, choisissez votre type de prompt, et notre IA (Claude d'Anthropic) génère un prompt professionnel prêt à l'emploi. Vous pouvez ensuite le copier, le sauvegarder ou l'affiner.",
      },
    ],
  },
  {
    category: "Compte & Crédits",
    items: [
      {
        q: "Qu'est-ce qu'une génération ?",
        a: "Une génération correspond à la création d'un prompt par notre IA. Chaque fois que vous cliquez sur « Générer », une génération est consommée depuis votre quota mensuel.",
      },
      {
        q: "Les crédits non utilisés sont-ils reportés ?",
        a: "Non, les générations non utilisées ne sont pas reportées d'un mois à l'autre. Votre quota se renouvelle automatiquement à chaque début de cycle de facturation.",
      },
      {
        q: "Que se passe-t-il si j'atteins ma limite mensuelle ?",
        a: "Une fois votre quota épuisé, vous ne pouvez plus générer de nouveaux prompts jusqu'au renouvellement de votre cycle. Vous pouvez à tout moment passer à un plan supérieur pour obtenir plus de générations immédiatement.",
      },
    ],
  },
  {
    category: "Plans & Paiements",
    items: [
      {
        q: "Puis-je changer de plan à tout moment ?",
        a: "Oui, vous pouvez upgrader ou downgrader votre plan à tout moment depuis votre profil. Les changements prennent effet immédiatement pour les upgrades, et au prochain cycle de facturation pour les downgrades.",
      },
      {
        q: "Comment fonctionne le remboursement ?",
        a: "Nous offrons une politique de remboursement sous 7 jours après l'achat si vous n'êtes pas satisfait. Consultez notre page remboursement pour les détails complets.",
      },
      {
        q: "Quels moyens de paiement acceptez-vous ?",
        a: "Nous acceptons les principales cartes bancaires (Visa, Mastercard, American Express) via Lemon Squeezy, notre partenaire de paiement sécurisé.",
      },
    ],
  },
  {
    category: "Technique",
    items: [
      {
        q: "Mes prompts sont-ils sauvegardés ?",
        a: "Oui, tous vos prompts générés sont automatiquement sauvegardés dans votre bibliothèque personnelle, accessible depuis « Mes prompts ». Vous pouvez les retrouver, les copier ou les supprimer à tout moment.",
      },
      {
        q: "L'application fonctionne-t-elle sur mobile ?",
        a: "Prompt Architect est entièrement responsive et fonctionne sur tous les appareils : ordinateur, tablette et smartphone. Une expérience optimisée est disponible sur iOS et Android via votre navigateur.",
      },
    ],
  },
];

function AccordionItem({
  q,
  a,
  isOpen,
  onToggle,
}: {
  q: string;
  a: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 text-left group"
      >
        <span className="text-gray-900 font-medium pr-8 group-hover:text-black transition-colors">
          {q}
        </span>
        <span
          className={`flex-shrink-0 w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center transition-all duration-200 ${
            isOpen ? "bg-black border-black rotate-45" : "group-hover:border-gray-500"
          }`}
        >
          <svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            className={isOpen ? "text-white" : "text-gray-500"}
          >
            <line x1="5" y1="1" x2="5" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="1" y1="5" x2="9" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </span>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 pb-5" : "max-h-0"
        }`}
      >
        <p className="text-gray-600 leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({});

  const toggle = (key: string) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <>
      {/* Navbar blanche */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="font-semibold text-gray-900 text-lg">
            Prompt Architect
          </Link>
          <div className="flex items-center gap-6 text-sm text-gray-600">
            <Link href="/generate" className="hover:text-gray-900 transition-colors">
              Générer
            </Link>
            <Link href="/pricing" className="hover:text-gray-900 transition-colors">
              Tarifs
            </Link>
            <Link href="/blog" className="hover:text-gray-900 transition-colors">
              Blog
            </Link>
            <Link href="/contact" className="hover:text-gray-900 transition-colors">
              Contact
            </Link>
            <Link
              href="/generate"
              className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition-colors"
            >
              Commencer
            </Link>
          </div>
        </div>
      </nav>

      <main className="min-h-screen bg-white pt-16">
        {/* Hero */}
        <div className="max-w-3xl mx-auto px-6 pt-20 pb-16 text-center">
          <span className="inline-block text-xs font-medium text-gray-500 tracking-widest uppercase mb-6">
            Aide
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            Questions fréquentes
          </h1>
          <p className="text-lg text-gray-500 max-w-xl mx-auto">
            Tout ce que vous devez savoir sur Prompt Architect. Vous ne trouvez pas votre réponse ?{" "}
            <Link href="/contact" className="text-gray-900 underline underline-offset-2 hover:no-underline">
              Contactez-nous
            </Link>
            .
          </p>
        </div>

        {/* FAQ par catégories */}
        <div className="max-w-3xl mx-auto px-6 pb-24">
          <div className="space-y-14">
            {faqs.map((section) => (
              <div key={section.category}>
                <h2 className="text-xs font-semibold text-gray-400 tracking-widest uppercase mb-6">
                  {section.category}
                </h2>
                <div className="bg-white rounded-2xl border border-gray-100 px-6 shadow-sm">
                  {section.items.map((item, i) => {
                    const key = `${section.category}-${i}`;
                    return (
                      <AccordionItem
                        key={key}
                        q={item.q}
                        a={item.a}
                        isOpen={!!openItems[key]}
                        onToggle={() => toggle(key)}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* CTA bas de page */}
          <div className="mt-20 text-center bg-gray-50 rounded-2xl p-10 border border-gray-100">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Vous avez une autre question ?
            </h3>
            <p className="text-gray-500 mb-6">
              Notre équipe répond généralement en moins de 24h.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-black text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
            >
              Nous contacter
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="border-t border-gray-100 bg-white">
          <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <p>© 2026 Prompt Architect. Tous droits réservés.</p>
            <div className="flex items-center gap-6">
              <Link href="/legal" className="hover:text-gray-600 transition-colors">Mentions légales</Link>
              <Link href="/cgv" className="hover:text-gray-600 transition-colors">CGV</Link>
              <Link href="/remboursement" className="hover:text-gray-600 transition-colors">Remboursement</Link>
              <Link href="/contact" className="hover:text-gray-600 transition-colors">Contact</Link>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
