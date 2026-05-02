import Link from 'next/link'
import type { Metadata } from 'next'
import FAQSection from '@/components/FAQSection'
import NewsletterSection from './components/NewsletterSection'

export const metadata: Metadata = {
  title: 'Prompt Architect — Générateur de prompts IA experts',
  description: "Transforme ta demande simple en prompt expert par IA. 4 modules, 20 cas d'usage, propulsé par Claude. Gratuit.",
  alternates: { canonical: 'https://www.prompt-architect.io' },
  openGraph: {
    title: 'Prompt Architect — Générateur de prompts IA experts',
    description: 'Transforme ta demande simple en prompt expert par IA. Gratuit.',
    url: 'https://www.prompt-architect.io',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
}

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: '#07090C', color: 'white', fontFamily: 'monospace', overflowX: 'hidden' }}>

      <style>{`
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
          .nav-padding { padding: 14px 16px !important; }
          .hero-padding { padding: 60px 16px 48px !important; }
          .stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .stats-grid > div:nth-child(2) { border-right: none !important; }
          .stats-grid > div:nth-child(3) { border-top: 1px solid #151C25; }
          .stats-grid > div:nth-child(4) { border-top: 1px solid #151C25; }
          .problem-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
          .modules-grid { grid-template-columns: 1fr !important; }
          .steps-grid { grid-template-columns: 1fr !important; }
          .steps-grid > div { border-right: none !important; }
          .cta-flex { flex-direction: column !important; text-align: center !important; }
          .footer-links { flex-wrap: wrap !important; gap: 16px !important; }
          .section-padding { padding: 56px 16px !important; }
          .module-padding { padding: 20px !important; }
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="nav-padding" style={{ borderBottom: '1px solid #151C25', padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#07090CF0', backdropFilter: 'blur(16px)', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, background: '#D4FF57', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900, color: '#07090C', flexShrink: 0 }}>PA</div>
          <span style={{ fontWeight: 900, fontSize: 15, color: 'white', letterSpacing: '-0.02em', whiteSpace: 'nowrap' }}>Prompt Architect</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <Link href="/library" style={{ color: '#FFFFFF', fontSize: 12, textDecoration: 'none', letterSpacing: '0.06em' }}>BIBLIOTHÈQUE</Link>
            <Link href="/pricing" style={{ color: '#FFFFFF', fontSize: 12, textDecoration: 'none', letterSpacing: '0.06em' }}>PRICING</Link>
            <Link href="/blog" style={{ color: '#FFFFFF', fontSize: 12, textDecoration: 'none', letterSpacing: '0.06em' }}>BLOG</Link>
            <Link href="/faq" style={{ color: '#FFFFFF', fontSize: 12, textDecoration: 'none', letterSpacing: '0.06em' }}>FAQ</Link>
            <Link href="/contact" style={{ color: '#FFFFFF', fontSize: 12, textDecoration: 'none', letterSpacing: '0.06em' }}>CONTACT</Link>
          </div>
          <Link href="/generate" data-track="CTA_Clicked" data-track-props='{"source":"header"}' style={{ background: '#D4FF57', color: '#07090C', padding: '9px 18px', fontSize: 11, fontWeight: 900, textDecoration: 'none', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
            ✦ COMMENCER
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-padding" style={{ maxWidth: 960, margin: '0 auto', padding: '100px 24px 80px', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'radial-gradient(ellipse 80% 60% at 50% 0%, #D4FF5712 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'linear-gradient(#151C2520 1px, transparent 1px), linear-gradient(90deg, #151C2520 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />
        <div style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', border: '1px solid #D4FF5740', background: '#D4FF5708', marginBottom: 32 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#D4FF57', display: 'inline-block' }}></span>
            <span style={{ color: '#D4FF57', fontSize: 10, letterSpacing: '0.14em' }}>MAINTENANT EN LIGNE — PROPULSÉ PAR CLAUDE</span>
          </div>

          <h1 style={{ fontSize: 'clamp(36px, 8vw, 88px)', fontWeight: 900, lineHeight: 0.95, marginBottom: 24, letterSpacing: '-0.04em' }}>
            De l&apos;intention<br />
            à <span style={{ color: '#D4FF57' }}>l&apos;excellence</span><br />
            <span style={{ color: '#1A2535' }}>— en un prompt.</span>
          </h1>

          <p style={{ fontSize: 16, color: '#94A3B8', maxWidth: 500, margin: '0 auto 36px', lineHeight: 1.75 }}>
            Transforme ta demande simple en prompt expert, structuré et optimisé. Sans connaître le prompt engineering.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 48 }}>
            <Link href="/generate" data-track="CTA_Clicked" data-track-props='{"source":"hero"}' style={{ background: '#D4FF57', color: '#07090C', padding: '14px 28px', fontSize: 12, fontWeight: 900, textDecoration: 'none', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 8 }}>
              ✦ GÉNÉRER MON PROMPT
            </Link>
            <Link href="/library" style={{ border: '1px solid #2A3545', color: '#8A9AAA', padding: '14px 28px', fontSize: 12, fontWeight: 900, textDecoration: 'none', letterSpacing: '0.08em' }}>
              ◈ VOIR LES 50 PROMPTS
            </Link>
          </div>

          {/* Stats bar */}
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', border: '1px solid #151C25', background: '#0B0E13' }}>
            {[
              { label: 'Prompts Premium', value: '50' },
              { label: 'Modules', value: '8' },
              { label: 'Moteur IA', value: 'Claude' },
              { label: 'Temps moyen', value: '< 2min' },
            ].map((s, i) => (
              <div key={i} style={{ padding: '20px 12px', borderRight: i < 3 ? '1px solid #151C25' : 'none', textAlign: 'center' }}>
                <div style={{ fontSize: 24, fontWeight: 900, color: 'white', letterSpacing: '-0.03em', marginBottom: 4 }}>{s.value}</div>
                <div style={{ fontSize: 9, color: '#94A3B8', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLÈME */}
      <section className="section-padding" style={{ borderTop: '1px solid #151C25', padding: '88px 24px', background: '#07090C' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div className="problem-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 64, alignItems: 'start' }}>
            <div>
              <div style={{ fontSize: 10, color: '#D4FF57', letterSpacing: '0.14em', marginBottom: 16 }}>// PROBLÈME</div>
              <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                90% des utilisateurs ratent l&apos;IA.
              </h2>
            </div>
            <div>
              <p style={{ color: '#94A3B8', fontSize: 15, lineHeight: 1.85, marginBottom: 36 }}>
                Pas parce que l&apos;IA est mauvaise. Mais parce qu&apos;ils ne savent pas comment lui parler.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {[
                  { icon: '⏱', title: 'Perte de temps', desc: "Tu passes plus de temps à reformuler qu'à travailler." },
                  { icon: '⚡', title: 'Résultats génériques', desc: "L'IA te sort des réponses creuses qui ne servent à rien." },
                  { icon: '◎', title: 'Potentiel inexploité', desc: "Tu utilises 5% de ce que l'IA peut vraiment faire." },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 20, padding: '20px 0', borderBottom: '1px solid #0F1520' }}>
                    <div style={{ fontSize: 13, color: '#D4FF57', minWidth: 20, marginTop: 1 }}>{item.icon}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4, color: 'white' }}>{item.title}</div>
                      <div style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.6 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* AVANT / APRÈS */}
      <section className="section-padding" style={{ borderTop: '1px solid #151C25', padding: '88px 24px', background: '#07090C' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 10, color: '#D4FF57', letterSpacing: '0.14em', marginBottom: 14 }}>// DÉMONSTRATION</div>
            <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 42px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
              Vois la différence.
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: '#151C25' }}>

            {/* AVANT */}
            <div style={{ background: '#07090C', padding: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#FF4D4D' }} />
                <span style={{ fontSize: 10, color: '#FF4D4D', letterSpacing: '0.12em', fontWeight: 700 }}>SANS PROMPT ARCHITECT</span>
              </div>
              <div style={{ background: '#0B0E13', border: '1px solid #1A1A2E', padding: '16px 20px', marginBottom: 20 }}>
                <div style={{ fontSize: 9, color: '#94A3B8', letterSpacing: '0.1em', marginBottom: 10 }}>PROMPT ENVOYÉ À L&apos;IA</div>
                <p style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.7, fontStyle: 'italic' }}>
                  &quot;Écris-moi un business plan pour une agence de marketing.&quot;
                </p>
              </div>
              <div style={{ background: '#0D0A0A', border: '1px solid #2A1A1A', padding: '16px 20px' }}>
                <div style={{ fontSize: 9, color: '#FF4D4D60', letterSpacing: '0.1em', marginBottom: 10 }}>RÉSULTAT OBTENU</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    '1. Introduction — description générique de l\'agence',
                    '2. Services proposés — liste vague sans différenciation',
                    '3. Objectifs — "devenir leader du marché"',
                  ].map((line, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ color: '#FF4D4D40', fontSize: 12, flexShrink: 0, marginTop: 1 }}>✕</span>
                      <span style={{ fontSize: 12, color: '#94A3B8', lineHeight: 1.6 }}>{line}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 16, padding: '8px 12px', background: '#FF4D4D08', border: '1px solid #FF4D4D20', fontSize: 11, color: '#FF4D4D60' }}>
                  Générique — inutilisable en l&apos;état
                </div>
              </div>
            </div>

            {/* APRÈS */}
            <div style={{ background: '#070C07', padding: 32 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#D4FF57' }} />
                <span style={{ fontSize: 10, color: '#D4FF57', letterSpacing: '0.12em', fontWeight: 700 }}>AVEC PROMPT ARCHITECT</span>
              </div>
              <div style={{ background: '#0B0E13', border: '1px solid #1A2E1A', padding: '16px 20px', marginBottom: 20 }}>
                <div style={{ fontSize: 9, color: '#D4FF5780', letterSpacing: '0.1em', marginBottom: 10 }}>PROMPT GÉNÉRÉ EN 2 MIN</div>
                <p style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.7 }}>
                  &quot;Tu es un consultant McKinsey spécialisé en agences digitales. Génère un business plan complet pour une agence de marketing B2B ciblant les PME tech en France. Inclus : [analyse SWOT, projection 3 ans, stratégie d&apos;acquisition, tarification par paliers].&quot;
                </p>
              </div>
              <div style={{ background: '#070C07', border: '1px solid #1A2E1A', padding: '16px 20px' }}>
                <div style={{ fontSize: 9, color: '#D4FF5760', letterSpacing: '0.1em', marginBottom: 10 }}>RÉSULTAT OBTENU</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {[
                    'Analyse SWOT détaillée avec données sectorielles',
                    'Projection financière sur 3 ans avec hypothèses',
                    'Plan d\'acquisition clients avec CAC cible estimé',
                  ].map((line, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                      <span style={{ color: '#D4FF57', fontSize: 12, flexShrink: 0, marginTop: 1 }}>✦</span>
                      <span style={{ fontSize: 12, color: '#94A3B8', lineHeight: 1.6 }}>{line}</span>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 16, padding: '8px 12px', background: '#D4FF5708', border: '1px solid #D4FF5730', fontSize: 11, color: '#D4FF57' }}>
                  Structuré, actionnable — prêt à utiliser
                </div>
              </div>
            </div>

          </div>

          <div style={{ marginTop: 32, textAlign: 'center' }}>
            <Link href="/generate" data-track="CTA_Clicked" data-track-props='{"source":"mid"}' style={{ background: '#D4FF57', color: '#07090C', padding: '13px 28px', fontSize: 12, fontWeight: 900, textDecoration: 'none', letterSpacing: '0.08em', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
              ✦ GÉNÉRER MON PREMIER PROMPT
            </Link>
          </div>
        </div>
      </section>

      {/* MODULES */}
      <section className="section-padding" style={{ borderTop: '1px solid #151C25', padding: '88px 24px', background: '#0B0E13' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 40, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontSize: 10, color: '#D4FF57', letterSpacing: '0.14em', marginBottom: 14 }}>// SOLUTION</div>
              <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 42px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
                8 modules.<br />40 cas d&apos;usage.
              </h2>
            </div>
            <Link href="/generate" style={{ fontSize: 11, color: '#94A3B8', textDecoration: 'none', letterSpacing: '0.06em', borderBottom: '1px solid #151C25', paddingBottom: 4 }}>
              ACCÉDER AU GÉNÉRATEUR →
            </Link>
          </div>

          <div className="modules-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: '#151C25', border: '1px solid #151C25' }}>
            {[
              { icon: '◈', label: 'Business', color: '#D4FF57', desc: 'Business plan, pitch deck, analyse de marché, stratégie GTM.', free: true },
              { icon: '◉', label: 'Contenu Viral', color: '#FF7A3D', desc: 'Hooks TikTok, scripts YouTube, posts LinkedIn, newsletters.', free: true },
              { icon: '◎', label: 'Usage Pro', color: '#38C4FF', desc: 'Emails professionnels, CV optimisé, rapports exécutifs.', free: true },
              { icon: '⟁', label: 'Développement', color: '#A47CFF', desc: 'Architecture SaaS, génération de code, agents IA, CI/CD.', free: false },
              { icon: '⟳', label: 'IA & Automatisation', color: '#00E5FF', desc: 'Workflows n8n, agents IA, prompt chaining, systèmes RAG.', free: false },
              { icon: '◑', label: 'E-commerce & Vente', color: '#FF4D8B', desc: 'Fiches produits, emails panier abandonné, publicités.', free: false },
              { icon: '⚖', label: 'Juridique & Contrats', color: '#FFB800', desc: 'CGV, NDA, contrats de prestation, mentions légales.', free: false },
              { icon: '▶', label: 'Création Vidéo IA', color: '#FF6B35', desc: 'Prompts Sora/Runway, storyboards, scripts vidéo IA.', free: false },
            ].map((m, i) => (
              <div key={i} className="module-padding" style={{ background: '#0B0E13', padding: 28, position: 'relative', overflow: 'hidden' }}>
                {!m.free && (
                  <div style={{ position: 'absolute', top: 10, right: 10, background: '#D4FF57', color: '#07090C', fontSize: 8, fontWeight: 900, padding: '2px 7px', letterSpacing: '0.08em' }}>PRO</div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <span style={{ fontSize: 18, color: m.color }}>{m.icon}</span>
                  <span style={{ fontWeight: 900, fontSize: 15, letterSpacing: '-0.02em' }}>{m.label}</span>
                </div>
                <p style={{ fontSize: 12, color: '#94A3B8', lineHeight: 1.6 }}>{m.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* PROPULSÉ PAR CLAUDE */}
      <section style={{ borderTop: '1px solid #151C25', padding: '48px 24px', background: '#07090C' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 36, height: 36, background: '#CC785C', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" fill="white"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 9, color: '#94A3B8', letterSpacing: '0.12em', marginBottom: 2 }}>MOTEUR IA</div>
                <div style={{ fontSize: 14, fontWeight: 900, color: 'white', letterSpacing: '-0.01em' }}>Propulsé par Claude</div>
              </div>
            </div>
            <div style={{ width: '1px', height: 32, background: '#151C25', flexShrink: 0 }} />
            <div style={{ fontSize: 12, color: '#94A3B8', lineHeight: 1.7, maxWidth: 480 }}>
              Chaque prompt est généré par <span style={{ color: 'white', fontWeight: 700 }}>Claude d&apos;Anthropic</span>, 
              le modèle IA réputé pour la qualité de son raisonnement et la précision de ses réponses.
            </div>
          </div>
          <a 
            href="https://anthropic.com" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ fontSize: 11, color: '#94A3B8', textDecoration: 'none', letterSpacing: '0.06em', border: '1px solid #151C25', padding: '8px 16px', whiteSpace: 'nowrap', flexShrink: 0 }}
          >
            EN SAVOIR PLUS →
          </a>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section className="section-padding" style={{ borderTop: '1px solid #151C25', padding: '88px 24px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ fontSize: 10, color: '#D4FF57', letterSpacing: '0.14em', marginBottom: 14 }}>// COMMENT ÇA MARCHE</div>
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 42px)', fontWeight: 900, marginBottom: 48, letterSpacing: '-0.03em' }}>
            3 étapes. 2 minutes.
          </h2>
          <div className="steps-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', borderTop: '1px solid #151C25' }}>
            {[
              { step: '01', title: 'Choisis ton module', desc: "Business, Contenu, Pro ou Dev — sélectionne la catégorie qui colle à ton besoin." },
              { step: '02', title: 'Décris ton besoin', desc: "Explique simplement ce que tu veux. Pas besoin d'être expert en prompt." },
              { step: '03', title: 'Copie et utilise', desc: "Reçois un prompt expert. Colle-le dans Claude ou ChatGPT. Vois la différence." },
            ].map((item, i) => (
              <div key={i} style={{ padding: '32px 24px', borderRight: i < 2 ? '1px solid #151C25' : 'none', borderBottom: '1px solid #151C25' }}>
                <div style={{ fontSize: 56, fontWeight: 900, color: '#0F1520', lineHeight: 1, marginBottom: 20, letterSpacing: '-0.05em' }}>{item.step}</div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 8, color: 'white' }}>{item.title}</div>
                <div style={{ fontSize: 12, color: '#94A3B8', lineHeight: 1.75 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQSection />

      {/* CTA FINAL */}
      <section style={{ borderTop: '1px solid #151C25', padding: '64px 24px', background: '#D4FF57' }}>
        <div className="cta-flex" style={{ maxWidth: 700, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <h2 style={{ fontSize: 'clamp(24px, 4vw, 42px)', fontWeight: 900, color: '#07090C', lineHeight: 1.05, marginBottom: 10, letterSpacing: '-0.03em' }}>
              Prêt à maîtriser<br />l&apos;IA ?
            </h2>
            <p style={{ color: '#3A5010', fontSize: 13, lineHeight: 1.6 }}>100% gratuit — Aucune inscription requise</p>
          </div>
          <Link href="/generate" data-track="CTA_Clicked" data-track-props='{"source":"bottom"}' style={{ background: '#07090C', color: '#D4FF57', padding: '14px 32px', fontSize: 12, fontWeight: 900, textDecoration: 'none', letterSpacing: '0.08em', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 10 }}>
            ✦ COMMENCER GRATUITEMENT
          </Link>
        </div>
      </section>


      {/* NEWSLETTER */}
      <NewsletterSection />
      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #151C25', padding: '24px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 20, height: 20, background: '#D4FF57', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 900, color: '#07090C' }}>PA</div>
          <span style={{ fontWeight: 700, fontSize: 12, color: '#94A3B8' }}>Prompt Architect © 2026</span>
        </div>
        <div className="footer-links" style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <Link href="/generate" style={{ color: '#6B7A8D', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>GÉNÉRATEUR</Link>
          <Link href="/library" style={{ color: '#6B7A8D', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>BIBLIOTHÈQUE</Link>
          <Link href="/pricing" style={{ color: '#6B7A8D', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>PRICING</Link>
          <Link href="/blog" style={{ color: '#6B7A8D', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>BLOG</Link>
          <Link href="/contact" style={{ color: '#6B7A8D', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>CONTACT</Link>
          <Link href="/faq" style={{ color: '#6B7A8D', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>FAQ</Link>
          <Link href="/legal" style={{ color: '#6B7A8D', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>MENTIONS LÉGALES</Link>
          <Link href="/cgv" style={{ color: '#6B7A8D', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>CGV</Link>
          <Link href="/remboursement" style={{ color: '#6B7A8D', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>REMBOURSEMENT</Link>
        </div>
      </footer>

    </main>
  )
}
