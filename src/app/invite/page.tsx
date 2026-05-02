'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

export default function InvitePage() {
  const { user } = useAuth()
  const [referralCode, setReferralCode] = useState<string | null>(null)
  const [referralCount, setReferralCount] = useState(0)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!user) return
    const fetchCode = async () => {
      const { data: { session } } = await supabase.auth.getSession()
      if (!session?.access_token) return
      const res = await fetch('/api/referral', {
        headers: { Authorization: `Bearer ${session.access_token}` }
      })
      if (res.ok) {
        const json = await res.json()
        setReferralCode(json.code)
        setReferralCount(json.count)
      }
    }
    fetchCode()
  }, [user])

  const referralUrl = referralCode
    ? `https://www.prompt-architect.io/login?ref=${referralCode}`
    : null

  const handleCopy = () => {
    if (!referralUrl) return
    navigator.clipboard.writeText(referralUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#07090C', color: 'white', fontFamily: 'monospace' }}>

      {/* HEADER */}
      <div style={{ borderBottom: '1px solid #151C25', padding: '14px 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#07090CF0', backdropFilter: 'blur(16px)', zIndex: 100 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 26, height: 26, background: '#D4FF57', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 900, color: '#07090C' }}>PA</div>
          <span style={{ fontWeight: 900, fontSize: 15, color: 'white' }}>Prompt Architect</span>
        </Link>
        <div style={{ display: 'flex', gap: 12 }}>
          {user ? (
            <Link href="/profile" style={{ fontSize: 11, color: '#94A3B8', textDecoration: 'none', border: '1px solid #151C25', padding: '7px 14px' }}>◎ Mon profil</Link>
          ) : (
            <Link href="/login" style={{ background: '#D4FF57', color: '#07090C', padding: '8px 18px', fontSize: 11, fontWeight: 900, textDecoration: 'none', letterSpacing: '0.06em' }}>✦ COMMENCER</Link>
          )}
        </div>
      </div>

      {/* HERO */}
      <section style={{ padding: '80px 24px 60px', textAlign: 'center', borderBottom: '1px solid #151C25' }}>
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, border: '1px solid #D4FF5740', padding: '6px 16px', marginBottom: 32, background: '#D4FF5708' }}>
            <span style={{ fontSize: 10, color: '#D4FF57', letterSpacing: '0.14em' }}>✦ PROGRAMME DE PARRAINAGE</span>
          </div>
          <h1 style={{ fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 20 }}>
            Invite un ami.<br />
            <span style={{ color: '#D4FF57' }}>Gagnez 5 crédits</span><br />
            chacun.
          </h1>
          <p style={{ fontSize: 16, color: '#4A5568', lineHeight: 1.7, marginBottom: 40 }}>
            Partage ton lien unique. Dès que ton ami crée un compte,<br />
            vous recevez <strong style={{ color: 'white' }}>5 crédits offerts</strong> — immédiatement.
          </p>

          {user && referralUrl ? (
            <div style={{ maxWidth: 500, margin: '0 auto' }}>
              <div style={{ display: 'flex', gap: 1, marginBottom: 12 }}>
                <div style={{ flex: 1, background: '#0B0E13', border: '1px solid #D4FF5740', borderRight: 'none', padding: '13px 16px', fontSize: 12, color: '#D4FF57', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {referralUrl}
                </div>
                <button onClick={handleCopy} style={{ background: copied ? '#1A3A1A' : '#D4FF57', color: copied ? '#5EDD5E' : '#07090C', border: 'none', padding: '13px 24px', fontSize: 12, fontWeight: 900, cursor: 'pointer', fontFamily: 'monospace', letterSpacing: '0.06em', whiteSpace: 'nowrap', transition: 'all 0.2s' }}>
                  {copied ? '✓ COPIÉ !' : '⎘ COPIER'}
                </button>
              </div>
              {referralCount > 0 && (
                <div style={{ fontSize: 12, color: '#D4FF57', padding: '8px 16px', background: '#D4FF5710', border: '1px solid #D4FF5730' }}>
                  ✦ {referralCount} ami{referralCount > 1 ? 's' : ''} parrainé{referralCount > 1 ? 's' : ''} — {referralCount * 5} crédits gagnés
                </div>
              )}
            </div>
          ) : (
            <Link href="/login" style={{ display: 'inline-block', background: '#D4FF57', color: '#07090C', padding: '14px 36px', fontSize: 13, fontWeight: 900, textDecoration: 'none', letterSpacing: '0.08em' }}>
              ✦ CRÉER MON COMPTE ET PARRAINER
            </Link>
          )}
        </div>
      </section>

      {/* COMMENT ÇA MARCHE */}
      <section style={{ padding: '80px 24px', maxWidth: 860, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <div style={{ fontSize: 10, color: '#D4FF57', letterSpacing: '0.14em', marginBottom: 12 }}>// COMMENT ÇA MARCHE</div>
          <h2 style={{ fontSize: 28, fontWeight: 900, letterSpacing: '-0.03em' }}>Simple. Rapide. Gratuit.</h2>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 1, background: '#151C25', border: '1px solid #151C25' }}>
          {[
            { step: '01', title: 'Copie ton lien', desc: 'Un lien unique te sera attribué dès la création de ton compte. Partage-le où tu veux.' },
            { step: '02', title: 'Ton ami s\'inscrit', desc: 'Il crée son compte via ton lien. L\'inscription est gratuite et prend 30 secondes.' },
            { step: '03', title: 'Vous gagnez tous les deux', desc: '5 crédits sont ajoutés immédiatement sur vos deux comptes. Sans délai.' },
          ].map((item, i) => (
            <div key={i} style={{ background: '#07090C', padding: 32 }}>
              <div style={{ fontSize: 48, fontWeight: 900, color: '#151C25', letterSpacing: '-0.04em', marginBottom: 16 }}>{item.step}</div>
              <div style={{ fontSize: 14, fontWeight: 900, color: 'white', marginBottom: 10 }}>{item.title}</div>
              <div style={{ fontSize: 12, color: '#4A5568', lineHeight: 1.7 }}>{item.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ PARRAINAGE */}
      <section style={{ padding: '0 24px 80px', maxWidth: 600, margin: '0 auto' }}>
        <div style={{ fontSize: 10, color: '#D4FF57', letterSpacing: '0.14em', marginBottom: 24, textAlign: 'center' }}>// FAQ</div>
        {[
          { q: 'Y a-t-il une limite de parrainages ?', r: 'Non. Tu peux parrainer autant de personnes que tu veux. Chaque parrainage = 5 crédits supplémentaires.' },
          { q: 'Les crédits expirent-ils ?', r: 'Les crédits pay-as-you-go sont valables 60 jours à partir de ta dernière utilisation. La fenêtre se renouvelle à chaque génération.' },
          { q: 'Et si mon ami avait déjà un compte ?', r: 'Le parrainage ne s\'applique qu\'aux nouveaux comptes. Le lien doit être utilisé lors de l\'inscription.' },
          { q: 'Puis-je me parrainer moi-même ?', r: 'Non. L\'auto-parrainage est bloqué automatiquement.' },
        ].map((item, i) => (
          <div key={i} style={{ borderBottom: '1px solid #151C25', padding: '20px 0' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: 'white', marginBottom: 8 }}>{item.q}</div>
            <div style={{ fontSize: 12, color: '#4A5568', lineHeight: 1.7 }}>{item.r}</div>
          </div>
        ))}
      </section>

      {/* FOOTER CTA */}
      {!user && (
        <section style={{ borderTop: '1px solid #151C25', padding: '60px 24px', textAlign: 'center', background: '#0B0E13' }}>
          <h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 20 }}>Prêt à gagner tes premiers crédits ?</h2>
          <Link href="/login" style={{ display: 'inline-block', background: '#D4FF57', color: '#07090C', padding: '14px 36px', fontSize: 13, fontWeight: 900, textDecoration: 'none', letterSpacing: '0.08em' }}>
            ✦ CRÉER MON COMPTE GRATUITEMENT
          </Link>
        </section>
      )}
    </div>
  )
}
