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

function AccordionItem({ q, a, isOpen, onToggle }: { q: string; a: string; isOpen: boolean; onToggle: () => void }) {
  return (
    <div style={{ borderBottom: '1px solid #0F1520' }}>
      <button
        onClick={onToggle}
        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 0', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', gap: 16 }}
      >
        <span style={{ color: 'white', fontSize: 14, fontWeight: 600, fontFamily: 'monospace', lineHeight: 1.5 }}>{q}</span>
        <span style={{ flexShrink: 0, width: 22, height: 22, border: `1px solid ${isOpen ? '#D4FF57' : '#151C25'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', background: isOpen ? '#D4FF57' : 'transparent', transition: 'all 0.2s' }}>
          <span style={{ color: isOpen ? '#07090C' : '#94A3B8', fontSize: 14, lineHeight: 1, fontWeight: 300 }}>{isOpen ? '−' : '+'}</span>
        </span>
      </button>
      <div style={{ overflow: 'hidden', maxHeight: isOpen ? 300 : 0, transition: 'max-height 0.3s ease', paddingBottom: isOpen ? 20 : 0 }}>
        <p style={{ color: '#94A3B8', fontSize: 13, lineHeight: 1.8, fontFamily: 'monospace' }}>{a}</p>
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
    <div style={{ minHeight: '100vh', background: '#07090C', color: 'white', fontFamily: 'monospace' }}>

      {/* NAVBAR */}
      <nav style={{ borderBottom: '1px solid #151C25', padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#07090CF0', backdropFilter: 'blur(16px)', zIndex: 100 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 28, height: 28, background: '#D4FF57', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900, color: '#07090C' }}>PA</div>
          <span style={{ fontWeight: 900, fontSize: 15, color: 'white', letterSpacing: '-0.02em' }}>Prompt Architect</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <Link href="/library" style={{ color: '#FFFFFF', fontSize: 12, textDecoration: 'none', letterSpacing: '0.06em' }}>BIBLIOTHÈQUE</Link>
          <Link href="/pricing" style={{ color: '#FFFFFF', fontSize: 12, textDecoration: 'none', letterSpacing: '0.06em' }}>PRICING</Link>
          <Link href="/blog" style={{ color: '#FFFFFF', fontSize: 12, textDecoration: 'none', letterSpacing: '0.06em' }}>BLOG</Link>
          <Link href="/contact" style={{ color: '#FFFFFF', fontSize: 12, textDecoration: 'none', letterSpacing: '0.06em' }}>CONTACT</Link>
          <Link href="/generate" style={{ background: '#D4FF57', color: '#07090C', padding: '9px 18px', fontSize: 11, fontWeight: 900, textDecoration: 'none', letterSpacing: '0.08em' }}>
            ✦ COMMENCER
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '72px 24px 56px', textAlign: 'center' }}>
        <div style={{ fontSize: 10, color: '#D4FF57', letterSpacing: '0.14em', marginBottom: 16 }}>// AIDE</div>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 16 }}>
          Questions fréquentes
        </h1>
        <p style={{ fontSize: 15, color: '#94A3B8', maxWidth: 500, margin: '0 auto', lineHeight: 1.75 }}>
          Tout ce que vous devez savoir sur Prompt Architect. Vous ne trouvez pas votre réponse ?{' '}
          <Link href="/contact" style={{ color: '#D4FF57', textDecoration: 'underline' }}>Contactez-nous</Link>.
        </p>
      </div>

      {/* FAQ SECTIONS */}
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '0 24px 96px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {faqs.map((section) => (
            <div key={section.category}>
              <div style={{ fontSize: 9, color: '#D4FF57', letterSpacing: '0.14em', marginBottom: 16 }}>
                // {section.category.toUpperCase()}
              </div>
              <div style={{ border: '1px solid #151C25', background: '#0B0E13', padding: '0 24px' }}>
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

        {/* CTA */}
        <div style={{ marginTop: 64, padding: '40px 32px', background: '#0B0E13', border: '1px solid #151C25', textAlign: 'center' }}>
          <div style={{ fontSize: 10, color: '#D4FF57', letterSpacing: '0.14em', marginBottom: 12 }}>// UNE AUTRE QUESTION ?</div>
          <h3 style={{ fontSize: 20, fontWeight: 900, marginBottom: 8, letterSpacing: '-0.02em' }}>Notre équipe répond en moins de 24h.</h3>
          <p style={{ color: '#94A3B8', fontSize: 13, marginBottom: 24, lineHeight: 1.6 }}>Du lundi au vendredi.</p>
          <Link href="/contact" style={{ background: '#D4FF57', color: '#07090C', padding: '12px 28px', fontSize: 12, fontWeight: 900, textDecoration: 'none', letterSpacing: '0.08em', display: 'inline-block' }}>
            ✦ NOUS CONTACTER
          </Link>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #151C25', padding: '24px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 20, height: 20, background: '#D4FF57', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 900, color: '#07090C' }}>PA</div>
          <span style={{ fontWeight: 700, fontSize: 12, color: '#94A3B8' }}>Prompt Architect © 2026</span>
        </div>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <Link href="/generate" style={{ color: '#6B7A8D', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>GÉNÉRATEUR</Link>
          <Link href="/library" style={{ color: '#6B7A8D', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>BIBLIOTHÈQUE</Link>
          <Link href="/pricing" style={{ color: '#6B7A8D', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>PRICING</Link>
          <Link href="/blog" style={{ color: '#6B7A8D', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>BLOG</Link>
          <Link href="/contact" style={{ color: '#6B7A8D', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>CONTACT</Link>
          <Link href="/legal" style={{ color: '#6B7A8D', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>MENTIONS LÉGALES</Link>
          <Link href="/cgv" style={{ color: '#6B7A8D', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>CGV</Link>
          <Link href="/remboursement" style={{ color: '#6B7A8D', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>REMBOURSEMENT</Link>
        </div>
      </footer>

    </div>
  );
}
