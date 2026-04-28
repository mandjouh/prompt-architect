import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { variantId, userId, email } = await request.json()

    const response = await fetch('https://api.lemonsqueezy.com/v1/checkouts', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json',
      },
      body: JSON.stringify({
        data: {
          type: 'checkouts',
          attributes: {
            checkout_data: {
              email,
              custom: { user_id: userId },
            },
            checkout_options: {
              redirect_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?success=true`,
            },
          },
          relationships: {
            store: {
              data: { type: 'stores', id: process.env.LEMONSQUEEZY_STORE_ID },
            },
            variant: {
              data: { type: 'variants', id: String(variantId) },
            },
          },
        },
      }),
    })

    const data = await response.json()

    const checkoutUrl = data?.data?.attributes?.url

    if (checkoutUrl) {
      return NextResponse.json({ checkoutUrl })
    }

    console.error('Lemon Squeezy error:', JSON.stringify(data))
    return NextResponse.json({ error: 'Erreur création checkout' }, { status: 500 })

  } catch (error) {
    console.error('Lemon Squeezy checkout error:', error)
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 })
  }
}
