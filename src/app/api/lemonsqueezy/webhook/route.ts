import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Map variant ID → plan info
const VARIANT_PLAN_MAP: Record<string, { plan: string; credits: number }> = {
  [process.env.NEXT_PUBLIC_LEMONSQUEEZY_VARIANT_STANDARD!]: { plan: 'standard', credits: 50 },
  [process.env.NEXT_PUBLIC_LEMONSQUEEZY_VARIANT_PRO!]:      { plan: 'pro',      credits: 100 },
  [process.env.NEXT_PUBLIC_LEMONSQUEEZY_VARIANT_PREMIUM!]:  { plan: 'premium',  credits: 250 },
}

function verifySignature(rawBody: string, signature: string): boolean {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET!
  const hmac = crypto.createHmac('sha256', secret)
  hmac.update(rawBody)
  const digest = hmac.digest('hex')
  return crypto.timingSafeEqual(Buffer.from(digest), Buffer.from(signature))
}

export async function POST(request: NextRequest) {
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

    // ── order_created (paiement one-time ou première mensualité) ──
    if (eventName === 'order_created') {
      const variantId = String(payload.data?.attributes?.first_order_item?.variant_id ?? '')
      const planInfo = VARIANT_PLAN_MAP[variantId]

      if (userId && planInfo) {
        await supabase
          .from('profiles')
          .update({ plan: planInfo.plan, credits_used: 0 })
          .eq('id', userId)
      }
    }

    // ── subscription_created ──
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

    // ── subscription_updated ──
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

    // ── subscription_cancelled ──
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
