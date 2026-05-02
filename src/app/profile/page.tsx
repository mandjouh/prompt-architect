'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

type Profile = {
  plan: 'free' | 'standard' | 'pro' | 'premium'
  credits_used: number
  credits_balance: number
  credits_status: 'active' | 'frozen' | 'expired' | null
  credits_last_used_at: string | null
  created_at: string
  name: string
  email: string
}

type Transaction = {
  id: string
  amount: number
  type: string
  provider: string
  balance_after: number
  created_at: string
}

const PLAN_CONFIG = {
  free:     { label: 'Free',     limit: 5,   color: '#94A3B8', price: '0$' },
  standard: { label: 'Standard', limit: 50,  color: '#38C4FF', price: '5$/mois' },
  pro:      { label: 'Pro',      limit: 100, color: '#D4FF57', price: '10$/mois' },
  premium:  { label: 'Premium',  limit: 250, color: '#A47CFF', price: '20$/mois' },
}

const STATUS_CONFIG = {
  active:  { label: 'ACTIF',   color: '#D4FF57', bg: '#D4FF5715' },
  frozen:  { label: 'GELÉ',    color: '#FF7A3D', bg: '#FF7A3D15' },
  expired: { label: 'EXPIRÉ',  color: '#FF5A5A', bg: '#FF5A5A15' },
}

const TX_LABELS: Record<string, string> = {
  purchase:   'Achat',
  used:       'Génération',
  expired:    'Expiration',
  refund:     'Remboursement',
  reactivation: 'Réactivation',
  bonus:      'Bonus',
}

