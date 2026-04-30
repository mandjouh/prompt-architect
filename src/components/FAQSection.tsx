"use client";

import { useState } from "react";
import Link from "next/link";

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
    <section style={{ borderTop: '1px solid #151C25', padding: '88px 24px', background: '#07090C' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 10, color: '#D4FF57', letterSpacing: '0.14em', marginBottom: 14 }}>// FAQ</div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 42px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em', color: 'white', margin: 0 }}>
              Questions fréquentes.
            </h2>
            <Link href="/faq" style={{ fontSize: 11, color: '#4A5568', textDecoration: 'none', letterSpacing: '0.06em', borderBottom: '1px solid #151C25', paddingBottom: 4 }}>
              VOIR TOUTES LES QUESTIONS →
            </Link>
          </div>
        </div>

        {/* Accordéon */}
        <div style={{ borderTop: '1px solid #151C25' }}>
          {landingFaqs.map((item, i) => (
            <div key={i} style={{ borderBottom: '1px solid #151C25' }}>
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '20px 0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  textAlign: 'left',
                  gap: 16,
                }}
              >
                <span style={{ fontSize: 13, fontWeight: 700, color: 'white', fontFamily: 'monospace', letterSpacing: '-0.01em' }}>
                  {item.q}
                </span>
                <span style={{
                  flexShrink: 0,
                  width: 20,
                  height: 20,
                  border: '1px solid #2A3545',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: openIndex === i ? '#D4FF57' : '#4A5568',
                  fontSize: 16,
                  lineHeight: 1,
                  transform: openIndex === i ? 'rotate(45deg)' : 'none',
                  transition: 'transform 0.2s, color 0.2s',
                }}>
                  +
                </span>
              </button>
              <div style={{
                overflow: 'hidden',
                maxHeight: openIndex === i ? 200 : 0,
                transition: 'max-height 0.3s ease',
                paddingBottom: openIndex === i ? 20 : 0,
              }}>
                <p style={{ fontSize: 12, color: '#4A5568', lineHeight: 1.75, margin: 0, fontFamily: 'monospace' }}>
                  {item.a}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
