import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

const ADMIN_EMAIL = 'mandjouh@yahoo.fr'
const PLAN_PRICES: Record<string, number> = {
  standard: 5,
  pro: 10,
  premium: 20,
}

function getAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('Authorization')
  if (!authHeader) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const supabaseAdmin = getAdminClient()
  const { data: { user }, error } = await supabaseAdmin.auth.getUser(authHeader.replace('Bearer ', ''))
  if (error || !user || user.email !== ADMIN_EMAIL) {
    return NextResponse.json({ error: 'Accès refusé' }, { status: 403 })
  }

  const now = new Date()
  const day7 = new Date(now.getTime() - 7 * 86400000).toISOString()
  const day30 = new Date(now.getTime() - 30 * 86400000).toISOString()
  const day60 = new Date(now.getTime() - 60 * 86400000).toISOString()

  // ─── Profiles ───────────────────────────────────────────────────────────────
  const { data: profiles } = await supabaseAdmin
    .from('profiles')
    .select('plan, credits_used, credits_balance, credits_status, referral_count, created_at')

  const allProfiles = profiles ?? []

  // Plans
  const planCounts = {
    free: allProfiles.filter(p => p.plan === 'free').length,
    standard: allProfiles.filter(p => p.plan === 'standard').length,
    pro: allProfiles.filter(p => p.plan === 'pro').length,
    premium: allProfiles.filter(p => p.plan === 'premium').length,
  }

  // MRR
  const mrr =
    planCounts.standard * PLAN_PRICES.standard +
    planCounts.pro * PLAN_PRICES.pro +
    planCounts.premium * PLAN_PRICES.premium

  // Conversion free → payant
  const totalUsers = allProfiles.length
  const payingUsers = totalUsers - planCounts.free
  const conversionRate = totalUsers > 0 ? Math.round((payingUsers / totalUsers) * 100) : 0

  // Nouveaux utilisateurs
  const newLast7 = allProfiles.filter(p => p.created_at > day7).length
  const newLast30 = allProfiles.filter(p => p.created_at > day30).length
  const newPrev30 = allProfiles.filter(p => p.created_at > day60 && p.created_at <= day30).length
  const growthRate = newPrev30 > 0 ? Math.round(((newLast30 - newPrev30) / newPrev30) * 100) : 0

  // Générations totales
  const totalGenerations = allProfiles.reduce((sum, p) => sum + (p.credits_used ?? 0), 0)
  const avgGenerations = totalUsers > 0 ? Math.round(totalGenerations / totalUsers * 10) / 10 : 0

  // Crédits PAYG
  const totalCreditsBalance = allProfiles.reduce((sum, p) => sum + (p.credits_balance ?? 0), 0)
  const frozenCredits = allProfiles.filter(p => p.credits_status === 'frozen').reduce((sum, p) => sum + (p.credits_balance ?? 0), 0)
  const activeCredits = allProfiles.filter(p => p.credits_status === 'active').reduce((sum, p) => sum + (p.credits_balance ?? 0), 0)

  // Parrainage
  const totalReferrals = allProfiles.reduce((sum, p) => sum + (p.referral_count ?? 0), 0)

  // ─── Transactions crédits ────────────────────────────────────────────────────
  const { data: transactions } = await supabaseAdmin
    .from('credit_transactions')
    .select('amount, type, provider, created_at')
    .order('created_at', { ascending: false })
    .limit(500)

  const allTx = transactions ?? []
  const purchaseTx = allTx.filter(t => t.type === 'purchase')
  const totalCreditsSold = purchaseTx.reduce((sum, t) => sum + (t.amount ?? 0), 0)
  const creditRevenueLast30 = purchaseTx
    .filter(t => t.created_at > day30)
    .reduce((sum, t) => sum + (t.amount ?? 0), 0)
  const recentTx = allTx.slice(0, 10)

  // ─── Newsletter ─────────────────────────────────────────────────────────────
  const { count: newsletterCount } = await supabaseAdmin
    .from('newsletter_subscribers')
    .select('*', { count: 'exact', head: true })

  // ─── Saved prompts ───────────────────────────────────────────────────────────
  const { count: savedPromptsCount } = await supabaseAdmin
    .from('saved_prompts')
    .select('*', { count: 'exact', head: true })

  return NextResponse.json({
    // Revenus
    mrr,
    payingUsers,
    conversionRate,

    // Utilisateurs
    totalUsers,
    planCounts,
    newLast7,
    newLast30,
    growthRate,

    // Engagement
    totalGenerations,
    avgGenerations,
    savedPromptsCount: savedPromptsCount ?? 0,

    // Crédits PAYG
    totalCreditsBalance,
    activeCredits,
    frozenCredits,
    totalCreditsSold,
    creditRevenueLast30,

    // Autres
    totalReferrals,
    newsletterCount: newsletterCount ?? 0,
    recentTransactions: recentTx,
  })
}
