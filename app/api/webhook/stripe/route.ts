
import { NextRequest, NextResponse } from 'next/server'
// Temporarily disabled - remove Stripe imports to avoid build errors
// import Stripe from 'stripe'
// import { prisma } from '@/lib/db'

export const dynamic = "force-dynamic"

// Temporarily disabled - payment functionality
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2025-10-29.clover',
// })

// const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  // Webhook functionality temporarily disabled
  return NextResponse.json(
    { received: true, message: 'Webhook processing is temporarily disabled' },
    { status: 200 }
  )
  
  /* Original code commented out
  try {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    // Handle the checkout.session.completed event
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session

      if (session.metadata) {
        // Save the donation to the database
        await prisma.donation.create({
          data: {
            stripePaymentId: session.payment_intent as string,
            amount: parseFloat(session.metadata.amount),
            donorName: session.metadata.isAnonymous === 'true' ? 'Anonymous' : session.metadata.donorName,
            donorEmail: session.metadata.donorEmail,
            message: session.metadata.message,
            isAnonymous: session.metadata.isAnonymous === 'true',
            status: 'COMPLETED',
          },
        })

        console.log('Donation saved successfully:', session.id)
      }
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
  */
}
