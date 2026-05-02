import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Email invalide' }, { status: 400 })
    }

    const supabase = getSupabase()

    // Sauvegarder dans Supabase
    const { error } = await supabase
      .from('newsletter_subscribers')
      .upsert({ email, subscribed_at: new Date().toISOString() }, { onConflict: 'email' })

    if (error) {
      console.error('Newsletter insert error:', error)
      return NextResponse.json({ error: 'Erreur inscription' }, { status: 500 })
    }

    // Email de confirmation via Resend
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Prompt Architect <contact@prompt-architect.io>',
        to: [email],
        subject: '✦ Tu es inscrit à la newsletter Prompt Architect',
        html: `
          <div style="font-family:monospace;max-width:600px;margin:0 auto;background:#07090C;color:white;padding:32px;">
            <div style="margin-bottom:32px;">
              <div style="display:inline-flex;align-items:center;gap:10px;margin-bottom:24px;">
                <div style="width:28px;height:28px;background:#D4FF57;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:900;color:#07090C;">PA</div>
                <span style="font-weight:900;font-size:15px;">Prompt Architect</span>
              </div>
              <div style="height:1px;background:#151C25;"></div>
            </div>
            <div style="font-size:10px;color:#D4FF57;letter-spacing:0.14em;margin-bottom:12px;">// NEWSLETTER</div>
            <h1 style="font-size:24px;font-weight:900;margin:0 0 16px 0;">Tu es dans la liste. ✦</h1>
            <p style="font-size:14px;color:#4A5568;line-height:1.75;margin:0 0 24px 0;">
              Tu recevras nos meilleurs tips de prompt engineering, les nouvelles fonctionnalités et des offres exclusives.
            </p>
            <a href="https://www.prompt-architect.io/generate"
              style="display:inline-block;background:#D4FF57;color:#07090C;padding:14px 32px;font-size:12px;font-weight:900;text-decoration:none;letter-spacing:0.08em;">
              ✦ ESSAYER LE GÉNÉRATEUR
            </a>
            <div style="margin-top:32px;padding-top:20px;border-top:1px solid #151C25;font-size:11px;color:#2D3748;">
              Prompt Architect · <a href="https://www.prompt-architect.io/legal" style="color:#2D3748;">Mentions légales</a>
            </div>
          </div>`,
      }),
    })

    return NextResponse.json({ success: true })

  } catch (err) {
    console.error('Newsletter error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
