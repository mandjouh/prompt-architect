"use client";

import { useState } from "react";
import Link from "next/link";

// 6 questions sélectionnées pour la landing page
const landingFaqs = [
  {
    q: "Qu'est-ce qu'une génération ?",
    a: "Une génération correspond à la création d'un prompt par notre IA. Chaque clic sur « Générer » consomme une génération de votre quota mensuel.",
  },
  {
    q: "Les crédits non utilisés sont-ils reportés ?",
    a: "Non, les générations non utilisées ne sont pas reportées. Votre quota se renouvelle automatiquement à chaque début de cycle de facturation.",
  },
  {
    q: "Puis-je changer de plan à tout moment ?",
    a: "Oui, vous pouvez upgrader ou downgrader votre plan à tout moment depuis votre profil. Les upgrades prennent effet immédiatement.",
  },
  {
    q: "Mes prompts sont-ils sauvegardés ?",
    a: "Oui, tous vos prompts générés sont automatiquement sauvegardés dans votre bibliothèque personnelle, accessible depuis « Mes prompts ».",
  },
  {
    q: "Comment fonctionne le remboursement ?",
    a: "Nous offrons un remboursement sous 7 jours si vous n'êtes pas satisfait. Contactez-nous à support@prompt-architect.io.",
  },
  {
    q: "L'application fonctionne-t-elle sur mobile ?",
    a: "Oui, Prompt Architect est entièrement responsive et fonctionne sur tous les appareils : ordinateur, tablette et smartphone.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-block text-xs font-medium text-gray-400 tracking-widest uppercase mb-4">
            FAQ
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-3">
            Questions fréquentes
          </h2>
          <p className="text-gray-500">
            Vous ne trouvez pas votre réponse ?{" "}
            <Link
              href="/faq"
              className="text-gray-900 underline underline-offset-2 hover:no-underline"
            >
              Voir toutes les questions
            </Link>
          </p>
        </div>

        {/* Accordéon */}
        <div className="bg-white rounded-2xl border border-gray-100 px-6 shadow-sm">
          {landingFaqs.map((item, i) => (
            <div key={i} className="border-b border-gray-100 last:border-0">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between py-5 text-left group"
              >
                <span className="text-gray-900 font-medium pr-8 group-hover:text-black transition-colors">
                  {item.q}
                </span>
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center transition-all duration-200 ${
                    openIndex === i
                      ? "bg-black border-black rotate-45"
                      : "group-hover:border-gray-500"
                  }`}
                >
                  <svg
                    width="10"
                    height="10"
                    viewBox="0 0 10 10"
                    fill="none"
                    className={openIndex === i ? "text-white" : "text-gray-500"}
                  >
                    <line x1="5" y1="1" x2="5" y2="9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    <line x1="1" y1="5" x2="9" y2="5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === i ? "max-h-40 pb-5" : "max-h-0"
                }`}
              >
                <p className="text-gray-600 leading-relaxed">{item.a}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Lien vers la page complète */}
        <div className="text-center mt-8">
          <Link
            href="/faq"
            className="text-sm text-gray-500 hover:text-gray-900 transition-colors inline-flex items-center gap-1"
          >
            Voir toutes les questions
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M8 4l3 3-3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
