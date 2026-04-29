import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Champs requis manquants' }, { status: 400 })
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Prompt Architect <contact@prompt-architect.io>',
        to: ['support@prompt-architect.io'],
        reply_to: email,
        subject: `[Contact] ${subject || 'Nouveau message'} — ${name}`,
        html: `
          <div style="font-family: monospace; max-width: 600px; margin: 0 auto; background: #07090C; color: white; padding: 32px;">
            <div style="background: #D4FF57; color: #07090C; padding: 4px 12px; display: inline-block; font-size: 11px; font-weight: 900; letter-spacing: 0.1em; margin-bottom: 24px;">
              PROMPT ARCHITECT — NOUVEAU MESSAGE
            </div>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #151C25; color: #4A5568; font-size: 12px; width: 100px;">NOM</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #151C25; color: white; font-size: 12px;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #151C25; color: #4A5568; font-size: 12px;">EMAIL</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #151C25; color: white; font-size: 12px;">${email}</td>
              </tr>
              <tr>
                <td style="padding: 12px 0; border-bottom: 1px solid #151C25; color: #4A5568; font-size: 12px;">SUJET</td>
                <td style="padding: 12px 0; border-bottom: 1px solid #151C25; color: white; font-size: 12px;">${subject || 'Non spécifié'}</td>
              </tr>
            </table>
            <div style="margin-top: 24px;">
              <div style="color: #4A5568; font-size: 12px; margin-bottom: 12px;">MESSAGE</div>
              <div style="background: #0B0E13; border: 1px solid #151C25; padding: 20px; font-size: 13px; color: #8A9AAA; line-height: 1.7; white-space: pre-wrap;">${message}</div>
            </div>
            <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #151C25; font-size: 11px; color: #2D3748;">
              Répondre directement à cet email pour contacter ${name}.
            </div>
          </div>
        `,
      }),
    })

    if (res.ok) {
      return NextResponse.json({ success: true })
    }

    const error = await res.json()
    console.error('Resend error:', error)
    return NextResponse.json({ error: 'Erreur envoi email' }, { status: 500 })

  } catch (error) {
    console.error('Contact API error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
