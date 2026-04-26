import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen bg-[#07090C] text-white flex flex-col items-center justify-center px-6">
      <div className="max-w-4xl w-full text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 border border-[#D4FF57]/30 bg-[#D4FF57]/10 mb-8">
          <span className="w-2 h-2 rounded-full bg-[#D4FF57]"></span>
          <span className="text-[#D4FF57] text-xs tracking-widest font-mono">
            PROMPT ARCHITECT — MVP
          </span>
        </div>

        {/* Titre */}
        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight font-mono">
          De l&apos;intention à
          <br />
          <span className="text-[#D4FF57]">l&apos;excellence</span>
          <span className="text-gray-500"> — en un prompt.</span>
        </h1>

        {/* Sous-titre */}
        <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto font-mono">
          Transforme ta demande simple en prompt expert, structuré et optimisé.
          Sans connaître le prompt engineering.
        </p>

        {/* Boutons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link
            href="/generate"
            className="inline-block bg-[#D4FF57] text-black font-black px-8 py-4 text-sm tracking-widest hover:bg-yellow-300 transition-all font-mono"
          >
            ✦ GÉNÉRER MON PROMPT (IA)
          </Link>
          <Link
            href="/library"
            className="inline-block border border-[#D4FF57]/30 text-[#D4FF57] font-black px-8 py-4 text-sm tracking-widest hover:bg-[#D4FF57]/10 transition-all font-mono"
          >
            ◈ BIBLIOTHÈQUE 50 PROMPTS
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-0 border border-[#151C25]">
          {[
            { label: 'Prompts Premium', value: '50' },
            { label: 'Modules', value: '4' },
            { label: 'Générateur IA', value: 'Claude' },
            { label: 'Temps moyen', value: '< 2 min' },
          ].map((stat, i) => (
            <div
              key={i}
              className="py-6 border-r border-[#151C25] last:border-r-0 text-center font-mono"
            >
              <div className="text-2xl font-black text-white">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

      </div>
    </main>
  )
}