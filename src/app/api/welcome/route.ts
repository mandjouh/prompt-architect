import { NextRequest, NextResponse } from 'next/server'

// Clé secrète pour sécuriser le webhook Supabase
const WELCOME_SECRET = process.env.WELCOME_WEBHOOK_SECRET

export async function POST(request: NextRequest) {
  try {
    // Vérification de la clé secrète
    const authHeader = request.headers.get('Authorization')
    if (!WELCOME_SECRET || authHeader !== `Bearer ${WELCOME_SECRET}`) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
    }

    const body = await request.json()

    // Supabase envoie le nouveau user dans body.record
    const email = body.record?.email
    const name = body.record?.raw_user_meta_data?.name || null

    if (!email) {
      return NextResponse.json({ error: 'Email manquant' }, { status: 400 })
    }

    const firstName = name || email.split('@')[0]

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Prompt Architect <contact@prompt-architect.io>',
        to: [email],
        subject: '✦ Bienvenue sur Prompt Architect',
        html: `
          <div style="font-family: monospace; max-width: 600px; margin: 0 auto; background: #07090C; color: white; padding: 32px;">

            <!-- HEADER -->
            <div style="margin-bottom: 32px;">
              <div style="display: inline-flex; align-items: center; gap: 10px; margin-bottom: 24px;">
                <div style="width: 28px; height: 28px; background: #D4FF57; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 900; color: #07090C;">PA</div>
                <span style="font-weight: 900; font-size: 15px; color: white; letter-spacing: -0.02em;">Prompt Architect</span>
              </div>
              <div style="height: 1px; background: #151C25;"></div>
            </div>

            <!-- TITRE -->
            <div style="margin-bottom: 32px;">
              <div style="font-size: 10px; color: #D4FF57; letter-spacing: 0.14em; margin-bottom: 12px;">// BIENVENUE</div>
              <h1 style="font-size: 28px; font-weight: 900; color: white; letter-spacing: -0.03em; margin: 0 0 12px 0; line-height: 1.1;">
                Content de t'avoir, ${firstName} !
              </h1>
              <p style="font-size: 14px; color: #4A5568; line-height: 1.75; margin: 0;">
                Ton compte est activé. Tu as accès à <strong style="color: white;">5 générations gratuites</strong> et 3 modules dès maintenant.
              </p>
            </div>

            <!-- ÉTAPES -->
            <div style="border: 1px solid #151C25; margin-bottom: 32px; overflow: hidden;">
              <div style="background: #0B0E13; padding: 12px 20px; border-bottom: 1px solid #151C25; font-size: 9px; color: #2D3748; letter-spacing: 0.12em;">
                COMMENT DÉMARRER EN 3 ÉTAPES
              </div>
              ${[
                { step: '01', title: 'Choisis ton module', desc: 'Business, Contenu Viral ou Usage Pro — 3 modules gratuits disponibles.' },
                { step: '02', title: 'Décris ton besoin', desc: 'Explique simplement ce que tu veux. Pas besoin d\'être expert.' },
                { step: '03', title: 'Copie et utilise', desc: 'Reçois un prompt expert. Colle-le dans Claude ou ChatGPT.' },
              ].map(s => `
              <div style="display: flex; gap: 20px; padding: 16px 20px; border-bottom: 1px solid #0F1520; align-items: flex-start;">
                <div style="font-size: 24px; font-weight: 900; color: #151C25; line-height: 1; flex-shrink: 0; width: 32px;">${s.step}</div>
                <div>
                  <div style="font-size: 13px; font-weight: 700; color: white; margin-bottom: 4px;">${s.title}</div>
                  <div style="font-size: 12px; color: #4A5568; line-height: 1.6;">${s.desc}</div>
                </div>
              </div>`).join('')}
            </div>

            <!-- CTA -->
            <div style="text-align: center; margin-bottom: 32px;">
              <a href="https://www.prompt-architect.io/generate"
                style="display: inline-block; background: #D4FF57; color: #07090C; padding: 14px 36px; font-size: 12px; font-weight: 900; text-decoration: none; letter-spacing: 0.08em; font-family: monospace;">
                ✦ GÉNÉRER MON PREMIER PROMPT
              </a>
            </div>

            <!-- MODULES GRATUITS -->
            <div style="background: #0B0E13; border: 1px solid #151C25; padding: 20px; margin-bottom: 32px;">
              <div style="font-size: 9px; color: #2D3748; letter-spacing: 0.12em; margin-bottom: 16px;">MODULES GRATUITS INCLUS</div>
              ${[
                { icon: '◈', label: 'Business', color: '#D4FF57', desc: 'Plans, pitch, stratégie' },
                { icon: '◉', label: 'Contenu Viral', color: '#FF7A3D', desc: 'Hooks, scripts, posts' },
                { icon: '◎', label: 'Usage Pro', color: '#38C4FF', desc: 'Emails, CV, rapports' },
              ].map(m => `
              <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
                <span style="font-size: 16px; color: ${m.color};">${m.icon}</span>
                <div>
                  <div style="font-size: 12px; font-weight: 900; color: ${m.color};">${m.label}</div>
                  <div style="font-size: 11px; color: #4A5568;">${m.desc}</div>
                </div>
              </div>`).join('')}
            </div>

            <!-- UPGRADE -->
            <div style="border: 1px solid #D4FF5730; background: #D4FF5708; padding: 16px 20px; margin-bottom: 32px; display: flex; align-items: center; justify-content: space-between; gap: 16px;">
              <div>
                <div style="font-size: 12px; font-weight: 900; color: white; margin-bottom: 4px;">Tu veux plus de générations ?</div>
                <div style="font-size: 11px; color: #4A5568;">Plans à partir de 5$/mois — accès aux 8 modules.</div>
              </div>
              <a href="https://www.prompt-architect.io/pricing"
                style="font-size: 10px; font-weight: 900; color: #D4FF57; text-decoration: none; letter-spacing: 0.08em; border: 1px solid #D4FF5740; padding: 8px 14px; white-space: nowrap; font-family: monospace;">
                VOIR LES PLANS →
              </a>
            </div>

            <!-- FOOTER -->
            <div style="padding-top: 20px; border-top: 1px solid #151C25; font-size: 11px; color: #2D3748; line-height: 1.7;">
              <div style="margin-bottom: 8px;">
                Une question ? Réponds directement à cet email ou contacte-nous sur
                <a href="https://www.prompt-architect.io/contact" style="color: #4A5568;">prompt-architect.io/contact</a>
              </div>
              <div>Prompt Architect · <a href="https://www.prompt-architect.io/legal" style="color: #2D3748;">Mentions légales</a> · <a href="https://www.prompt-architect.io/cgv" style="color: #2D3748;">CGV</a></div>
            </div>

          </div>
        `,
      }),
    })

    if (res.ok) {
      return NextResponse.json({ success: true })
    }

    const error = await res.json()
    console.error('Resend welcome error:', error)
    return NextResponse.json({ error: 'Erreur envoi email' }, { status: 500 })

  } catch (error) {
    console.error('Welcome API error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
