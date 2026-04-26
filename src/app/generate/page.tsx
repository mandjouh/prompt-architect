'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

const MODULES = [
  { id: 'business', icon: '◈', label: 'Business', color: '#D4FF57', desc: 'Plans, pitch, stratégie, finance',
    cases: [
      { id: 'business_plan', label: 'Business Plan', desc: 'Plan complet pour ton projet' },
      { id: 'pitch_deck', label: 'Pitch Deck', desc: 'Présentation investisseurs' },
      { id: 'analyse_marche', label: 'Analyse de Marché', desc: 'TAM/SAM/SOM et concurrents' },
      { id: 'modele_financier', label: 'Modélisation Financière', desc: 'MRR, LTV, CAC et projections' },
      { id: 'strategie_gtm', label: 'Stratégie GTM', desc: 'Go-To-Market complet' },
    ]},
  { id: 'contenu', icon: '◉', label: 'Contenu Viral', color: '#FF7A3D', desc: 'Hooks, scripts, posts, copywriting',
    cases: [
      { id: 'hook_video', label: 'Hook TikTok/Reels', desc: '10 hooks viraux optimisés' },
      { id: 'script_youtube', label: 'Script YouTube', desc: 'Script complet avec structure' },
      { id: 'post_linkedin', label: 'Post LinkedIn', desc: 'Post viral avec engagement' },
      { id: 'copywriting', label: 'Page de Vente', desc: 'Copy persuasif et éthique' },
      { id: 'newsletter', label: 'Newsletter', desc: 'Template + édition complète' },
    ]},
  { id: 'pro', icon: '◎', label: 'Usage Pro', color: '#38C4FF', desc: 'Emails, CV, rapports, lettres',
    cases: [
      { id: 'email_pro', label: 'Email Professionnel', desc: 'Prospection, relance, négociation' },
      { id: 'cv', label: 'CV Optimisé ATS', desc: 'CV qui passe les filtres automatiques' },
      { id: 'rapport', label: 'Rapport Exécutif', desc: 'Rapport pour C-level et board' },
      { id: 'negociation', label: 'Négociation Salariale', desc: 'Scripts et stratégies' },
      { id: 'presentation', label: 'Présentation 10 min', desc: 'Structure chronométrée' },
    ]},
  { id: 'dev', icon: '⟁', label: 'Développement', color: '#A47CFF', desc: 'Code, SaaS, debug, agents IA',
    cases: [
      { id: 'app_saas', label: 'Brief Technique SaaS', desc: 'Architecture et stack recommandée' },
      { id: 'generation_code', label: 'Génération de Code', desc: 'Code propre et production-ready' },
      { id: 'debug', label: 'Debugging Méthodique', desc: 'Diagnostic et résolution de bugs' },
      { id: 'agent_ia', label: 'Agent IA System Prompt', desc: 'System prompt production-ready' },
      { id: 'cicd', label: 'Pipeline CI/CD', desc: 'GitHub Actions complet' },
    ]},
]

const LS_KEY = 'pa_saved_prompts'

