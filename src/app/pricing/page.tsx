'use client'

import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/navigation'

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    currency: 'USD',
    generations: 5,
    color: '#4A5568',
    features: [
      '5 générations / mois',
      'Accès aux 4 modules',
      'Sauvegarde locale',
      'Bibliothèque 50 prompts',
    ],
    cta: 'Commencer gratuitement',
    priceId: null,
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 5,
    currency: 'USD',
    generations: 50,
    color: '#38C4FF',
    features: [
      '50 générations / mois',
      'Accès aux 4 modules',
      'Sauvegarde cloud',
      'Bibliothèque 50 prompts',
      'Historique illimité',
    ],
    cta: 'Choisir Standard',
    priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_STANDARD,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 10,
    currency: 'USD',
    generations: 100,
    color: '#D4FF57',
    popular: true,
    features: [
      '100 générations / mois',
      'Accès aux 4 modules',
      'Sauvegarde cloud',
      'Bibliothèque 50 prompts',
      'Historique illimité',
      'Support prioritaire',
    ],
    cta: 'Choisir Pro',
    priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_PRO,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 20,
    currency: 'USD',
    generations: 250,
    color: '#A47CFF',
    features: [
      '250 générations / mois',
      'Accès aux 4 modules',
      'Sauvegarde cloud',
      'Bibliothèque 50 prompts',
      'Historique illimité',
      'Support prioritaire',
      'Accès aux nouvelles fonctionnalités en avant-première',
    ],
    cta: 'Choisir Premium',
    priceId: process.env.NEXT_PUBLIC_PADDLE_PRICE_PREMIUM,
  },
]

export default function PricingPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  const handleSubscribe = async (plan: typeof PLANS[0]) => {
    if (plan.id === 'free') {
      router.push('/generate')
      return
    }

    if (!user) {
      router.push('/login')
      return
    }

    setLoading(plan.id)

    try {
      const response = await fetch('/api/paddle/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: plan.priceId,
          userId: user.id,
          email: user.email,
        }),
      })
      const data = await response.json()
      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl
      }
    } catch {
      console.error('Erreur checkout')
    }

    setLoading(null)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#07090C', color: 'white', fontFamily: 'monospace' }}>

      {/* HEADER */}
      <div style={{ borderBottom: '1px solid #151C25', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#07090CF0', backdropFilter: 'blur(16px)', zIndex: 100 }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 26, height: 26, background: '#D4FF57', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 900, color: '#07090C' }}>PA</div>
          <span style={{ fontWeight: 900, fontSize: 15, color: 'white' }}>Prompt Architect</span>
        </a>
        <div style={{ display: 'flex', gap: 12 }}>
          {user ? (
            <a href="/my-prompts" style={{ fontSize: 11, color: '#4A5568', textDecoration: 'none', border: '1px solid #151C25', padding: '6px 12px' }}>◈ Mes prompts</a>
          ) : (
            <a href="/login" style={{ fontSize: 11, color: '#4A5568', textDecoration: 'none', border: '1px solid #151C25', padding: '6px 12px' }}>Connexion</a>
          )}
          <a href="/generate" style={{ background: '#D4FF57', color: '#07090C', padding: '8px 18px', fontSize: 11, fontWeight: 900, textDecoration: 'none', letterSpacing: '0.06em' }}>
            ✦ GÉNÉRATEUR
          </a>
        </div>
      </div>

      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 24px' }}>

        {/* TITRE */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontSize: 10, color: '#D4FF57', letterSpacing: '0.14em', marginBottom: 14 }}>// PRICING</div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 16 }}>
            Simple. Transparent.<br />
            <span style={{ color: '#D4FF57' }}>Sans surprise.</span>
          </h1>
          <p style={{ color: '#4A5568', fontSize: 14, lineHeight: 1.7, maxWidth: 400, margin: '0 auto' }}>
            Commence gratuitement. Upgrade quand tu es prêt.
            Annule à tout moment.
          </p>
        </div>

        {/* PLANS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: '#151C25', border: '1px solid #151C25', marginBottom: 48 }}>
          {PLANS.map(plan => (
            <div key={plan.id} style={{ background: plan.popular ? '#0D1118' : '#07090C', padding: 28, position: 'relative', display: 'flex', flexDirection: 'column' }}>

              {/* Badge populaire */}
              {plan.popular && (
                <div style={{ position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)', background: '#D4FF57', color: '#07090C', fontSize: 9, fontWeight: 900, padding: '3px 12px', letterSpacing: '0.1em' }}>
                  POPULAIRE
                </div>
              )}

              {/* Plan name */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                <div style={{ width: 8, height: 8, background: plan.color, borderRadius: '50%' }} />
                <span style={{ fontSize: 13, fontWeight: 900, color: plan.color, letterSpacing: '0.06em' }}>
                  {plan.name.toUpperCase()}
                </span>
              </div>

              {/* Prix */}
              <div style={{ marginBottom: 24 }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}>
                  <span style={{ fontSize: 36, fontWeight: 900, color: 'white', letterSpacing: '-0.04em' }}>
                    {plan.price === 0 ? 'Gratuit' : `$${plan.price}`}
                  </span>
                  {plan.price > 0 && <span style={{ fontSize: 12, color: '#4A5568' }}>/mois</span>}
                </div>
                <div style={{ fontSize: 11, color: '#4A5568', marginTop: 4 }}>
                  {plan.generations} générations/mois
                </div>
              </div>

              {/* Features */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
                {plan.features.map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 11, color: '#8A9AAA', lineHeight: 1.5 }}>
                    <span style={{ color: plan.color, flexShrink: 0, marginTop: 1 }}>✓</span>
                    {f}
                  </div>
                ))}
              </div>

              {/* CTA */}
              <button
                onClick={() => handleSubscribe(plan)}
                disabled={loading === plan.id}
                style={{
                  width: '100%', padding: '11px 0', fontSize: 11, fontWeight: 900,
                  fontFamily: 'monospace', letterSpacing: '0.06em', cursor: loading === plan.id ? 'not-allowed' : 'pointer',
                  border: plan.popular ? 'none' : '1px solid #2A3545',
                  background: plan.popular ? '#D4FF57' : 'transparent',
                  color: plan.popular ? '#07090C' : '#4A5568',
                  transition: 'all 0.15s',
                }}
              >
                {loading === plan.id ? '⟳ CHARGEMENT...' : plan.cta.toUpperCase()}
              </button>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div style={{ borderTop: '1px solid #151C25', paddingTop: 48 }}>
          <div style={{ fontSize: 10, color: '#D4FF57', letterSpacing: '0.14em', marginBottom: 24 }}>// FAQ</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {[
              { q: 'Puis-je annuler à tout moment ?', r: 'Oui, sans frais ni engagement. Ton plan reste actif jusqu\'à la fin de la période payée.' },
              { q: 'Que se passe-t-il si j\'atteins ma limite ?', r: 'Tu reçois une notification. Tu peux upgrader ou attendre le renouvellement mensuel.' },
              { q: 'Les générations non utilisées sont-elles reportées ?', r: 'Non, le compteur se remet à zéro chaque mois à la date de renouvellement.' },
              { q: 'Comment fonctionne le paiement ?', r: 'Paiement sécurisé via Paddle. Carte Visa/Mastercard et autres méthodes locales acceptées.' },
            ].map((item, i) => (
              <div key={i} style={{ padding: '20px 0', borderBottom: '1px solid #0F1520' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 8 }}>{item.q}</div>
                <div style={{ fontSize: 12, color: '#4A5568', lineHeight: 1.7 }}>{item.r}</div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
