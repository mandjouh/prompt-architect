'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

type SavedPrompt = {
  id: string
  module_id: string
  module_label: string
  module_color: string
  module_icon: string
  case_label: string
  user_input: string
  prompt: string
  created_at: string
}

type Profile = {
  plan: 'free' | 'standard' | 'pro' | 'premium'
  credits_used: number
}

const PLAN_CONFIG = {
  free:     { label: 'Free',     limit: 5,  color: '#4A5568', nextPlan: 'standard' },
  standard: { label: 'Standard', limit: 50,  color: '#38C4FF', nextPlan: 'pro' },
  pro:      { label: 'Pro',      limit: 100, color: '#D4FF57', nextPlan: 'premium' },
  premium:  { label: 'Premium',  limit: 250, color: '#A47CFF', nextPlan: null },
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('fr-FR', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit'
  })
}

export default function MyPromptsPage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const [prompts, setPrompts] = useState<SavedPrompt[]>([])
  const [profile, setProfile] = useState<Profile | null>(null)
  const [selected, setSelected] = useState<SavedPrompt | null>(null)
  const [copied, setCopied] = useState(false)
  const [filterModule, setFilterModule] = useState('Tous')
  const [fetching, setFetching] = useState(true)
  const [confirmClear, setConfirmClear] = useState(false)
  const [deleting, setDeleting] = useState<string | null>(null)

  useEffect(() => {
    if (!loading && !user) router.push('/login')
  }, [user, loading, router])

  useEffect(() => {
    if (!user) return
    const fetchData = async () => {
      setFetching(true)

      const [{ data: promptsData }, { data: profileData }] = await Promise.all([
        supabase.from('saved_prompts').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
        supabase.from('profiles').select('plan, credits_used').eq('id', user.id).single(),
      ])

      if (promptsData) {
        setPrompts(promptsData)
        if (promptsData.length > 0) setSelected(promptsData[0])
      }
      if (profileData) setProfile(profileData)
      setFetching(false)
    }
    fetchData()
  }, [user])

  const modules = ['Tous', ...Array.from(new Set(prompts.map(p => p.module_label)))]
  const filtered = filterModule === 'Tous' ? prompts : prompts.filter(p => p.module_label === filterModule)

  const handleDelete = async (id: string) => {
    setDeleting(id)
    await supabase.from('saved_prompts').delete().eq('id', id)
    const updated = prompts.filter(p => p.id !== id)
    setPrompts(updated)
    if (selected?.id === id) setSelected(updated.length > 0 ? updated[0] : null)
    setDeleting(null)
  }

  const handleClearAll = async () => {
    await supabase.from('saved_prompts').delete().eq('user_id', user!.id)
    setPrompts([])
    setSelected(null)
    setConfirmClear(false)
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSignOut = async () => {
    await signOut()
    router.push('/')
  }

  if (loading || fetching) {
    return (
      <div style={{ minHeight: '100vh', background: '#07090C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace' }}>
        <div style={{ color: '#2D3748', fontSize: 13 }}>⟳ Chargement...</div>
      </div>
    )
  }

  if (!user) return null

  const planConfig = profile ? PLAN_CONFIG[profile.plan] : PLAN_CONFIG.free
  const creditsUsed = profile?.credits_used || 0
  const creditsLimit = planConfig.limit
  const creditsLeft = Math.max(0, creditsLimit - creditsUsed)
  const progressPercent = Math.min(100, (creditsUsed / creditsLimit) * 100)
  const isNearLimit = progressPercent >= 80
  const isAtLimit = progressPercent >= 100

  return (
    <div style={{ minHeight: '100vh', background: '#07090C', color: 'white', fontFamily: 'monospace', display: 'flex', flexDirection: 'column' }}>

      {/* HEADER */}
      <div style={{ borderBottom: '1px solid #151C25', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#07090CF0', backdropFilter: 'blur(16px)', zIndex: 100 }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 26, height: 26, background: '#D4FF57', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 900, color: '#07090C' }}>PA</div>
          <span style={{ fontWeight: 900, fontSize: 15, color: 'white' }}>Prompt Architect</span>
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 10, color: '#2D3748' }}>{user.email}</span>
          {prompts.length > 0 && (
            <button onClick={() => setConfirmClear(true)} style={{ background: '#FF4D4D08', border: '1px solid #FF4D4D40', color: '#FF4D4D', padding: '6px 12px', fontSize: 10, cursor: 'pointer', fontFamily: 'monospace' }}>
              ✕ TOUT EFFACER
            </button>
          )}
          <span style={{ fontSize: 10, color: '#D4FF57', border: '1px solid #D4FF5730', padding: '4px 10px', letterSpacing: '0.1em' }}>
            {prompts.length} PROMPT{prompts.length > 1 ? 'S' : ''}
          </span>
          <a href="/generate" style={{ background: '#D4FF57', color: '#07090C', padding: '8px 18px', fontSize: 11, fontWeight: 900, textDecoration: 'none', letterSpacing: '0.06em' }}>
            ✦ NOUVEAU PROMPT
          </a>
          <a href="/profile" style={{ fontSize: 11, color: '#FFFFFF', textDecoration: 'none', border: '1px solid #151C25', padding: '7px 14px' }}>◎ Profil</a>
          <button onClick={handleSignOut} style={{ background: 'transparent', border: '1px solid #151C25', color: '#FFFFFF', padding: '8px 12px', fontSize: 10, cursor: 'pointer', fontFamily: 'monospace' }}>
            Déconnexion
          </button>
        </div>
      </div>

      {/* DASHBOARD BANDEAU */}
      <div style={{ borderBottom: '1px solid #151C25', background: '#0B0E13', padding: '16px 28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>

          {/* Plan actuel */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: planConfig.color }} />
            <span style={{ fontSize: 10, color: '#2D3748', letterSpacing: '0.1em' }}>PLAN</span>
            <span style={{ fontSize: 12, fontWeight: 900, color: planConfig.color, letterSpacing: '0.06em' }}>
              {planConfig.label.toUpperCase()}
            </span>
          </div>

          <div style={{ width: 1, height: 20, background: '#151C25' }} />

          {/* Générations */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 200 }}>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 10, color: '#FFFFFF', letterSpacing: '0.1em' }}>GÉNÉRATIONS CE MOIS</span>
                <span style={{ fontSize: 10, color: isAtLimit ? '#FF5A5A' : isNearLimit ? '#FF7A3D' : '#4A5568' }}>
                  {creditsUsed} / {creditsLimit}
                </span>
              </div>
              <div style={{ height: 4, background: '#151C25', borderRadius: 2, overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: `${progressPercent}%`,
                  background: isAtLimit ? '#FF5A5A' : isNearLimit ? '#FF7A3D' : planConfig.color,
                  transition: 'width 0.3s ease',
                  borderRadius: 2,
                }} />
              </div>
            </div>
            <span style={{ fontSize: 11, color: isAtLimit ? '#FF5A5A' : '#4A5568', whiteSpace: 'nowrap' }}>
              {isAtLimit ? '⚠ Limite atteinte' : `${creditsLeft} restantes`}
            </span>
          </div>

          <div style={{ width: 1, height: 20, background: '#151C25' }} />

          {/* Upgrade ou badge premium */}
          {planConfig.nextPlan ? (
            <a
              href="/pricing"
              style={{
                fontSize: 10, fontWeight: 900, letterSpacing: '0.08em', textDecoration: 'none',
                padding: '6px 14px', border: `1px solid ${isAtLimit ? '#D4FF5740' : '#151C25'}`,
                color: isAtLimit ? '#D4FF57' : '#4A5568',
                background: isAtLimit ? '#D4FF5710' : 'transparent',
                display: 'flex', alignItems: 'center', gap: 6,
              }}
            >
              ✦ {isAtLimit ? 'UPGRADER MAINTENANT' : 'VOIR LES PLANS'}
            </a>
          ) : (
            <span style={{ fontSize: 10, color: '#A47CFF', border: '1px solid #A47CFF30', padding: '6px 14px', letterSpacing: '0.08em' }}>
              ◈ PLAN PREMIUM
            </span>
          )}
        </div>

        {/* Alerte limite atteinte */}
        {isAtLimit && (
          <div style={{ marginTop: 12, padding: '10px 14px', background: '#2A0A0A', border: '1px solid #5A1A1A', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            <span style={{ fontSize: 12, color: '#FF6B6B' }}>
              ⚠ Tu as atteint ta limite de {creditsLimit} générations ce mois. Upgrade pour continuer.
            </span>
            <a href="/pricing" style={{ fontSize: 11, fontWeight: 900, color: '#D4FF57', textDecoration: 'none', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
              UPGRADER →
            </a>
          </div>
        )}

        {/* Alerte proche limite */}
        {isNearLimit && !isAtLimit && (
          <div style={{ marginTop: 12, padding: '10px 14px', background: '#1A0F00', border: '1px solid #3A2A00', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
            <span style={{ fontSize: 12, color: '#FF9A3D' }}>
              ⚡ Plus que {creditsLeft} génération{creditsLeft > 1 ? 's' : ''} ce mois sur ton plan {planConfig.label}.
            </span>
            <a href="/pricing" style={{ fontSize: 11, fontWeight: 900, color: '#FF9A3D', textDecoration: 'none', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
              UPGRADER →
            </a>
          </div>
        )}
      </div>

      {/* Modal confirmation */}
      {confirmClear && (
        <div style={{ position: 'fixed', inset: 0, background: '#07090CCC', zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#0B0E13', border: '1px solid #2A1A1A', padding: 32, maxWidth: 360, width: '90%' }}>
            <div style={{ fontSize: 11, color: '#FF5A5A', letterSpacing: '0.1em', marginBottom: 12 }}>ATTENTION</div>
            <p style={{ fontSize: 14, color: 'white', fontWeight: 700, marginBottom: 8 }}>Effacer tous les prompts ?</p>
            <p style={{ fontSize: 12, color: '#4A5568', lineHeight: 1.6, marginBottom: 24 }}>
              {prompts.length} prompts seront définitivement supprimés du cloud.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={handleClearAll} style={{ flex: 1, background: '#2A0A0A', border: '1px solid #5A1A1A', color: '#FF5A5A', padding: '10px 0', fontSize: 11, fontWeight: 900, fontFamily: 'monospace', cursor: 'pointer' }}>
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
          <h2 style={{ fontSize: 20, fontWeight: 900, marginBottom: 12 }}>Aucun prompt sauvegardé</h2>
          <p style={{ color: '#4A5568', fontSize: 13, lineHeight: 1.7, maxWidth: 300, marginBottom: 32 }}>
            Génère ton premier prompt et il sera automatiquement sauvegardé dans ton compte.
          </p>
          <a href="/generate" style={{ background: '#D4FF57', color: '#07090C', padding: '13px 32px', fontSize: 12, fontWeight: 900, textDecoration: 'none', letterSpacing: '0.08em' }}>
            ✦ GÉNÉRER MON PREMIER PROMPT
          </a>
        </div>
      ) : (
        <div style={{ display: 'flex', flex: 1 }}>

          {/* SIDEBAR */}
          <div style={{ width: 300, borderRight: '1px solid #151C25', display: 'flex', flexDirection: 'column', position: 'sticky', top: 57, height: 'calc(100vh - 57px)', overflowY: 'auto' }}>
            <div style={{ padding: '16px', borderBottom: '1px solid #0F1520' }}>
              <div style={{ fontSize: 9, color: '#2D3748', letterSpacing: '0.12em', marginBottom: 10 }}>FILTRER PAR MODULE</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {modules.map(m => (
                  <button key={m} onClick={() => setFilterModule(m)} style={{
                    padding: '5px 10px', fontSize: 10, fontFamily: 'monospace', cursor: 'pointer',
                    border: '1px solid', letterSpacing: '0.04em',
                    borderColor: filterModule === m ? '#D4FF5740' : '#151C25',
                    background: filterModule === m ? '#D4FF5710' : 'transparent',
                    color: filterModule === m ? '#D4FF57' : '#4A5568',
                  }}>
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {filtered.map(p => (
                <div key={p.id} onClick={() => setSelected(p)} style={{
                  padding: '14px 16px', borderBottom: '1px solid #0A0D12', cursor: 'pointer',
                  background: selected?.id === p.id ? '#0D1118' : 'transparent',
                  borderLeft: `2px solid ${selected?.id === p.id ? p.module_color : 'transparent'}`,
                }}
                  onMouseEnter={e => { if (selected?.id !== p.id) e.currentTarget.style.background = '#0B0E13' }}
                  onMouseLeave={e => { if (selected?.id !== p.id) e.currentTarget.style.background = 'transparent' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 6 }}>
                    <span style={{ fontSize: 9, color: p.module_color, letterSpacing: '0.08em' }}>
                      {p.module_icon} {p.module_label.toUpperCase()}
                    </span>
                    <button
                      onClick={e => { e.stopPropagation(); handleDelete(p.id) }}
                      style={{ background: 'transparent', border: 'none', color: deleting === p.id ? '#FF5A5A' : '#2D3748', cursor: 'pointer', fontSize: 11, padding: '0 4px' }}
                    >
                      {deleting === p.id ? '⟳' : '✕'}
                    </button>
                  </div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: selected?.id === p.id ? 'white' : '#8A9AAA', marginBottom: 4 }}>
                    {p.case_label}
                  </div>
                  <div style={{ fontSize: 10, color: '#2D3748', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {p.user_input}
                  </div>
                  <div style={{ fontSize: 9, color: '#1A2535', marginTop: 6 }}>{formatDate(p.created_at)}</div>
                </div>
              ))}
            </div>
          </div>

          {/* DÉTAIL */}
          <div style={{ flex: 1, position: 'sticky', top: 57, height: 'calc(100vh - 57px)', overflowY: 'auto', display: 'flex', flexDirection: 'column' }}>
            {selected ? (
              <>
                <div style={{ padding: '24px 32px', borderBottom: '1px solid #151C25' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <span style={{ fontSize: 11, color: selected.module_color }}>{selected.module_icon} {selected.module_label}</span>
                    <span style={{ color: '#151C25' }}>·</span>
                    <span style={{ fontSize: 11, color: '#2D3748' }}>{selected.case_label}</span>
                    <span style={{ color: '#151C25' }}>·</span>
                    <span style={{ fontSize: 10, color: '#1A2535' }}>{formatDate(selected.created_at)}</span>
                  </div>
                  <h2 style={{ fontSize: 16, fontWeight: 900, marginBottom: 10, letterSpacing: '-0.02em' }}>{selected.case_label}</h2>
                  <div style={{ background: '#0B0E13', border: '1px solid #0F1520', padding: '10px 14px', fontSize: 11, color: '#4A5568', lineHeight: 1.6 }}>
                    <span style={{ color: '#2D3748', fontSize: 9, letterSpacing: '0.1em', display: 'block', marginBottom: 4 }}>TON BESOIN</span>
                    {selected.user_input}
                  </div>
                </div>
                <div style={{ flex: 1, padding: '24px 32px', overflowY: 'auto' }}>
                  <div style={{ fontSize: 9, color: '#2D3748', letterSpacing: '0.12em', marginBottom: 14 }}>PROMPT GÉNÉRÉ</div>
                  <div style={{ fontSize: 12, lineHeight: 1.85, color: '#6A7A8A', whiteSpace: 'pre-wrap' }}>{selected.prompt}</div>
                </div>
                <div style={{ padding: '20px 32px', borderTop: '1px solid #151C25', display: 'flex', gap: 10 }}>
                  <button onClick={() => handleCopy(selected.prompt)} style={{
                    flex: 1, padding: '12px 0', fontSize: 11, fontWeight: 900, fontFamily: 'monospace',
                    letterSpacing: '0.08em', border: 'none', cursor: 'pointer',
                    background: copied ? '#1A3A1A' : '#D4FF57',
                    color: copied ? '#5EDD5E' : '#07090C', transition: 'all 0.2s',
                  }}>
                    {copied ? '✓ COPIÉ !' : '⎘ COPIER LE PROMPT'}
                  </button>
                  <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" style={{ padding: '12px 20px', fontSize: 11, border: '1px solid #151C25', color: '#4A5568', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
                    Tester dans Claude
                  </a>
                  <button onClick={() => handleDelete(selected.id)} style={{ padding: '12px 16px', fontSize: 11, border: '1px solid #2A1A1A', color: '#4A2A2A', background: 'transparent', cursor: 'pointer', fontFamily: 'monospace' }}>
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

      <div style={{ borderTop: '1px solid #0A0D12', padding: '10px 28px' }}>
        <span style={{ fontSize: 10, color: '#1A2535' }}>◎ Prompts sauvegardés en cloud · Supabase · Chiffré</span>
      </div>
    </div>
  )
}
