import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

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

    if (error) {
      console.error('Erreur reset credits:', error)
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    console.log(`Reset effectué le ${new Date().toISOString()}`)
    return NextResponse.json({
      success: true,
      date: new Date().toISOString(),
    })

  } catch (error) {
    console.error('Erreur cron:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
