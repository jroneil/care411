
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const { name, email, phone, subject, message, isUrgent } = data

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      message: 'Contact form submitted successfully',
      submission: {
        id: 'temp-contact',
        name,
        email,
        subject,
        createdAt: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Contact form submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const submissions = [
      {
        id: '1',
        name: 'Taylor Morgan',
        email: 'taylor@example.com',
        subject: 'Community partnership',
        message: 'Looking to coordinate a neighborhood cleanup.',
        isUrgent: false,
        createdAt: new Date().toISOString(),
      }
    ]

    return NextResponse.json({ submissions })
  } catch (error) {
    console.error('Error fetching contact submissions:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
