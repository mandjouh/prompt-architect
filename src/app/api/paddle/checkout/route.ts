import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { priceId, userId, email } = await request.json()

    const response = await fetch('https://api.paddle.com/transactions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.PADDLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        items: [{ price_id: priceId, quantity: 1 }],
        customer: { email },
        custom_data: { user_id: userId },
        checkout: {
          url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?success=true`,
        },
      }),
    })

    const data = await response.json()

    if (data.data?.checkout?.url) {
      return NextResponse.json({ checkoutUrl: data.data.checkout.url })
    }

    return NextResponse.json({ error: 'Erreur création checkout' }, { status: 500 })

  } catch (error) {
    console.error('Paddle checkout error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
