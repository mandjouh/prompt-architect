'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

type Profile = {
  plan: 'free' | 'standard' | 'pro' | 'premium'
  credits_used: number
  created_at: string
  name: string
  email: string
}

const PLAN_CONFIG = {
  free:     { label: 'Free',     limit: 5,  color: '#4A5568', price: '0$' },
  standard: { label: 'Standard', limit: 50,  color: '#38C4FF', price: '5$/mois' },
  pro:      { label: 'Pro',      limit: 100, color: '#D4FF57', price: '10$/mois' },
  premium:  { label: 'Premium',  limit: 250, color: '#A47CFF', price: '20$/mois' },
}

export default function ProfilePage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [fetching, setFetching] = useState(true)
  const [name, setName] = useState('')
  const [savingName, setSavingName] = useState(false)
  const [nameSaved, setNameSaved] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [savingPassword, setSavingPassword] = useState(false)
  const [passwordError, setPasswordError] = useState('')
  const [passwordSaved, setPasswordSaved] = useState(false)
  const [promptCount, setPromptCount] = useState(0)

  useEffect(() => {
    if (!loading && !user) router.push('/login')
  }, [user, loading, router])

  useEffect(() => {
    if (!user) return
    const fetchData = async () => {
      setFetching(true)
      const [{ data: profileData }, { count }] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('saved_prompts').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
      ])
      if (profileData) {
        setProfile(profileData)
        setName(profileData.name || '')
      }
      setPromptCount(count || 0)
      setFetching(false)
    }
    fetchData()
  }, [user])

  const handleSaveName = async () => {
    if (!name.trim()) return
    setSavingName(true)
    await supabase.from('profiles').update({ name }).eq('id', user!.id)
    setNameSaved(true)
    setTimeout(() => setNameSaved(false), 2500)
    setSavingName(false)
  }

  const handleChangePassword = async () => {
    setPasswordError('')
    if (newPassword.length < 6) { setPasswordError('6 caractères minimum.'); return }
    if (newPassword !== confirmPassword) { setPasswordError('Les mots de passe ne correspondent pas.'); return }
    setSavingPassword(true)
    const { error } = await supabase.auth.updateUser({ password: newPassword })
    if (error) {
      setPasswordError('Erreur lors de la mise à jour.')
    } else {
      setPasswordSaved(true)
      setNewPassword('')
      setConfirmPassword('')
      setTimeout(() => setPasswordSaved(false), 2500)
    }
    setSavingPassword(false)
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

  if (!user || !profile) return null

  const planConfig = PLAN_CONFIG[profile.plan]
  const creditsLeft = Math.max(0, planConfig.limit - profile.credits_used)
  const progressPercent = Math.min(100, (profile.credits_used / planConfig.limit) * 100)
  const memberSince = new Date(profile.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })

  return (
    <div style={{ minHeight: '100vh', background: '#07090C', color: 'white', fontFamily: 'monospace' }}>

      {/* HEADER */}
      <div style={{ borderBottom: '1px solid #151C25', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#07090CF0', backdropFilter: 'blur(16px)', zIndex: 100 }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 26, height: 26, background: '#D4FF57', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 900, color: '#07090C' }}>PA</div>
          <span style={{ fontWeight: 900, fontSize: 15, color: 'white' }}>Prompt Architect</span>
        </a>
        <div style={{ display: 'flex', gap: 12 }}>
          <a href="/generate" style={{ fontSize: 11, color: '#FFFFFF', textDecoration: 'none', border: '1px solid #151C25', padding: '7px 14px' }}>✦ Générateur</a>
          <a href="/my-prompts" style={{ fontSize: 11, color: '#FFFFFF', textDecoration: 'none', border: '1px solid #151C25', padding: '7px 14px' }}>◈ Mes prompts</a>
          <button onClick={handleSignOut} style={{ background: 'transparent', border: '1px solid #151C25', color: '#FFFFFF', padding: '7px 14px', fontSize: 11, cursor: 'pointer', fontFamily: 'monospace' }}>Déconnexion</button>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 24px' }}>

        {/* TITRE */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 10, color: '#D4FF57', letterSpacing: '0.14em', marginBottom: 12 }}>// MON PROFIL</div>
          <h1 style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 6 }}>
            {profile.name || user.email?.split('@')[0]}
          </h1>
          <p style={{ fontSize: 12, color: '#2D3748' }}>Membre depuis {memberSince}</p>
        </div>

        {/* PLAN + STATS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: '#151C25', border: '1px solid #151C25', marginBottom: 32 }}>
          {[
            { label: 'PLAN ACTUEL', value: planConfig.label, color: planConfig.color },
            { label: 'PROMPTS SAUVEGARDÉS', value: promptCount.toString(), color: 'white' },
            { label: 'GÉNÉRATIONS RESTANTES', value: creditsLeft.toString(), color: creditsLeft === 0 ? '#FF5A5A' : 'white' },
          ].map((stat, i) => (
            <div key={i} style={{ background: '#07090C', padding: '24px 20px', textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: stat.color, letterSpacing: '-0.03em', marginBottom: 6 }}>{stat.value}</div>
              <div style={{ fontSize: 9, color: '#2D3748', letterSpacing: '0.1em' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* PLAN DÉTAIL */}
        <div style={{ border: '1px solid #151C25', background: '#0B0E13', padding: 24, marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 9, color: '#2D3748', letterSpacing: '0.12em', marginBottom: 8 }}>ABONNEMENT</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: planConfig.color }} />
                <span style={{ fontSize: 16, fontWeight: 900, color: planConfig.color }}>{planConfig.label}</span>
                <span style={{ fontSize: 12, color: '#2D3748' }}>— {planConfig.price}</span>
              </div>
            </div>
            {profile.plan !== 'premium' && (
              <a href="/pricing" style={{ background: '#D4FF57', color: '#07090C', padding: '9px 18px', fontSize: 11, fontWeight: 900, textDecoration: 'none', letterSpacing: '0.06em' }}>
                ✦ UPGRADER
              </a>
            )}
          </div>

          <div style={{ marginBottom: 8 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 10, color: '#2D3748', letterSpacing: '0.08em' }}>GÉNÉRATIONS CE MOIS</span>
              <span style={{ fontSize: 10, color: '#4A5568' }}>{profile.credits_used} / {planConfig.limit}</span>
            </div>
            <div style={{ height: 6, background: '#151C25', borderRadius: 3 }}>
              <div style={{ height: '100%', width: `${progressPercent}%`, background: progressPercent >= 100 ? '#FF5A5A' : progressPercent >= 80 ? '#FF7A3D' : planConfig.color, borderRadius: 3, transition: 'width 0.3s' }} />
            </div>
          </div>
        </div>

        {/* INFOS PERSONNELLES */}
        <div style={{ border: '1px solid #151C25', background: '#0B0E13', padding: 24, marginBottom: 24 }}>
          <div style={{ fontSize: 9, color: '#2D3748', letterSpacing: '0.12em', marginBottom: 20 }}>INFORMATIONS PERSONNELLES</div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 9, color: '#2D3748', letterSpacing: '0.1em', marginBottom: 6 }}>EMAIL</div>
            <div style={{ padding: '12px 14px', background: '#07090C', border: '1px solid #0F1520', fontSize: 13, color: '#4A5568' }}>
              {user.email}
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 9, color: '#2D3748', letterSpacing: '0.1em', marginBottom: 6 }}>NOM D'AFFICHAGE</div>
            <div style={{ display: 'flex', gap: 10 }}>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Ton prénom ou pseudo"
                style={{ flex: 1, background: '#07090C', border: '1px solid #151C25', color: 'white', padding: '12px 14px', fontFamily: 'monospace', fontSize: 13, outline: 'none' }}
              />
              <button
                onClick={handleSaveName}
                disabled={savingName}
                style={{ padding: '12px 20px', fontSize: 11, fontWeight: 900, fontFamily: 'monospace', letterSpacing: '0.06em', border: 'none', cursor: 'pointer', background: nameSaved ? '#1A3A1A' : '#D4FF57', color: nameSaved ? '#5EDD5E' : '#07090C', transition: 'all 0.2s' }}
              >
                {nameSaved ? '✓ SAUVÉ' : savingName ? '⟳' : 'SAUVER'}
              </button>
            </div>
          </div>
        </div>

        {/* CHANGER MOT DE PASSE */}
        <div style={{ border: '1px solid #151C25', background: '#0B0E13', padding: 24, marginBottom: 24 }}>
          <div style={{ fontSize: 9, color: '#2D3748', letterSpacing: '0.12em', marginBottom: 20 }}>CHANGER MOT DE PASSE</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 9, color: '#2D3748', letterSpacing: '0.1em', marginBottom: 6 }}>NOUVEAU MOT DE PASSE</div>
              <input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="6 caractères minimum"
                style={{ width: '100%', background: '#07090C', border: '1px solid #151C25', color: 'white', padding: '12px 14px', fontFamily: 'monospace', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <div style={{ fontSize: 9, color: '#2D3748', letterSpacing: '0.1em', marginBottom: 6 }}>CONFIRMER</div>
              <input
                type="password"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
                placeholder="Répète ton mot de passe"
                style={{ width: '100%', background: '#07090C', border: '1px solid #151C25', color: 'white', padding: '12px 14px', fontFamily: 'monospace', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          {passwordError && (
            <div style={{ padding: '10px 14px', background: '#2A0A0A', border: '1px solid #5A1A1A', fontSize: 12, color: '#FF6B6B', marginBottom: 16 }}>
              ✕ {passwordError}
            </div>
          )}

          <button
            onClick={handleChangePassword}
            disabled={savingPassword}
            style={{ padding: '11px 24px', fontSize: 11, fontWeight: 900, fontFamily: 'monospace', letterSpacing: '0.06em', border: 'none', cursor: 'pointer', background: passwordSaved ? '#1A3A1A' : '#151C25', color: passwordSaved ? '#5EDD5E' : '#4A5568', transition: 'all 0.2s' }}
          >
            {passwordSaved ? '✓ MOT DE PASSE MIS À JOUR' : savingPassword ? '⟳ MISE À JOUR...' : '→ CHANGER MON MOT DE PASSE'}
          </button>
        </div>

        {/* DANGER ZONE */}
        <div style={{ border: '1px solid #2A1A1A', background: '#0B0E13', padding: 24 }}>
          <div style={{ fontSize: 9, color: '#FF5A5A', letterSpacing: '0.12em', marginBottom: 16 }}>ZONE DANGEREUSE</div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 4 }}>Se déconnecter</div>
              <div style={{ fontSize: 12, color: '#4A5568' }}>Tu seras redirigé vers la page d'accueil.</div>
            </div>
            <button onClick={handleSignOut} style={{ background: 'transparent', border: '1px solid #5A1A1A', color: '#FF5A5A', padding: '9px 18px', fontSize: 11, cursor: 'pointer', fontFamily: 'monospace', letterSpacing: '0.06em' }}>
              DÉCONNEXION
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
