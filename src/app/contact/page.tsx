'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle')

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) return
    setStatus('sending')

    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const inputStyle = {
    width: '100%', background: '#0B0E13', border: '1px solid #151C25',
    color: 'white', padding: '14px 16px', fontFamily: 'monospace',
    fontSize: 13, outline: 'none', boxSizing: 'border-box' as const,
    lineHeight: 1.6,
  }

  return (
    <div style={{ minHeight: '100vh', background: '#07090C', color: 'white', fontFamily: 'monospace' }}>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .contact-padding { padding: 40px 16px !important; }
          .nav-links { display: none !important; }
        }
        input:focus, textarea:focus, select:focus { border-color: #D4FF5760 !important; }
        input::placeholder, textarea::placeholder { color: #2D3748; }
      `}</style>

      {/* HEADER */}
      <nav style={{ borderBottom: '1px solid #151C25', padding: '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#07090CF0', backdropFilter: 'blur(16px)', zIndex: 100 }}>
        <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: 10, textDecoration: 'none' }}>
          <div style={{ width: 28, height: 28, background: '#D4FF57', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 900, color: '#07090C' }}>PA</div>
          <span style={{ fontWeight: 900, fontSize: 15, color: 'white', letterSpacing: '-0.02em' }}>Prompt Architect</span>
        </Link>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
            <Link href="/library" style={{ color: '#4A5568', fontSize: 12, textDecoration: 'none', letterSpacing: '0.06em' }}>BIBLIOTHÈQUE</Link>
            <Link href="/pricing" style={{ color: '#4A5568', fontSize: 12, textDecoration: 'none', letterSpacing: '0.06em' }}>PRICING</Link>
            <Link href="/blog" style={{ color: '#4A5568', fontSize: 12, textDecoration: 'none', letterSpacing: '0.06em' }}>BLOG</Link>
          </div>
          <Link href="/generate" style={{ background: '#D4FF57', color: '#07090C', padding: '9px 18px', fontSize: 11, fontWeight: 900, textDecoration: 'none', letterSpacing: '0.08em' }}>
            ✦ COMMENCER
          </Link>
        </div>
      </nav>

      <div className="contact-padding" style={{ maxWidth: 960, margin: '0 auto', padding: '64px 24px' }}>

        {/* TITRE */}
        <div style={{ marginBottom: 56 }}>
          <div style={{ fontSize: 10, color: '#D4FF57', letterSpacing: '0.14em', marginBottom: 14 }}>// CONTACT</div>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 16 }}>
            Une question ?<br />
            <span style={{ color: '#D4FF57' }}>On te répond.</span>
          </h1>
          <p style={{ color: '#4A5568', fontSize: 14, lineHeight: 1.7, maxWidth: 400 }}>
            Support, partenariats, suggestions ou bugs — écris-nous et on reviendra vers toi sous 24h.
          </p>
        </div>

        <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 48, alignItems: 'start' }}>

          {/* INFOS GAUCHE */}
          <div>
            {[
              { icon: '◈', title: 'Support', desc: 'Problème avec ton compte ou une génération ? On règle ça rapidement.' },
              { icon: '⟁', title: 'Feedback', desc: 'Une idée de module, un bug ou une amélioration à suggérer ?' },
              { icon: '◑', title: 'Partenariats', desc: 'Collaboration, affiliation ou intégration — parlons-en.' },
            ].map((item, i) => (
              <div key={i} style={{ padding: '20px 0', borderBottom: '1px solid #0F1520' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                  <span style={{ color: '#D4FF57', fontSize: 14 }}>{item.icon}</span>
                  <span style={{ fontWeight: 700, fontSize: 13, color: 'white' }}>{item.title}</span>
                </div>
                <p style={{ fontSize: 12, color: '#4A5568', lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            ))}

            <div style={{ marginTop: 24, padding: '16px', background: '#0B0E13', border: '1px solid #151C25' }}>
              <div style={{ fontSize: 10, color: '#4A5568', letterSpacing: '0.1em', marginBottom: 8 }}>DÉLAI DE RÉPONSE</div>
              <div style={{ fontSize: 13, color: 'white', fontWeight: 700 }}>⚡ Moins de 24h</div>
              <div style={{ fontSize: 11, color: '#4A5568', marginTop: 4 }}>Du lundi au vendredi</div>
            </div>
          </div>

          {/* FORMULAIRE */}
          <div style={{ border: '1px solid #151C25', padding: 32, background: '#0B0E13' }}>

            {status === 'success' ? (
              <div style={{ textAlign: 'center', padding: '48px 24px' }}>
                <div style={{ fontSize: 32, marginBottom: 16 }}>✦</div>
                <div style={{ fontSize: 16, fontWeight: 900, color: '#D4FF57', marginBottom: 8 }}>Message envoyé !</div>
                <div style={{ fontSize: 13, color: '#4A5568', lineHeight: 1.7 }}>
                  On reviendra vers toi sous 24h.<br />En attendant, teste le générateur !
                </div>
                <Link href="/generate" style={{ display: 'inline-block', marginTop: 24, background: '#D4FF57', color: '#07090C', padding: '10px 20px', fontSize: 11, fontWeight: 900, textDecoration: 'none', letterSpacing: '0.06em' }}>
                  ✦ GÉNÉRATEUR →
                </Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div>
                    <div style={{ fontSize: 10, color: '#4A5568', letterSpacing: '0.1em', marginBottom: 8 }}>NOM *</div>
                    <input
                      type="text"
                      placeholder="Ton nom"
                      value={formData.name}
                      onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                      style={inputStyle}
                    />
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: '#4A5568', letterSpacing: '0.1em', marginBottom: 8 }}>EMAIL *</div>
                    <input
                      type="email"
                      placeholder="ton@email.com"
                      value={formData.email}
                      onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: 10, color: '#4A5568', letterSpacing: '0.1em', marginBottom: 8 }}>SUJET</div>
                  <select
                    value={formData.subject}
                    onChange={e => setFormData(p => ({ ...p, subject: e.target.value }))}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                  >
                    <option value="" style={{ background: '#0B0E13' }}>Sélectionne un sujet...</option>
                    <option value="support" style={{ background: '#0B0E13' }}>Support technique</option>
                    <option value="feedback" style={{ background: '#0B0E13' }}>Feedback / Suggestion</option>
                    <option value="bug" style={{ background: '#0B0E13' }}>Signaler un bug</option>
                    <option value="partenariat" style={{ background: '#0B0E13' }}>Partenariat</option>
                    <option value="facturation" style={{ background: '#0B0E13' }}>Facturation / Abonnement</option>
                    <option value="autre" style={{ background: '#0B0E13' }}>Autre</option>
                  </select>
                </div>

                <div>
                  <div style={{ fontSize: 10, color: '#4A5568', letterSpacing: '0.1em', marginBottom: 8 }}>MESSAGE *</div>
                  <textarea
                    rows={6}
                    placeholder="Décris ton besoin, question ou problème..."
                    value={formData.message}
                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </div>

                {status === 'error' && (
                  <div style={{ padding: '10px 14px', background: '#FF4D4D10', border: '1px solid #FF4D4D30', fontSize: 12, color: '#FF4D4D' }}>
                    ⚠ Une erreur est survenue. Réessaie ou contacte-nous directement.
                  </div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={!formData.name || !formData.email || !formData.message || status === 'sending'}
                  style={{
                    background: !formData.name || !formData.email || !formData.message || status === 'sending' ? '#151C25' : '#D4FF57',
                    color: !formData.name || !formData.email || !formData.message || status === 'sending' ? '#4A5568' : '#07090C',
                    border: 'none', padding: '14px 24px', fontSize: 12, fontWeight: 900,
                    fontFamily: 'monospace', letterSpacing: '0.06em',
                    cursor: !formData.name || !formData.email || !formData.message || status === 'sending' ? 'not-allowed' : 'pointer',
                    transition: 'all 0.15s', alignSelf: 'flex-start',
                  }}
                >
                  {status === 'sending' ? '⟳ ENVOI EN COURS...' : '✦ ENVOYER LE MESSAGE'}
                </button>

              </div>
            )}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #151C25', padding: '24px 20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 20, height: 20, background: '#D4FF57', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 8, fontWeight: 900, color: '#07090C' }}>PA</div>
          <span style={{ fontWeight: 700, fontSize: 12, color: '#4A5568' }}>Prompt Architect © 2026</span>
        </div>
        <div style={{ display: 'flex', gap: 20, flexWrap: 'wrap' }}>
          <Link href="/generate" style={{ color: '#2D3748', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>GÉNÉRATEUR</Link>
          <Link href="/library" style={{ color: '#2D3748', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>BIBLIOTHÈQUE</Link>
          <Link href="/pricing" style={{ color: '#2D3748', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>PRICING</Link>
          <Link href="/blog" style={{ color: '#2D3748', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>BLOG</Link>
          <Link href="/contact" style={{ color: '#D4FF57', fontSize: 11, textDecoration: 'none', letterSpacing: '0.06em' }}>CONTACT</Link>
        </div>
      </footer>

    </div>
  )
}
