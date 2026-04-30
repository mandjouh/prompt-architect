import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '404 — Page introuvable · Prompt Architect',
}

export default function NotFound() {
  return (
    <div style={{ minHeight: '100vh', background: '#07090C', color: 'white', fontFamily: 'monospace', display: 'flex', flexDirection: 'column' }}>

      {/* HEADER */}
      <nav style={{ borderBottom: '1px solid #151C25', padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#07090CF0', backdropFilter: 'blur(16px)' }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 28, height: 28, background: '#D4FF57', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900, color: '#07090C' }}>PA</div>
          <span style={{ fontWeight: 900, fontSize: 15, color: 'white', letterSpacing: '-0.02em' }}>Prompt Architect</span>
        </Link>
        <Link href="/generate" style={{ background: '#D4FF57', color: '#07090C', padding: '9px 18px', fontSize: 11, fontWeight: 900, textDecoration: 'none', letterSpacing: '0.08em' }}>
          ✦ COMMENCER
        </Link>
      </nav>

      {/* CONTENU */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '48px 24px', textAlign: 'center', position: 'relative' }}>

        {/* Grille de fond */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(#151C2520 1px, transparent 1px), linear-gradient(90deg, #151C2520 1px, transparent 1px)', backgroundSize: '60px 60px', pointerEvents: 'none' }} />

        <div style={{ position: 'relative' }}>
          <div style={{ fontSize: 'clamp(80px, 20vw, 160px)', fontWeight: 900, color: '#0F1520', lineHeight: 1, letterSpacing: '-0.06em', marginBottom: 8 }}>
            404
          </div>
          <div style={{ fontSize: 10, color: '#D4FF57', letterSpacing: '0.14em', marginBottom: 20 }}>// PAGE INTROUVABLE</div>
          <h1 style={{ fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 16, lineHeight: 1.1 }}>
            Cette page n&apos;existe pas.
          </h1>
          <p style={{ fontSize: 14, color: '#94A3B8', lineHeight: 1.75, maxWidth: 380, margin: '0 auto 40px' }}>
            Tu as suivi un lien cassé ou tapé une URL incorrecte. Retourne au générateur et crée ton prochain prompt expert.
          </p>

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/generate" style={{ background: '#D4FF57', color: '#07090C', padding: '13px 28px', fontSize: 12, fontWeight: 900, textDecoration: 'none', letterSpacing: '0.08em', display: 'flex', alignItems: 'center', gap: 8 }}>
              ✦ ALLER AU GÉNÉRATEUR
            </Link>
            <Link href="/" style={{ border: '1px solid #2A3545', color: '#8A9AAA', padding: '13px 28px', fontSize: 12, fontWeight: 900, textDecoration: 'none', letterSpacing: '0.08em' }}>
              ← ACCUEIL
            </Link>
          </div>

          {/* Liens rapides */}
          <div style={{ marginTop: 48, display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { href: '/library', label: 'BIBLIOTHÈQUE' },
              { href: '/pricing', label: 'PRICING' },
              { href: '/blog', label: 'BLOG' },
              { href: '/contact', label: 'CONTACT' },
            ].map((link, i) => (
              <Link key={i} href={link.href} style={{ fontSize: 11, color: '#94A3B8', textDecoration: 'none', letterSpacing: '0.08em' }}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #151C25', padding: '20px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ fontWeight: 700, fontSize: 12, color: '#94A3B8' }}>Prompt Architect © 2026</span>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <Link href="/legal" style={{ color: '#6B7A8D', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>MENTIONS LÉGALES</Link>
          <Link href="/cgv" style={{ color: '#6B7A8D', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>CGV</Link>
          <Link href="/remboursement" style={{ color: '#6B7A8D', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>REMBOURSEMENT</Link>
        </div>
      </footer>

    </div>
  )
}