export default function GeneratePage() {
  const { user } = useAuth()
  const [selectedModule, setSelectedModule] = useState<string | null>(null)
  const [selectedCase, setSelectedCase] = useState<{ id: string; label: string; desc: string } | null>(null)
  const [input, setInput] = useState('')
  const [generating, setGenerating] = useState(false)
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)
  const [justSaved, setJustSaved] = useState(false)
  const [savedCount, setSavedCount] = useState(0)

  const currentModule = MODULES.find(m => m.id === selectedModule)

  useEffect(() => {
    if (!user) {
      try {
        const raw = localStorage.getItem(LS_KEY)
        setSavedCount(raw ? JSON.parse(raw).length : 0)
      } catch { setSavedCount(0) }
    }
  }, [user])

  const handleGenerate = async () => {
    if (!input.trim()) return
    setGenerating(true)
    setResult('')
    setCopied(false)
    setJustSaved(false)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ module: selectedModule, caseType: selectedCase?.label, userInput: input }),
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
          // Connecté → Supabase
          await supabase.from('saved_prompts').insert({ ...promptData, user_id: user.id })
        } else {
          // Non connecté → localStorage
          const existing = JSON.parse(localStorage.getItem(LS_KEY) || '[]')
          const newEntry = { ...promptData, id: Date.now().toString(), savedAt: new Date().toISOString() }
          const updated = [newEntry, ...existing].slice(0, 50)
          localStorage.setItem(LS_KEY, JSON.stringify(updated))
          setSavedCount(updated.length)
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 11, color: '#4A5568' }}>
            <span style={{ color: selectedModule ? '#D4FF57' : '#4A5568' }}>① Module</span>
            <span>→</span>
            <span style={{ color: selectedCase ? '#D4FF57' : '#4A5568' }}>② Cas d&apos;usage</span>
            <span>→</span>
            <span style={{ color: result ? '#D4FF57' : '#4A5568' }}>③ Prompt</span>
          </div>
          {user ? (
            <a href="/my-prompts" style={{ fontSize: 11, textDecoration: 'none', border: '1px solid #D4FF5740', padding: '6px 12px', color: '#D4FF57', background: '#D4FF5708' }}>
              ◈ Mes prompts
            </a>
          ) : (
            <div style={{ display: 'flex', gap: 8 }}>
              <a href="/login" style={{ fontSize: 11, color: '#4A5568', textDecoration: 'none', border: '1px solid #151C25', padding: '6px 12px' }}>
                Connexion
              </a>
              <a href="/my-prompts" style={{ fontSize: 11, textDecoration: 'none', border: '1px solid #151C25', padding: '6px 12px', color: '#4A5568', display: 'flex', alignItems: 'center', gap: 6 }}>
                ◈ Mes prompts {savedCount > 0 && <span style={{ background: '#D4FF57', color: '#07090C', fontSize: 9, fontWeight: 900, padding: '1px 5px' }}>{savedCount}</span>}
              </a>
            </div>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '40px 24px' }}>

        {/* ÉTAPE 1 */}
        {!selectedModule && (
          <div>
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 11, color: '#4A5568', letterSpacing: '0.1em', marginBottom: 8 }}>ÉTAPE 1 / 3</div>
              <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 8 }}>Choisis ton module</h1>
              <p style={{ color: '#4A5568', fontSize: 14 }}>Sélectionne la catégorie qui correspond à ton besoin</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
              {MODULES.map(m => (
                <button key={m.id} onClick={() => setSelectedModule(m.id)}
                  style={{ border: '1px solid #151C25', background: '#0B0E13', padding: 24, textAlign: 'left', cursor: 'pointer', color: 'white', transition: 'all 0.15s' }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = m.color + '50')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = '#151C25')}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                    <span style={{ fontSize: 22, color: m.color }}>{m.icon}</span>
                    <span style={{ fontWeight: 900, fontSize: 16 }}>{m.label}</span>
                  </div>
                  <p style={{ fontSize: 13, color: '#4A5568', marginBottom: 16, lineHeight: 1.5 }}>{m.desc}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {m.cases.slice(0, 3).map(c => (
                      <span key={c.id} style={{ fontSize: 10, padding: '2px 8px', border: '1px solid #151C25', color: '#2D3748' }}>{c.label}</span>
                    ))}
                    <span style={{ fontSize: 10, padding: '2px 8px', color: '#2D3748' }}>+{m.cases.length - 3}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ÉTAPE 2 */}
        {selectedModule && !selectedCase && (
          <div>
            <button onClick={() => setSelectedModule(null)} style={{ background: 'transparent', border: 'none', color: '#4A5568', cursor: 'pointer', fontSize: 13, marginBottom: 24, padding: 0, display: 'flex', alignItems: 'center', gap: 6 }}>
              ← Retour aux modules
            </button>
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 11, color: '#4A5568', letterSpacing: '0.1em', marginBottom: 8 }}>ÉTAPE 2 / 3</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                <span style={{ fontSize: 20, color: currentModule?.color }}>{currentModule?.icon}</span>
                <h1 style={{ fontSize: 28, fontWeight: 900 }}>{currentModule?.label}</h1>
              </div>
              <p style={{ color: '#4A5568', fontSize: 14 }}>Sélectionne ton cas d&apos;usage</p>
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
                    <div style={{ fontSize: 12, color: '#4A5568' }}>{c.desc}</div>
                  </div>
                  <span style={{ color: '#4A5568', fontSize: 16 }}>→</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ÉTAPE 3 */}
        {selectedModule && selectedCase && !result && (
          <div>
            <button onClick={() => setSelectedCase(null)} style={{ background: 'transparent', border: 'none', color: '#4A5568', cursor: 'pointer', fontSize: 13, marginBottom: 24, padding: 0 }}>
              ← Retour
            </button>
            <div style={{ marginBottom: 32 }}>
              <div style={{ fontSize: 11, color: '#4A5568', letterSpacing: '0.1em', marginBottom: 8 }}>ÉTAPE 3 / 3</div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '4px 10px', border: '1px solid', borderColor: currentModule?.color + '30', background: currentModule?.color + '10', marginBottom: 12 }}>
                <span style={{ fontSize: 10, color: currentModule?.color }}>{currentModule?.label} · {selectedCase.label}</span>
              </div>
              <h1 style={{ fontSize: 24, fontWeight: 900, marginBottom: 8 }}>Décris ton besoin</h1>
              <p style={{ color: '#4A5568', fontSize: 14 }}>Plus tu es précis, meilleur sera ton prompt.</p>
            </div>
            <textarea rows={6}
              placeholder={`Décris précisément ce que tu veux pour ton ${selectedCase.label}...`}
              value={input} onChange={e => setInput(e.target.value)}
              style={{ width: '100%', background: '#0B0E13', border: '1px solid #151C25', color: 'white', padding: '16px', fontFamily: 'monospace', fontSize: 13, outline: 'none', resize: 'vertical', lineHeight: 1.7, boxSizing: 'border-box', marginBottom: 16 }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 12, color: '#2D3748' }}>{input.length} caractères</span>
              <button onClick={handleGenerate} disabled={!input.trim() || generating}
                style={{ background: !input.trim() || generating ? '#151C25' : currentModule?.color, color: !input.trim() || generating ? '#4A5568' : '#07090C', border: 'none', padding: '12px 28px', fontSize: 12, fontWeight: 900, fontFamily: 'monospace', cursor: !input.trim() || generating ? 'not-allowed' : 'pointer', letterSpacing: '0.06em' }}
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
              <button onClick={reset} style={{ background: 'transparent', border: '1px solid #151C25', color: '#4A5568', padding: '8px 16px', fontSize: 12, cursor: 'pointer', fontFamily: 'monospace' }}>
                ← Nouveau prompt
              </button>
            </div>

            {/* Badge sauvegarde */}
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
              <span style={{ fontSize: 10, padding: '4px 10px', border: '1px solid #151C25', color: '#4A5568' }}>{selectedCase?.label}</span>
              <span style={{ fontSize: 10, padding: '4px 10px', border: '1px solid #151C25', color: '#4A5568' }}>{result.length} caractères</span>
            </div>

            <div style={{ background: '#0B0E13', border: '1px solid #151C25', padding: 24, fontSize: 12, lineHeight: 1.8, color: '#8A9AAA', whiteSpace: 'pre-wrap', maxHeight: '50vh', overflowY: 'auto', marginBottom: 16 }}>
              {result}
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <button onClick={handleCopy} style={{ background: copied ? '#1A3A1A' : '#D4FF57', color: copied ? '#5EDD5E' : '#07090C', border: copied ? '1px solid #2A5A2A' : 'none', padding: '12px 24px', fontSize: 12, fontWeight: 900, fontFamily: 'monospace', cursor: 'pointer', letterSpacing: '0.06em', transition: 'all 0.2s' }}>
                {copied ? '✓ COPIÉ !' : '⎘ COPIER LE PROMPT'}
              </button>
              <a href="https://claude.ai" target="_blank" rel="noopener noreferrer" style={{ border: '1px solid #151C25', color: '#4A5568', padding: '12px 24px', fontSize: 12, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                Tester dans Claude
              </a>
              <a href="/my-prompts" style={{ border: '1px solid #151C25', color: '#4A5568', padding: '12px 24px', fontSize: 12, textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 6 }}>
                ◈ Mes prompts
              </a>
            </div>

            <div style={{ marginTop: 20, padding: '12px 16px', background: '#D4FF5710', border: '1px solid #D4FF5730', fontSize: 12, color: '#4A5568', lineHeight: 1.6 }}>
              <span style={{ color: '#D4FF57', fontWeight: 700 }}>Tip : </span>
              Colle ce prompt dans Claude ou ChatGPT. Remplace les éléments entre crochets [comme ceci] par tes informations.
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
