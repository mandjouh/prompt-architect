import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
  // Sécurité — vérifier que c'est Vercel qui appelle
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })
  }

  try {
    const { error, count } = await supabase
      .from('profiles')
      .update({ credits_used: 0 })
      .neq('credits_used', 0)
      .select('*', { count: 'exact', head: true })

    if (error) {
      console.error('Erreur reset credits:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log(`Reset effectué — ${count} profils mis à jour`)
    return NextResponse.json({
      success: true,
      updated: count,
      date: new Date().toISOString(),
    })

  } catch (error) {
    console.error('Erreur cron:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
