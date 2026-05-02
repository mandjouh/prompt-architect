import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const FROM = 'Prompt Architect <contact@prompt-architect.io>'
const BASE_URL = 'https://www.prompt-architect.io'

// ─── Templates emails ───────────────────────────────────────────────────────

function emailWrapper(content: string) {
  return `
    <div style="font-family:monospace;max-width:600px;margin:0 auto;background:#07090C;color:white;padding:32px;">
      <div style="margin-bottom:32px;">
        <div style="display:inline-flex;align-items:center;gap:10px;margin-bottom:24px;">
          <div style="width:28px;height:28px;background:#D4FF57;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:900;color:#07090C;">PA</div>
          <span style="font-weight:900;font-size:15px;color:white;letter-spacing:-0.02em;">Prompt Architect</span>
        </div>
        <div style="height:1px;background:#151C25;"></div>
      </div>
      ${content}
      <div style="padding-top:20px;border-top:1px solid #151C25;font-size:11px;color:#2D3748;line-height:1.7;">
        <div style="margin-bottom:8px;">Une question ? <a href="${BASE_URL}/contact" style="color:#4A5568;">Contacte-nous</a></div>
        <div>Prompt Architect · <a href="${BASE_URL}/legal" style="color:#2D3748;">Mentions légales</a> · <a href="${BASE_URL}/cgv" style="color:#2D3748;">CGV</a></div>
      </div>
    </div>`
}

function emailGelWarning(firstName: string, balance: number) {
  return {
    subject: '⚠️ Tes crédits Prompt Architect gèlent dans 7 jours',
    html: emailWrapper(`
      <div style="margin-bottom:32px;">
        <div style="font-size:10px;color:#FF7A3D;letter-spacing:0.14em;margin-bottom:12px;">// ALERTE CRÉDITS</div>
        <h1 style="font-size:24px;font-weight:900;color:white;letter-spacing:-0.03em;margin:0 0 12px 0;line-height:1.1;">
          Tes ${balance} crédit${balance > 1 ? 's' : ''} gèle${balance > 1 ? 'nt' : ''} dans 7 jours
        </h1>
        <p style="font-size:14px;color:#4A5568;line-height:1.75;margin:0 0 24px 0;">
          Salut ${firstName}, tu n'as pas utilisé Prompt Architect depuis 53 jours.<br>
          Sans activité, tes crédits seront <strong style="color:#FF7A3D;">gelés automatiquement</strong> dans 7 jours.
        </p>
        <div style="border:1px solid #FF7A3D30;background:#FF7A3D08;padding:16px 20px;margin-bottom:24px;">
          <div style="font-size:12px;font-weight:900;color:white;margin-bottom:4px;">Comment éviter le gel ?</div>
          <div style="font-size:12px;color:#4A5568;">Il suffit de générer un prompt avant la date limite — ça repart pour 60 jours.</div>
        </div>
        <div style="text-align:center;">
          <a href="${BASE_URL}/generate"
            style="display:inline-block;background:#D4FF57;color:#07090C;padding:14px 36px;font-size:12px;font-weight:900;text-decoration:none;letter-spacing:0.08em;font-family:monospace;">
            ✦ UTILISER MES CRÉDITS MAINTENANT
          </a>
        </div>
      </div>`)
  }
}

function emailGelConfirm(firstName: string, balance: number) {
  return {
    subject: '🔒 Tes crédits Prompt Architect sont gelés',
    html: emailWrapper(`
      <div style="margin-bottom:32px;">
        <div style="font-size:10px;color:#FF7A3D;letter-spacing:0.14em;margin-bottom:12px;">// CRÉDITS GELÉS</div>
        <h1 style="font-size:24px;font-weight:900;color:white;letter-spacing:-0.03em;margin:0 0 12px 0;line-height:1.1;">
          Tes ${balance} crédit${balance > 1 ? 's' : ''} ${balance > 1 ? 'sont' : 'est'} gelé${balance > 1 ? 's' : ''}
        </h1>
        <p style="font-size:14px;color:#4A5568;line-height:1.75;margin:0 0 24px 0;">
          Salut ${firstName}, tes crédits ont été gelés après 60 jours d'inactivité.<br>
          Tu as <strong style="color:white;">30 jours</strong> pour les réactiver avant expiration définitive.
        </p>
        <div style="border:1px solid #151C25;margin-bottom:24px;overflow:hidden;">
          <div style="background:#0B0E13;padding:12px 20px;border-bottom:1px solid #151C25;font-size:9px;color:#2D3748;letter-spacing:0.12em;">RÉACTIVATION</div>
          <div style="padding:16px 20px;">
            <div style="font-size:13px;font-weight:700;color:white;margin-bottom:4px;">Réactive pour seulement 1$</div>
            <div style="font-size:12px;color:#4A5568;line-height:1.6;">Paie 1$ de frais de réactivation et récupère immédiatement tes ${balance} crédits gelés.</div>
          </div>
        </div>
        <div style="text-align:center;">
          <a href="${BASE_URL}/pricing"
            style="display:inline-block;background:#D4FF57;color:#07090C;padding:14px 36px;font-size:12px;font-weight:900;text-decoration:none;letter-spacing:0.08em;font-family:monospace;">
            ✦ RÉACTIVER MES CRÉDITS — 1$
          </a>
        </div>
      </div>`)
  }
}

