'use client'

import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { ARTICLES } from '../../lib/blog'

type Props = { params: { slug: string } }



function renderContent(content: string) {
  const lines = content.split('\n')
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} style={{ fontSize: 22, fontWeight: 900, color: 'white', letterSpacing: '-0.02em', marginBottom: 16, marginTop: 40, paddingTop: 40, borderTop: '1px solid #151C25' }}>
          {line.replace('## ', '')}
        </h2>
      )
    } else if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} style={{ fontSize: 16, fontWeight: 900, color: '#D4FF57', letterSpacing: '0.02em', marginBottom: 12, marginTop: 28 }}>
          {line.replace('### ', '')}
        </h3>
      )
    } else if (line.startsWith('```')) {
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i])
        i++
      }
      elements.push(
        <div key={i} style={{ background: '#0B0E13', border: '1px solid #151C25', borderLeft: '3px solid #D4FF57', padding: 20, marginBottom: 24, marginTop: 8, overflowX: 'auto' }}>
          <pre style={{ margin: 0, fontSize: 12, lineHeight: 1.8, color: '#8A9AAA', fontFamily: 'monospace', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
            {codeLines.join('\n')}
          </pre>
        </div>
      )
    } else if (line.startsWith('- ') || line.match(/^\d+\. /)) {
      const listItems: string[] = [line]
      while (i + 1 < lines.length && (lines[i + 1].startsWith('- ') || lines[i + 1].match(/^\d+\. /))) {
        i++
        listItems.push(lines[i])
      }
      elements.push(
        <ul key={i} style={{ margin: '0 0 20px 0', padding: 0, listStyle: 'none' }}>
          {listItems.map((item, j) => (
            <li key={j} style={{ display: 'flex', gap: 10, marginBottom: 8, fontSize: 14, color: '#8A9AAA', lineHeight: 1.7 }}>
              <span style={{ color: '#D4FF57', flexShrink: 0 }}>→</span>
              <span>{item.replace(/^- /, '').replace(/^\d+\. /, '')}</span>
            </li>
          ))}
        </ul>
      )
    } else if (line.startsWith('**') && line.endsWith('**')) {
      elements.push(
        <p key={i} style={{ fontSize: 14, fontWeight: 900, color: 'white', marginBottom: 12 }}>
          {line.replace(/\*\*/g, '')}
        </p>
      )
    } else if (line.trim() === '') {
      elements.push(<div key={i} style={{ height: 8 }} />)
    } else if (line.trim()) {
      const formattedLine = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      elements.push(
        <p key={i} style={{ fontSize: 15, color: '#8A9AAA', lineHeight: 1.85, marginBottom: 16 }}
          dangerouslySetInnerHTML={{ __html: formattedLine }}
        />
      )
    }
    i++
  }
  return elements
}

const CATEGORY_COLORS: Record<string, string> = {
  'Guide': '#D4FF57',
  'Business': '#38C4FF',
  'Contenu Viral': '#FF7A3D',
  'Viral Content': '#FF7A3D',
}

