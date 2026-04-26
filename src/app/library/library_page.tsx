'use client'
import { useState } from 'react'
import { PREMIUM_PROMPTS, MODULE_COLORS, MODULES_LIST } from '../lib/prompts'

const MODULE_ICONS: Record<string, string> = {
  'Business': '◈',
  'Contenu Viral': '◉',
  'Usage Pro': '◎',
  'Développement': '⟁',
}

export default function LibraryPage() {
  const [mod, setMod] = useState('Tous')
  const [sel, setSel] = useState<typeof PREMIUM_PROMPTS[0] | null>(null)
  const [copied, setCopied] = useState(false)
  const [search, setSearch] = useState('')

  const modules = ['Tous', ...MODULES_LIST]

  const filtered = PREMIUM_PROMPTS.filter(p => {
    const okMod = mod === 'Tous' || p.module === mod
    const okSearch = search === '' || p.title.toLowerCase().includes(search.toLowerCase()) || p.module.toLowerCase().includes(search.toLowerCase())
    return okMod && okSearch
  })

  const copy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const moduleCount = (m: string) => m === 'Tous'
    ? PREMIUM_PROMPTS.length
    : PREMIUM_PROMPTS.filter(p => p.module === m).length

  return (
    <div style={{ minHeight: '100vh', background: '#07090C', color: 'white', fontFamily: 'monospace', display: 'flex', flexDirection: 'column' }}>

      {/* HEADER */}
      <div style={{ borderBottom: '1px solid #151C25', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#07090CF0', backdropFilter: 'blur(16px)', zIndex: 100 }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 26, height: 26, background: '#D4FF57', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 900, color: '#07090C' }}>PA</div>
          <span style={{ fontWeight: 900, fontSize: 15, color: 'white', letterSpacing: '-0.02em' }}>Prompt Architect</span>
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <span style={{ fontSize: 10, color: '#D4FF57', border: '1px solid #D4FF5730', padding: '4px 10px', letterSpacing: '0.1em' }}>
            {filtered.length} PROMPT{filtered.length > 1 ? 'S' : ''}
          </span>
          <a href="/generate" style={{ background: '#D4FF57', color: '#07090C', padding: '8px 18px', fontSize: 11, fontWeight: 900, textDecoration: 'none', letterSpacing: '0.06em' }}>
            ✦ GÉNÉRATEUR IA
          </a>
        </div>
      </div>

      <div style={{ display: 'flex', flex: 1 }}>

        {/* SIDEBAR GAUCHE */}
        <div style={{ width: 260, borderRight: '1px solid #151C25', padding: '24px 0', flexShrink: 0, display: 'flex', flexDirection: 'column', gap: 0, position: 'sticky', top: 57, height: 'calc(100vh - 57px)', overflowY: 'auto' }}>

          {/* Search */}
          <div style={{ padding: '0 16px 20px', borderBottom: '1px solid #0F1520' }}>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', fontSize: 12, color: '#2D3748' }}>⌕</span>
              <input
                type="text"
                placeholder="Rechercher..."
                value={search}
                onChange={e => setSearch(e.target.value)}
                style={{ width: '100%', background: '#0B0E13', border: '1px solid #151C25', color: 'white', padding: '9px 12px 9px 30px', fontFamily: 'monospace', fontSize: 12, outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          {/* Filtres module */}
          <div style={{ padding: '20px 16px 8px' }}>
            <div style={{ fontSize: 9, color: '#2D3748', letterSpacing: '0.12em', marginBottom: 10 }}>MODULES</div>
            {modules.map(m => {
              const color = MODULE_COLORS[m] || '#D4FF57'
              const icon = MODULE_ICONS[m] || '◈'
              const isActive = mod === m
              return (
                <button
                  key={m}
                  onClick={() => setMod(m)}
                  style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '9px 10px', marginBottom: 2, background: isActive ? '#0F1520' : 'transparent',
                    border: isActive ? `1px solid ${color}25` : '1px solid transparent',
                    color: isActive ? 'white' : '#4A5568', cursor: 'pointer', textAlign: 'left', fontFamily: 'monospace',
                    fontSize: 12, transition: 'all 0.1s',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {m !== 'Tous' && <span style={{ color: isActive ? color : '#2D3748', fontSize: 11 }}>{icon}</span>}
                    {m === 'Tous' && <span style={{ color: isActive ? '#D4FF57' : '#2D3748', fontSize: 11 }}>◌</span>}
                    <span style={{ color: isActive ? (m === 'Tous' ? '#D4FF57' : color) : '#4A5568' }}>{m}</span>
                  </span>
                  <span style={{ fontSize: 10, color: '#2D3748', background: '#0B0E13', padding: '1px 6px', border: '1px solid #151C25' }}>
                    {moduleCount(m)}
                  </span>
                </button>
              )
            })}
          </div>
        </div>

        {/* LISTE CENTRALE */}
        <div style={{ flex: 1, overflowY: 'auto', borderRight: '1px solid #151C25', maxHeight: 'calc(100vh - 57px)', position: 'sticky', top: 57 }}>
          {filtered.length === 0 ? (
            <div style={{ padding: 48, textAlign: 'center', color: '#2D3748', fontSize: 13 }}>
              Aucun prompt trouvé pour &quot;{search}&quot;
            </div>
          ) : filtered.map((p, idx) => {
            const color = MODULE_COLORS[p.module] || '#D4FF57'
            const isSelected = sel?.id === p.id
            return (
              <button
                key={p.id}
                onClick={() => setSel(p)}
                style={{
                  width: '100%', display: 'block', padding: '18px 24px',
                  borderBottom: '1px solid #0A0D12',
                  background: isSelected ? '#0D1118' : 'transparent',
                  borderLeft: isSelected ? `2px solid ${color}` : '2px solid transparent',
                  cursor: 'pointer', textAlign: 'left', color: 'white',
                  transition: 'all 0.1s',
                }}
                onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = '#0B0E13' }}
                onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = 'transparent' }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span style={{ fontSize: 9, color, letterSpacing: '0.1em', display: 'flex', alignItems: 'center', gap: 5 }}>
                    <span>{MODULE_ICONS[p.module] || '◈'}</span>
                    {p.module.toUpperCase()}
                  </span>
                  <span style={{ fontSize: 9, color: '#2D3748', letterSpacing: '0.06em' }}>#{String(idx + 1).padStart(2, '0')}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: isSelected ? 'white' : '#8A9AAA', marginBottom: 4, letterSpacing: '-0.01em' }}>
                  {p.title}
                </div>
                <div style={{ fontSize: 10, color: '#2D3748', letterSpacing: '0.04em' }}>{p.difficulty || p.category}</div>
              </button>
            )
          })}
        </div>

        {/* PANEL DROIT — détail */}
        <div style={{ width: 420, flexShrink: 0, position: 'sticky', top: 57, height: 'calc(100vh - 57px)', overflowY: 'auto' }}>
          {sel ? (
            <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              {/* Header du prompt */}
              <div style={{ padding: '24px 28px', borderBottom: '1px solid #151C25' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                  <span style={{ fontSize: 11, color: MODULE_COLORS[sel.module] || '#D4FF57' }}>
                    {MODULE_ICONS[sel.module]} {sel.module}
                  </span>
                  <span style={{ color: '#151C25' }}>·</span>
                  <span style={{ fontSize: 11, color: '#2D3748' }}>{sel.category}</span>
                </div>
                <h2 style={{ fontSize: 18, fontWeight: 900, color: 'white', lineHeight: 1.2, letterSpacing: '-0.02em', margin: 0 }}>
                  {sel.title}
                </h2>
              </div>

              {/* Prompt content */}
              <div style={{ flex: 1, overflowY: 'auto', padding: '24px 28px' }}>
                <div style={{ fontSize: 9, color: '#2D3748', letterSpacing: '0.12em', marginBottom: 14 }}>PROMPT</div>
                <div style={{ fontSize: 12, lineHeight: 1.85, color: '#6A7A8A', whiteSpace: 'pre-wrap' }}>
                  {sel.prompt}
                </div>
              </div>

              {/* Actions */}
              <div style={{ padding: '20px 28px', borderTop: '1px solid #151C25', display: 'flex', gap: 10 }}>
                <button
                  onClick={() => copy(sel.prompt)}
                  style={{
                    flex: 1, padding: '12px 0', fontSize: 11, fontWeight: 900, fontFamily: 'monospace',
                    letterSpacing: '0.08em', border: 'none', cursor: 'pointer',
                    background: copied ? '#2A4A2A' : '#D4FF57',
                    color: copied ? '#5EDD5E' : '#07090C',
                    transition: 'all 0.2s',
                  }}
                >
                  {copied ? '✓ COPIÉ !' : '⎘ COPIER LE PROMPT'}
                </button>
                <a
                  href="/generate"
                  style={{ padding: '12px 16px', fontSize: 11, fontWeight: 900, letterSpacing: '0.06em', border: '1px solid #151C25', color: '#4A5568', textDecoration: 'none', display: 'flex', alignItems: 'center' }}
                >
                  ✦
                </a>
              </div>
            </div>
          ) : (
            <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, textAlign: 'center' }}>
              <div style={{ fontSize: 32, color: '#0F1520', marginBottom: 16 }}>◈</div>
              <p style={{ color: '#2D3748', fontSize: 12, lineHeight: 1.7, maxWidth: 220 }}>
                Sélectionne un prompt pour voir son contenu complet
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  )
}
