'use client'
import { useState } from 'react'
import { PREMIUM_PROMPTS, MODULE_COLORS, MODULES_LIST } from '../lib/prompts'

export default function LibraryPage() {
  const [mod, setMod] = useState('Tous')
  const [sel, setSel] = useState<typeof PREMIUM_PROMPTS[0] | null>(null)
  const [copied, setCopied] = useState(false)
  const [search, setSearch] = useState('')
  const modules = ['Tous', ...MODULES_LIST]
  const filtered = PREMIUM_PROMPTS.filter(p => {
    const okMod = mod === 'Tous' || p.module === mod
    const okSearch = search === '' || p.title.toLowerCase().includes(search.toLowerCase())
    return okMod && okSearch
  })
  const copy = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <div style={{minHeight:'100vh',background:'#07090C',color:'white',fontFamily:'monospace'}}>
      <div style={{borderBottom:'1px solid #151C25',padding:'16px 24px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <a href="/" style={{color:'#D4FF57',fontWeight:900,fontSize:18,textDecoration:'none'}}>PROMPT ARCHITECT</a>
        <span style={{fontSize:11,color:'#D4FF57',border:'1px solid #D4FF5730',padding:'4px 10px'}}>50 PROMPTS PREMIUM</span>
      </div>
      <div style={{maxWidth:1200,margin:'0 auto',padding:'32px 24px'}}>
        <h1 style={{fontSize:28,fontWeight:900,marginBottom:8}}>Bibliotheque <span style={{color:'#D4FF57'}}>Premium</span></h1>
        <p style={{color:'#4A5568',fontSize:13,marginBottom:24}}>50 prompts experts rediges et optimises</p>
        <input type="text" placeholder="Rechercher..." value={search} onChange={e => setSearch(e.target.value)}
          style={{width:'100%',background:'#0B0E13',border:'1px solid #151C25',color:'white',padding:'12px 16px',fontFamily:'monospace',fontSize:13,outline:'none',marginBottom:24,boxSizing:'border-box'}} />
        <div style={{display:'flex',gap:10,marginBottom:24,flexWrap:'wrap'}}>
          {modules.map(m => (
            <button key={m} onClick={() => setMod(m)}
              style={{padding:'8px 16px',fontSize:11,fontFamily:'monospace',border:'1px solid',cursor:'pointer',
                borderColor: mod === m ? '#D4FF57' : '#151C25',
                color: mod === m ? '#D4FF57' : '#4A5568',
                background: mod === m ? '#D4FF5710' : 'transparent'}}>
              {m}
            </button>
          ))}
        </div>
        <div style={{display:'flex',gap:24}}>
          <div style={{width:'50%',display:'flex',flexDirection:'column',gap:10}}>
            {filtered.map(p => (
              <button key={p.id} onClick={() => setSel(p)}
                style={{border:'1px solid',borderColor: sel?.id === p.id ? '#D4FF5750' : '#151C25',
                  background: sel?.id === p.id ? '#0B0E13' : 'transparent',
                  padding:16,textAlign:'left',cursor:'pointer',color:'white'}}>
                <div style={{display:'flex',justifyContent:'space-between',marginBottom:8}}>
                  <span style={{fontSize:10,color: MODULE_COLORS[p.module] || '#D4FF57'}}>#{p.id} — {p.module}</span>
                  <span style={{fontSize:10,color:'#4A5568'}}>{p.difficulty}</span>
                </div>
                <div style={{fontSize:13,fontWeight:600}}>{p.title}</div>
              </button>
            ))}
          </div>
          <div style={{width:'50%',position:'sticky',top:24,height:'fit-content'}}>
            {sel ? (
              <div style={{border:'1px solid #151C25',background:'#0B0E13'}}>
                <div style={{padding:16,borderBottom:'1px solid #151C25'}}>
                  <span style={{fontSize:10,color: MODULE_COLORS[sel.module] || '#D4FF57'}}>{sel.module} · {sel.category}</span>
                  <h2 style={{fontSize:16,fontWeight:900,color:'white',margin:'8px 0 0'}}>{sel.title}</h2>
                </div>
                <div style={{padding:16,fontSize:11,lineHeight:1.7,color:'#8A9AAA',whiteSpace:'pre-wrap',maxHeight:'50vh',overflowY:'auto'}}>
                  {sel.prompt}
                </div>
                <div style={{padding:16,borderTop:'1px solid #151C25'}}>
                  <button onClick={() => copy(sel.prompt)}
                    style={{width:'100%',padding:'10px 0',fontSize:11,fontWeight:900,fontFamily:'monospace',
                      background: copied ? '#2ECC8A' : '#D4FF57',color:'#07090C',border:'none',cursor:'pointer'}}>
                    {copied ? 'COPIE !' : 'COPIER LE PROMPT'}
                  </button>
                </div>
              </div>
            ) : (
              <div style={{border:'1px solid #151C25',padding:48,textAlign:'center'}}>
                <p style={{color:'#4A5568',fontSize:13}}>Selectionne un prompt pour le voir</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}