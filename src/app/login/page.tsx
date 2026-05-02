'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '../lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const searchParams = useSearchParams()
  const refCode = searchParams.get('ref')

  const handleSubmit = async () => {
    if (!email.trim() || !password.trim()) {
      setError('Remplis tous les champs.')
      return
    }
    if (password.length < 6) {
      setError('Le mot de passe doit faire au moins 6 caractères.')
      return
    }

    setLoading(true)
    setError('')
    setSuccess('')

    if (mode === 'register') {
      const { data: signUpData, error } = await supabase.auth.signUp({ email, password })
      // Appliquer le code de parrainage si présent
      if (!error && signUpData.user && refCode) {
        await fetch('/api/referral', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ referralCode: refCode, newUserId: signUpData.user.id }),
        })
      }
      const error2 = error
      if (error || error2) {
        setError(error.message)
      } else {
        setSuccess('Compte créé ! Vérifie ton email pour confirmer ton inscription.')
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError('Email ou mot de passe incorrect.')
      } else {
        router.push('/my-prompts')
      }
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

      {/* FORM */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
        <div style={{ width: '100%', maxWidth: 400 }}>

          {/* Titre */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ fontSize: 10, color: '#D4FF57', letterSpacing: '0.14em', marginBottom: 12 }}>
              {mode === 'login' ? '// CONNEXION' : '// CRÉER UN COMPTE'}
            </div>
            <h1 style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 8 }}>
              {mode === 'login' ? 'Bon retour.' : 'Rejoins Prompt Architect.'}
            </h1>
            <p style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.6 }}>
              {mode === 'login'
                ? 'Connecte-toi pour retrouver tes prompts sauvegardés.'
                : 'Crée ton compte pour sauvegarder tes prompts en cloud.'}
            </p>
          </div>

          {/* Toggle login / register */}
          <div style={{ display: 'flex', marginBottom: 28, border: '1px solid #151C25' }}>
            {(['login', 'register'] as const).map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(''); setSuccess('') }}
                style={{
                  flex: 1, padding: '10px 0', fontSize: 11, fontFamily: 'monospace',
                  fontWeight: 900, letterSpacing: '0.06em', cursor: 'pointer', border: 'none',
                  background: mode === m ? '#D4FF57' : 'transparent',
                  color: mode === m ? '#07090C' : '#94A3B8',
                }}
              >
                {m === 'login' ? 'CONNEXION' : 'INSCRIPTION'}
              </button>
            ))}
          </div>

          {/* Champs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 20 }}>
            <div>
              <div style={{ fontSize: 9, color: '#94A3B8', letterSpacing: '0.1em', marginBottom: 6 }}>EMAIL</div>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="ton@email.com"
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                style={{ width: '100%', background: '#0B0E13', border: '1px solid #151C25', color: 'white', padding: '12px 14px', fontFamily: 'monospace', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <div style={{ fontSize: 9, color: '#94A3B8', letterSpacing: '0.1em', marginBottom: 6 }}>MOT DE PASSE</div>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="6 caractères minimum"
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                style={{ width: '100%', background: '#0B0E13', border: '1px solid #151C25', color: 'white', padding: '12px 14px', fontFamily: 'monospace', fontSize: 13, outline: 'none', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          {/* Erreur / Succès */}
          {error && (
            <div style={{ padding: '10px 14px', background: '#2A0A0A', border: '1px solid #5A1A1A', fontSize: 12, color: '#FF6B6B', marginBottom: 16, lineHeight: 1.5 }}>
              ✕ {error}
            </div>
          )}
          {success && (
            <div style={{ padding: '10px 14px', background: '#0A2A0A', border: '1px solid #1A5A1A', fontSize: 12, color: '#5EDD5E', marginBottom: 16, lineHeight: 1.5 }}>
              ✓ {success}
            </div>
          )}

          {/* Bouton submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: '100%', padding: '13px 0', fontSize: 12, fontWeight: 900,
              fontFamily: 'monospace', letterSpacing: '0.08em', border: 'none',
              cursor: loading ? 'not-allowed' : 'pointer',
              background: loading ? '#151C25' : '#D4FF57',
              color: loading ? '#94A3B8' : '#07090C',
            }}
          >
            {loading ? '⟳ CHARGEMENT...' : mode === 'login' ? '→ SE CONNECTER' : '✦ CRÉER MON COMPTE'}
          </button>

          {/* Lien mot de passe oublié */}
          {mode === 'login' && (
            <div style={{ textAlign: 'center', marginTop: 16 }}>
              <a href="/reset-password" style={{ fontSize: 11, color: '#94A3B8', textDecoration: 'none' }}>
                Mot de passe oublié ?
              </a>
            </div>
          )}

          {/* Info */}
          <div style={{ marginTop: 28, padding: '12px 14px', background: '#0B0E13', border: '1px solid #0F1520', fontSize: 11, color: '#94A3B8', lineHeight: 1.6 }}>
            <span style={{ color: '#1A2535' }}>◎ </span>
            {mode === 'register'
              ? 'Tes prompts localStorage existants seront automatiquement associés à ton compte.'
              : 'Tes prompts sont sauvegardés en sécurité dans le cloud.'}
          </div>

        </div>
      </div>
    </div>
  )
}
