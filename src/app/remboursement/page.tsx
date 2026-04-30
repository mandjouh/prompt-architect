import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de Remboursement — Prompt Architect',
  description: 'Politique de remboursement de Prompt Architect.',
  alternates: { canonical: 'https://www.prompt-architect.io/remboursement' },
}

export default function RemboursementPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#07090C', color: 'white', fontFamily: 'monospace' }}>
      <nav style={{ borderBottom: '1px solid #151C25', padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#07090CF0', backdropFilter: 'blur(16px)', zIndex: 100 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 28, height: 28, background: '#D4FF57', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900, color: '#07090C' }}>PA</div>
          <span style={{ fontWeight: 900, fontSize: 15, color: 'white', letterSpacing: '-0.02em' }}>Prompt Architect</span>
        </Link>
        <Link href="/generate" style={{ background: '#D4FF57', color: '#07090C', padding: '9px 18px', fontSize: 11, fontWeight: 900, textDecoration: 'none', letterSpacing: '0.08em' }}>✦ COMMENCER</Link>
      </nav>
      <div style={{ maxWidth: 760, margin: '0 auto', padding: '64px 24px' }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 10, color: '#D4FF57', letterSpacing: '0.14em', marginBottom: 14 }}>// LÉGAL</div>
          <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 8 }}>Politique de Remboursement</h1>
          <p style={{ fontSize: 12, color: '#94A3B8' }}>Dernière mise à jour : 29 avril 2026</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>

          <section>
            <h2 style={{ fontSize: 14, fontWeight: 900, color: '#D4FF57', letterSpacing: '0.1em', marginBottom: 16 }}>1. GARANTIE SATISFAIT OU REMBOURSÉ — 7 JOURS</h2>
            <div style={{ background: '#D4FF5708', border: '1px solid #D4FF5730', padding: 24, marginBottom: 16 }}>
              <p style={{ fontSize: 13, color: '#D4FF57', fontWeight: 900, marginBottom: 8 }}>✦ Première souscription uniquement</p>
              <p style={{ fontSize: 13, color: '#8A9AAA', lineHeight: 1.9 }}>
                Si tu souscris pour la première fois à un plan payant et que le service ne te convient pas, tu peux demander un remboursement intégral dans les 7 jours suivant ton premier paiement — sans justification requise.
              </p>
            </div>
            <p style={{ fontSize: 13, color: '#8A9AAA', lineHeight: 1.9 }}>
              Pour exercer ce droit, envoie un email à <span style={{ color: '#D4FF57' }}>support@prompt-architect.io</span> avec l'objet "Remboursement" et ton adresse email de compte. Le remboursement est traité sous 5 à 10 jours ouvrés sur le moyen de paiement d'origine.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 14, fontWeight: 900, color: '#D4FF57', letterSpacing: '0.1em', marginBottom: 16 }}>2. RENOUVELLEMENTS</h2>
            <p style={{ fontSize: 13, color: '#8A9AAA', lineHeight: 1.9 }}>
              Les renouvellements mensuels ne sont pas remboursables une fois prélevés. Tu peux annuler ton abonnement à tout moment pour éviter le prochain renouvellement — l'annulation prend effet à la fin de la période en cours et tu conserves l'accès jusqu'à cette date.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 14, fontWeight: 900, color: '#D4FF57', letterSpacing: '0.1em', marginBottom: 16 }}>3. EXCEPTIONS</h2>
            <p style={{ fontSize: 13, color: '#8A9AAA', lineHeight: 1.9, marginBottom: 12 }}>
              Un remboursement peut être accordé exceptionnellement hors délai de 7 jours dans les cas suivants :
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                'Panne technique majeure rendant le service inaccessible pendant plus de 48h consécutives',
                'Double facturation par erreur technique',
                'Facturation après annulation confirmée',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start', padding: '12px 16px', background: '#0B0E13', border: '1px solid #151C25' }}>
                  <span style={{ color: '#D4FF57', fontSize: 12, flexShrink: 0 }}>◈</span>
                  <span style={{ fontSize: 13, color: '#8A9AAA', lineHeight: 1.7 }}>{item}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 style={{ fontSize: 14, fontWeight: 900, color: '#D4FF57', letterSpacing: '0.1em', marginBottom: 16 }}>4. DROIT DE RÉTRACTATION EUROPÉEN</h2>
            <p style={{ fontSize: 13, color: '#8A9AAA', lineHeight: 1.9 }}>
              Conformément à la directive européenne 2011/83/UE, les utilisateurs résidant dans l'Union Européenne bénéficient d'un droit de rétractation de 14 jours à compter de la souscription. Ce droit peut être exercé en contactant support@prompt-architect.io. Note que ce droit s'applique uniquement à la première souscription et non aux renouvellements.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 14, fontWeight: 900, color: '#D4FF57', letterSpacing: '0.1em', marginBottom: 16 }}>5. COMMENT ANNULER</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: '#151C25' }}>
              {[
                { step: '01', text: 'Connecte-toi sur prompt-architect.io' },
                { step: '02', text: 'Va dans ton profil → section Abonnement' },
                { step: '03', text: 'Clique sur "Gérer mon abonnement"' },
                { step: '04', text: 'Annule depuis le portail Lemon Squeezy' },
              ].map((s, i) => (
                <div key={i} style={{ display: 'flex', gap: 16, alignItems: 'center', padding: '16px 20px', background: '#0B0E13' }}>
                  <span style={{ fontSize: 20, fontWeight: 900, color: '#151C25', minWidth: 32 }}>{s.step}</span>
                  <span style={{ fontSize: 13, color: '#8A9AAA' }}>{s.text}</span>
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 style={{ fontSize: 14, fontWeight: 900, color: '#D4FF57', letterSpacing: '0.1em', marginBottom: 16 }}>6. CONTACT</h2>
            <p style={{ fontSize: 13, color: '#8A9AAA', lineHeight: 1.9 }}>
              Pour toute demande de remboursement ou question : <span style={{ color: '#D4FF57' }}>support@prompt-architect.io</span><br />
              Délai de réponse : moins de 24h du lundi au vendredi.
            </p>
          </section>

        </div>
        <div style={{ marginTop: 48, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <Link href="/legal" style={{ fontSize: 12, color: '#94A3B8', textDecoration: 'none', letterSpacing: '0.06em' }}>MENTIONS LÉGALES →</Link>
          <Link href="/cgv" style={{ fontSize: 12, color: '#94A3B8', textDecoration: 'none', letterSpacing: '0.06em' }}>CGV →</Link>
        </div>
      </div>
      <footer style={{ borderTop: '1px solid #151C25', padding: '24px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <span style={{ fontWeight: 700, fontSize: 12, color: '#94A3B8' }}>Prompt Architect © 2026</span>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <Link href="/legal" style={{ color: '#6B7A8D', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>MENTIONS LÉGALES</Link>
          <Link href="/cgv" style={{ color: '#6B7A8D', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>CGV</Link>
          <Link href="/remboursement" style={{ color: '#D4FF57', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>REMBOURSEMENT</Link>
          <Link href="/contact" style={{ color: '#6B7A8D', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>CONTACT</Link>
        </div>
      </footer>
    </div>
  )
}
