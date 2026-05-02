import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

const REFERRAL_CREDITS = 5

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (!authHeader) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const supabase = getSupabase()
  const { data: { user } } = await supabase.auth.getUser(authHeader.replace('Bearer ', ''))
  if (!user) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { data: profile } = await supabase
    .from('profiles')
    .select('referral_code, referral_count')
    .eq('id', user.id)
    .single()

  if (!profile?.referral_code) {
    const code = user.id.slice(0, 8).toUpperCase()
    await supabase.from('profiles').update({ referral_code: code }).eq('id', user.id)
    return NextResponse.json({ code, count: 0 })
  }

  return NextResponse.json({ code: profile.referral_code, count: profile.referral_count ?? 0 })
}

export async function POST(req: NextRequest) {
  try {
    const { referralCode, newUserId } = await req.json()
    if (!referralCode || !newUserId) return NextResponse.json({ error: 'Paramètres manquants' }, { status: 400 })

    const supabase = getSupabase()

    const { data: referrer } = await supabase
      .from('profiles')
      .select('id, credits_balance, referral_count')
      .eq('referral_code', referralCode.toUpperCase())
      .single()

    if (!referrer) return NextResponse.json({ error: 'Code invalide' }, { status: 404 })
    if (referrer.id === newUserId) return NextResponse.json({ error: 'Auto-parrainage interdit' }, { status: 400 })

    const referrerBalance = (referrer.credits_balance ?? 0) + REFERRAL_CREDITS
    await supabase.from('profiles').update({
      credits_balance: referrerBalance, credits_status: 'active',
      credits_last_used_at: new Date().toISOString(),
      referral_count: (referrer.referral_count ?? 0) + 1,
    }).eq('id', referrer.id)

    await supabase.from('credit_transactions').insert({
      user_id: referrer.id, amount: REFERRAL_CREDITS, type: 'bonus', provider: 'referral', balance_after: referrerBalance,
    })

    const { data: newUser } = await supabase.from('profiles').select('credits_balance').eq('id', newUserId).single()
    const newUserBalance = (newUser?.credits_balance ?? 0) + REFERRAL_CREDITS

    await supabase.from('profiles').update({
      credits_balance: newUserBalance, credits_status: 'active',
      credits_last_used_at: new Date().toISOString(), referred_by: referrer.id,
    }).eq('id', newUserId)

    await supabase.from('credit_transactions').insert({
      user_id: newUserId, amount: REFERRAL_CREDITS, type: 'bonus', provider: 'referral', balance_after: newUserBalance,
    })

    return NextResponse.json({ success: true, creditsAwarded: REFERRAL_CREDITS })
  } catch (err) {
    console.error('Referral error:', err)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
