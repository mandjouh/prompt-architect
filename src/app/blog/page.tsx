'use client'

import Link from 'next/link'
import { ARTICLES } from '../lib/blog'

const CATEGORY_COLORS: Record<string, string> = {
  'Guide': '#D4FF57',
  'Business': '#38C4FF',
  'Contenu Viral': '#FF7A3D',
  'Viral Content': '#FF7A3D',
}

export default function BlogPage() {
  const frArticles = ARTICLES.filter(a => a.lang === 'fr')
  const enArticles = ARTICLES.filter(a => a.lang === 'en')

  return (
    <div style={{ minHeight: '100vh', background: '#07090C', color: 'white', fontFamily: 'monospace' }}>

      {/* HEADER */}
      <nav style={{ borderBottom: '1px solid #151C25', padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#07090CF0', backdropFilter: 'blur(16px)', zIndex: 100 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 28, height: 28, background: '#D4FF57', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900, color: '#07090C' }}>PA</div>
          <span style={{ fontWeight: 900, fontSize: 16, color: 'white', letterSpacing: '-0.02em' }}>Prompt Architect</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <Link href="/library" style={{ color: '#FFFFFF', fontSize: 12, textDecoration: 'none', letterSpacing: '0.06em' }}>BIBLIOTHÈQUE</Link>
          <Link href="/pricing" style={{ color: '#FFFFFF', fontSize: 12, textDecoration: 'none', letterSpacing: '0.06em' }}>PRICING</Link>
          <Link href="/contact" style={{ color: '#FFFFFF', fontSize: 12, textDecoration: 'none', letterSpacing: '0.06em' }}>CONTACT</Link>
          <Link href="/generate" style={{ background: '#D4FF57', color: '#07090C', padding: '9px 22px', fontSize: 11, fontWeight: 900, textDecoration: 'none', letterSpacing: '0.08em' }}>
            ✦ COMMENCER
          </Link>
        </div>
      </nav>

      <div style={{ maxWidth: 960, margin: '0 auto', padding: '64px 24px' }}>

        {/* HERO */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ fontSize: 10, color: '#D4FF57', letterSpacing: '0.14em', marginBottom: 16 }}>// BLOG</div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, letterSpacing: '-0.04em', lineHeight: 0.95, marginBottom: 20 }}>
            Maîtrise le<br /><span style={{ color: '#D4FF57' }}>Prompt Engineering.</span>
          </h1>
          <p style={{ fontSize: 16, color: '#4A5568', lineHeight: 1.75, maxWidth: 500 }}>
            Guides pratiques, stratégies de contenu viral et tutoriels pour tirer le maximum de l'IA.
          </p>
        </div>

        {/* ARTICLES FRANÇAIS */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <div style={{ fontSize: 10, color: '#2D3748', letterSpacing: '0.12em' }}>ARTICLES EN FRANÇAIS</div>
            <div style={{ flex: 1, height: 1, background: '#151C25' }} />
            <span style={{ fontSize: 10, color: '#2D3748' }}>{frArticles.length} articles</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: '#151C25', border: '1px solid #151C25' }}>
            {frArticles.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`} style={{ textDecoration: 'none', background: '#07090C', padding: 28, display: 'block', position: 'relative', overflow: 'hidden' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#0B0E13')}
                onMouseLeave={e => (e.currentTarget.style.background = '#07090C')}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: CATEGORY_COLORS[article.category] || '#D4FF57' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <span style={{ fontSize: 9, color: CATEGORY_COLORS[article.category] || '#D4FF57', letterSpacing: '0.1em' }}>{article.category.toUpperCase()}</span>
                  <span style={{ color: '#151C25' }}>·</span>
                  <span style={{ fontSize: 9, color: '#2D3748' }}>{article.readTime} min de lecture</span>
                </div>
                <h2 style={{ fontSize: 15, fontWeight: 900, color: 'white', lineHeight: 1.3, marginBottom: 12, letterSpacing: '-0.02em' }}>{article.title}</h2>
                <p style={{ fontSize: 12, color: '#4A5568', lineHeight: 1.6, marginBottom: 16 }}>{article.metaDescription}</p>
                <div style={{ fontSize: 11, color: '#D4FF57', letterSpacing: '0.04em' }}>Lire l'article →</div>
              </Link>
            ))}
          </div>
        </div>

        {/* ARTICLES ANGLAIS */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 32 }}>
            <div style={{ fontSize: 10, color: '#2D3748', letterSpacing: '0.12em' }}>ARTICLES IN ENGLISH</div>
            <div style={{ flex: 1, height: 1, background: '#151C25' }} />
            <span style={{ fontSize: 10, color: '#2D3748' }}>{enArticles.length} articles</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 1, background: '#151C25', border: '1px solid #151C25' }}>
            {enArticles.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`} style={{ textDecoration: 'none', background: '#07090C', padding: 28, display: 'block', position: 'relative', overflow: 'hidden' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#0B0E13')}
                onMouseLeave={e => (e.currentTarget.style.background = '#07090C')}
              >
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: CATEGORY_COLORS[article.category] || '#FF7A3D' }} />
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
                  <span style={{ fontSize: 9, color: CATEGORY_COLORS[article.category] || '#FF7A3D', letterSpacing: '0.1em' }}>{article.category.toUpperCase()}</span>
                  <span style={{ color: '#151C25' }}>·</span>
                  <span style={{ fontSize: 9, color: '#2D3748' }}>{article.readTime} min read</span>
                </div>
                <h2 style={{ fontSize: 15, fontWeight: 900, color: 'white', lineHeight: 1.3, marginBottom: 12, letterSpacing: '-0.02em' }}>{article.title}</h2>
                <p style={{ fontSize: 12, color: '#4A5568', lineHeight: 1.6, marginBottom: 16 }}>{article.metaDescription}</p>
                <div style={{ fontSize: 11, color: '#FF7A3D', letterSpacing: '0.04em' }}>Read article →</div>
              </Link>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ border: '1px solid #D4FF5730', background: '#D4FF5708', padding: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <div style={{ fontSize: 10, color: '#D4FF57', letterSpacing: '0.14em', marginBottom: 10 }}>// PASSE À L'ACTION</div>
            <h3 style={{ fontSize: 20, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 6 }}>Génère tes propres prompts experts</h3>
            <p style={{ fontSize: 13, color: '#4A5568' }}>En 2 minutes, avec notre générateur IA.</p>
          </div>
          <Link href="/generate" style={{ background: '#D4FF57', color: '#07090C', padding: '13px 32px', fontSize: 12, fontWeight: 900, textDecoration: 'none', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>
            ✦ ESSAYER GRATUITEMENT
          </Link>
        </div>

      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #151C25', padding: '28px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 20, height: 20, background: '#D4FF57', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 900, color: '#07090C' }}>PA</div>
          <span style={{ fontWeight: 700, fontSize: 12, color: '#4A5568' }}>Prompt Architect © 2026</span>
        </div>
        <div style={{ display: 'flex', gap: 28 }}>
          <Link href="/generate" style={{ color: '#6B7A8D', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>GÉNÉRATEUR</Link>
          <Link href="/library" style={{ color: '#6B7A8D', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>BIBLIOTHÈQUE</Link>
          <Link href="/blog" style={{ color: '#6B7A8D', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>BLOG</Link>
          <Link href="/pricing" style={{ color: '#6B7A8D', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>PRICING</Link>
          <Link href="/contact" style={{ color: '#6B7A8D', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>CONTACT</Link>
        </div>
      </footer>
    </div>
  )
}
