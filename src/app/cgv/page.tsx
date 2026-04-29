import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Conditions Générales de Vente — Prompt Architect',
  description: 'Conditions générales de vente de Prompt Architect.',
  alternates: { canonical: 'https://www.prompt-architect.io/cgv' },
}

export default function CGVPage() {
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
          <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 8 }}>Conditions Générales de Vente</h1>
          <p style={{ fontSize: 12, color: '#2D3748' }}>Dernière mise à jour : 29 avril 2026</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
          {[
            { title: '1. OBJET', content: "Les présentes CGV régissent l'accès aux services payants de Prompt Architect sur https://www.prompt-architect.io. En souscrivant à un abonnement, l'utilisateur accepte sans réserve les présentes CGV." },
            { title: '3. PAIEMENT', content: "Les paiements sont traités par Lemon Squeezy. Les abonnements sont facturés mensuellement. En cas d'échec de paiement, l'accès aux fonctionnalités payantes est suspendu et le compte rétrogradé au plan gratuit." },
            { title: '4. DURÉE ET RÉSILIATION', content: "Les abonnements sont sans engagement et annulables à tout moment depuis le portail Lemon Squeezy. L'annulation prend effet à la fin de la période en cours. Aucun remboursement prorata n'est accordé sauf cas prévus à l'article 5." },
            { title: '5. REMBOURSEMENTS', content: "Un remboursement intégral est possible dans les 7 jours suivant la première souscription, sur demande à support@prompt-architect.io. Voir notre Politique de remboursement complète pour les renouvellements." },
            { title: '6. UTILISATION ACCEPTABLE', content: "Est interdit : la génération de contenu illégal, la revente des prompts sans autorisation, le contournement des limites techniques. Toute violation entraîne la résiliation immédiate sans remboursement." },
            { title: '7. DISPONIBILITÉ', content: "Prompt Architect vise une disponibilité de 99%. Des interruptions de maintenance peuvent survenir. Aucune compensation n'est due pour des interruptions inférieures à 24h consécutives." },
            { title: '8. PROPRIÉTÉ DES PROMPTS', content: "Les prompts générés appartiennent à l'utilisateur. Prompt Architect ne revendique aucun droit sur le contenu généré." },
            { title: '9. CONTACT', content: "Pour toute question : support@prompt-architect.io" },
          ].map((s, i) => (
            <section key={i}>
              <h2 style={{ fontSize: 14, fontWeight: 900, color: '#D4FF57', letterSpacing: '0.1em', marginBottom: 16 }}>{s.title}</h2>
              <p style={{ fontSize: 13, color: '#8A9AAA', lineHeight: 1.9 }}>{s.content}</p>
            </section>
          ))}
          <section>
            <h2 style={{ fontSize: 14, fontWeight: 900, color: '#D4FF57', letterSpacing: '0.1em', marginBottom: 16 }}>2. SERVICES ET TARIFS</h2>
            <div style={{ background: '#0B0E13', border: '1px solid #151C25', overflow: 'hidden', marginBottom: 12 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderBottom: '1px solid #151C25', padding: '12px 20px' }}>
                <span style={{ fontSize: 10, color: '#2D3748', letterSpacing: '0.1em' }}>PLAN</span>
                <span style={{ fontSize: 10, color: '#2D3748', letterSpacing: '0.1em' }}>GÉNÉRATIONS/MOIS</span>
                <span style={{ fontSize: 10, color: '#2D3748', letterSpacing: '0.1em' }}>PRIX</span>
              </div>
              {[
                { plan: 'Free', gen: '5', prix: '0 $', color: '#4A5568' },
                { plan: 'Standard', gen: '50', prix: '5 $/mois', color: '#38C4FF' },
                { plan: 'Pro', gen: '100', prix: '10 $/mois', color: '#D4FF57' },
                { plan: 'Premium', gen: '250', prix: '20 $/mois', color: '#A47CFF' },
              ].map((row, i, arr) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '14px 20px', borderBottom: i < arr.length - 1 ? '1px solid #0F1520' : 'none' }}>
                  <span style={{ fontSize: 12, fontWeight: 900, color: row.color }}>{row.plan}</span>
                  <span style={{ fontSize: 12, color: '#8A9AAA' }}>{row.gen}</span>
                  <span style={{ fontSize: 12, color: '#8A9AAA' }}>{row.prix}</span>
                </div>
              ))}
            </div>
            <p style={{ fontSize: 12, color: '#4A5568', lineHeight: 1.7 }}>Tous les prix sont en USD. Les tarifs peuvent être modifiés avec un préavis de 30 jours.</p>
          </section>
        </div>
        <div style={{ marginTop: 48, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <Link href="/legal" style={{ fontSize: 12, color: '#4A5568', textDecoration: 'none', letterSpacing: '0.06em' }}>MENTIONS LÉGALES →</Link>
          <Link href="/remboursement" style={{ fontSize: 12, color: '#4A5568', textDecoration: 'none', letterSpacing: '0.06em' }}>POLITIQUE DE REMBOURSEMENT →</Link>
        </div>
      </div>
      <footer style={{ borderTop: '1px solid #151C25', padding: '24px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <span style={{ fontWeight: 700, fontSize: 12, color: '#4A5568' }}>Prompt Architect © 2026</span>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <Link href="/legal" style={{ color: '#6B7A8D', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>MENTIONS LÉGALES</Link>
          <Link href="/cgv" style={{ color: '#D4FF57', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>CGV</Link>
          <Link href="/remboursement" style={{ color: '#6B7A8D', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>REMBOURSEMENT</Link>
          <Link href="/contact" style={{ color: '#6B7A8D', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>CONTACT</Link>
        </div>
      </footer>
    </div>
  )
}
