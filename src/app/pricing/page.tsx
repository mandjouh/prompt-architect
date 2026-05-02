'use client'

import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/navigation'

const PLANS = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    generations: 5,
    costPerGen: null,
    color: '#94A3B8',
    features: ['5 générations / mois', 'Accès aux 3 modules gratuits', 'Sauvegarde locale', 'Bibliothèque 50 prompts'],
    cta: 'Commencer gratuitement',
    variantId: null,
  },
  {
    id: 'standard',
    name: 'Standard',
    price: 5,
    generations: 50,
    costPerGen: '0.10',
    color: '#38C4FF',
    features: ['50 générations / mois', 'Accès aux 8 modules', 'Sauvegarde cloud', 'Historique illimité'],
    cta: 'Choisir Standard',
    variantId: process.env.NEXT_PUBLIC_LEMONSQUEEZY_VARIANT_STANDARD,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 10,
    generations: 100,
    costPerGen: '0.10',
    color: '#D4FF57',
    popular: true,
    features: ['100 générations / mois', 'Accès aux 8 modules', 'Sauvegarde cloud', 'Historique illimité', 'Support prioritaire'],
    cta: 'Choisir Pro',
    variantId: process.env.NEXT_PUBLIC_LEMONSQUEEZY_VARIANT_PRO,
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 20,
    generations: 250,
    costPerGen: '0.08',
    color: '#A47CFF',
    features: ['250 générations / mois', 'Accès aux 8 modules', 'Sauvegarde cloud', 'Historique illimité', 'Support prioritaire', 'Nouveautés en avant-première'],
    cta: 'Choisir Premium',
    variantId: process.env.NEXT_PUBLIC_LEMONSQUEEZY_VARIANT_PREMIUM,
  },
]

const CREDIT_PACKS = [
  {
    name: 'Starter',
    credits: 10,
    price: 2,
    costPerCredit: '0.20',
    window: '60 jours',
    variantId: '1597503',
    color: '#94A3B8',
  },
  {
    name: 'Standard',
    credits: 50,
    price: 8,
    costPerCredit: '0.16',
    window: '90 jours',
    variantId: '1597512',
    color: '#38C4FF',
    popular: true,
  },
  {
    name: 'Pro',
    credits: 120,
    price: 15,
    costPerCredit: '0.125',
    window: '180 jours',
    variantId: '1597513',
    color: '#D4FF57',
  },
  {
    name: 'Premium',
    credits: 300,
    price: 30,
    costPerCredit: '0.10',
    window: '365 jours',
    variantId: '1597517',
    color: '#A47CFF',
  },
]

