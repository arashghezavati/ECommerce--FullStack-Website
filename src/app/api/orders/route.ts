import { NextResponse } from 'next/server'
import Stripe from 'stripe'
import Client from 'shopify-buy'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string)

const client = Client.buildClient({
  domain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN as string,
  storefrontAccessToken: process.env
    .NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN as string,
})

export async function POST(req: Request) {
  try {
    const { amount, paymentMethodId, orderData } = await req.json()
    const amountInCents = Math.round(amount * 100)

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      payment_method: paymentMethodId,
      confirm: true,
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'never',
      },
    })

    if (paymentIntent.status !== 'succeeded') {
      throw new Error('Payment not successful')
    }

    const order = await client.checkout.create(orderData)

    return NextResponse.json({
      message: 'Order created and payment processed successfully',
      order,
    })
  } catch (error: any) {
    console.error('Error processing order:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to process payment or create order' },
      { status: 500 },
    )
  }
}

export async function GET() {
  try {
    // Shopify Admin API endpoint to get orders
    const response = await fetch(
      `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/admin/api/2023-01/orders.json`,
      {
        method: 'GET',
        headers: new Headers({
          'Content-Type': 'application/json',
          'X-Shopify-Access-Token': process.env
            .NEXT_PUBLIC_SHOPIFY_ADMIN_ACCESS_TOKEN as string,
        }),
      },
    )

    // Check if the response is successful
    if (!response.ok) {
      throw new Error('Failed to fetch orders')
    }

    // Convert the response to JSON
    const orders = await response.json()

    // Return the orders in the response
    return NextResponse.json(orders)
  } catch (error: any) {
    console.error('Error fetching orders:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to fetch orders' },
      { status: 500 },
    )
  }
}
