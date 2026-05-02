import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Cron : 1er de chaque mois à 2h UTC
// Remet à zéro le compteur de générations des abonnés
export async function GET(request: NextRequest) {
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const { error } = await supabase
      .from('profiles')
      .update({ credits_used: 0 })
      .neq('credits_used', 0)

    if (error) throw error

    console.log(`[CRON] reset-credits OK — ${new Date().toISOString()}`)
    return NextResponse.json({ success: true, timestamp: new Date().toISOString() })
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err)
    console.error('[CRON] reset-credits FAILED:', message)
    return NextResponse.json({ success: false, error: message }, { status: 500 })
  }
}
