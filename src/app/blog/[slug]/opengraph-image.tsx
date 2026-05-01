import { ImageResponse } from 'next/og'
import { ARTICLES } from '../../lib/blog'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export async function generateStaticParams() {
  return ARTICLES.map(a => ({ slug: a.slug }))
}

const CATEGORY_COLORS: Record<string, string> = {
  'Guide': '#D4FF57',
  'Business': '#38C4FF',
  'Contenu Viral': '#FF7A3D',
  'Viral Content': '#FF7A3D',
}

export default async function Image({ params }: { params: { slug: string } }) {
  const article = ARTICLES.find(a => a.slug === params.slug)

  const title = article?.title ?? params.slug
  const category = article?.category ?? 'Guide'
  const color = CATEGORY_COLORS[category] ?? '#D4FF57'
  const fontSize = title.length > 60 ? 44 : title.length > 40 ? 52 : 60

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#07090C',
          display: 'flex',
          flexDirection: 'column',
          padding: '64px 80px',
        }}
      >
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '48px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '40px', height: '40px', background: '#D4FF57', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '14px', fontWeight: 900, color: '#07090C' }}>
              PA
            </div>
            <span style={{ fontSize: '18px', fontWeight: 900, color: 'white' }}>
              Prompt Architect
            </span>
          </div>
          <div style={{ display: 'flex', fontSize: '13px', color, border: `1px solid ${color}`, padding: '6px 14px' }}>
            {category.toUpperCase()}
          </div>
        </div>

        {/* Label */}
        <div style={{ display: 'flex', fontSize: '11px', color, marginBottom: '20px' }}>
          // BLOG
        </div>

        {/* Title */}
        <div style={{ display: 'flex', fontSize: `${fontSize}px`, fontWeight: 900, color: 'white', lineHeight: 1.05, flex: 1 }}>
          {title}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '40px' }}>
          <div style={{ display: 'flex', fontSize: '14px', color: '#94A3B8' }}>
            prompt-architect.io
          </div>
          <div style={{ display: 'flex', fontSize: '13px', color, border: `1px solid ${color}`, padding: '8px 18px' }}>
            GENERER MON PROMPT
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