export default function ProfilePage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const [profile, setProfile] = useState<Profile | null>(null)
  const [transactions, setTransactions] = useState<Transaction[]>([])
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
      const [{ data: profileData }, { count }, { data: txData }] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).single(),
        supabase.from('saved_prompts').select('*', { count: 'exact', head: true }).eq('user_id', user.id),
        supabase.from('credit_transactions').select('*').eq('user_id', user.id).order('created_at', { ascending: false }).limit(10),
      ])
      if (profileData) {
        setProfile(profileData)
        setName(profileData.name || '')
      }
      setPromptCount(count || 0)
      setTransactions(txData || [])
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
        <div style={{ color: '#94A3B8', fontSize: 13 }}>⟳ Chargement...</div>
      </div>
    )
  }

  if (!user || !profile) return null

  const planConfig = PLAN_CONFIG[profile.plan]
  const creditsLeft = Math.max(0, planConfig.limit - profile.credits_used)
  const progressPercent = Math.min(100, (profile.credits_used / planConfig.limit) * 100)
  const memberSince = new Date(profile.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })

  const hasCredits = (profile.credits_balance ?? 0) > 0
  const creditStatus = profile.credits_status
  const statusConfig = creditStatus ? STATUS_CONFIG[creditStatus] : null
  const lastUsed = profile.credits_last_used_at
    ? new Date(profile.credits_last_used_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })
    : null

  // Jours avant gel (60j) ou expiration (90j)
  const daysInactive = profile.credits_last_used_at
    ? Math.floor((Date.now() - new Date(profile.credits_last_used_at).getTime()) / 86400000)
    : null
  const daysUntilFreeze = daysInactive !== null && creditStatus === 'active' ? Math.max(0, 60 - daysInactive) : null
  const daysUntilExpiry = daysInactive !== null && creditStatus === 'frozen' ? Math.max(0, 90 - daysInactive) : null

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
          <p style={{ fontSize: 12, color: '#94A3B8' }}>Membre depuis {memberSince}</p>
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
              <div style={{ fontSize: 9, color: '#94A3B8', letterSpacing: '0.1em' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* PLAN DÉTAIL */}
        <div style={{ border: '1px solid #151C25', background: '#0B0E13', padding: 24, marginBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 9, color: '#94A3B8', letterSpacing: '0.12em', marginBottom: 8 }}>ABONNEMENT</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: planConfig.color }} />
                <span style={{ fontSize: 16, fontWeight: 900, color: planConfig.color }}>{planConfig.label}</span>
                <span style={{ fontSize: 12, color: '#94A3B8' }}>— {planConfig.price}</span>
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
              <span style={{ fontSize: 10, color: '#94A3B8', letterSpacing: '0.08em' }}>GÉNÉRATIONS CE MOIS</span>
              <span style={{ fontSize: 10, color: '#94A3B8' }}>{profile.credits_used} / {planConfig.limit}</span>
            </div>
            <div style={{ height: 6, background: '#151C25', borderRadius: 3 }}>
              <div style={{ height: '100%', width: `${progressPercent}%`, background: progressPercent >= 100 ? '#FF5A5A' : progressPercent >= 80 ? '#FF7A3D' : planConfig.color, borderRadius: 3, transition: 'width 0.3s' }} />
            </div>
          </div>
        </div>

        {/* CRÉDITS PAY-AS-YOU-GO */}
        {hasCredits || creditStatus ? (
          <div style={{ border: `1px solid ${statusConfig ? statusConfig.color + '40' : '#151C25'}`, background: '#0B0E13', padding: 24, marginBottom: 24 }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div style={{ fontSize: 9, color: '#94A3B8', letterSpacing: '0.12em' }}>CRÉDITS PAY-AS-YOU-GO</div>
              {statusConfig && (
                <div style={{ fontSize: 9, fontWeight: 900, color: statusConfig.color, background: statusConfig.bg, padding: '4px 10px', letterSpacing: '0.1em' }}>
                  {statusConfig.label}
                </div>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1, background: '#151C25', marginBottom: 16 }}>
              <div style={{ background: '#07090C', padding: '20px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: 32, fontWeight: 900, color: creditStatus === 'expired' ? '#FF5A5A' : '#D4FF57', letterSpacing: '-0.03em', marginBottom: 4 }}>
                  {creditStatus === 'expired' ? 0 : (profile.credits_balance ?? 0)}
                </div>
                <div style={{ fontSize: 9, color: '#94A3B8', letterSpacing: '0.1em' }}>CRÉDITS DISPONIBLES</div>
              </div>
              <div style={{ background: '#07090C', padding: '20px 16px', textAlign: 'center' }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: 'white', marginBottom: 4 }}>
                  {lastUsed ?? '—'}
                </div>
                <div style={{ fontSize: 9, color: '#94A3B8', letterSpacing: '0.1em' }}>DERNIÈRE UTILISATION</div>
              </div>
            </div>

            {/* Alerte gel imminent */}
            {daysUntilFreeze !== null && daysUntilFreeze <= 7 && (
              <div style={{ padding: '10px 14px', background: '#FF7A3D10', border: '1px solid #FF7A3D40', fontSize: 12, color: '#FF7A3D', marginBottom: 12 }}>
                ⚠️ Tes crédits gèlent dans <strong>{daysUntilFreeze} jour{daysUntilFreeze > 1 ? 's' : ''}</strong>. Génère un prompt pour repartir pour 60 jours.
              </div>
            )}

            {/* Alerte expiration imminente */}
            {daysUntilExpiry !== null && daysUntilExpiry <= 7 && (
              <div style={{ padding: '10px 14px', background: '#FF5A5A10', border: '1px solid #FF5A5A40', fontSize: 12, color: '#FF5A5A', marginBottom: 12 }}>
                🚨 Tes crédits expirent dans <strong>{daysUntilExpiry} jour{daysUntilExpiry > 1 ? 's' : ''}</strong>.
              </div>
            )}

            {/* CTA réactivation */}
            {(creditStatus === 'frozen' || creditStatus === 'expired') && (
              <a href="/pricing" style={{ display: 'block', textAlign: 'center', background: '#D4FF57', color: '#07090C', padding: '11px 0', fontSize: 11, fontWeight: 900, textDecoration: 'none', letterSpacing: '0.08em' }}>
                ✦ RÉACTIVER MES CRÉDITS — {creditStatus === 'expired' ? '2$' : '1$'}
              </a>
            )}

            {/* CTA acheter plus */}
            {creditStatus === 'active' && (
              <a href="/pricing" style={{ display: 'inline-block', fontSize: 11, color: '#D4FF57', textDecoration: 'none', letterSpacing: '0.06em', borderBottom: '1px solid #D4FF5740' }}>
                + Acheter des crédits supplémentaires →
              </a>
            )}
          </div>
        ) : (
          /* Pas encore de crédits PAYG */
          <div style={{ border: '1px solid #151C25', background: '#0B0E13', padding: 24, marginBottom: 24 }}>
            <div style={{ fontSize: 9, color: '#94A3B8', letterSpacing: '0.12em', marginBottom: 16 }}>CRÉDITS PAY-AS-YOU-GO</div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
              <div style={{ fontSize: 13, color: '#4A5568' }}>Aucun crédit pay-as-you-go pour l'instant.</div>
              <a href="/pricing" style={{ fontSize: 11, fontWeight: 900, color: '#D4FF57', textDecoration: 'none', letterSpacing: '0.06em', border: '1px solid #D4FF5740', padding: '8px 14px' }}>
                VOIR LES PACKS →
              </a>
            </div>
          </div>
        )}

        {/* HISTORIQUE TRANSACTIONS */}
        {transactions.length > 0 && (
          <div style={{ border: '1px solid #151C25', background: '#0B0E13', padding: 24, marginBottom: 24 }}>
            <div style={{ fontSize: 9, color: '#94A3B8', letterSpacing: '0.12em', marginBottom: 20 }}>HISTORIQUE DES TRANSACTIONS</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 1, background: '#151C25' }}>
              {transactions.map((tx) => {
                const isPositive = tx.amount > 0
                const date = new Date(tx.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: 'numeric' })
                return (
                  <div key={tx.id} style={{ background: '#07090C', padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ fontSize: 14, color: isPositive ? '#D4FF57' : '#94A3B8' }}>
                        {isPositive ? '↑' : '↓'}
                      </div>
                      <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: 'white' }}>{TX_LABELS[tx.type] ?? tx.type}</div>
                        <div style={{ fontSize: 10, color: '#4A5568' }}>{date} · via {tx.provider}</div>
                      </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: 13, fontWeight: 900, color: isPositive ? '#D4FF57' : '#94A3B8' }}>
                        {isPositive ? '+' : ''}{tx.amount}
                      </div>
                      <div style={{ fontSize: 10, color: '#4A5568' }}>solde : {tx.balance_after}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* INFOS PERSONNELLES */}
        <div style={{ border: '1px solid #151C25', background: '#0B0E13', padding: 24, marginBottom: 24 }}>
          <div style={{ fontSize: 9, color: '#94A3B8', letterSpacing: '0.12em', marginBottom: 20 }}>INFORMATIONS PERSONNELLES</div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 9, color: '#94A3B8', letterSpacing: '0.1em', marginBottom: 6 }}>EMAIL</div>
            <div style={{ padding: '12px 14px', background: '#07090C', border: '1px solid #0F1520', fontSize: 13, color: '#94A3B8' }}>
              {user.email}
            </div>
          </div>

          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 9, color: '#94A3B8', letterSpacing: '0.1em', marginBottom: 6 }}>NOM D'AFFICHAGE</div>
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
          <div style={{ fontSize: 9, color: '#94A3B8', letterSpacing: '0.12em', marginBottom: 20 }}>CHANGER MOT DE PASSE</div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 9, color: '#94A3B8', letterSpacing: '0.1em', marginBottom: 6 }}>NOUVEAU MOT DE PASSE</div>
              <input
                type="password"
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                placeholder="6 caractères minimum"
                style={{ width: '100%', background: '#07090C', border: '1px solid #151C25', color: 'white', padding: '12px 14px', fontFamily: 'monospace', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <div style={{ fontSize: 9, color: '#94A3B8', letterSpacing: '0.1em', marginBottom: 6 }}>CONFIRMER</div>
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
            style={{ padding: '11px 24px', fontSize: 11, fontWeight: 900, fontFamily: 'monospace', letterSpacing: '0.06em', border: 'none', cursor: 'pointer', background: passwordSaved ? '#1A3A1A' : '#151C25', color: passwordSaved ? '#5EDD5E' : '#94A3B8', transition: 'all 0.2s' }}
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
              <div style={{ fontSize: 12, color: '#94A3B8' }}>Tu seras redirigé vers la page d'accueil.</div>
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
