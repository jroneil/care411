
import { NextRequest, NextResponse } from 'next/server'
// Temporarily disabled - remove Stripe imports to avoid build errors
// import Stripe from 'stripe'
// import { prisma } from '@/lib/db'

export const dynamic = "force-dynamic"

// Temporarily disabled - payment functionality
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: '2025-10-29.clover',
// })

export async function POST(request: NextRequest) {
  // Payment functionality temporarily disabled
  return NextResponse.json(
    { error: 'Payment processing is temporarily disabled. Please contact us directly to make a donation.' },
    { status: 503 } // Service Unavailable
  )
  
  /* Original code commented out
  try {
    const { amount, donorName, donorEmail, message, isAnonymous } = await request.json()

    if (!amount || amount < 100) { // Minimum $1.00
      return NextResponse.json(
        { error: 'Amount must be at least $1.00' },
        { status: 400 }
      )
    }

    if (!donorEmail) {
      return NextResponse.json(
        { error: 'Donor email is required' },
        { status: 400 }
      )
    }

    // Get the origin for the redirect URLs
    const origin = request.headers.get("origin") || process.env.NEXTAUTH_URL || 'http://localhost:3000'

    // Create a Stripe Checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: '411 Cares Merrimack Valley Donation',
              description: 'Thank you for supporting our community!',
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${origin}/donate/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/donate`,
      customer_email: donorEmail,
      metadata: {
        donorName: isAnonymous ? 'Anonymous' : (donorName || ''),
        donorEmail,
        message: message || '',
        isAnonymous: isAnonymous.toString(),
        amount: (amount / 100).toString(), // Store as dollars for easier reading
      },
    })

    return NextResponse.json({ clientSecret: session.url })
  } catch (error) {
    console.error('Payment intent creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
  */
}
