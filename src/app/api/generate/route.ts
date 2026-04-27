import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const PLAN_LIMITS: Record<string, number> = {
  free: 5,
  standard: 50,
  pro: 100,
  premium: 250,
}

export async function POST(request: NextRequest) {
  try {
    const { module, caseType, userInput, userId } = await request.json()

    if (!userInput) {
      return NextResponse.json({ error: 'Input manquant' }, { status: 400 })
    }

    // Vérifier les limites si utilisateur connecté
    if (userId) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('plan, credits_used')
        .eq('id', userId)
        .single()

      if (profile) {
        const limit = PLAN_LIMITS[profile.plan] || 10
        if (profile.credits_used >= limit) {
          return NextResponse.json({
            error: 'LIMIT_REACHED',
            plan: profile.plan,
            limit,
            used: profile.credits_used,
          }, { status: 403 })
        }

        // Incrémenter le compteur
        await supabase
          .from('profiles')
          .update({ credits_used: profile.credits_used + 1 })
          .eq('id', userId)
      }
    }

    const systemPrompt = `Tu es PromptArchitect, un expert mondial en prompt engineering.
Tu génères des prompts experts, structurés et optimisés basés sur le framework RCOFC :
- Rôle : Qui est l'IA dans ce contexte
- Contexte : La situation précise
- Objectif : Ce qu'on veut produire
- Format : Comment présenter le résultat
- Contraintes : Les règles et limites

IMPORTANT : Tu génères UNIQUEMENT le prompt optimisé, prêt à être utilisé dans Claude ou ChatGPT.
Commence directement par le prompt, sans introduction ni explication.
Le prompt doit être en français, détaillé et immédiatement utilisable.`

    const userMessage = `Module : ${module}
Cas d'usage : ${caseType}
Besoin de l'utilisateur : ${userInput}

Génère un prompt expert et optimisé pour ce besoin.`

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 8192,
      system: systemPrompt,
      messages: [{ role: 'user', content: userMessage }],
    })

    const prompt = message.content[0].type === 'text' ? message.content[0].text : ''

    return NextResponse.json({ prompt })

  } catch (error) {
    console.error('Erreur API:', error)
    return NextResponse.json({ error: 'Erreur lors de la génération' }, { status: 500 })
  }
}
