'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../lib/supabase'

export default function UpdatePasswordPage() {
  const router = useRouter()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    // Vérifier que l'utilisateur vient bien d'un lien de reset
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setReady(true)
      } else {
        router.push('/reset-password')
      }
    })
  }, [router])

  const handleUpdate = async () => {
    if (!password.trim()) {
      setError('Entre ton nouveau mot de passe.')
      return
    }
    if (password.length < 6) {
      setError('Le mot de passe doit faire au moins 6 caractères.')
      return
    }
    if (password !== confirm) {
      setError('Les mots de passe ne correspondent pas.')
      return
    }

    setLoading(true)
    setError('')

    const { error } = await supabase.auth.updateUser({ password })

    if (error) {
      setError('Erreur lors de la mise à jour. Réessaie.')
    } else {
      setSuccess(true)
      setTimeout(() => router.push('/my-prompts'), 2500)
    }

    setLoading(false)
  }

  if (!ready) {
    return (
      <div style={{ minHeight: '100vh', background: '#07090C', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'monospace' }}>
        <div style={{ color: '#94A3B8', fontSize: 13 }}>⟳ Vérification...</div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: '#07090C', color: 'white', fontFamily: 'monospace', display: 'flex', flexDirection: 'column' }}>

      {/* HEADER */}
      <div style={{ borderBottom: '1px solid #151C25', padding: '14px 28px' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 26, height: 26, background: '#D4FF57', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 900, color: '#07090C' }}>PA</div>
          <span style={{ fontWeight: 900, fontSize: 15, color: 'white' }}>Prompt Architect</span>
        </a>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <div style={{ width: '100%', maxWidth: 400 }}>

          {!success ? (
            <>
              <div style={{ marginBottom: 32 }}>
                <div style={{ fontSize: 10, color: '#D4FF57', letterSpacing: '0.14em', marginBottom: 12 }}>// NOUVEAU MOT DE PASSE</div>
                <h1 style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 8 }}>
                  Crée ton nouveau mot de passe
                </h1>
                <p style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.6 }}>
                  Choisis un mot de passe sécurisé d&apos;au moins 6 caractères.
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 9, color: '#94A3B8', letterSpacing: '0.1em', marginBottom: 6 }}>NOUVEAU MOT DE PASSE</div>
                  <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="6 caractères minimum"
                    style={{ width: '100%', background: '#0B0E13', border: '1px solid #151C25', color: 'white', padding: '12px 14px', fontFamily: 'monospace', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <div style={{ fontSize: 9, color: '#94A3B8', letterSpacing: '0.1em', marginBottom: 6 }}>CONFIRMER LE MOT DE PASSE</div>
                  <input
                    type="password"
                    value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    placeholder="Répète ton mot de passe"
                    onKeyDown={e => e.key === 'Enter' && handleUpdate()}
                    style={{ width: '100%', background: '#0B0E13', border: '1px solid #151C25', color: 'white', padding: '12px 14px', fontFamily: 'monospace', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              {error && (
                <div style={{ padding: '10px 14px', background: '#2A0A0A', border: '1px solid #5A1A1A', fontSize: 12, color: '#FF6B6B', marginBottom: 16 }}>
                  ✕ {error}
                </div>
              )}

              <button
                onClick={handleUpdate}
                disabled={loading}
                style={{ width: '100%', padding: '13px 0', fontSize: 12, fontWeight: 900, fontFamily: 'monospace', letterSpacing: '0.08em', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', background: loading ? '#151C25' : '#D4FF57', color: loading ? '#94A3B8' : '#07090C' }}
              >
                {loading ? '⟳ MISE À JOUR...' : '✓ METTRE À JOUR MON MOT DE PASSE'}
              </button>
            </>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 40, color: '#D4FF57', marginBottom: 24 }}>✓</div>
              <h1 style={{ fontSize: 22, fontWeight: 900, marginBottom: 16, letterSpacing: '-0.02em' }}>
                Mot de passe mis à jour !
              </h1>
              <p style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.7 }}>
                Redirection vers ton espace dans quelques secondes...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
