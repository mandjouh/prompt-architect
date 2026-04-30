import { ImageResponse } from 'next/og'
import { ARTICLES } from '../../lib/blog'

export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

const CATEGORY_COLORS: Record<string, string> = {
  'Guide': '#D4FF57',
  'Business': '#38C4FF',
  'Contenu Viral': '#FF7A3D',
  'Viral Content': '#FF7A3D',
}

export default async function Image({ params }: { params: { slug: string } }) {
  const article = ARTICLES.find(a => a.slug === params.slug)

  const title = article?.title ?? 'Prompt Architect'
  const category = article?.category ?? 'Guide'
  const readTime = article?.readTime ?? 5
  const color = CATEGORY_COLORS[category] ?? '#D4FF57'

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#07090C',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '64px 80px',
          position: 'relative',
        }}
      >
        {/* Bordure accent en haut */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: color, display: 'flex' }} />

        {/* Header — logo + catégorie */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{ width: 40, height: 40, background: '#D4FF57', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 900, color: '#07090C' }}>
              PA
            </div>
            <span style={{ fontWeight: 900, fontSize: 18, color: 'white', letterSpacing: '-0.02em' }}>
              Prompt Architect
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ fontSize: 13, color, border: `1px solid ${color}40`, padding: '6px 14px', letterSpacing: '0.1em' }}>
              {category.toUpperCase()}
            </div>
            <div style={{ fontSize: 13, color: '#4A5568', letterSpacing: '0.06em' }}>
              {readTime} MIN DE LECTURE
            </div>
          </div>
        </div>

        {/* Titre */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, flex: 1, justifyContent: 'center', paddingTop: 32, paddingBottom: 32 }}>
          <div style={{ fontSize: 11, color, letterSpacing: '0.16em' }}>// BLOG</div>
          <div
            style={{
              fontSize: title.length > 60 ? 44 : title.length > 40 ? 52 : 60,
              fontWeight: 900,
              color: 'white',
              lineHeight: 1.05,
              letterSpacing: '-0.03em',
              maxWidth: 900,
            }}
          >
            {title}
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ fontSize: 14, color: '#4A5568', letterSpacing: '0.04em' }}>
            prompt-architect.io
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color, border: `1px solid ${color}30`, background: `${color}10`, padding: '8px 18px' }}>
            ✦ GÉNÉRER MON PROMPT GRATUITEMENT
          </div>
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  )
}