export default function PricingPage() {
  const { user } = useAuth()
  const router = useRouter()
  const [loading, setLoading] = useState<string | null>(null)

  const handleSubscribe = async (plan: typeof PLANS[0]) => {
    if (plan.id === 'free') { router.push('/generate'); return }
    if (!user) { router.push('/login'); return }
    setLoading(plan.id)
    try {
      const response = await fetch('/api/lemonsqueezy/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ variantId: plan.variantId, userId: user.id, email: user.email }),
      })
      const data = await response.json()
      if (data.checkoutUrl) window.location.href = data.checkoutUrl
    } catch {
      console.error('Erreur checkout')
    }
    setLoading(null)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#07090C', color: 'white', fontFamily: 'monospace' }}>

      <style>{`
        @media (max-width: 768px) {
          .plans-grid { grid-template-columns: 1fr !important; max-width: 400px !important; margin: 0 auto 16px !important; }
          .credits-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .faq-grid { grid-template-columns: 1fr !important; }
          .pricing-padding { padding: 32px 16px !important; }
          .pricing-title { font-size: 28px !important; }
        }
        @media (max-width: 480px) {
          .credits-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* HEADER */}
      <div style={{ borderBottom: '1px solid #151C25', padding: '14px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#07090CF0', backdropFilter: 'blur(16px)', zIndex: 100 }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <div style={{ width: 26, height: 26, background: '#D4FF57', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 900, color: '#07090C', flexShrink: 0 }}>PA</div>
          <span style={{ fontWeight: 900, fontSize: 14, color: 'white' }}>Prompt Architect</span>
        </a>
        <div style={{ display: 'flex', gap: 8 }}>
          {user ? (
            <a href="/my-prompts" style={{ fontSize: 11, color: '#94A3B8', textDecoration: 'none', border: '1px solid #151C25', padding: '6px 10px' }}>◈</a>
          ) : (
            <a href="/login" style={{ fontSize: 11, color: '#94A3B8', textDecoration: 'none', border: '1px solid #151C25', padding: '6px 10px' }}>Connexion</a>
          )}
          <a href="/generate" style={{ background: '#D4FF57', color: '#07090C', padding: '8px 14px', fontSize: 11, fontWeight: 900, textDecoration: 'none', letterSpacing: '0.06em' }}>
            ✦ GÉNÉRATEUR
          </a>
        </div>
      </div>

      <div className="pricing-padding" style={{ maxWidth: 1000, margin: '0 auto', padding: '64px 24px' }}>

        {/* TITRE */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div style={{ fontSize: 10, color: '#D4FF57', letterSpacing: '0.14em', marginBottom: 14 }}>// PRICING</div>
          <h1 className="pricing-title" style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 16 }}>
            Deux façons de payer.<br />
            <span style={{ color: '#D4FF57' }}>Zéro surprise.</span>
          </h1>
          <p style={{ color: '#94A3B8', fontSize: 14, lineHeight: 1.7, maxWidth: 480, margin: '0 auto' }}>
            Abonnement mensuel pour une utilisation régulière.<br />
            Packs de crédits pour payer quand tu veux —<br />
            <span style={{ color: 'white' }}>Wave, MTN Money, Orange Money acceptés.</span>
          </p>
        </div>

        {/* ══════════════════════════════════════ */}
        {/* SECTION 1 — ABONNEMENTS               */}
        {/* ══════════════════════════════════════ */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <div style={{ fontSize: 9, color: '#94A3B8', letterSpacing: '0.14em' }}>01</div>
            <div style={{ flex: 1, height: '1px', background: '#151C25' }} />
            <div style={{ fontSize: 11, fontWeight: 900, color: 'white', letterSpacing: '0.08em' }}>ABONNEMENTS MENSUELS</div>
            <div style={{ flex: 1, height: '1px', background: '#151C25' }} />
            <div style={{ fontSize: 9, color: '#94A3B8' }}>Renouvellement auto · Annulation libre</div>
          </div>

          <div className="plans-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: '#151C25', border: '1px solid #151C25', marginBottom: 16 }}>
            {PLANS.map(plan => (
              <div key={plan.id} style={{ background: plan.popular ? '#0D1118' : '#07090C', padding: 24, position: 'relative', display: 'flex', flexDirection: 'column' }}>
                {plan.popular && (
                  <div style={{ position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)', background: '#D4FF57', color: '#07090C', fontSize: 9, fontWeight: 900, padding: '3px 12px', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>
                    POPULAIRE
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                  <div style={{ width: 8, height: 8, background: plan.color, borderRadius: '50%', flexShrink: 0 }} />
                  <span style={{ fontSize: 13, fontWeight: 900, color: plan.color, letterSpacing: '0.06em' }}>
                    {plan.name.toUpperCase()}
                  </span>
                </div>
                <div style={{ marginBottom: 8 }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, flexWrap: 'wrap' }}>
                    <span style={{ fontSize: 32, fontWeight: 900, color: 'white', letterSpacing: '-0.04em', lineHeight: 1 }}>
                      {plan.price === 0 ? 'Gratuit' : `$${plan.price}`}
                    </span>
                    {plan.price > 0 && <span style={{ fontSize: 12, color: '#94A3B8' }}>/mois</span>}
                  </div>
                  <div style={{ fontSize: 11, color: '#94A3B8', marginTop: 4 }}>
                    {plan.generations} générations/mois
                  </div>
                  {plan.costPerGen && (
                    <div style={{ fontSize: 10, color: '#D4FF57', marginTop: 2 }}>
                      ${plan.costPerGen} / génération
                    </div>
                  )}
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 20, marginTop: 12 }}>
                  {plan.features.map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 11, color: '#8A9AAA', lineHeight: 1.5 }}>
                      <span style={{ color: plan.color, flexShrink: 0 }}>✓</span>
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => handleSubscribe(plan)}
                  disabled={loading === plan.id}
                  style={{ width: '100%', padding: '12px 8px', fontSize: 11, fontWeight: 900, fontFamily: 'monospace', letterSpacing: '0.04em', cursor: loading === plan.id ? 'not-allowed' : 'pointer', border: plan.popular ? 'none' : '1px solid #2A3545', background: plan.popular ? '#D4FF57' : 'transparent', color: plan.popular ? '#07090C' : '#94A3B8', transition: 'all 0.15s', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                >
                  {loading === plan.id ? '⟳ ...' : plan.cta.toUpperCase()}
                </button>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: '#94A3B8', padding: '10px 14px', border: '1px solid #151C25', background: '#0B0E13' }}>
            <span style={{ color: '#D4FF57' }}>✦</span>
            <span>Quota épuisé en cours de mois ? Complète avec un pack de crédits ci-dessous — le système les utilise automatiquement.</span>
          </div>
        </div>

        {/* ══════════════════════════════════════ */}
        {/* SECTION 2 — PACKS DE CRÉDITS          */}
        {/* ══════════════════════════════════════ */}
        <div style={{ marginBottom: 64 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div style={{ fontSize: 9, color: '#94A3B8', letterSpacing: '0.14em' }}>02</div>
            <div style={{ flex: 1, height: '1px', background: '#151C25' }} />
            <div style={{ fontSize: 11, fontWeight: 900, color: 'white', letterSpacing: '0.08em' }}>PACKS DE CRÉDITS</div>
            <div style={{ flex: 1, height: '1px', background: '#151C25' }} />
            <div style={{ fontSize: 9, color: '#94A3B8' }}>Paiement unique · Sans engagement</div>
          </div>

          <div style={{ marginBottom: 20, padding: '12px 16px', border: '1px solid #D4FF5720', background: '#D4FF5706' }}>
            <div style={{ fontSize: 12, color: '#94A3B8', lineHeight: 1.7 }}>
              <span style={{ color: '#D4FF57', fontWeight: 700 }}>Idéal Wave · MTN Money · Orange Money — </span>
              paye quand ton solde est disponible, sans prélèvement automatique.
              Les crédits sont valables <strong style={{ color: 'white' }}>60 à 365 jours après ta dernière génération</strong>.
              {' '}1 crédit = 1 génération.
            </div>
          </div>

          <div className="credits-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 16 }}>
            {CREDIT_PACKS.map(pack => (
              <a
                key={pack.variantId}
                href={user
                  ? `https://prompt-architect.lemonsqueezy.com/checkout/buy/${pack.variantId}?checkout[custom][user_id]=${user.id}`
                  : '/login'
                }
                target={user ? '_blank' : '_self'}
                rel="noopener noreferrer"
                style={{ display: 'flex', flexDirection: 'column', border: pack.popular ? `1px solid ${pack.color}60` : '1px solid #151C25', background: pack.popular ? '#0D1118' : '#07090C', padding: 20, textDecoration: 'none', color: 'white', position: 'relative', transition: 'border-color 0.15s' }}
              >
                {pack.popular && (
                  <div style={{ position: 'absolute', top: -1, left: '50%', transform: 'translateX(-50%)', background: pack.color, color: '#07090C', fontSize: 9, fontWeight: 900, padding: '3px 12px', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>
                    POPULAIRE
                  </div>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <div style={{ width: 8, height: 8, background: pack.color, borderRadius: '50%', flexShrink: 0 }} />
                  <span style={{ fontSize: 12, fontWeight: 900, color: pack.color, letterSpacing: '0.06em' }}>
                    {pack.name.toUpperCase()}
                  </span>
                </div>
                <div style={{ fontSize: 28, fontWeight: 900, color: 'white', letterSpacing: '-0.03em', lineHeight: 1, marginBottom: 4 }}>
                  ${pack.price}
                </div>
                <div style={{ fontSize: 12, color: '#94A3B8', marginBottom: 2 }}>
                  {pack.credits} crédits
                </div>
                <div style={{ fontSize: 10, color: pack.color, marginBottom: 12 }}>
                  ${pack.costPerCredit} / crédit
                </div>
                <div style={{ marginTop: 'auto', paddingTop: 12, borderTop: '1px solid #151C25', fontSize: 10, color: '#94A3B8' }}>
                  Valables {pack.window} sans usage
                </div>
              </a>
            ))}
          </div>

          <div style={{ padding: '14px 18px', border: '1px solid #151C25', background: '#0B0E13', fontSize: 12, color: '#94A3B8', lineHeight: 1.7 }}>
            <span style={{ color: 'white', fontWeight: 700 }}>À noter : </span>
            L&apos;abonnement revient à <span style={{ color: '#D4FF57' }}>$0.08–0.10 / génération</span>.
            {' '}Les crédits à <span style={{ color: '#94A3B8' }}>$0.10–0.20 / crédit</span>.
            {' '}Tu génères souvent ? L&apos;abonnement est plus économique.
            {' '}Tu génères occasionnellement ? Les crédits sont plus flexibles.
          </div>
        </div>

        {/* FAQ */}
        <div style={{ borderTop: '1px solid #151C25', paddingTop: 40 }}>
          <div style={{ fontSize: 10, color: '#D4FF57', letterSpacing: '0.14em', marginBottom: 24 }}>// FAQ</div>
          <div className="faq-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24 }}>
            {[
              { q: 'Puis-je cumuler abonnement et crédits ?', r: 'Oui. Si ton quota mensuel est épuisé, le système utilise automatiquement tes crédits disponibles.' },
              { q: 'Combien de temps durent les crédits ?', r: 'Entre 60 et 365 jours après ta dernière génération selon le pack. Chaque génération repart le compteur à zéro.' },
              { q: 'Puis-je annuler mon abonnement ?', r: 'Oui, sans frais ni engagement. Ton plan reste actif jusqu\'à la fin de la période payée.' },
              { q: 'Quels moyens de paiement sont acceptés ?', r: 'Carte Visa/Mastercard pour les abonnements. Wave, MTN Money, Orange Money pour les packs de crédits.' },
              { q: 'Que se passe-t-il si mes crédits expirent ?', r: 'Tu reçois un email 7 jours avant. Une réactivation à $1–$2 te permet de récupérer tes crédits pendant 30 jours supplémentaires.' },
              { q: 'Les générations non utilisées sont-elles reportées ?', r: 'Le quota abonnement se remet à zéro chaque mois. Les crédits achetés, eux, suivent leur propre fenêtre d\'inactivité.' },
            ].map((item, i) => (
              <div key={i} style={{ padding: '20px 0', borderBottom: '1px solid #0F1520' }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 8 }}>{item.q}</div>
                <div style={{ fontSize: 12, color: '#94A3B8', lineHeight: 1.7 }}>{item.r}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #151C25', padding: '20px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <span style={{ fontWeight: 700, fontSize: 12, color: '#94A3B8' }}>Prompt Architect © 2026</span>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <a href="/generate" style={{ color: '#6B7A8D', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>GÉNÉRATEUR</a>
          <a href="/blog" style={{ color: '#6B7A8D', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>BLOG</a>
          <a href="/contact" style={{ color: '#6B7A8D', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>CONTACT</a>
          <a href="/legal" style={{ color: '#6B7A8D', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>MENTIONS LÉGALES</a>
          <a href="/cgv" style={{ color: '#6B7A8D', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>CGV</a>
          <a href="/remboursement" style={{ color: '#6B7A8D', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>REMBOURSEMENT</a>
        </div>
      </footer>
    </div>
  )
}
