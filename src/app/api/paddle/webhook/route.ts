import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const PLAN_MAP: Record<string, { plan: string; generations: number }> = {
  [process.env.NEXT_PUBLIC_PADDLE_PRICE_STANDARD!]: { plan: 'standard', generations: 50 },
  [process.env.NEXT_PUBLIC_PADDLE_PRICE_PRO!]: { plan: 'pro', generations: 100 },
  [process.env.NEXT_PUBLIC_PADDLE_PRICE_PREMIUM!]: { plan: 'premium', generations: 400 },
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const eventType = body.event_type

    if (eventType === 'subscription.activated' || eventType === 'subscription.updated') {
      const priceId = body.data?.items?.[0]?.price?.id
      const userId = body.data?.custom_data?.user_id

      if (!userId || !priceId) return NextResponse.json({ ok: true })

      const planInfo = PLAN_MAP[priceId]
      if (!planInfo) return NextResponse.json({ ok: true })

      await supabase
        .from('profiles')
        .update({
          plan: planInfo.plan,
          credits_used: 0,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId)
    }

    if (eventType === 'subscription.canceled') {
      const userId = body.data?.custom_data?.user_id
      if (!userId) return NextResponse.json({ ok: true })

      await supabase
        .from('profiles')
        .update({
          plan: 'free',
          credits_used: 0,
          updated_at: new Date().toISOString(),
        })
        .eq('id', userId)
    }

    return NextResponse.json({ ok: true })

  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Erreur webhook' }, { status: 500 })
  }
}
