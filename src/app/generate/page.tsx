'use client'

import { useState } from 'react'

const MODULES = [
  {
    id: 'business',
    icon: '◈',
    label: 'Business',
    color: '#D4FF57',
    desc: 'Plans, pitch, stratégie, finance',
    cases: ['Business Plan', 'Pitch Deck', 'Analyse de Marché'],
  },
  {
    id: 'contenu',
    icon: '◉',
    label: 'Contenu Viral',
    color: '#FF7A3D',
    desc: 'Hooks, scripts, posts, copywriting',
    cases: ['Hook TikTok/Reels', 'Script YouTube', 'Post LinkedIn'],
  },
  {
    id: 'pro',
    icon: '◎',
    label: 'Usage Pro',
    color: '#38C4FF',
    desc: 'Emails, CV, rapports, lettres',
    cases: ['Email Professionnel', 'CV Optimisé', 'Rapport Exécutif'],
  },
  {
    id: 'dev',
    icon: '⟁',
    label: 'Développement',
    color: '#A47CFF',
    desc: 'Code, SaaS, debug, agents IA',
    cases: ['Brief Technique SaaS', 'Génération de Code', 'Debugging'],
  },
]

export default function GeneratePage() {
  const [selectedModule, setSelectedModule] = useState<string | null>(null)
  const [selectedCase, setSelectedCase] = useState<string | null>(null)
  const [input, setInput] = useState('')
  const [generating, setGenerating] = useState(false)
  const [result, setResult] = useState('')

  const currentModule = MODULES.find(m => m.id === selectedModule)

  const handleGenerate = async () => {
    if (!input.trim()) return
    setGenerating(true)
    setResult('')

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          module: selectedModule,
          caseType: selectedCase,
          userInput: input,
        }),
      })
      const data = await response.json()
      setResult(data.prompt || 'Erreur lors de la génération.')
    } catch {
      setResult('Erreur de connexion. Réessaie.')
    }

    setGenerating(false)
  }

  return (
    <div className="min-h-screen bg-[#07090C] text-white font-mono">
      
      {/* Header */}
      <div className="border-b border-[#151C25] px-6 py-4 flex items-center justify-between">
        <a href="/" className="text-[#D4FF57] font-black text-lg">
          PROMPT ARCHITECT
        </a>
        <span className="text-xs text-gray-500">Générateur de prompts experts</span>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Étape 1 — Choix du module */}
        {!selectedModule && (
          <div>
            <h2 className="text-2xl font-black mb-2">Choisis ton module</h2>
            <p className="text-gray-500 text-sm mb-8">Sélectionne la catégorie qui correspond à ton besoin</p>
            <div className="grid grid-cols-2 gap-4">
              {MODULES.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setSelectedModule(m.id)}
                  className="border border-[#151C25] bg-[#0B0E13] p-6 text-left hover:border-[#D4FF57]/30 transition-all group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl" style={{ color: m.color }}>{m.icon}</span>
                    <span className="font-black text-lg">{m.label}</span>
                  </div>
                  <p className="text-gray-500 text-sm mb-4">{m.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {m.cases.map(c => (
                      <span key={c} className="text-xs px-2 py-1 border border-[#151C25] text-gray-600">
                        {c}
                      </span>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Étape 2 — Choix du cas d'usage */}
        {selectedModule && !selectedCase && (
          <div>
            <button onClick={() => setSelectedModule(null)} className="text-gray-500 text-sm mb-6 hover:text-white">
              ← Retour
            </button>
            <h2 className="text-2xl font-black mb-2">Que veux-tu créer ?</h2>
            <p className="text-gray-500 text-sm mb-8">Sélectionne ton cas d&apos;usage</p>
            <div className="flex flex-col gap-3">
              {currentModule?.cases.map((c) => (
                <button
                  key={c}
                  onClick={() => setSelectedCase(c)}
                  className="border border-[#151C25] bg-[#0B0E13] p-4 text-left hover:border-[#D4FF57]/30 transition-all flex items-center justify-between"
                >
                  <span className="font-medium">{c}</span>
                  <span className="text-gray-600">→</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Étape 3 — Saisie et génération */}
        {selectedModule && selectedCase && !result && (
          <div>
            <button onClick={() => setSelectedCase(null)} className="text-gray-500 text-sm mb-6 hover:text-white">
              ← Retour
            </button>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs text-[#D4FF57] border border-[#D4FF57]/30 px-2 py-1">
                {currentModule?.label} · {selectedCase}
              </span>
            </div>
            <h2 className="text-2xl font-black mb-6">Décris ton besoin</h2>
            <textarea
              className="w-full bg-[#0B0E13] border border-[#151C25] text-white p-4 font-mono text-sm resize-none focus:outline-none focus:border-[#D4FF57]/30 mb-4"
              rows={5}
              placeholder={`Décris précisément ce que tu veux pour ton ${selectedCase}...`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              onClick={handleGenerate}
              disabled={!input.trim() || generating}
              className="bg-[#D4FF57] text-black font-black px-8 py-3 text-sm tracking-widest hover:bg-yellow-300 transition-all disabled:opacity-40"
            >
              {generating ? '⟳ GÉNÉRATION EN COURS...' : '✦ GÉNÉRER LE PROMPT'}
            </button>
          </div>
        )}

        {/* Résultat */}
        {result && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-2xl font-black">Ton prompt expert ✦</h2>
              <button
                onClick={() => { setResult(''); setInput(''); setSelectedCase(null); }}
                className="text-gray-500 text-sm hover:text-white"
              >
                ← Nouveau prompt
              </button>
            </div>
            <div className="bg-[#0B0E13] border border-[#151C25] p-6 font-mono text-sm leading-relaxed text-gray-300 whitespace-pre-wrap mb-4">
              {result}
            </div>
            <button
              onClick={() => navigator.clipboard.writeText(result)}
              className="bg-[#D4FF57] text-black font-black px-8 py-3 text-sm tracking-widest hover:bg-yellow-300 transition-all"
            >
              ⎘ COPIER LE PROMPT
            </button>
          </div>
        )}

      </div>
    </div>
  )
}