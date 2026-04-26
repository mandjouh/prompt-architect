import Anthropic from '@anthropic-ai/sdk'
import { NextRequest, NextResponse } from 'next/server'

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!,
})

export async function POST(request: NextRequest) {
  try {
    const { module, caseType, userInput } = await request.json()

    if (!userInput) {
      return NextResponse.json({ error: 'Input manquant' }, { status: 400 })
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
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: userMessage,
        },
      ],
    })

    const prompt = message.content[0].type === 'text' ? message.content[0].text : ''

    return NextResponse.json({ prompt })

  } catch (error) {
    console.error('Erreur API:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la génération' },
      { status: 500 }
    )
  }
}