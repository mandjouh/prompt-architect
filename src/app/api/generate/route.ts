import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

function getSupabase() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  )
}

const PLAN_LIMITS: Record<string, number> = {
  free: 5,
  standard: 50,
  pro: 100,
  premium: 250,
}

// Rate limiting en mémoire par IP (reset toutes les heures)
const ipRateLimit = new Map<string, { count: number; resetAt: number }>()
const IP_LIMIT = 10        // max 10 requêtes par heure par IP pour les non-connectés
const IP_WINDOW_MS = 60 * 60 * 1000  // 1 heure

function checkIpRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = ipRateLimit.get(ip)

  if (!entry || now > entry.resetAt) {
    ipRateLimit.set(ip, { count: 1, resetAt: now + IP_WINDOW_MS })
    return true
  }

  if (entry.count >= IP_LIMIT) return false

  entry.count++
  return true
}

export async function POST(request: NextRequest) {
  const supabase = getSupabase()
  try {
    const { module, caseType, userInput, userId } = await request.json()

    if (!userInput) {
      return NextResponse.json({ error: 'Input manquant' }, { status: 400 })
    }

    // Rate limiting par IP pour les utilisateurs non connectés
    if (!userId) {
      const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
        || request.headers.get('x-real-ip')
        || 'unknown'

      if (!checkIpRateLimit(ip)) {
        return NextResponse.json({
          error: 'LIMIT_REACHED',
          message: 'Trop de requêtes. Connecte-toi pour continuer.',
        }, { status: 429 })
      }
    }

    // Vérification et incrément des crédits si utilisateur connecté
    if (userId) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('plan, credits_used')
        .eq('id', userId)
        .single()

      if (profile) {
        const limit = PLAN_LIMITS[profile.plan] || 5

        if (profile.credits_used >= limit) {
          return NextResponse.json({
            error: 'LIMIT_REACHED',
            plan: profile.plan,
            limit,
            used: profile.credits_used,
          }, { status: 403 })
        }

        // Incrément atomique côté serveur — le frontend ne contrôle plus rien
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ credits_used: profile.credits_used + 1 })
          .eq('id', userId)
          .eq('credits_used', profile.credits_used) // optimistic lock

        if (updateError) {
          return NextResponse.json({ error: 'Erreur mise à jour crédits' }, { status: 500 })
        }
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
    console.error('Erreur API generate:', error)

    // Erreurs Anthropic spécifiques
    if (error && typeof error === 'object' && 'status' in error) {
      const status = (error as { status: number }).status

      if (status === 529) {
        return NextResponse.json(
          { error: 'CLAUDE_OVERLOADED', message: 'Claude est surchargé. Réessaie dans quelques secondes.' },
          { status: 503 }
        )
      }
      if (status === 429) {
        return NextResponse.json(
          { error: 'RATE_LIMIT', message: 'Trop de requêtes. Réessaie dans un instant.' },
          { status: 429 }
        )
      }
      if (status === 400) {
        return NextResponse.json(
          { error: 'INVALID_REQUEST', message: 'Requête invalide. Vérifie ton input.' },
          { status: 400 }
        )
      }
      if (status === 401 || status === 403) {
        return NextResponse.json(
          { error: 'API_AUTH_ERROR', message: "Erreur d'authentification API." },
          { status: 500 }
        )
      }
    }

    // Timeout réseau
    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        { error: 'TIMEOUT', message: 'Délai dépassé. Réessaie.' },
        { status: 504 }
      )
    }

    return NextResponse.json(
      { error: 'UNKNOWN', message: 'Erreur lors de la génération. Réessaie.' },
      { status: 500 }
    )
  }
}
