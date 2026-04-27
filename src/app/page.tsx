import Link from 'next/link'

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: '#07090C', color: 'white', fontFamily: 'monospace', overflowX: 'hidden' }}>

      {/* NAVBAR */}
      <nav style={{ borderBottom: '1px solid #151C25', padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#07090CF0', backdropFilter: 'blur(16px)', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, background: '#D4FF57', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900, color: '#07090C' }}>PA</div>
          <span style={{ fontWeight: 900, fontSize: 16, color: 'white', letterSpacing: '-0.02em' }}>Prompt Architect</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <Link href="/library" style={{ color: '#4A5568', fontSize: 12, textDecoration: 'none', letterSpacing: '0.06em' }}>BIBLIOTHÈQUE</Link>
          <Link href="/pricing" style={{ color: '#4A5568', fontSize: 12, textDecoration: 'none', letterSpacing: '0.06em' }}>PRICING</Link>
          <Link href="/generate" style={{ background: '#D4FF57', color: '#07090C', padding: '9px 22px', fontSize: 11, fontWeight: 900, textDecoration: 'none', letterSpacing: '0.08em' }}>
            ✦ COMMENCER
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ maxWidth: 960, margin: '0 auto', padding: '100px 24px 80px', position: 'relative' }}>
        {/* Grid décoratif */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundImage: 'linear-gradient(#151C2520 1px, transparent 1px), linear-gradient(90deg, #151C2520 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', border: '1px solid #D4FF5740', background: '#D4FF5708', marginBottom: 40 }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: '#D4FF57', display: 'inline-block', animation: 'pulse 2s infinite' }}></span>
            <span style={{ color: '#D4FF57', fontSize: 10, letterSpacing: '0.14em' }}>MAINTENANT EN LIGNE — PROPULSÉ PAR CLAUDE</span>
          </div>

          <h1 style={{ fontSize: 'clamp(42px, 8vw, 88px)', fontWeight: 900, lineHeight: 0.95, marginBottom: 32, letterSpacing: '-0.04em' }}>
            De l&apos;intention<br />
            à <span style={{ color: '#D4FF57', position: 'relative' }}>l&apos;excellence</span><br />
            <span style={{ color: '#1A2535' }}>— en un prompt.</span>
          </h1>

          <p style={{ fontSize: 17, color: '#4A5568', maxWidth: 500, margin: '0 auto 48px', lineHeight: 1.75 }}>
            Transforme ta demande simple en prompt expert, structuré et optimisé. Sans connaître le prompt engineering.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 80 }}>
            <Link href="/generate" style={{ background: '#D4FF57', color: '#07090C', padding: '15px 36px', fontSize: 12, fontWeight: 900, textDecoration: 'none', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 8 }}>
              ✦ GÉNÉRER MON PROMPT
            </Link>
            <Link href="/library" style={{ border: '1px solid #2A3545', color: '#8A9AAA', padding: '15px 36px', fontSize: 12, fontWeight: 900, textDecoration: 'none', letterSpacing: '0.08em' }}>
              ◈ VOIR LES 50 PROMPTS
            </Link>
          </div>

          {/* Stats bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', border: '1px solid #151C25', background: '#0B0E13' }}>
            {[
              { label: 'Prompts Premium', value: '50' },
              { label: 'Modules', value: '4' },
              { label: 'Moteur IA', value: 'Claude' },
              { label: 'Temps moyen', value: '< 2min' },
            ].map((s, i) => (
              <div key={i} style={{ padding: '24px 16px', borderRight: i < 3 ? '1px solid #151C25' : 'none', textAlign: 'center' }}>
                <div style={{ fontSize: 28, fontWeight: 900, color: 'white', letterSpacing: '-0.03em', marginBottom: 4 }}>{s.value}</div>
                <div style={{ fontSize: 10, color: '#2D3748', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROBLÈME — style "terminal" */}
      <section style={{ borderTop: '1px solid #151C25', padding: '88px 24px', background: '#07090C' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 64, alignItems: 'start' }}>
            <div>
              <div style={{ fontSize: 10, color: '#D4FF57', letterSpacing: '0.14em', marginBottom: 16 }}>// PROBLÈME</div>
              <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 38px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em' }}>
                90% des utilisateurs ratent l&apos;IA.
              </h2>
            </div>
            <div>
              <p style={{ color: '#4A5568', fontSize: 15, lineHeight: 1.85, marginBottom: 36 }}>
                Pas parce que l&apos;IA est mauvaise. Mais parce qu&apos;ils ne savent pas comment lui parler. La qualité du prompt détermine 100% de la qualité de la réponse.
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {[
                  { icon: '⏱', title: 'Perte de temps', desc: 'Tu passes plus de temps à reformuler qu\'à travailler.' },
                  { icon: '⚡', title: 'Résultats génériques', desc: 'L\'IA te sort des réponses creuses qui ne servent à rien.' },
                  { icon: '◎', title: 'Potentiel inexploité', desc: 'Tu utilises 5% de ce que l\'IA peut vraiment faire.' },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 20, padding: '20px 0', borderBottom: '1px solid #0F1520' }}>
                    <div style={{ fontSize: 13, color: '#D4FF57', minWidth: 20, marginTop: 1 }}>{item.icon}</div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4, color: 'white' }}>{item.title}</div>
                      <div style={{ fontSize: 13, color: '#4A5568', lineHeight: 1.6 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MODULES — accent fort */}
      <section style={{ borderTop: '1px solid #151C25', padding: '88px 24px', background: '#0B0E13' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 48, flexWrap: 'wrap', gap: 16 }}>
            <div>
              <div style={{ fontSize: 10, color: '#D4FF57', letterSpacing: '0.14em', marginBottom: 14 }}>// SOLUTION</div>
              <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 900, lineHeight: 1.05, letterSpacing: '-0.03em' }}>
                4 modules.<br />20 cas d&apos;usage.
              </h2>
            </div>
            <Link href="/generate" style={{ fontSize: 11, color: '#4A5568', textDecoration: 'none', letterSpacing: '0.06em', borderBottom: '1px solid #151C25', paddingBottom: 4 }}>
              ACCÉDER AU GÉNÉRATEUR →
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: '#151C25', border: '1px solid #151C25' }}>
            {[
              { icon: '◈', label: 'Business', color: '#D4FF57', desc: 'Business plan, pitch deck, analyse de marché, modélisation financière, stratégie GTM.', cases: ['Business Plan', 'Pitch Deck', 'Analyse Marché', 'Modélisation Financière'] },
              { icon: '◉', label: 'Contenu Viral', color: '#FF7A3D', desc: 'Hooks TikTok, scripts YouTube, posts LinkedIn, copywriting, newsletters.', cases: ['Hooks Viraux', 'Script YouTube', 'Post LinkedIn', 'Page de Vente'] },
              { icon: '◎', label: 'Usage Pro', color: '#38C4FF', desc: 'Emails professionnels, CV optimisé, rapports exécutifs, négociation salariale.', cases: ['Email Pro', 'CV ATS', 'Rapport Exécutif', 'Négociation'] },
              { icon: '⟁', label: 'Développement', color: '#A47CFF', desc: 'Architecture SaaS, génération de code, debugging, agents IA, CI/CD.', cases: ['Brief SaaS', 'Génération Code', 'Debug', 'Agent IA'] },
            ].map((m, i) => (
              <div key={i} style={{ background: '#0B0E13', padding: 32, position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 0, right: 0, width: 80, height: 80, background: m.color + '06', borderRadius: '0 0 0 80px' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <span style={{ fontSize: 20, color: m.color }}>{m.icon}</span>
                  <span style={{ fontWeight: 900, fontSize: 17, letterSpacing: '-0.02em' }}>{m.label}</span>
                </div>
                <p style={{ fontSize: 12, color: '#4A5568', lineHeight: 1.7, marginBottom: 20 }}>{m.desc}</p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {m.cases.map(c => (
                    <span key={c} style={{ fontSize: 9, padding: '3px 8px', border: '1px solid #1A2535', color: '#2D3748', letterSpacing: '0.04em' }}>{c}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMENT ÇA MARCHE — numéros géants */}
      <section style={{ borderTop: '1px solid #151C25', padding: '88px 24px' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ fontSize: 10, color: '#D4FF57', letterSpacing: '0.14em', marginBottom: 14 }}>// COMMENT ÇA MARCHE</div>
          <h2 style={{ fontSize: 'clamp(26px, 3.5vw, 42px)', fontWeight: 900, marginBottom: 64, letterSpacing: '-0.03em' }}>
            3 étapes. 2 minutes.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, borderTop: '1px solid #151C25' }}>
            {[
              { step: '01', title: 'Choisis ton module', desc: 'Business, Contenu, Pro ou Dev — sélectionne la catégorie qui colle à ton besoin.' },
              { step: '02', title: 'Décris ton besoin', desc: 'Explique simplement ce que tu veux. Pas besoin d\'être expert en prompt.' },
              { step: '03', title: 'Copie et utilise', desc: 'Reçois un prompt expert. Colle-le dans Claude ou ChatGPT. Vois la différence.' },
            ].map((item, i) => (
              <div key={i} style={{ padding: '40px 32px', borderRight: i < 2 ? '1px solid #151C25' : 'none', borderBottom: '1px solid #151C25' }}>
                <div style={{ fontSize: 64, fontWeight: 900, color: '#0F1520', lineHeight: 1, marginBottom: 24, letterSpacing: '-0.05em' }}>{item.step}</div>
                <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 10, color: 'white', letterSpacing: '-0.01em' }}>{item.title}</div>
                <div style={{ fontSize: 12, color: '#4A5568', lineHeight: 1.75 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL — inversé */}
      <section style={{ borderTop: '1px solid #151C25', padding: '88px 24px', background: '#D4FF57' }}>
        <div style={{ maxWidth: 700, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 32 }}>
          <div>
            <h2 style={{ fontSize: 'clamp(26px, 4vw, 42px)', fontWeight: 900, color: '#07090C', lineHeight: 1.05, marginBottom: 10, letterSpacing: '-0.03em' }}>
              Prêt à maîtriser<br />l&apos;IA ?
            </h2>
            <p style={{ color: '#3A5010', fontSize: 13, lineHeight: 1.6 }}>
              100% gratuit — Aucune inscription requise
            </p>
          </div>
          <Link href="/generate" style={{ background: '#07090C', color: '#D4FF57', padding: '16px 40px', fontSize: 12, fontWeight: 900, textDecoration: 'none', letterSpacing: '0.08em', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 10 }}>
            ✦ COMMENCER GRATUITEMENT
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #151C25', padding: '28px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 20, height: 20, background: '#D4FF57', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 900, color: '#07090C' }}>PA</div>
          <span style={{ fontWeight: 700, fontSize: 12, color: '#4A5568' }}>Prompt Architect © 2026</span>
        </div>
        <div style={{ display: 'flex', gap: 28 }}>
          <Link href="/generate" style={{ color: '#2D3748', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>GÉNÉRATEUR</Link>
          <Link href="/library" style={{ color: '#2D3748', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>BIBLIOTHÈQUE</Link>
          <Link href="/pricing" style={{ color: '#2D3748', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>PRICING</Link>
          <a href="mailto:contact@prompt-architect.io" style={{ color: '#2D3748', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>CONTACT</a>
        </div>
      </footer>

    </main>
  )
}
