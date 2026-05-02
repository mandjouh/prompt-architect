import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

export const dynamic = 'force-dynamic'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

// ─── Map variant ID → plan abonnement ───────────────────────────────────────
const VARIANT_PLAN_MAP: Record<string, { plan: string; credits: number }> = {
  [process.env.NEXT_PUBLIC_LEMONSQUEEZY_VARIANT_STANDARD!]: { plan: 'standard', credits: 50 },
  [process.env.NEXT_PUBLIC_LEMONSQUEEZY_VARIANT_PRO!]:      { plan: 'pro',      credits: 100 },
  [process.env.NEXT_PUBLIC_LEMONSQUEEZY_VARIANT_PREMIUM!]:  { plan: 'premium',  credits: 250 },
}

// ─── Map variant ID → pack crédits PAYG ─────────────────────────────────────
const CREDIT_PACK_MAP: Record<string, { label: string; amount: number; price: number }> = {
  '1597503': { label: 'Starter',  amount: 10,  price: 2  },
  '1597512': { label: 'Standard', amount: 50,  price: 8  },
  '1597513': { label: 'Pro',      amount: 120, price: 15 },
  '1597517': { label: 'Premium',  amount: 300, price: 30 },
}

// ─── Map variant ID → réactivation crédits gelés ────────────────────────────
// À remplir quand Lemon Squeezy live mode sera activé
const REACTIVATION_MAP: Record<string, { price: number }> = {
  // ex: 'VARIANT_REACTIVATION_1': { price: 1 },
  // ex: 'VARIANT_REACTIVATION_2': { price: 2 },
}

function verifySignature(rawBody: string, signature: string): boolean {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET!
  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(rawBody)
  const digest = hmac.digest('hex')
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature))
}

// ─── Email Resend ────────────────────────────────────────────────────────────
async function sendEmail(to: string, subject: string, html: string) {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Prompt Architect <contact@prompt-architect.io>',
      to: [to],
      subject,
      html,
    }),
  })
  if (!res.ok) {
    const err = await res.json()
    console.error('Resend error:', err)
  }
}

function emailCreditPurchase(firstName: string, pack: { label: string; amount: number; price: number }, newBalance: number) {
  return `
    <div style="font-family:monospace;max-width:600px;margin:0 auto;background:#07090C;color:white;padding:32px;">
      <div style="margin-bottom:32px;">
        <div style="display:inline-flex;align-items:center;gap:10px;margin-bottom:24px;">
          <div style="width:28px;height:28px;background:#D4FF57;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:900;color:#07090C;">PA</div>
          <span style="font-weight:900;font-size:15px;color:white;">Prompt Architect</span>
        </div>
        <div style="height:1px;background:#151C25;"></div>
      </div>
      <div style="font-size:10px;color:#D4FF57;letter-spacing:0.14em;margin-bottom:12px;">// ACHAT CONFIRMÉ</div>
      <h1 style="font-size:24px;font-weight:900;color:white;letter-spacing:-0.03em;margin:0 0 12px 0;line-height:1.1;">
        +${pack.amount} crédits ajoutés !
      </h1>
      <p style="font-size:14px;color:#4A5568;line-height:1.75;margin:0 0 24px 0;">
        Salut ${firstName}, ton pack <strong style="color:white;">${pack.label}</strong> est activé.<br>
        Ton solde actuel est de <strong style="color:#D4FF57;">${newBalance} crédits</strong>.
      </p>
      <div style="border:1px solid #151C25;background:#0B0E13;padding:20px;margin-bottom:24px;">
        <div style="display:flex;justify-content:space-between;margin-bottom:12px;">
          <span style="font-size:12px;color:#4A5568;">Pack acheté</span>
          <span style="font-size:12px;font-weight:900;color:white;">${pack.label} — ${pack.price}$</span>
        </div>
        <div style="display:flex;justify-content:space-between;margin-bottom:12px;">
          <span style="font-size:12px;color:#4A5568;">Crédits ajoutés</span>
          <span style="font-size:12px;font-weight:900;color:#D4FF57;">+${pack.amount}</span>
        </div>
        <div style="height:1px;background:#151C25;margin:12px 0;"></div>
        <div style="display:flex;justify-content:space-between;">
          <span style="font-size:12px;color:#4A5568;">Solde total</span>
          <span style="font-size:14px;font-weight:900;color:#D4FF57;">${newBalance} crédits</span>
        </div>
      </div>
      <div style="text-align:center;margin-bottom:32px;">
        <a href="https://www.prompt-architect.io/generate"
          style="display:inline-block;background:#D4FF57;color:#07090C;padding:14px 36px;font-size:12px;font-weight:900;text-decoration:none;letter-spacing:0.08em;font-family:monospace;">
          ✦ UTILISER MES CRÉDITS
        </a>
      </div>
      <div style="padding-top:20px;border-top:1px solid #151C25;font-size:11px;color:#2D3748;line-height:1.7;">
        <div>Prompt Architect · <a href="https://www.prompt-architect.io/legal" style="color:#2D3748;">Mentions légales</a> · <a href="https://www.prompt-architect.io/cgv" style="color:#2D3748;">CGV</a></div>
      </div>
    </div>`
}

