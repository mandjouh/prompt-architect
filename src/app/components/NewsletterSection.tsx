'use client'

import { useState } from 'react'
import { trackEvent } from '../lib/plausible'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSubmit = async () => {
    if (!email || !email.includes('@')) {
      setErrorMsg('Entre un email valide.')
      return
    }
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      if (res.ok) {
        setStatus('success')
        setEmail('')
        trackEvent('Newsletter_Subscribed')
      } else {
        const data = await res.json()
        setErrorMsg(data.error ?? 'Erreur. Réessaie.')
        setStatus('error')
      }
    } catch {
      setErrorMsg('Erreur réseau. Réessaie.')
      setStatus('error')
    }
  }

  return (
    <section style={{ borderTop: '1px solid #151C25', borderBottom: '1px solid #151C25', background: '#0B0E13', padding: '80px 24px' }}>
      <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center', fontFamily: 'monospace' }}>
        <div style={{ fontSize: 10, color: '#D4FF57', letterSpacing: '0.14em', marginBottom: 16 }}>// NEWSLETTER</div>
        <h2 style={{ fontSize: 28, fontWeight: 900, color: 'white', letterSpacing: '-0.03em', marginBottom: 12, lineHeight: 1.1 }}>
          Les meilleurs prompts,<br />directement dans ta boîte.
        </h2>
        <p style={{ fontSize: 14, color: '#4A5568', lineHeight: 1.75, marginBottom: 32 }}>
          Tips de prompt engineering, nouvelles fonctionnalités, offres exclusives.<br />
          Pas de spam. Désabonnement en un clic.
        </p>

        {status === 'success' ? (
          <div style={{ padding: '16px 24px', background: '#D4FF5715', border: '1px solid #D4FF5740', color: '#D4FF57', fontSize: 13, fontWeight: 700 }}>
            ✦ Tu es dans la liste — vérifie ta boîte mail.
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', gap: 1, maxWidth: 440, margin: '0 auto 12px' }}>
              <input
                type="email"
                value={email}
                onChange={e => { setEmail(e.target.value); setStatus('idle'); setErrorMsg('') }}
                onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                placeholder="ton@email.com"
                style={{
                  flex: 1, background: '#07090C', border: '1px solid #151C25',
                  borderRight: 'none', color: 'white', padding: '13px 16px',
                  fontFamily: 'monospace', fontSize: 13, outline: 'none',
                }}
              />
              <button
                onClick={handleSubmit}
                disabled={status === 'loading'}
                style={{
                  background: '#D4FF57', color: '#07090C', border: 'none',
                  padding: '13px 24px', fontSize: 12, fontWeight: 900,
                  fontFamily: 'monospace', letterSpacing: '0.08em', cursor: 'pointer',
                  whiteSpace: 'nowrap', opacity: status === 'loading' ? 0.7 : 1,
                }}
              >
                {status === 'loading' ? '⟳' : "S'INSCRIRE →"}
              </button>
            </div>
            {errorMsg && (
              <div style={{ fontSize: 12, color: '#FF5A5A', marginTop: 8 }}>⚠ {errorMsg}</div>
            )}
            <p style={{ fontSize: 11, color: '#2D3748', marginTop: 12 }}>
              Déjà +500 prompt engineers inscrits · Désabonnement instantané
            </p>
          </>
        )}
      </div>
    </section>
  )
}