function emailExpiryWarning(firstName: string, balance: number) {
  return {
    subject: '🚨 Tes crédits Prompt Architect expirent dans 5 jours',
    html: emailWrapper(`
      <div style="margin-bottom:32px;">
        <div style="font-size:10px;color:#FF3D3D;letter-spacing:0.14em;margin-bottom:12px;">// EXPIRATION IMMINENTE</div>
        <h1 style="font-size:24px;font-weight:900;color:white;letter-spacing:-0.03em;margin:0 0 12px 0;line-height:1.1;">
          Dernière chance : ${balance} crédit${balance > 1 ? 's' : ''} expire${balance > 1 ? 'nt' : ''} dans 5 jours
        </h1>
        <p style="font-size:14px;color:#4A5568;line-height:1.75;margin:0 0 24px 0;">
          Salut ${firstName}, tes crédits sont gelés depuis 25 jours.<br>
          Sans réactivation avant la date limite, ils seront <strong style="color:#FF3D3D;">définitivement perdus</strong>.
        </p>
        <div style="border:1px solid #FF3D3D30;background:#FF3D3D08;padding:16px 20px;margin-bottom:24px;display:flex;align-items:center;justify-content:space-between;gap:16px;">
          <div>
            <div style="font-size:12px;font-weight:900;color:white;margin-bottom:4px;">Réactivation — 2$</div>
            <div style="font-size:11px;color:#4A5568;">${balance} crédits récupérés immédiatement.</div>
          </div>
          <a href="${BASE_URL}/pricing"
            style="font-size:10px;font-weight:900;color:#D4FF57;text-decoration:none;letter-spacing:0.08em;border:1px solid #D4FF5740;padding:8px 14px;white-space:nowrap;font-family:monospace;">
            RÉACTIVER →
          </a>
        </div>
        <div style="text-align:center;">
          <a href="${BASE_URL}/pricing"
            style="display:inline-block;background:#D4FF57;color:#07090C;padding:14px 36px;font-size:12px;font-weight:900;text-decoration:none;letter-spacing:0.08em;font-family:monospace;">
            ✦ SAUVER MES CRÉDITS — 2$
          </a>
        </div>
      </div>`)
  }
}

// ─── Envoi Resend ────────────────────────────────────────────────────────────

async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ from: FROM, to: [to], subject, html }),
  })
  if (!res.ok) {
    const err = await res.json()
    throw new Error(JSON.stringify(err))
  }
}

// ─── Handler principal ───────────────────────────────────────────────────────

export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const log: Record<string, unknown> = {}
  const errors: string[] = []

  // 1. Expiration + gel via fonction Supabase
  try {
    const { data, error } = await supabase.rpc('process_credit_expiry')
    if (error) throw error
    log.process_credit_expiry = data
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    errors.push(`process_credit_expiry: ${msg}`)
    console.error('[CRON] process_credit_expiry:', msg)
  }

  // Helper : récupérer les profils + email auth pour une fenêtre de jours
  async function getProfiles(daysMin: number, daysMax: number, status: string) {
    const { data, error } = await supabase
      .from('profiles')
      .select('id, credits_balance, credits_last_used_at')
      .eq('credits_status', status)
      .gt('credits_balance', 0)
      .lt('credits_last_used_at', new Date(Date.now() - daysMin * 86400000).toISOString())
      .gte('credits_last_used_at', new Date(Date.now() - daysMax * 86400000).toISOString())

    if (error) throw error
    return data ?? []
  }

  async function getEmail(userId: string): Promise<string | null> {
    const { data } = await supabase.auth.admin.getUserById(userId)
    return data?.user?.email ?? null
  }

  // 2. Email J-7 avant gel (last_used = 53–54 jours, status = active)
  try {
    const profiles = await getProfiles(53, 54, 'active')
    let sent = 0
    for (const p of profiles) {
      const email = await getEmail(p.id)
      if (!email) continue
      const firstName = email.split('@')[0]
      const { subject, html } = emailGelWarning(firstName, p.credits_balance)
      await sendEmail(email, subject, html)
      sent++
    }
    log.email_gel_warning = { profiles: profiles.length, sent }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    errors.push(`email_gel_warning: ${msg}`)
    console.error('[CRON] email_gel_warning:', msg)
  }

  // 3. Email J0 gel (last_used = 60–61 jours, status = frozen)
  try {
    const profiles = await getProfiles(60, 61, 'frozen')
    let sent = 0
    for (const p of profiles) {
      const email = await getEmail(p.id)
      if (!email) continue
      const firstName = email.split('@')[0]
      const { subject, html } = emailGelConfirm(firstName, p.credits_balance)
      await sendEmail(email, subject, html)
      sent++
    }
    log.email_gel_confirm = { profiles: profiles.length, sent }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    errors.push(`email_gel_confirm: ${msg}`)
    console.error('[CRON] email_gel_confirm:', msg)
  }

  // 4. Email J+25 (last_used = 85–86 jours, status = frozen)
  try {
    const profiles = await getProfiles(85, 86, 'frozen')
    let sent = 0
    for (const p of profiles) {
      const email = await getEmail(p.id)
      if (!email) continue
      const firstName = email.split('@')[0]
      const { subject, html } = emailExpiryWarning(firstName, p.credits_balance)
      await sendEmail(email, subject, html)
      sent++
    }
    log.email_expiry_warning = { profiles: profiles.length, sent }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err)
    errors.push(`email_expiry_warning: ${msg}`)
    console.error('[CRON] email_expiry_warning:', msg)
  }

  const status = errors.length === 0 ? 200 : 207
  return NextResponse.json({
    success: errors.length === 0,
    timestamp: new Date().toISOString(),
    log,
    ...(errors.length > 0 && { errors }),
  }, { status })
}
