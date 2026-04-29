import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Mentions Légales — Prompt Architect',
  description: 'Mentions légales du site Prompt Architect.',
  alternates: { canonical: 'https://www.prompt-architect.io/legal' },
}

export default function LegalPage() {
  return (
    <div style={{ minHeight: '100vh', background: '#07090C', color: 'white', fontFamily: 'monospace' }}>

      {/* HEADER */}
      <nav style={{ borderBottom: '1px solid #151C25', padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#07090CF0', backdropFilter: 'blur(16px)', zIndex: 100 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 28, height: 28, background: '#D4FF57', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900, color: '#07090C' }}>PA</div>
          <span style={{ fontWeight: 900, fontSize: 15, color: 'white', letterSpacing: '-0.02em' }}>Prompt Architect</span>
        </Link>
        <Link href="/generate" style={{ background: '#D4FF57', color: '#07090C', padding: '9px 18px', fontSize: 11, fontWeight: 900, textDecoration: 'none', letterSpacing: '0.08em' }}>
          ✦ COMMENCER
        </Link>
      </nav>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '64px 24px' }}>

        <div style={{ marginBottom: 48 }}>
          <div style={{ fontSize: 10, color: '#D4FF57', letterSpacing: '0.14em', marginBottom: 14 }}>// LÉGAL</div>
          <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 8 }}>Mentions légales</h1>
          <p style={{ fontSize: 12, color: '#2D3748' }}>Dernière mise à jour : 29 avril 2026</p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>

          <section>
            <h2 style={{ fontSize: 14, fontWeight: 900, color: '#D4FF57', letterSpacing: '0.1em', marginBottom: 16 }}>1. ÉDITEUR DU SITE</h2>
            <div style={{ background: '#0B0E13', border: '1px solid #151C25', padding: 24, fontSize: 13, color: '#8A9AAA', lineHeight: 2 }}>
              <div><span style={{ color: '#4A5568' }}>Site :</span> Prompt Architect</div>
              <div><span style={{ color: '#4A5568' }}>URL :</span> https://www.prompt-architect.io</div>
              <div><span style={{ color: '#4A5568' }}>Email :</span> support@prompt-architect.io</div>
              <div><span style={{ color: '#4A5568' }}>Responsable de publication :</span> Mandjouh</div>
            </div>
          </section>

          <section>
            <h2 style={{ fontSize: 14, fontWeight: 900, color: '#D4FF57', letterSpacing: '0.1em', marginBottom: 16 }}>2. HÉBERGEMENT</h2>
            <div style={{ background: '#0B0E13', border: '1px solid #151C25', padding: 24, fontSize: 13, color: '#8A9AAA', lineHeight: 2 }}>
              <div><span style={{ color: '#4A5568' }}>Hébergeur :</span> Vercel Inc.</div>
              <div><span style={{ color: '#4A5568' }}>Adresse :</span> 340 Pine Street, Suite 701, San Francisco, CA 94104, États-Unis</div>
              <div><span style={{ color: '#4A5568' }}>Site :</span> https://vercel.com</div>
            </div>
          </section>

          <section>
            <h2 style={{ fontSize: 14, fontWeight: 900, color: '#D4FF57', letterSpacing: '0.1em', marginBottom: 16 }}>3. PROPRIÉTÉ INTELLECTUELLE</h2>
            <p style={{ fontSize: 13, color: '#8A9AAA', lineHeight: 1.9 }}>
              L'ensemble du contenu de ce site (textes, graphismes, logo, code source) est la propriété exclusive de Prompt Architect et est protégé par les lois applicables sur la propriété intellectuelle. Toute reproduction, distribution ou utilisation sans autorisation écrite préalable est strictement interdite.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 14, fontWeight: 900, color: '#D4FF57', letterSpacing: '0.1em', marginBottom: 16 }}>4. DONNÉES PERSONNELLES</h2>
            <p style={{ fontSize: 13, color: '#8A9AAA', lineHeight: 1.9 }}>
              Les données personnelles collectées (email, nom d'affichage) sont utilisées uniquement pour la gestion des comptes utilisateurs et la fourniture du service. Elles sont stockées de manière sécurisée via Supabase et ne sont jamais vendues à des tiers. Conformément au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données en nous contactant à support@prompt-architect.io.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 14, fontWeight: 900, color: '#D4FF57', letterSpacing: '0.1em', marginBottom: 16 }}>5. COOKIES</h2>
            <p style={{ fontSize: 13, color: '#8A9AAA', lineHeight: 1.9 }}>
              Ce site utilise Plausible Analytics, un outil de mesure d'audience respectueux de la vie privée qui ne pose aucun cookie de tracking. Les paiements sont gérés par Lemon Squeezy qui peut utiliser des cookies techniques nécessaires au traitement des transactions.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 14, fontWeight: 900, color: '#D4FF57', letterSpacing: '0.1em', marginBottom: 16 }}>6. LIMITATION DE RESPONSABILITÉ</h2>
            <p style={{ fontSize: 13, color: '#8A9AAA', lineHeight: 1.9 }}>
              Les prompts générés par Prompt Architect sont fournis à titre indicatif. L'utilisateur est seul responsable de l'usage qu'il en fait. Prompt Architect ne saurait être tenu responsable des conséquences directes ou indirectes liées à l'utilisation des prompts générés.
            </p>
          </section>

          <section>
            <h2 style={{ fontSize: 14, fontWeight: 900, color: '#D4FF57', letterSpacing: '0.1em', marginBottom: 16 }}>7. DROIT APPLICABLE</h2>
            <p style={{ fontSize: 13, color: '#8A9AAA', lineHeight: 1.9 }}>
              Les présentes mentions légales sont soumises au droit applicable dans la province de Québec, Canada. Tout litige sera soumis aux tribunaux compétents.
            </p>
          </section>

        </div>

        <div style={{ marginTop: 48, display: 'flex', gap: 24, flexWrap: 'wrap' }}>
          <Link href="/cgv" style={{ fontSize: 12, color: '#4A5568', textDecoration: 'none', letterSpacing: '0.06em' }}>CONDITIONS GÉNÉRALES DE VENTE →</Link>
          <Link href="/remboursement" style={{ fontSize: 12, color: '#4A5568', textDecoration: 'none', letterSpacing: '0.06em' }}>POLITIQUE DE REMBOURSEMENT →</Link>
        </div>

      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #151C25', padding: '24px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <span style={{ fontWeight: 700, fontSize: 12, color: '#4A5568' }}>Prompt Architect © 2026</span>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <Link href="/legal" style={{ color: '#D4FF57', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>MENTIONS LÉGALES</Link>
          <Link href="/cgv" style={{ color: '#6B7A8D', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>CGV</Link>
          <Link href="/remboursement" style={{ color: '#6B7A8D', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>REMBOURSEMENT</Link>
          <Link href="/contact" style={{ color: '#6B7A8D', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>CONTACT</Link>
        </div>
      </footer>

    </div>
  )
}
