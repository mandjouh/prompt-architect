'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

// Modules gratuits + payants
const MODULES_FREE = [
  { id: "business", icon: "◈", label: "Business", color: '#D4FF57', desc: "Plans, pitch, stratégie, finance", premium: false,
    cases: [
      { id: "business_plan", label: "Business Plan", desc: "Plan complet pour ton projet" },
      { id: "pitch_deck", label: "Pitch Deck", desc: "Présentation investisseurs" },
      { id: "analyse_marche", label: "Analyse de Marché", desc: "TAM/SAM/SOM et concurrents" },
      { id: "modele_financier", label: "Modélisation Financière", desc: "MRR, LTV, CAC et projections" },
      { id: "strategie_gtm", label: "Stratégie GTM", desc: "Go-To-Market complet" },
    ]},
  { id: "contenu", icon: "◉", label: "Contenu Viral", color: '#FF7A3D', desc: "Hooks, scripts, posts, copywriting", premium: false,
    cases: [
      { id: "hook_video", label: "Hook TikTok/Reels", desc: "10 hooks viraux optimisés" },
      { id: "script_youtube", label: "Script YouTube", desc: "Script complet avec structure" },
      { id: "post_linkedin", label: "Post LinkedIn", desc: "Post viral avec engagement" },
      { id: "copywriting", label: "Page de Vente", desc: "Copy persuasif et éthique" },
      { id: "newsletter", label: "Newsletter", desc: "Template + édition complète" },
    ]},
  { id: "pro", icon: "◎", label: "Usage Pro", color: '#38C4FF', desc: "Emails, CV, rapports, lettres", premium: false,
    cases: [
      { id: "email_pro", label: "Email Professionnel", desc: "Prospection, relance, négociation" },
      { id: "cv", label: "CV Optimisé ATS", desc: "CV qui passe les filtres automatiques" },
      { id: "rapport", label: "Rapport Exécutif", desc: "Rapport pour C-level et board" },
      { id: "negociation", label: "Négociation Salariale", desc: "Scripts et stratégies" },
      { id: "presentation", label: "Présentation 10 min", desc: "Structure chronométrée" },
    ]},
]

const MODULES_PREMIUM = [
  { id: "dev", icon: "⟁", label: "Développement", color: "#A47CFF", desc: "Code, SaaS, debug, agents IA", premium: true,
    cases: [
      { id: "app_saas", label: "Brief Technique SaaS", desc: "Architecture et stack recommandée" },
      { id: "generation_code", label: "Génération de Code", desc: "Code propre et production-ready" },
      { id: "debug", label: "Debugging Méthodique", desc: "Diagnostic et résolution de bugs" },
      { id: "agent_ia", label: "Agent IA System Prompt", desc: "System prompt production-ready" },
      { id: "cicd", label: "Pipeline CI/CD", desc: "GitHub Actions complet" },
    ]},
  { id: "ia_auto", icon: "⟳", label: "IA & Automatisation", color: '#00E5FF', desc: "Workflows, agents, n8n, Zapier, prompts système", premium: true,
    cases: [
      { id: "workflow_auto", label: "Workflow Automatisation", desc: "n8n, Zapier, Make — flux complets" },
      { id: "agent_system", label: "Agent IA Avancé", desc: "System prompt production-ready" },
      { id: 'prompt_chaining', label: "Prompt Chaining", desc: "Enchaînement de prompts complexes" },
      { id: "fine_tuning", label: "Fine-tuning Dataset", desc: "Données d'entraînement structurées" },
      { id: "rag_system", label: "Système RAG", desc: "Retrieval Augmented Generation" },
    ]},
  { id: "ecommerce", icon: "◑", label: "E-commerce & Vente", color: '#FF4D8B', desc: "Fiches produits, emails, upsell, conversion", premium: true,
    cases: [
      { id: "fiche_produit", label: "Fiche Produit SEO", desc: "Description optimisée qui convertit" },
      { id: "email_abandon", label: "Email Panier Abandonné", desc: "Séquence de récupération" },
      { id: "upsell_cross", label: "Script Upsell/Cross-sell", desc: "Augmenter le panier moyen" },
      { id: "pub_ads", label: "Publicité Facebook/Google", desc: "Copy d'annonces qui convertissent" },
      { id: "page_vente", label: "Landing Page Vente", desc: "Structure de page haute conversion" },
    ]},
  { id: "juridique", icon: "⚖", label: "Juridique & Contrats", color: '#FFB800', desc: "CGV, NDA, contrats, mentions légales", premium: true,
    cases: [
      { id: "cgv", label: "CGV / CGU", desc: "Conditions générales complètes" },
      { id: "nda", label: "NDA / Accord Confidentialité", desc: "Contrat de non-divulgation" },
      { id: "contrat_prestation", label: "Contrat de Prestation", desc: "Contrat freelance professionnel" },
      { id: "mentions_legales", label: "Mentions Légales", desc: "Conformité RGPD et légale" },
      { id: "politique_confidentialite", label: "Politique de Confidentialité", desc: "Privacy policy complète" },
    ]},
  { id: "video_ia", icon: "▶", label: "Création Vidéo IA", color: '#FF6B35', desc: "Scripts, storyboards, prompts Sora/Runway/Kling", premium: true,
    cases: [
      { id: "prompt_sora", label: "Prompt Sora / Kling", desc: "Générer des vidéos IA cinématiques" },
      { id: "storyboard", label: "Storyboard Complet", desc: "Plan séquence visuel détaillé" },
      { id: "script_video_ia", label: "Script Vidéo IA", desc: "Script optimisé pour génération IA" },
      { id: "prompt_runway", label: "Prompt Runway ML", desc: "Effets et transitions avancés" },
      { id: "voiceover", label: "Script Voix Off", desc: "Narration optimisée pour synthèse vocale" },
    ]},
]