function emailReactivation(firstName: string, balance: number) {
  return `
    <div style="font-family:monospace;max-width:600px;margin:0 auto;background:#07090C;color:white;padding:32px;">
      <div style="margin-bottom:32px;">
        <div style="display:inline-flex;align-items:center;gap:10px;margin-bottom:24px;">
          <div style="width:28px;height:28px;background:#D4FF57;display:inline-flex;align-items:center;justify-content:center;font-size:11px;font-weight:900;color:#07090C;">PA</div>
          <span style="font-weight:900;font-size:15px;color:white;">Prompt Architect</span>
        </div>
        <div style="height:1px;background:#151C25;"></div>
      </div>
      <div style="font-size:10px;color:#D4FF57;letter-spacing:0.14em;margin-bottom:12px;">// CRÉDITS RÉACTIVÉS</div>
      <h1 style="font-size:24px;font-weight:900;color:white;letter-spacing:-0.03em;margin:0 0 12px 0;line-height:1.1;">
        Tes crédits sont de retour !
      </h1>
      <p style="font-size:14px;color:#4A5568;line-height:1.75;margin:0 0 24px 0;">
        Salut ${firstName}, tes <strong style="color:#D4FF57;">${balance} crédits</strong> sont réactivés et prêts à l'emploi.<br>
        La fenêtre d'inactivité repart pour 60 jours.
      </p>
      <div style="text-align:center;">
        <a href="https://www.prompt-architect.io/generate"
          style="display:inline-block;background:#D4FF57;color:#07090C;padding:14px 36px;font-size:12px;font-weight:900;text-decoration:none;letter-spacing:0.08em;font-family:monospace;">
          ✦ GÉNÉRER UN PROMPT
        </a>
      </div>
      <div style="padding-top:32px;border-top:1px solid #151C25;font-size:11px;color:#2D3748;">
        Prompt Architect · <a href="https://www.prompt-architect.io/legal" style="color:#2D3748;">Mentions légales</a>
      </div>
    </div>`
}

