import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const ADMIN_EMAIL = 'mandjouh@yahoo.fr'

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  )
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('Authorization')
  if (!authHeader) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const token = authHeader.replace('Bearer ', '')
  const supabaseAdmin = getAdminClient()

  const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)
  if (authError || !user || user.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
  }

  const { data, error } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ users: data })
}

export async function PATCH(req: NextRequest) {
  const authHeader = req.headers.get('Authorization')
  if (!authHeader) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  const token = authHeader.replace('Bearer ', '')
  const supabaseAdmin = getAdminClient()

  const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)
  if (authError || !user || user.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
  }

  const { userId, newPlan } = await req.json()

  if (!userId || !newPlan) {
    return NextResponse.json({ error: 'userId et newPlan requis' }, { status: 400 })
  }

  const validPlans = ['free', 'standard', 'pro', 'premium']
  if (!validPlans.includes(newPlan)) {
    return NextResponse.json({ error: 'Plan invalide' }, { status: 400 })
  }

  const { error } = await supabaseAdmin
    .from('profiles')
    .update({ plan: newPlan, credits_used: 0 })
    .eq('id', userId)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}

export async function PUT(req: NextRequest) {
  const authHeader = req.headers.get('Authorization')
  if (!authHeader) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const token = authHeader.replace('Bearer ', '')
  const supabaseAdmin = getAdminClient()

  const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token)
  if (authError || !user || user.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
  }

  const { userId, creditAmount } = await req.json()
  if (!userId || creditAmount === undefined || isNaN(creditAmount)) {
    return NextResponse.json({ error: 'userId et creditAmount requis' }, { status: 400 })
  }

  // Récupérer le solde actuel
  const { data: profile, error: fetchError } = await supabaseAdmin
    .from('profiles')
    .select('credits_balance, credits_status')
    .eq('id', userId)
    .single()

  if (fetchError) return NextResponse.json({ error: fetchError.message }, { status: 500 })

  const currentBalance = profile?.credits_balance ?? 0
  const newBalance = Math.max(0, currentBalance + creditAmount)

  const { error } = await supabaseAdmin
    .from('profiles')
    .update({
      credits_balance: newBalance,
      credits_status: newBalance > 0 ? 'active' : profile?.credits_status,
      credits_last_used_at: creditAmount > 0 ? new Date().toISOString() : undefined,
    })
    .eq('id', userId)

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })

  // Enregistrer la transaction
  await supabaseAdmin.from('credit_transactions').insert({
    user_id: userId,
    amount: creditAmount,
    type: creditAmount > 0 ? 'bonus' : 'used',
    provider: 'admin',
    balance_after: newBalance,
  })

  return NextResponse.json({ success: true, newBalance })
}