export default function ArticlePage({ params }: Props) {
  const article = ARTICLES.find(a => a.slug === params.slug)
  if (!article) notFound()

  const relatedArticles = ARTICLES.filter(a => a.slug !== article.slug && a.lang === article.lang).slice(0, 3)
  const color = CATEGORY_COLORS[article.category] || '#D4FF57'

  return (
    <div style={{ minHeight: '100vh', background: '#07090C', color: 'white', fontFamily: 'monospace' }}>

      {/* HEADER */}
      <nav style={{ borderBottom: '1px solid #151C25', padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#07090CF0', backdropFilter: 'blur(16px)', zIndex: 100 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 28, height: 28, background: '#D4FF57', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900, color: '#07090C' }}>PA</div>
          <span style={{ fontWeight: 900, fontSize: 16, color: 'white', letterSpacing: '-0.02em' }}>Prompt Architect</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <Link href="/blog" style={{ color: '#4A5568', fontSize: 12, textDecoration: 'none', letterSpacing: '0.06em' }}>BLOG</Link>
          <Link href="/generate" style={{ background: '#D4FF57', color: '#07090C', padding: '9px 22px', fontSize: 11, fontWeight: 900, textDecoration: 'none', letterSpacing: '0.08em' }}>
            ✦ COMMENCER
          </Link>
        </div>
      </nav>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '56px 24px' }}>

        {/* BREADCRUMB */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 32, fontSize: 11, color: '#2D3748' }}>
          <Link href="/blog" style={{ color: '#2D3748', textDecoration: 'none' }}>Blog</Link>
          <span>→</span>
          <span style={{ color: color }}>{article.category}</span>
        </div>

        {/* ARTICLE HEADER */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <span style={{ fontSize: 10, color, border: `1px solid ${color}30`, background: `${color}10`, padding: '3px 10px', letterSpacing: '0.1em' }}>
              {article.category.toUpperCase()}
            </span>
            <span style={{ fontSize: 10, color: '#2D3748' }}>{article.readTime} min de lecture</span>
            <span style={{ color: '#151C25' }}>·</span>
            <span style={{ fontSize: 10, color: '#2D3748' }}>
              {new Date(article.publishedAt).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })}
            </span>
          </div>

          <h1 style={{ fontSize: 'clamp(24px, 4vw, 40px)', fontWeight: 900, lineHeight: 1.1, letterSpacing: '-0.03em', marginBottom: 20, color: 'white' }}>
            {article.title}
          </h1>

          <p style={{ fontSize: 16, color: '#4A5568', lineHeight: 1.75 }}>
            {article.metaDescription}
          </p>
        </div>

        {/* CTA INLINE AVANT ARTICLE */}
        <div style={{ border: '1px solid #D4FF5730', background: '#D4FF5708', padding: '16px 20px', marginBottom: 48, display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, color: '#8A9AAA' }}>
            💡 Génère des prompts experts en 2 minutes avec notre IA
          </span>
          <Link href="/generate" style={{ fontSize: 11, fontWeight: 900, color: '#D4FF57', textDecoration: 'none', letterSpacing: '0.06em', whiteSpace: 'nowrap', border: '1px solid #D4FF5740', padding: '7px 16px' }}>
            ✦ ESSAYER GRATUITEMENT →
          </Link>
        </div>

        {/* CONTENU DE L'ARTICLE */}
        <div style={{ marginBottom: 64 }}>
          {renderContent(article.content)}
        </div>

        {/* CTA FINAL */}
        <div style={{ border: '1px solid #151C25', background: '#0B0E13', padding: 32, marginBottom: 64, textAlign: 'center' }}>
          <div style={{ fontSize: 10, color: '#D4FF57', letterSpacing: '0.14em', marginBottom: 12 }}>// PASSE À L'ACTION</div>
          <h3 style={{ fontSize: 22, fontWeight: 900, marginBottom: 12, letterSpacing: '-0.02em' }}>
            Arrête de perdre du temps à écrire tes prompts
          </h3>
          <p style={{ fontSize: 14, color: '#4A5568', lineHeight: 1.7, marginBottom: 24, maxWidth: 400, margin: '0 auto 24px' }}>
            Prompt Architect génère des prompts experts en 2 minutes. 10 générations gratuites par mois, sans inscription.
          </p>
          <Link href="/generate" style={{ display: 'inline-block', background: '#D4FF57', color: '#07090C', padding: '14px 36px', fontSize: 12, fontWeight: 900, textDecoration: 'none', letterSpacing: '0.08em' }}>
            ✦ GÉNÉRER MON PROMPT GRATUITEMENT
          </Link>
        </div>

        {/* ARTICLES LIÉS */}
        {relatedArticles.length > 0 && (
          <div>
            <div style={{ fontSize: 10, color: '#2D3748', letterSpacing: '0.12em', marginBottom: 24 }}>ARTICLES SIMILAIRES</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: '#151C25', border: '1px solid #151C25' }}>
              {relatedArticles.map(related => (
                <Link key={related.slug} href={`/blog/${related.slug}`} style={{ textDecoration: 'none', background: '#07090C', padding: '16px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}
                  onMouseEnter={e => (e.currentTarget.style.background = '#0B0E13')}
                  onMouseLeave={e => (e.currentTarget.style.background = '#07090C')}
                >
                  <div>
                    <div style={{ fontSize: 9, color: CATEGORY_COLORS[related.category] || '#D4FF57', letterSpacing: '0.1em', marginBottom: 6 }}>{related.category.toUpperCase()}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: 'white' }}>{related.title}</div>
                  </div>
                  <span style={{ color: '#2D3748', fontSize: 16, flexShrink: 0 }}>→</span>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #151C25', padding: '28px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 20, height: 20, background: '#D4FF57', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 900, color: '#07090C' }}>PA</div>
          <span style={{ fontWeight: 700, fontSize: 12, color: '#4A5568' }}>Prompt Architect © 2026</span>
        </div>
        <div style={{ display: 'flex', gap: 28 }}>
          <Link href="/generate" style={{ color: '#2D3748', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>GÉNÉRATEUR</Link>
          <Link href="/blog" style={{ color: '#2D3748', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>BLOG</Link>
          <Link href="/pricing" style={{ color: '#2D3748', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>PRICING</Link>
        </div>
      </footer>

    </div>
  )
}