// ─── Handler principal ───────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  const supabase = getSupabase()
  try {
    const rawBody = await request.text()
    const signature = request.headers.get('x-signature') ?? ''

    if (!verifySignature(rawBody, signature)) {
      console.error('Invalid Lemon Squeezy signature')
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const payload = JSON.parse(rawBody)
    const eventName = payload.meta?.event_name
    const customData = payload.meta?.custom_data
    const userId = customData?.user_id

    console.log('LS Webhook event:', eventName, 'userId:', userId)

    // ── Récupérer l'email utilisateur ──────────────────────────────────────
    async function getUserEmail(): Promise<{ email: string; firstName: string } | null> {
      if (!userId) return null
      const { data } = await supabase.auth.admin.getUserById(userId)
      const email = data?.user?.email
      if (!email) return null
      return { email, firstName: email.split('@')[0] }
    }

    // ── order_created ──────────────────────────────────────────────────────
    if (eventName === 'order_created') {
      const variantId = String(payload.data?.attributes?.first_order_item?.variant_id ?? '')

      // Abonnement
      const planInfo = VARIANT_PLAN_MAP[variantId]
      if (userId && planInfo) {
        await supabase
          .from('profiles')
          .update({ plan: planInfo.plan, credits_used: 0 })
          .eq('id', userId)
      }

      // Pack crédits PAYG
      const packInfo = CREDIT_PACK_MAP[variantId]
      if (userId && packInfo) {
        // Récupérer le solde actuel
        const { data: profile } = await supabase
          .from('profiles')
          .select('credits_balance, credits_status')
          .eq('id', userId)
          .single()

        const currentBalance = profile?.credits_balance ?? 0
        const newBalance = currentBalance + packInfo.amount

        // Mettre à jour le profil
        await supabase
          .from('profiles')
          .update({
            credits_balance: newBalance,
            credits_status: 'active',
            credits_last_used_at: new Date().toISOString(),
          })
          .eq('id', userId)

        // Enregistrer la transaction
        await supabase
          .from('credit_transactions')
          .insert({
            user_id: userId,
            amount: packInfo.amount,
            type: 'purchase',
            provider: 'lemonsqueezy',
            balance_after: newBalance,
          })

        // Email de confirmation
        const user = await getUserEmail()
        if (user) {
          await sendEmail(
            user.email,
            `✅ +${packInfo.amount} crédits ajoutés — Pack ${packInfo.label}`,
            emailCreditPurchase(user.firstName, packInfo, newBalance)
          )
        }
      }

      // Réactivation crédits gelés
      const reactivation = REACTIVATION_MAP[variantId]
      if (userId && reactivation) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('credits_balance')
          .eq('id', userId)
          .single()

        const balance = profile?.credits_balance ?? 0

        await supabase
          .from('profiles')
          .update({
            credits_status: 'active',
            credits_last_used_at: new Date().toISOString(),
          })
          .eq('id', userId)

        await supabase
          .from('credit_transactions')
          .insert({
            user_id: userId,
            amount: 0,
            type: 'reactivation',
            provider: 'lemonsqueezy',
            balance_after: balance,
          })

        const user = await getUserEmail()
        if (user) {
          await sendEmail(
            user.email,
            '🔓 Tes crédits Prompt Architect sont réactivés',
            emailReactivation(user.firstName, balance)
          )
        }
      }
    }

    // ── subscription_created ───────────────────────────────────────────────
    if (eventName === 'subscription_created') {
      const variantId = String(payload.data?.attributes?.variant_id ?? '')
      const planInfo = VARIANT_PLAN_MAP[variantId]
      if (userId && planInfo) {
        await supabase
          .from('profiles')
          .update({ plan: planInfo.plan, credits_used: 0 })
          .eq('id', userId)
      }
    }

    // ── subscription_updated ───────────────────────────────────────────────
    if (eventName === 'subscription_updated') {
      const variantId = String(payload.data?.attributes?.variant_id ?? '')
      const planInfo = VARIANT_PLAN_MAP[variantId]
      const status = payload.data?.attributes?.status
      if (userId && planInfo && status === 'active') {
        await supabase
          .from('profiles')
          .update({ plan: planInfo.plan })
          .eq('id', userId)
      }
    }

    // ── subscription_expired ───────────────────────────────────────────────
    if (eventName === 'subscription_expired') {
      if (userId) {
        await supabase
          .from('profiles')
          .update({ plan: 'free' })
          .eq('id', userId)
      }
    }

    // ── subscription_cancelled ─────────────────────────────────────────────
    if (eventName === 'subscription_cancelled') {
      if (userId) {
        await supabase
          .from('profiles')
          .update({ plan: 'free' })
          .eq('id', userId)
      }
    }

    return NextResponse.json({ received: true })

  } catch (error) {
    console.error('LS Webhook error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
