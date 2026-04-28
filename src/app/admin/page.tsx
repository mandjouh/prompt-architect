'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'

// ⚠️ Seul cet email a accès à la page admin
const ADMIN_EMAIL = 'mandjouh@yahoo.fr'

type UserProfile = {
  id: string
  email: string
  name: string
  plan: 'free' | 'standard' | 'pro' | 'premium'
  credits_used: number
  created_at: string
}

const PLAN_CONFIG = {
  free:     { label: 'Free',     color: '#4A5568', limit: 5 },
  standard: { label: 'Standard', color: '#38C4FF', limit: 50 },
  pro:      { label: 'Pro',      color: '#D4FF57', limit: 100 },
  premium:  { label: 'Premium',  color: '#A47CFF', limit: 250 },
}

export default function AdminPage() {
  const { user, session, loading } = useAuth()
  const router = useRouter()
  const [users, setUsers] = useState<UserProfile[]>([])
  const [fetching, setFetching] = useState(false)
  const [search, setSearch] = useState('')
  const [updating, setUpdating] = useState<string | null>(null)
  const [updated, setUpdated] = useState<string | null>(null)
  const [filterPlan, setFilterPlan] = useState<string>('all')
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  useEffect(() => {
    if (!loading) {
      if (!user) { router.push('/login'); return }
      if (user.email !== ADMIN_EMAIL) { router.push('/'); return }
    }
  }, [user, loading, router])

  // Déclenche fetchUsers uniquement quand session est disponible
  useEffect(() => {
    if (!loading && user?.email === ADMIN_EMAIL && session?.access_token) {
      fetchUsers(session.access_token)
    }
  }, [loading, user, session])

  const fetchUsers = async (token: string) => {
    setFetching(true)
    setErrorMsg(null)
    try {
      const res = await fetch('/api/admin/users', {
        headers: { Authorization: `Bearer ${token}` },
      })
      const json = await res.json()
      if (!res.ok) {
        setErrorMsg(json.error ?? 'Erreur inconnue')
      } else {
        setUsers(json.users ?? [])
      }
    } catch (e) {
      setErrorMsg('Erreur réseau')
    }
    setFetching(false)
  }

  const handleChangePlan = async (userId: string, newPlan: string) => {
    if (!session?.access_token) { setErrorMsg('Session expirée'); return }
    setUpdating(userId)
    setErrorMsg(null)
    try {
      const res = await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${session.access_token}`,
        },
        body: JSON.stringify({ userId, newPlan }),
      })
      const json = await res.json()
      if (!res.ok) {
        setErrorMsg(json.error ?? 'Erreur mise à jour')
      } else {
        setUsers(prev => prev.map(u =>
          u.id === userId ? { ...u, plan: newPlan as UserProfile['plan'], credits_used: 0 } : u
        ))
        setUpdated(userId)
        setTimeout(() => setUpdated(null), 2000)
      }
    } catch (e) {
      setErrorMsg('Erreur réseau')
    }
    setUpdating(null)
  }

  const filteredUsers = users.filter(u => {
    const matchSearch = u.email?.toLowerCase().includes(search.toLowerCase()) ||
      u.name?.toLowerCase().includes(search.toLowerCase())
    const matchPlan = filterPlan === 'all' || u.plan === filterPlan
    return matchSearch && matchPlan
  })

  const stats = {
    total: users.length,
    free: users.filter(u => u.plan === 'free').length,
    standard: users.filter(u => u.plan === 'standard').length,
    pro: users.filter(u => u.plan === 'pro').length,
    premium: users.filter(u => u.plan === 'premium').length,
  }

  if (loading || fetching) {
    return (
      <div style={{ minHeight: '100vh', background: '#07090C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace' }}>
        <div style={{ color: '#2D3748', fontSize: 13 }}>⟳ Chargement...</div>
      </div>
    )
  }

  if (!user || user.email !== ADMIN_EMAIL) return null

  return (
    <div style={{ minHeight: '100vh', background: '#07090C', color: 'white', fontFamily: 'monospace' }}>

      {/* HEADER */}
      <div style={{ borderBottom: '1px solid #151C25', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#07090CF0', backdropFilter: 'blur(16px)', zIndex: 100 }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 26, height: 26, background: '#D4FF57', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 900, color: '#07090C' }}>PA</div>
          <span style={{ fontWeight: 900, fontSize: 15, color: 'white' }}>Prompt Architect</span>
          <span style={{ fontSize: 9, color: '#D4FF57', letterSpacing: '0.12em', border: '1px solid #D4FF5740', padding: '2px 8px', marginLeft: 4 }}>ADMIN</span>
        </a>
        <div style={{ display: 'flex', gap: 12 }}>
          <a href="/generate" style={{ fontSize: 11, color: '#4A5568', textDecoration: 'none', border: '1px solid #151C25', padding: '7px 14px' }}>✦ Générateur</a>
          <a href="/profile" style={{ fontSize: 11, color: '#4A5568', textDecoration: 'none', border: '1px solid #151C25', padding: '7px 14px' }}>◎ Profil</a>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '48px 24px' }}>

        {/* TITRE */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ fontSize: 10, color: '#D4FF57', letterSpacing: '0.14em', marginBottom: 12 }}>// ADMIN</div>
          <h1 style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 6 }}>Gestion des utilisateurs</h1>
          <p style={{ fontSize: 12, color: '#2D3748' }}>Modifier les plans et accès de tes utilisateurs</p>
        </div>

        {/* ERREUR */}
        {errorMsg && (
          <div style={{ marginBottom: 24, padding: '12px 16px', background: '#FF4D4D10', border: '1px solid #FF4D4D40', color: '#FF4D4D', fontSize: 12 }}>
            ⚠ {errorMsg}
          </div>
        )}

        {/* STATS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 1, background: '#151C25', border: '1px solid #151C25', marginBottom: 32 }}>
          {[
            { label: 'TOTAL', value: stats.total, color: 'white' },
            { label: 'FREE', value: stats.free, color: '#4A5568' },
            { label: 'STANDARD', value: stats.standard, color: '#38C4FF' },
            { label: 'PRO', value: stats.pro, color: '#D4FF57' },
            { label: 'PREMIUM', value: stats.premium, color: '#A47CFF' },
          ].map((stat, i) => (
            <div key={i} style={{ background: '#07090C', padding: '20px', textAlign: 'center' }}>
              <div style={{ fontSize: 28, fontWeight: 900, color: stat.color, letterSpacing: '-0.03em', marginBottom: 4 }}>{stat.value}</div>
              <div style={{ fontSize: 9, color: '#2D3748', letterSpacing: '0.1em' }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* FILTRES */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Rechercher par email ou nom..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, minWidth: 200, background: '#0B0E13', border: '1px solid #151C25', color: 'white', padding: '10px 14px', fontFamily: 'monospace', fontSize: 12, outline: 'none' }}
          />
          <div style={{ display: 'flex', gap: 1, background: '#151C25' }}>
            {['all', 'free', 'standard', 'pro', 'premium'].map(p => (
              <button key={p} onClick={() => setFilterPlan(p)}
                style={{ padding: '10px 14px', fontSize: 10, fontWeight: 900, fontFamily: 'monospace', letterSpacing: '0.06em', border: 'none', cursor: 'pointer', background: filterPlan === p ? '#D4FF57' : '#07090C', color: filterPlan === p ? '#07090C' : '#4A5568', transition: 'all 0.15s' }}>
                {p.toUpperCase()}
              </button>
            ))}
          </div>
          <button
            onClick={() => session?.access_token && fetchUsers(session.access_token)}
            style={{ padding: '10px 16px', fontSize: 11, fontFamily: 'monospace', background: 'transparent', border: '1px solid #151C25', color: '#4A5568', cursor: 'pointer' }}>
            ↻ Rafraîchir
          </button>
        </div>

        {/* TABLE UTILISATEURS */}
        <div style={{ border: '1px solid #151C25', overflow: 'hidden' }}>

          {/* EN-TÊTES */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1.5fr', background: '#0B0E13', borderBottom: '1px solid #151C25', padding: '12px 20px', gap: 16 }}>
            {['EMAIL / NOM', 'PLAN', 'CRÉDITS', 'MEMBRE DEPUIS', 'CHANGER PLAN'].map((h, i) => (
              <div key={i} style={{ fontSize: 9, color: '#2D3748', letterSpacing: '0.12em' }}>{h}</div>
            ))}
          </div>

          {/* LIGNES */}
          {filteredUsers.length === 0 ? (
            <div style={{ padding: '40px', textAlign: 'center', color: '#2D3748', fontSize: 13 }}>
              Aucun utilisateur trouvé
            </div>
          ) : (
            filteredUsers.map((u, i) => {
              const planConf = PLAN_CONFIG[u.plan]
              const isUpdated = updated === u.id
              const isUpdating = updating === u.id
              return (
                <div key={u.id} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1.5fr', padding: '16px 20px', gap: 16, borderBottom: i < filteredUsers.length - 1 ? '1px solid #0F1520' : 'none', background: isUpdated ? '#D4FF5708' : 'transparent', transition: 'background 0.3s', alignItems: 'center' }}>

                  {/* Email / Nom */}
                  <div>
                    <div style={{ fontSize: 12, color: 'white', marginBottom: 3 }}>{u.email}</div>
                    {u.name && <div style={{ fontSize: 10, color: '#4A5568' }}>{u.name}</div>}
                  </div>

                  {/* Plan */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: planConf.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 11, fontWeight: 700, color: planConf.color }}>{planConf.label}</span>
                  </div>

                  {/* Crédits */}
                  <div style={{ fontSize: 12, color: '#4A5568' }}>
                    {u.credits_used} / {planConf.limit}
                  </div>

                  {/* Date */}
                  <div style={{ fontSize: 11, color: '#2D3748' }}>
                    {new Date(u.created_at).toLocaleDateString('fr-FR', { day: '2-digit', month: 'short', year: '2-digit' })}
                  </div>

                  {/* Changer plan */}
                  <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                    {isUpdated ? (
                      <span style={{ fontSize: 10, color: '#D4FF57', fontWeight: 700 }}>✓ Mis à jour</span>
                    ) : isUpdating ? (
                      <span style={{ fontSize: 10, color: '#4A5568' }}>⟳ Mise à jour...</span>
                    ) : (
                      (['free', 'standard', 'pro', 'premium'] as const).filter(p => p !== u.plan).map(p => (
                        <button key={p} onClick={() => handleChangePlan(u.id, p)}
                          style={{ padding: '4px 10px', fontSize: 9, fontWeight: 900, fontFamily: 'monospace', letterSpacing: '0.06em', border: `1px solid ${PLAN_CONFIG[p].color}40`, background: 'transparent', color: PLAN_CONFIG[p].color, cursor: 'pointer', transition: 'all 0.15s' }}
                          onMouseEnter={e => { e.currentTarget.style.background = PLAN_CONFIG[p].color + '20' }}
                          onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
                        >
                          {p.toUpperCase()}
                        </button>
                      ))
                    )}
                  </div>
                </div>
              )
            })
          )}
        </div>

        <div style={{ marginTop: 16, fontSize: 11, color: '#2D3748', textAlign: 'right' }}>
          {filteredUsers.length} utilisateur{filteredUsers.length > 1 ? 's' : ''} affiché{filteredUsers.length > 1 ? 's' : ''}
        </div>

      </div>
    </div>
  )
}
