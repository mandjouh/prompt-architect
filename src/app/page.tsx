import Link from 'next/link'

export default function Home() {
  return (
    <main style={{ minHeight: '100vh', background: '#07090C', color: 'white', fontFamily: 'monospace' }}>

      {/* NAVBAR */}
      <nav style={{ borderBottom: '1px solid #151C25', padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#07090CEE', backdropFilter: 'blur(12px)', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 28, height: 28, background: '#D4FF57', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900, color: '#07090C' }}>PA</div>
          <span style={{ fontWeight: 900, fontSize: 16, color: 'white' }}>Prompt Architect</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <Link href="/library" style={{ color: '#4A5568', fontSize: 13, textDecoration: 'none' }}>Bibliothèque</Link>
          <Link href="/generate" style={{ background: '#D4FF57', color: '#07090C', padding: '8px 20px', fontSize: 12, fontWeight: 900, textDecoration: 'none' }}>Commencer</Link>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ maxWidth: 900, margin: '0 auto', padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '6px 14px', border: '1px solid #D4FF5730', background: '#D4FF5710', marginBottom: 32 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#D4FF57', display: 'inline-block' }}></span>
          <span style={{ color: '#D4FF57', fontSize: 11, letterSpacing: '0.1em' }}>PROMPT ARCHITECT — MAINTENANT EN LIGNE</span>
        </div>

        <h1 style={{ fontSize: 'clamp(36px, 7vw, 72px)', fontWeight: 900, lineHeight: 1.05, marginBottom: 24 }}>
          De l&apos;intention à<br />
          <span style={{ color: '#D4FF57' }}>l&apos;excellence</span>
          <span style={{ color: '#2D3748' }}> — en un prompt.</span>
        </h1>

        <p style={{ fontSize: 18, color: '#4A5568', maxWidth: 560, margin: '0 auto 40px', lineHeight: 1.7 }}>
          Transforme ta demande simple en prompt expert, structuré et optimisé.
          Sans connaître le prompt engineering.
        </p>

        <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 60 }}>
          <Link href="/generate" style={{ background: '#D4FF57', color: '#07090C', padding: '14px 32px', fontSize: 13, fontWeight: 900, textDecoration: 'none', letterSpacing: '0.06em' }}>
            ✦ GÉNÉRER MON PROMPT (IA)
          </Link>
          <Link href="/library" style={{ border: '1px solid #D4FF5730', color: '#D4FF57', padding: '14px 32px', fontSize: 13, fontWeight: 900, textDecoration: 'none', letterSpacing: '0.06em' }}>
            ◈ BIBLIOTHÈQUE 50 PROMPTS
          </Link>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', border: '1px solid #151C25' }}>
          {[
            { label: 'Prompts Premium', value: '50' },
            { label: 'Modules', value: '4' },
            { label: 'Propulsé par', value: 'Claude' },
            { label: 'Temps moyen', value: '< 2 min' },
          ].map((s, i) => (
            <div key={i} style={{ padding: '20px 16px', borderRight: i < 3 ? '1px solid #151C25' : 'none', textAlign: 'center' }}>
              <div style={{ fontSize: 24, fontWeight: 900, color: 'white' }}>{s.value}</div>
              <div style={{ fontSize: 11, color: '#4A5568', marginTop: 4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* PROBLÈME */}
      <section style={{ background: '#0B0E13', borderTop: '1px solid #151C25', borderBottom: '1px solid #151C25', padding: '80px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: '#D4FF57', letterSpacing: '0.12em', marginBottom: 16 }}>LE PROBLÈME</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, marginBottom: 24, lineHeight: 1.2 }}>
            90% des utilisateurs n&apos;obtiennent pas<br />
            <span style={{ color: '#D4FF57' }}>de bons résultats avec l&apos;IA</span>
          </h2>
          <p style={{ color: '#4A5568', fontSize: 16, lineHeight: 1.8, marginBottom: 48 }}>
            Pas parce que l&apos;IA est mauvaise.<br />
            Mais parce qu&apos;ils ne savent pas comment lui parler.
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { icon: '⏱', title: 'Perte de temps', desc: 'Tu passes plus de temps à reformuler tes demandes qu\'à travailler.' },
              { icon: '😤', title: 'Résultats décevants', desc: 'L\'IA te donne des réponses génériques qui ne correspondent pas à ton besoin.' },
              { icon: '💸', title: 'Potentiel inexploité', desc: 'Tu paies un abonnement IA sans en tirer 10% de sa vraie valeur.' },
            ].map((item, i) => (
              <div key={i} style={{ border: '1px solid #151C25', padding: 24, textAlign: 'left' }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{item.icon}</div>
                <div style={{ fontWeight: 700, marginBottom: 8, color: 'white' }}>{item.title}</div>
                <div style={{ fontSize: 13, color: '#4A5568', lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SOLUTION — 4 MODULES */}
      <section style={{ padding: '80px 24px' }}>
        <div style={{ maxWidth: 1000, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div style={{ fontSize: 11, color: '#D4FF57', letterSpacing: '0.12em', marginBottom: 16 }}>LA SOLUTION</div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, lineHeight: 1.2 }}>
              4 modules pour tous tes besoins
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16 }}>
            {[
              { icon: '◈', label: 'Business', color: '#D4FF57', desc: 'Business plan, pitch deck, analyse de marché, modélisation financière, stratégie GTM.', cases: ['Business Plan', 'Pitch Deck', 'Analyse Marché'] },
              { icon: '◉', label: 'Contenu Viral', color: '#FF7A3D', desc: 'Hooks TikTok, scripts YouTube, posts LinkedIn, copywriting, newsletters.', cases: ['Hooks Viraux', 'Script YouTube', 'Post LinkedIn'] },
              { icon: '◎', label: 'Usage Pro', color: '#38C4FF', desc: 'Emails professionnels, CV optimisé, rapports exécutifs, négociation salariale.', cases: ['Email Pro', 'CV ATS', 'Rapport Exécutif'] },
              { icon: '⟁', label: 'Développement', color: '#A47CFF', desc: 'Architecture SaaS, génération de code, debugging, agents IA, CI/CD.', cases: ['Brief SaaS', 'Génération Code', 'Debug'] },
            ].map((m, i) => (
              <div key={i} style={{ border: '1px solid #151C25', background: '#0B0E13', padding: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <span style={{ fontSize: 24, color: m.color }}>{m.icon}</span>
                  <span style={{ fontWeight: 900, fontSize: 18, color: 'white' }}>{m.label}</span>
                </div>
                <p style={{ fontSize: 13, color: '#4A5568', lineHeight: 1.6, marginBottom: 16 }}>{m.desc}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  {m.cases.map(c => (
                    <span key={c} style={{ fontSize: 10, padding: '3px 8px', border: '1px solid #151C25', color: '#2D3748' }}>{c}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COMMENT CA MARCHE */}
      <section style={{ background: '#0B0E13', borderTop: '1px solid #151C25', borderBottom: '1px solid #151C25', padding: '80px 24px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 11, color: '#D4FF57', letterSpacing: '0.12em', marginBottom: 16 }}>COMMENT CA MARCHE</div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, marginBottom: 48 }}>
            3 étapes, 2 minutes
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
            {[
              { step: '01', title: 'Choisis ton module', desc: 'Business, Contenu, Pro ou Développement — sélectionne ce dont tu as besoin.' },
              { step: '02', title: 'Décris ton besoin', desc: 'Explique simplement ce que tu veux accomplir. Pas besoin d\'être un expert.' },
              { step: '03', title: 'Copie ton prompt', desc: 'Reçois un prompt expert et optimisé. Colle-le dans Claude ou ChatGPT.' },
            ].map((item, i) => (
              <div key={i} style={{ textAlign: 'left' }}>
                <div style={{ fontSize: 36, fontWeight: 900, color: '#151C25', marginBottom: 16 }}>{item.step}</div>
                <div style={{ fontWeight: 700, marginBottom: 8, color: 'white', fontSize: 15 }}>{item.title}</div>
                <div style={{ fontSize: 13, color: '#4A5568', lineHeight: 1.6 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ padding: '80px 24px', textAlign: 'center' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 42px)', fontWeight: 900, marginBottom: 16 }}>
            Prêt à maîtriser l&apos;IA ?
          </h2>
          <p style={{ color: '#4A5568', fontSize: 16, marginBottom: 32, lineHeight: 1.7 }}>
            Rejoins les utilisateurs qui obtiennent des résultats exceptionnels avec l&apos;IA grâce à Prompt Architect.
          </p>
          <Link href="/generate" style={{ background: '#D4FF57', color: '#07090C', padding: '16px 40px', fontSize: 14, fontWeight: 900, textDecoration: 'none', letterSpacing: '0.06em', display: 'inline-block' }}>
            ✦ COMMENCER GRATUITEMENT
          </Link>
          <p style={{ color: '#2D3748', fontSize: 12, marginTop: 16 }}>
            100% gratuit — Aucune inscription requise
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #151C25', padding: '24px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 22, height: 22, background: '#D4FF57', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, fontWeight: 900, color: '#07090C' }}>PA</div>
          <span style={{ fontWeight: 700, fontSize: 13 }}>Prompt Architect</span>
          <span style={{ color: '#2D3748', fontSize: 12 }}>© 2026</span>
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          <Link href="/generate" style={{ color: '#2D3748', fontSize: 12, textDecoration: 'none' }}>Générateur IA</Link>
          <Link href="/library" style={{ color: '#2D3748', fontSize: 12, textDecoration: 'none' }}>Bibliothèque</Link>
          <a href="mailto:contact@prompt-architect.io" style={{ color: '#2D3748', fontSize: 12, textDecoration: 'none' }}>Contact</a>
        </div>
      </footer>

    </main>
  )
}