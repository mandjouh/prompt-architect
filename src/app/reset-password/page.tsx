'use client'

import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleReset = async () => {
    if (!email.trim()) {
      setError('Entre ton adresse email.')
      return
    }

    setLoading(true)
    setError('')

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: 'https://www.prompt-architect.io/update-password',
    })

    if (error) {
      setError('Erreur lors de l\'envoi. Vérifie ton email.')
    } else {
      setSent(true)
    }

    setLoading(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#07090C', color: 'white', fontFamily: 'monospace', display: 'flex', flexDirection: 'column' }}>

      {/* HEADER */}
      <div style={{ borderBottom: '1px solid #151C25', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 26, height: 26, background: '#D4FF57', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 900, color: '#07090C' }}>PA</div>
          <span style={{ fontWeight: 900, fontSize: 15, color: 'white' }}>Prompt Architect</span>
        </a>
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <div style={{ width: '100%', maxWidth: 400 }}>

          {!sent ? (
            <>
              <div style={{ marginBottom: 32 }}>
                <div style={{ fontSize: 10, color: '#D4FF57', letterSpacing: '0.14em', marginBottom: 12 }}>// MOT DE PASSE OUBLIÉ</div>
                <h1 style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 8 }}>
                  Réinitialiser mon mot de passe
                </h1>
                <p style={{ fontSize: 13, color: '#4A5568', lineHeight: 1.6 }}>
                  Entre ton email et on t&apos;envoie un lien pour créer un nouveau mot de passe.
                </p>
              </div>

              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 9, color: '#2D3748', letterSpacing: '0.1em', marginBottom: 6 }}>EMAIL</div>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="ton@email.com"
                  onKeyDown={e => e.key === 'Enter' && handleReset()}
                  style={{ width: '100%', background: '#0B0E13', border: '1px solid #151C25', color: 'white', padding: '12px 14px', fontFamily: 'monospace', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
                />
              </div>

              {error && (
                <div style={{ padding: '10px 14px', background: '#2A0A0A', border: '1px solid #5A1A1A', fontSize: 12, color: '#FF6B6B', marginBottom: 16 }}>
                  ✕ {error}
                </div>
              )}

              <button
                onClick={handleReset}
                disabled={loading}
                style={{ width: '100%', padding: '13px 0', fontSize: 12, fontWeight: 900, fontFamily: 'monospace', letterSpacing: '0.08em', border: 'none', cursor: loading ? 'not-allowed' : 'pointer', background: loading ? '#151C25' : '#D4FF57', color: loading ? '#4A5568' : '#07090C' }}
              >
                {loading ? '⟳ ENVOI EN COURS...' : '→ ENVOYER LE LIEN'}
              </button>

              <div style={{ textAlign: 'center', marginTop: 20 }}>
                <a href="/login" style={{ fontSize: 11, color: '#2D3748', textDecoration: 'none' }}>
                  ← Retour à la connexion
                </a>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 40, marginBottom: 24 }}>✓</div>
              <div style={{ fontSize: 10, color: '#D4FF57', letterSpacing: '0.14em', marginBottom: 12 }}>EMAIL ENVOYÉ</div>
              <h1 style={{ fontSize: 22, fontWeight: 900, marginBottom: 16, letterSpacing: '-0.02em' }}>
                Vérifie ta boîte mail
              </h1>
              <p style={{ fontSize: 13, color: '#4A5568', lineHeight: 1.7, marginBottom: 32 }}>
                On a envoyé un lien de réinitialisation à <span style={{ color: 'white' }}>{email}</span>. Le lien expire dans 1 heure.
              </p>
              <div style={{ padding: '12px 14px', background: '#0B0E13', border: '1px solid #0F1520', fontSize: 11, color: '#2D3748', lineHeight: 1.6, marginBottom: 24 }}>
                Tu ne vois pas l&apos;email ? Vérifie tes spams ou{' '}
                <button onClick={() => setSent(false)} style={{ background: 'none', border: 'none', color: '#D4FF57', cursor: 'pointer', fontSize: 11, fontFamily: 'monospace', padding: 0 }}>
                  réessaie avec un autre email
                </button>.
              </div>
              <a href="/login" style={{ fontSize: 12, color: '#4A5568', textDecoration: 'none', border: '1px solid #151C25', padding: '10px 24px', display: 'inline-block' }}>
                ← Retour à la connexion
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
