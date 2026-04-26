'use client'

import { useState, useEffect } from 'react'
import type { SavedPrompt } from '../generate/page'

const MODULE_ICONS: Record<string, string> = {
  'Business': '◈',
  'Contenu Viral': '◉',
  'Usage Pro': '◎',
  'Développement': '⟁',
}

const STORAGE_KEY = 'pa_saved_prompts'

function getSavedPrompts(): SavedPrompt[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch { return [] }
}

function deletePrompt(id: string): SavedPrompt[] {
  const updated = getSavedPrompts().filter(p => p.id !== id)
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  return updated
}

function clearAllPrompts() {
  localStorage.removeItem(STORAGE_KEY)
}

function formatDate(iso: string) {
  const d = new Date(iso)
  return d.toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function MyPromptsPage() {
  const [prompts, setPrompts] = useState<SavedPrompt[]>([])
  const [selected, setSelected] = useState<SavedPrompt | null>(null)
  const [copied, setCopied] = useState(false)
  const [filterModule, setFilterModule] = useState('Tous')
  const [confirmClear, setConfirmClear] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const saved = getSavedPrompts()
    setPrompts(saved)
    if (saved.length > 0) setSelected(saved[0])
  }, [])

  const modules = ['Tous', ...Array.from(new Set(prompts.map(p => p.moduleLabel)))]

  const filtered = filterModule === 'Tous'
    ? prompts
    : prompts.filter(p => p.moduleLabel === filterModule)

  const handleDelete = (id: string) => {
    const updated = deletePrompt(id)
    setPrompts(updated)
    if (selected?.id === id) {
      setSelected(updated.length > 0 ? updated[0] : null)
    }
  }

  const handleClearAll = () => {
    clearAllPrompts()
    setPrompts([])
    setSelected(null)
    setConfirmClear(false)
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  if (!mounted) return null

  return (
    <div style={{ minHeight: '100vh', background: '#07090C', color: 'white', fontFamily: 'monospace', display: 'flex', flexDirection: 'column' }}>

      {/* HEADER */}
      <div style={{ borderBottom: '1px solid #151C25', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#07090CF0', backdropFilter: 'blur(16px)', zIndex: 100 }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 26, height: 26, background: '#D4FF57', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 900, color: '#07090C' }}>PA</div>
          <span style={{ fontWeight: 900, fontSize: 15, color: 'white' }}>Prompt Architect</span>
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {prompts.length > 0 && (
            <button
              onClick={() => setConfirmClear(true)}
              style={{ background: 'transparent', border: '1px solid #2A1A1A', color: '#4A2A2A', padding: '6px 12px', fontSize: 10, cursor: 'pointer', fontFamily: 'monospace', letterSpacing: '0.06em' }}
            >
              ✕ TOUT EFFACER
            </button>
          )}
          <span style={{ fontSize: 10, color: '#D4FF57', border: '1px solid #D4FF5730', padding: '4px 10px', letterSpacing: '0.1em' }}>
            {prompts.length} PROMPT{prompts.length > 1 ? 'S' : ''} SAUVEGARDÉ{prompts.length > 1 ? 'S' : ''}
          </span>
          <a href="/generate" style={{ background: '#D4FF57', color: '#07090C', padding: '8px 18px', fontSize: 11, fontWeight: 900, textDecoration: 'none', letterSpacing: '0.06em' }}>
            ✦ NOUVEAU PROMPT
          </a>
        </div>
      </div>

      {/* Modal confirmation suppression */}
      {confirmClear && (
        <div style={{ position: 'fixed', inset: 0, background: '#07090CCC', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#0B0E13', border: '1px solid #2A1A1A', padding: 32, maxWidth: 360, width: '90%' }}>
            <div style={{ fontSize: 11, color: '#FF5A5A', letterSpacing: '0.1em', marginBottom: 12 }}>ATTENTION</div>
            <p style={{ fontSize: 14, color: 'white', marginBottom: 8, fontWeight: 700 }}>Effacer tous les prompts ?</p>
            <p style={{ fontSize: 12, color: '#4A5568', lineHeight: 1.6, marginBottom: 24 }}>
              Cette action est irréversible. Tes {prompts.length} prompts sauvegardés seront définitivement supprimés.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={handleClearAll} style={{ flex: 1, background: '#2A0A0A', border: '1px solid #5A1A1A', color: '#FF5A5A', padding: '10px 0', fontSize: 11, fontWeight: 900, fontFamily: 'monospace', cursor: 'pointer', letterSpacing: '0.06em' }}>
                ✕ OUI, TOUT EFFACER
              </button>
              <button onClick={() => setConfirmClear(false)} style={{ flex: 1, background: 'transparent', border: '1px solid #151C25', color: '#4A5568', padding: '10px 0', fontSize: 11, fontFamily: 'monospace', cursor: 'pointer' }}>
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ÉTAT VIDE */}
      {prompts.length === 0 ? (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 40, textAlign: 'center' }}>
          <div style={{ fontSize: 48, color: '#0F1520', marginBottom: 24 }}>◈</div>
          <h2 style={{ fontSize: 20, fontWeight: 900, marginBottom: 12, color: 'white' }}>Aucun prompt sauvegardé</h2>
          <p style={{ color: '#4A5568', fontSize: 13, lineHeight: 1.7, maxWidth: 300, marginBottom: 32 }}>
            Génère ton premier prompt et il sera automatiquement sauvegardé ici, sur ton appareil.
          </p>
          <a href="/generate" style={{ background: '#D4FF57', color: '#07090C', padding: '13px 32px', fontSize: 12, fontWeight: 900, textDecoration: 'none', letterSpacing: '0.08em' }}>
            ✦ GÉNÉRER MON PREMIER PROMPT
          </a>
        </div>
      ) : (
        <div style={{ display: 'flex', flex: 1 }}>

          {/* SIDEBAR — filtres + liste */}
          <div style={{ width: 300, borderRight: '1px solid #151C25', display: 'flex', flexDirection: 'column', position: 'sticky', top: 57, height: 'calc(100vh - 57px)', overflowY: 'auto' }}>

            {/* Filtres */}
            <div style={{ padding: '16px', borderBottom: '1px solid #0F1520' }}>
              <div style={{ fontSize: 9, color: '#2D3748', letterSpacing: '0.12em', marginBottom: 10 }}>FILTRER PAR MODULE</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {modules.map(m => (
                  <button
                    key={m}
                    onClick={() => setFilterModule(m)}
                    style={{
                      padding: '5px 10px', fontSize: 10, fontFamily: 'monospace', cursor: 'pointer',
                      border: '1px solid', letterSpacing: '0.04em',
                      borderColor: filterModule === m ? '#D4FF5740' : '#151C25',
                      background: filterModule === m ? '#D4FF5710' : 'transparent',
                      color: filterModule === m ? '#D4FF57' : '#4A5568',
                    }}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>

            {/* Liste des prompts */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {filtered.length === 0 ? (
                <div style={{ padding: 24, color: '#2D3748', fontSize: 12, textAlign: 'center' }}>Aucun prompt dans ce module</div>
              ) : filtered.map((p, idx) => (
                <div
                  key={p.id}
                  onClick={() => setSelected(p)}
                  style={{
                    padding: '14px 16px', borderBottom: '1px solid #0A0D12', cursor: 'pointer',
                    background: selected?.id === p.id ? '#0D1118' : 'transparent',
                    borderLeft: `2px solid ${selected?.id === p.id ? p.moduleColor : 'transparent'}`,
                    transition: 'all 0.1s',
                    position: 'relative',
                  }}
                  onMouseEnter={e => { if (selected?.id !== p.id) e.currentTarget.style.background = '#0B0E13' }}
                  onMouseLeave={e => { if (selected?.id !== p.id) e.currentTarget.style.background = 'transparent' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 9, color: p.moduleColor, display: 'flex', alignItems: 'center', gap: 4, letterSpacing: '0.08em' }}>
                      {p.moduleIcon} {p.moduleLabel.toUpperCase()}
                    </span>
                    <button
                      onClick={e => { e.stopPropagation(); handleDelete(p.id) }}
                      style={{ background: 'transparent', border: 'none', color: '#2D3748', cursor: 'pointer', fontSize: 12, padding: '0 4px', lineHeight: 1 }}
                      title="Supprimer"
                    >
                      ✕
                    </button>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: selected?.id === p.id ? 'white' : '#8A9AAA', marginBottom: 4, lineHeight: 1.3 }}>
                    {p.caseLabel}
                  </div>
                  <div style={{ fontSize: 10, color: '#2D3748', lineHeight: 1.4, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {p.userInput}
                  </div>
                  <div style={{ fontSize: 9, color: '#1A2535', marginTop: 6 }}>
                    {formatDate(p.savedAt)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PANEL DÉTAIL */}
          <div style={{ flex: 1, position: 'sticky', top: 57, height: 'calc(100vh - 57px)', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            {selected ? (
              <>
                {/* Header */}
                <div style={{ padding: '24px 32px', borderBottom: '1px solid #151C25' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <span style={{ fontSize: 11, color: selected.moduleColor }}>
                      {selected.moduleIcon} {selected.moduleLabel}
                    </span>
                    <span style={{ color: '#151C25' }}>·</span>
                    <span style={{ fontSize: 11, color: '#2D3748' }}>{selected.caseLabel}</span>
                    <span style={{ color: '#151C25' }}>·</span>
                    <span style={{ fontSize: 10, color: '#1A2535' }}>{formatDate(selected.savedAt)}</span>
                  </div>
                  <h2 style={{ fontSize: 16, fontWeight: 900, color: 'white', marginBottom: 10, letterSpacing: '-0.02em' }}>
                    {selected.caseLabel}
                  </h2>
                  {/* Contexte utilisateur */}
                  <div style={{ background: '#0B0E13', border: '1px solid #0F1520', padding: '10px 14px', fontSize: 11, color: '#4A5568', lineHeight: 1.6 }}>
                    <span style={{ color: '#2D3748', fontSize: 9, letterSpacing: '0.1em', display: 'block', marginBottom: 4 }}>TON BESOIN</span>
                    {selected.userInput}
                  </div>
                </div>

                {/* Prompt */}
                <div style={{ flex: 1, padding: '24px 32px', overflowY: 'auto' }}>
                  <div style={{ fontSize: 9, color: '#2D3748', letterSpacing: '0.12em', marginBottom: 14 }}>PROMPT GÉNÉRÉ</div>
                  <div style={{ fontSize: 12, lineHeight: 1.85, color: '#6A7A8A', whiteSpace: 'pre-wrap' }}>
                    {selected.prompt}
                  </div>
                </div>

                {/* Actions */}
                <div style={{ padding: '20px 32px', borderTop: '1px solid #151C25', display: 'flex', gap: 10 }}>
                  <button
                    onClick={() => handleCopy(selected.prompt)}
                    style={{
                      flex: 1, padding: '12px 0', fontSize: 11, fontWeight: 900,
                      fontFamily: 'monospace', letterSpacing: '0.08em', border: 'none', cursor: 'pointer',
                      background: copied ? '#1A3A1A' : '#D4FF57',
                      color: copied ? '#5EDD5E' : '#07090C',
                      transition: 'all 0.2s',
                    }}
                  >
                    {copied ? '✓ COPIÉ !' : '⎘ COPIER LE PROMPT'}
                  </button>
                  <a
                    href="https://claude.ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ padding: '12px 20px', fontSize: 11, border: '1px solid #151C25', color: '#4A5568', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6, letterSpacing: '0.04em' }}
                  >
                    Tester dans Claude
                  </a>
                  <button
                    onClick={() => handleDelete(selected.id)}
                    style={{ padding: '12px 16px', fontSize: 11, border: '1px solid #2A1A1A', color: '#4A2A2A', background: 'transparent', cursor: 'pointer', fontFamily: 'monospace' }}
                    title="Supprimer ce prompt"
                  >
                    ✕
                  </button>
                </div>
              </>
            ) : (
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2D3748', fontSize: 13 }}>
                Sélectionne un prompt
              </div>
            )}
          </div>

        </div>
      )}

      {/* Info localStorage */}
      <div style={{ borderTop: '1px solid #0A0D12', padding: '10px 28px', display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ fontSize: 9, color: '#1A2535' }}>◎</span>
        <span style={{ fontSize: 10, color: '#1A2535' }}>Prompts stockés localement sur ton appareil — aucun compte requis. Max 50 prompts.</span>
      </div>

    </div>
  )
}