// Packs de crédits — liens Lemon Squeezy
const CREDIT_PACKS = [
  { name: 'Starter', credits: 10, price: 2, variantId: '1597503' },
  { name: 'Standard', credits: 50, price: 8, variantId: '1597512' },
  { name: 'Pro', credits: 120, price: 15, variantId: '1597513' },
  { name: 'Premium', credits: 300, price: 30, variantId: '1597517' },
]

const MODULES = [...MODULES_FREE, ...MODULES_PREMIUM]
const LS_KEY = 'pa_saved_prompts'
const ANON_COUNT_KEY = 'pa_anon_count'
const FREE_LIMIT = 5

export default function GeneratePage() {
  const { user } = useAuth()
  const [userPlan, setUserPlan] = useState<string>('free')
  const [creditsUsed, setCreditsUsed] = useState<number>(0)
  const [creditsBalance, setCreditsBalance] = useState<number>(0)
  const [selectedModule, setSelectedModule] = useState<string | null>(null)
  const [selectedCase, setSelectedCase] = useState<{ id: string; label: string; desc: string } | null>(null)
  const [input, setInput] = useState('')
  const [generating, setGenerating] = useState(false)
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const [justSaved, setJustSaved] = useState(false)
  const [savedCount, setSavedCount] = useState(0)
  const [bannerDismissed, setBannerDismissed] = useState(false)
  const [anonCount, setAnonCount] = useState(0)
  const [showRegisterModal, setShowRegisterModal] = useState(false)
  const [showBuyCreditsModal, setShowBuyCreditsModal] = useState(false)
  const [audience, setAudience] = useState('')
  const [tone, setTone] = useState('')
  const [outputFormat, setOutputFormat] = useState('')

  const currentModule = MODULES.find(m => m.id === selectedModule)

  const showUpgradeBanner = user && userPlan === 'free' && creditsUsed >= 3 && creditsBalance === 0 && !bannerDismissed
  const creditsLeft = Math.max(0, FREE_LIMIT - creditsUsed)

  // Vrai si l'utilisateur peut encore générer
  const hasSubscriptionQuota = userPlan !== 'free' // abonné avec quota mensuel
  const hasCreditBalance = creditsBalance > 0
  const hasFreeQuota = userPlan === 'free' && creditsLeft > 0
  const canGenerate = hasSubscriptionQuota || hasCreditBalance || hasFreeQuota

  useEffect(() => {
    if (!user) {
      try {
        const raw = localStorage.getItem(LS_KEY)
        setSavedCount(raw ? JSON.parse(raw).length : 0)
        const count = parseInt(localStorage.getItem(ANON_COUNT_KEY) || '0')
        setAnonCount(count)
      } catch { setSavedCount(0) }
    } else {
      supabase
        .from('profiles')
        .select('plan, credits_used, credits_balance, credits_status')
        .eq('id', user.id)
        .single()
        .then(({ data }) => {
          if (data) {
            setUserPlan(data.plan)
            setCreditsUsed(data.credits_used ?? 0)
            setCreditsBalance(
              data.credits_status === 'expired' ? 0 : (data.credits_balance ?? 0)
            )
          }
        })
    }
  }, [user])

  const handleGenerate = async () => {
    if (!input.trim()) return

    // Bloquer si aucune source de génération disponible
    if (user && !canGenerate) {
      setShowBuyCreditsModal(true)
      return
    }

    setGenerating(true)
    setResult('')
    setCopied(false)
    setJustSaved(false)

    try {
      // Si l'utilisateur est connecté, sans quota abonnement et sans crédits free
      // → déduire 1 crédit avant de générer
      const useCredit = user && !hasSubscriptionQuota && !hasFreeQuota && hasCreditBalance

      if (useCredit) {
        const { data: deductResult, error: deductError } = await supabase
          .rpc('deduct_credit', { p_user_id: user.id })

        if (deductError || !deductResult?.success) {
          const errMsg = deductResult?.error
          if (errMsg === 'insufficient_credits') {
            setShowBuyCreditsModal(true)
            setGenerating(false)
            return
          }
          setResult('Erreur lors de la vérification de vos crédits.')
          setGenerating(false)
          return
        }

        setCreditsBalance(deductResult.balance_after)
      }

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          module: selectedModule,
          caseType: selectedCase?.label,
          userInput: input + (audience || tone || outputFormat
            ? `\n\n[Paramètres: ${[
                audience && `Public — ${audience}`,
                tone && `Ton — ${tone}`,
                outputFormat && `Format — ${outputFormat}`
              ].filter(Boolean).join(' | ')}]`
            : ''),
          userId: user?.id
        }),
      })

      const data = await response.json()
      const promptResult = data.prompt || 'Erreur lors de la génération.'
      setResult(promptResult)

      if (currentModule && selectedCase && data.prompt) {
        const promptData = {
          module_id: selectedModule!,
          module_label: currentModule.label,
          module_color: currentModule.color,
          module_icon: currentModule.icon,
          case_label: selectedCase.label,
          user_input: input,
          prompt: promptResult,
        }

        if (user) {
          await supabase.from('saved_prompts').insert({ ...promptData, user_id: user.id })
          if (!useCredit) {
            setCreditsUsed(prev => prev + 1)
          }
        } else {
          const existing = JSON.parse(localStorage.getItem(LS_KEY) || '[]')
          const newEntry = { ...promptData, id: Date.now().toString(), savedAt: new Date().toISOString() }
          const updated = [newEntry, ...existing].slice(0, 50)
          localStorage.setItem(LS_KEY, JSON.stringify(updated))
          setSavedCount(updated.length)
          const newCount = anonCount + 1
          localStorage.setItem(ANON_COUNT_KEY, newCount.toString())
          setAnonCount(newCount)
        }

        setJustSaved(true)
        setTimeout(() => setJustSaved(false), 3000)
      }
    } catch {
      setResult('Erreur de connexion. Réessaie.')
    }

    setGenerating(false)
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const reset = () => {
    if (!user && anonCount >= 1) {
      setShowRegisterModal(true)
      return
    }
    setSelectedModule(null)
    setSelectedCase(null)
    setInput('')
    setResult('')
    setCopied(false)
    setJustSaved(false)
    setAudience('')
    setTone('')
    setOutputFormat('')
  }

  const resetAfterModal = () => {
    setShowRegisterModal(false)
    setSelectedModule(null)
    setSelectedCase(null)
    setInput('')
    setResult('')
    setCopied(false)
    setJustSaved(false)
  }

  return (
    <div style={{ minHeight: '100vh', background: '#07090C', color: 'white', fontFamily: 'monospace' }}>

      {/* HEADER */}
      <div style={{ borderBottom: '1px solid #151C25', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, background: '#07090CEE', backdropFilter: 'blur(12px)', zIndex: 100 }}>
        <a href="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <div style={{ width: 26, height: 26, background: '#D4FF57', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 900, color: '#07090C' }}>PA</div>
          <span style={{ fontWeight: 900, fontSize: 15, color: 'white' }}>Prompt Architect</span>
        </a>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: '#94A3B8' }}>
            <span style={{ color: selectedModule ? '#D4FF57' : '#94A3B8' }}>① Module</span>
            <span>→</span>
            <span style={{ color: selectedCase ? '#D4FF57' : '#94A3B8' }}>② Cas d&apos;usage</span>
            <span>→</span>
            <span style={{ color: result ? '#D4FF57' : '#94A3B8' }}>③ Prompt</span>
          </div>
          {user ? (
            <div style={{ display: 'flex', gap: 8 }}>
              {/* Compteur Free */}
              {userPlan === 'free' && creditsBalance === 0 && (
                <div style={{ fontSize: 11, border: creditsLeft <= 1 ? '1px solid #FF4D4D40' : '1px solid #151C25', padding: '6px 12px', color: creditsLeft <= 1 ? '#FF4D4D' : '#94A3B8', background: creditsLeft <= 1 ? '#FF4D4D08' : 'transparent' }}>
                  {creditsLeft}/{FREE_LIMIT} restants
                </div>
              )}
              {/* Solde crédits */}
              {creditsBalance > 0 && (
                <button
                  onClick={() => setShowBuyCreditsModal(true)}
                  style={{ fontSize: 11, border: '1px solid #D4FF5740', padding: '6px 12px', color: '#D4FF57', background: '#D4FF5708', cursor: 'pointer' }}
                >
                  ✦ {creditsBalance} crédit{creditsBalance > 1 ? 's' : ''}
                </button>
              )}
              {/* Recharger si 0 crédits et free */}
              {userPlan === 'free' && creditsBalance === 0 && creditsLeft === 0 && (
                <button
                  onClick={() => setShowBuyCreditsModal(true)}
                  style={{ fontSize: 11, border: '1px solid #FF4D4D40', padding: '6px 12px', color: '#FF4D4D', background: '#FF4D4D08', cursor: 'pointer' }}
                >
                  + Recharger
                </button>
              )}
              <a href="/my-prompts" style={{ fontSize: 11, textDecoration: 'none', border: '1px solid #D4FF5740', padding: '6px 12px', color: '#D4FF57', background: '#D4FF5708' }}>
                ◈ Mes prompts
              </a>
              <a href="/profile" style={{ fontSize: 11, textDecoration: 'none', border: '1px solid #151C25', padding: '6px 12px', color: '#FFFFFF' }}>
                ◎ Profil
              </a>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: 8 }}>
              <a href="/login" style={{ fontSize: 11, color: '#FFFFFF', textDecoration: 'none', border: '1px solid #151C25', padding: '6px 12px' }}>
                Connexion
              </a>
              <a href="/my-prompts" style={{ fontSize: 11, textDecoration: 'none', border: '1px solid #151C25', padding: '6px 12px', color: '#FFFFFF', display: 'flex', alignItems: 'center', gap: 6 }}>
                ◈ Mes prompts {savedCount > 0 && <span style={{ background: '#D4FF57', color: '#07090C', fontSize: 9, fontWeight: 900, padding: '1px 5px' }}>{savedCount}</span>}
              </a>
            </div>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px', paddingBottom: showUpgradeBanner ? '120px' : '40px' }}>

        {/* ÉTAPE 1 */}
        {!selectedModule && (
          <div>
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 11, color: '#94A3B8', letterSpacing: '0.1em', marginBottom: 8 }}>ÉTAPE 1 / 3</div>
              <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 8 }}>Choisis ton module</h1>
              <p style={{ color: '#94A3B8', fontSize: 14 }}>Sélectionne la catégorie qui correspond à ton besoin</p>
            </div>
            {/* Modules gratuits */}
            <div style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 9, color: '#94A3B8', letterSpacing: '0.12em', marginBottom: 12 }}>MODULES INCLUS</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                {MODULES_FREE.map(m => (
                  <button key={m.id} onClick={() => setSelectedModule(m.id)}
                    style={{ border: '1px solid #151C25', background: '#0B0E13', padding: 24, textAlign: 'left', cursor: 'pointer', color: 'white', transition: 'all 0.15s' }}
                    onMouseEnter={e => (e.currentTarget.style.borderColor = m.color + '50')}
                    onMouseLeave={e => (e.currentTarget.style.borderColor = '#151C25')}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                      <span style={{ fontSize: 22, color: m.color }}>{m.icon}</span>
                      <span style={{ fontWeight: 900, fontSize: 16 }}>{m.label}</span>
                    </div>
                    <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 16, lineHeight: 1.5 }}>{m.desc}</p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                      {m.cases.slice(0, 3).map(c => (
                        <span key={c.id} style={{ fontSize: 10, padding: '2px 8px', border: '1px solid #151C25', color: '#94A3B8' }}>{c.label}</span>
                      ))}
                      <span style={{ fontSize: 10, padding: '2px 8px', color: '#94A3B8' }}>+{m.cases.length - 3}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Modules premium */}
            <div>
              <div style={{ fontSize: 9, color: '#D4FF57', letterSpacing: '0.12em', marginBottom: 12 }}>MODULES EXCLUSIFS — PLANS PAYANTS 🔒</div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                {MODULES_PREMIUM.map(m => {
                  const isLocked = !user || userPlan === 'free'
                  return (
                    <button key={m.id}
                      onClick={() => isLocked ? window.location.href = '/pricing' : setSelectedModule(m.id)}
                      style={{ border: `1px solid ${isLocked ? '#1A2535' : m.color + '40'}`, background: isLocked ? '#080B0F' : '#0B0E13', padding: 24, textAlign: 'left', cursor: 'pointer', color: 'white', transition: 'all 0.15s', position: 'relative', overflow: 'hidden', opacity: isLocked ? 0.7 : 1 }}
                    >
                      {isLocked && (
                        <div style={{ position: 'absolute', top: 10, right: 10, background: '#D4FF57', color: '#07090C', fontSize: 8, fontWeight: 900, padding: '2px 8px', letterSpacing: '0.08em' }}>
                          UPGRADE
                        </div>
                      )}
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                        <span style={{ fontSize: 22, color: isLocked ? '#94A3B8' : m.color }}>{m.icon}</span>
                        <span style={{ fontWeight: 900, fontSize: 16, color: isLocked ? '#94A3B8' : 'white' }}>{m.label}</span>
                        {isLocked && <span style={{ fontSize: 14 }}>🔒</span>}
                      </div>
                      <p style={{ fontSize: 13, color: '#94A3B8', marginBottom: 16, lineHeight: 1.5 }}>{m.desc}</p>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {m.cases.slice(0, 3).map(c => (
                          <span key={c.id} style={{ fontSize: 10, padding: '2px 8px', border: '1px solid #0F1520', color: '#1A2535' }}>{c.label}</span>
                        ))}
                        <span style={{ fontSize: 10, padding: '2px 8px', color: '#1A2535' }}>+{m.cases.length - 3}</span>
                      </div>
                      {isLocked && (
                        <div style={{ marginTop: 12, fontSize: 11, color: '#D4FF57', fontWeight: 700 }}>
                          ✦ Disponible dès 5$/mois →
                        </div>
                      )}
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        {/* ÉTAPE 2 */}
        {selectedModule && !selectedCase && (
          <div>
            <button onClick={() => setSelectedModule(null)} style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: 13, marginBottom: 24, padding: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
              ← Retour aux modules
            </button>
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 11, color: '#94A3B8', letterSpacing: '0.1em', marginBottom: 8 }}>ÉTAPE 2 / 3</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 20, color: currentModule?.color }}>{currentModule?.icon}</span>
                <h1 style={{ fontSize: 28, fontWeight: 900 }}>{currentModule?.label}</h1>
              </div>
              <p style={{ color: '#94A3B8', fontSize: 14 }}>Sélectionne ton cas d&apos;usage</p>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {currentModule?.cases.map(c => (
                <button key={c.id} onClick={() => setSelectedCase(c)}
                  style={{ border: '1px solid #151C25', background: '#0B0E13', padding: '16px 20px', textAlign: 'left', cursor: 'pointer', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = currentModule.color + '50')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = '#151C25')}
                >
                  <div>
                    <div style={{ fontWeight: 700, marginBottom: 4 }}>{c.label}</div>
                    <div style={{ fontSize: 12, color: '#94A3B8' }}>{c.desc}</div>
                  </div>
                  <span style={{ color: '#94A3B8', fontSize: 16 }}>→</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ÉTAPE 3 */}
        {selectedModule && selectedCase && !result && (
          <div>
            <button onClick={() => setSelectedCase(null)} style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: 13, marginBottom: 24, padding: 0 }}>
              ← Retour
            </button>
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 11, color: '#94A3B8', letterSpacing: '0.1em', marginBottom: 8 }}>ÉTAPE 3 / 3</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', border: '1px solid', borderColor: currentModule?.color + '30', background: currentModule?.color + '10', marginBottom: 12 }}>
                <span style={{ fontSize: 10, color: currentModule?.color }}>{currentModule?.label} · {selectedCase.label}</span>
              </div>
              <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 8 }}>Décris ton besoin</h1>
              <p style={{ color: '#94A3B8', fontSize: 14 }}>Plus tu es précis, meilleur sera ton prompt.</p>
            </div>

            {/* TONE OF VOICE */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 16 }}>
              {[
                { label: 'PUBLIC CIBLE', value: audience, setter: setAudience, options: ['Grand public', 'Professionnels', 'Cadres', 'Entrepreneurs', 'Étudiants'] },
                { label: 'TON', value: tone, setter: setTone, options: ['Professionnel', 'Direct', 'Humour', 'Académique', 'Inspirant'] },
                { label: 'FORMAT', value: outputFormat, setter: setOutputFormat, options: ['Texte structuré', 'Liste à puces', 'Tableau', 'Code', 'Paragraphes'] },
              ].map((field, i) => (
                <div key={i}>
                  <div style={{ fontSize: 9, color: '#94A3B8', letterSpacing: '0.12em', marginBottom: 6 }}>{field.label}</div>
                  <select
                    value={field.value}
                    onChange={e => field.setter(e.target.value)}
                    style={{ width: '100%', background: '#0B0E13', border: '1px solid #151C25', color: field.value ? 'white' : '#94A3B8', padding: '9px 10px', fontFamily: 'monospace', fontSize: 11, outline: 'none', cursor: 'pointer', appearance: 'none' as const }}
                  >
                    <option value=''>Optionnel...</option>
                    {field.options.map(opt => (
                      <option key={opt} value={opt} style={{ background: '#0B0E13' }}>{opt}</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            <textarea rows={6}
              placeholder={`Décris précisément ce que tu veux pour ton ${selectedCase.label}...`}
              value={input} onChange={e => setInput(e.target.value)}
              style={{ width: '100%', background: '#0B0E13', border: '1px solid #151C25', color: 'white', padding: '16px', fontFamily: 'monospace', fontSize: 13, outline: 'none', resize: 'vertical', lineHeight: 1.7, boxSizing: 'border-box', marginBottom: 16 }}
            />

            {/* Indicateur de source de génération */}
            {user && (
              <div style={{ fontSize: 11, color: '#94A3B8', marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                {hasSubscriptionQuota && <><span style={{ color: '#D4FF57' }}>✦</span> Quota abonnement</>}
                {!hasSubscriptionQuota && hasCreditBalance && <><span style={{ color: '#D4FF57' }}>✦</span> {creditsBalance} crédit{creditsBalance > 1 ? 's' : ''} disponible{creditsBalance > 1 ? 's' : ''} — 1 sera utilisé</>}
                {!hasSubscriptionQuota && !hasCreditBalance && hasFreeQuota && <><span style={{ color: '#94A3B8' }}>◎</span> {creditsLeft} génération{creditsLeft > 1 ? 's' : ''} gratuite{creditsLeft > 1 ? 's' : ''} restante{creditsLeft > 1 ? 's' : ''}</>}
                {!canGenerate && <><span style={{ color: '#FF4D4D' }}>⚠</span> <span style={{ color: '#FF4D4D' }}>Aucun crédit disponible</span></>}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: '#94A3B8' }}>{input.length} caractères</span>
              <button
                onClick={handleGenerate}
                disabled={!input.trim() || generating}
                style={{ background: !input.trim() || generating ? '#151C25' : currentModule?.color, color: !input.trim() || generating ? '#94A3B8' : '#07090C', border: 'none', padding: '12px 28px', fontSize: 12, fontWeight: 900, fontFamily: 'monospace', cursor: !input.trim() || generating ? 'not-allowed' : 'pointer', letterSpacing: '0.06em' }}
              >
                {generating ? '⟳ GÉNÉRATION EN COURS...' : '✦ GÉNÉRER LE PROMPT'}
              </button>
            </div>
          </div>
        )}

        {/* RÉSULTAT */}
        {result && (
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
              <div>
                <div style={{ fontSize: 11, color: '#D4FF57', letterSpacing: '0.1em', marginBottom: 6 }}>PROMPT GÉNÉRÉ</div>
                <h1 style={{ fontSize: 24, fontWeight: 900 }}>Ton prompt expert ✦</h1>
              </div>
              <button onClick={reset} style={{ background: 'transparent', border: '1px solid #151C25', color: '#94A3B8', padding: '8px 16px', fontSize: 12, cursor: 'pointer', fontFamily: 'monospace' }}>
                ← Nouveau prompt
              </button>
            </div>

            {justSaved && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', background: '#D4FF5710', border: '1px solid #D4FF5730', marginBottom: 16, fontSize: 12 }}>
                <span style={{ color: '#D4FF57' }}>✓</span>
                <span style={{ color: '#D4FF57' }}>
                  {user ? 'Sauvegardé dans ton compte cloud' : 'Sauvegardé localement sur ton appareil'}
                </span>
                <a href={user ? '/my-prompts' : '/login'} style={{ color: '#D4FF57', marginLeft: 'auto', fontSize: 11, textDecoration: 'underline' }}>
                  {user ? 'Voir mes prompts →' : 'Créer un compte pour sync cloud →'}
                </a>
              </div>
            )}

            <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
              <span style={{ fontSize: 10, padding: '4px 10px', border: '1px solid', color: currentModule?.color, borderColor: currentModule?.color + '30', background: currentModule?.color + '10' }}>{currentModule?.label}</span>
              <span style={{ fontSize: 10, padding: '4px 10px', border: '1px solid #151C25', color: '#94A3B8' }}>{selectedCase?.label}</span>
              <span style={{ fontSize: 10, padding: '4px 10px', border: '1px solid #151C25', color: '#94A3B8' }}>{result.length} caractères</span>
            </div>

            <div style={{ background: '#0B0E13', border: '1px solid #151C25', padding: 24, fontSize: 12, lineHeight: 1.8, color: '#8A9AAA', whiteSpace: 'pre-wrap', maxHeight: '50vh', overflowY: 'auto', marginBottom: 16 }}>
              {result}
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button onClick={handleCopy} style={{ background: copied ? '#1A3A1A' : '#D4FF57', color: copied ? '#5EDD5E' : '#07090C', border: copied ? '1px solid #2A5A2A' : 'none', padding: '12px 24px', fontSize: 12, fontWeight: 900, fontFamily: 'monospace', cursor: 'pointer', letterSpacing: '0.06em', transition: 'all 0.2s' }}>
                {copied ? '✓ COPIÉ !' : '⎘ COPIER LE PROMPT'}
              </button>
              <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" style={{ border: '1px solid #151C25', color: '#94A3B8', padding: '12px 24px', fontSize: 12, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                Tester dans Claude
              </a>
              <a href="/my-prompts" style={{ border: '1px solid #151C25', color: '#94A3B8', padding: '12px 24px', fontSize: 12, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                ◈ Mes prompts
              </a>
            </div>

            <div style={{ marginTop: 20, padding: '12px 16px', background: '#D4FF5710', border: '1px solid #D4FF5730', fontSize: 12, color: '#94A3B8', lineHeight: 1.6 }}>
              <span style={{ color: '#D4FF57', fontWeight: 700 }}>Tip : </span>
              Colle ce prompt dans Claude ou ChatGPT. Remplace les éléments entre crochets [comme ceci] par tes informations.
            </div>
          </div>
        )}

      </div>

      {/* BANNIÈRE UPGRADE */}
      {showUpgradeBanner && (
        <div style={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 200, background: '#0D1118', borderTop: '1px solid #D4FF5730', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, backdropFilter: 'blur(12px)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            <div style={{ width: 6, height: 6, background: creditsLeft === 0 ? '#FF4D4D' : '#D4FF57', borderRadius: '50%', flexShrink: 0 }} />
            <div>
              <span style={{ fontSize: 12, fontWeight: 900, color: 'white' }}>
                {creditsLeft === 0 ? '⚠ Limite atteinte — ' : `⚡ ${creditsLeft} génération${creditsLeft > 1 ? 's' : ''} restante${creditsLeft > 1 ? 's' : ''} — `}
              </span>
              <span style={{ fontSize: 12, color: '#94A3B8' }}>
                {creditsLeft === 0 ? 'Recharge ou upgrade pour continuer.' : 'Upgrade pour en avoir plus.'}
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
            <button onClick={() => setShowBuyCreditsModal(true)} style={{ background: '#D4FF57', color: '#07090C', padding: '8px 18px', fontSize: 11, fontWeight: 900, border: 'none', cursor: 'pointer', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>
              ✦ RECHARGER LES CRÉDITS
            </button>
            <a href="/pricing" style={{ color: '#94A3B8', padding: '8px 12px', fontSize: 11, textDecoration: 'none', border: '1px solid #151C25', whiteSpace: 'nowrap' }}>
              Voir les plans
            </a>
            <button onClick={() => setBannerDismissed(true)} style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: 16, padding: '4px 8px', lineHeight: 1 }}>
              ×
            </button>
          </div>
        </div>
      )}

      {/* MODAL INSCRIPTION */}
      {showRegisterModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ position: 'absolute', inset: 0, background: '#07090CEE', backdropFilter: 'blur(8px)' }} onClick={() => setShowRegisterModal(false)} />
          <div style={{ position: 'relative', background: '#0B0E13', border: '1px solid #D4FF5730', maxWidth: 440, width: '100%', padding: '40px 36px', textAlign: 'center' }}>
            <div style={{ width: 40, height: 40, background: '#D4FF57', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, fontWeight: 900, color: '#07090C', margin: '0 auto 24px' }}>PA</div>
            <div style={{ fontSize: 10, color: '#D4FF57', letterSpacing: '0.14em', marginBottom: 12 }}>✦ TON PROMPT EST PRÊT</div>
            <h2 style={{ fontSize: 22, fontWeight: 900, lineHeight: 1.2, marginBottom: 12, letterSpacing: '-0.02em' }}>
              Continue à générer<br />des prompts experts
            </h2>
            <p style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.7, marginBottom: 32 }}>
              Crée un compte gratuit pour continuer.<br />Aucune carte bancaire requise.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <a href="/login?signup=true" style={{ background: '#D4FF57', color: '#07090C', padding: '13px 24px', fontSize: 12, fontWeight: 900, textDecoration: 'none', letterSpacing: '0.08em', display: 'block' }}>
                ✦ CRÉER MON COMPTE GRATUIT
              </a>
              <a href="/login" style={{ border: '1px solid #151C25', color: '#94A3B8', padding: '13px 24px', fontSize: 12, fontWeight: 700, textDecoration: 'none', letterSpacing: '0.06em', display: 'block' }}>
                Me connecter
              </a>
              <button onClick={resetAfterModal} style={{ background: 'transparent', border: 'none', color: '#94A3B8', fontSize: 12, cursor: 'pointer', padding: '8px', fontFamily: 'monospace', marginTop: 4 }}>
                Continuer sans compte →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL ACHAT CRÉDITS */}
      {showBuyCreditsModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }}>
          <div style={{ position: 'absolute', inset: 0, background: '#07090CEE', backdropFilter: 'blur(8px)' }} onClick={() => setShowBuyCreditsModal(false)} />
          <div style={{ position: 'relative', background: '#0B0E13', border: '1px solid #D4FF5730', maxWidth: 480, width: '100%', padding: '40px 36px' }}>
            <button onClick={() => setShowBuyCreditsModal(false)} style={{ position: 'absolute', top: 16, right: 16, background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer', fontSize: 18, lineHeight: 1 }}>×</button>

            <div style={{ fontSize: 10, color: '#D4FF57', letterSpacing: '0.14em', marginBottom: 12 }}>✦ RECHARGER LES CRÉDITS</div>
            <h2 style={{ fontSize: 20, fontWeight: 900, marginBottom: 8 }}>Choisis ton pack</h2>
            <p style={{ fontSize: 13, color: '#94A3B8', lineHeight: 1.6, marginBottom: 8 }}>
              Valables <strong style={{ color: 'white' }}>60 à 365 jours</strong> après ta dernière génération.<br />
              Paiement par carte, Wave, MTN Money ou Orange Money.
            </p>
            {creditsBalance > 0 && (
              <div style={{ fontSize: 12, color: '#D4FF57', marginBottom: 24, padding: '8px 12px', border: '1px solid #D4FF5730', background: '#D4FF5708' }}>
                Solde actuel : {creditsBalance} crédit{creditsBalance > 1 ? 's' : ''}
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 24 }}>
              {CREDIT_PACKS.map((pack, i) => {
                const costPerCredit = (pack.price / pack.credits).toFixed(2)
                const isPopular = i === 1
                return (
                  <a
                    key={pack.variantId}
                    href={`https://prompt-architect.lemonsqueezy.com/checkout/buy/${pack.variantId}?checkout[custom][user_id]=${user?.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', border: isPopular ? '1px solid #D4FF5760' : '1px solid #151C25', background: isPopular ? '#D4FF5708' : '#080B0F', padding: '14px 18px', textDecoration: 'none', color: 'white', cursor: 'pointer', position: 'relative' }}
                  >
                    {isPopular && (
                      <div style={{ position: 'absolute', top: -1, right: 12, background: '#D4FF57', color: '#07090C', fontSize: 8, fontWeight: 900, padding: '2px 8px', letterSpacing: '0.08em' }}>
                        POPULAIRE
                      </div>
                    )}
                    <div>
                      <div style={{ fontWeight: 900, fontSize: 14, marginBottom: 2 }}>{pack.name} — {pack.credits} crédits</div>
                      <div style={{ fontSize: 11, color: '#94A3B8' }}>${costPerCredit} / crédit</div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontWeight: 900, fontSize: 16, color: '#D4FF57' }}>${pack.price}</div>
                      <div style={{ fontSize: 10, color: '#94A3B8' }}>one-time</div>
                    </div>
                  </a>
                )
              })}
            </div>

            <div style={{ borderTop: '1px solid #151C25', paddingTop: 16, fontSize: 12, color: '#94A3B8', lineHeight: 1.6 }}>
              Tu préfères un abonnement mensuel ?{' '}
              <a href="/pricing" style={{ color: '#D4FF57', textDecoration: 'underline' }}>
                Voir les plans →
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
