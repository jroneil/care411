
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = "force-dynamic"

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      zipCode,
      skills,
      availability,
      interests,
      experience,
      emergencyContact,
      emergencyPhone,
      backgroundCheck
    } = data

    if (!firstName || !lastName || !email) {
      return NextResponse.json(
        { error: 'First name, last name, and email are required' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      message: 'Volunteer application submitted successfully',
      volunteer: {
        id: 'temp-volunteer',
        firstName,
        lastName,
        email,
        phone,
        city,
        interests,
      }
    })
  } catch (error) {
    console.error('Volunteer application error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const volunteers = [
      {
        id: '1',
        firstName: 'Jordan',
        lastName: 'Rivera',
        email: 'jordan@example.com',
        phone: '555-123-4567',
        city: 'Haverhill',
        interests: 'Food distribution',
        createdAt: new Date().toISOString(),
      },
    ]

    return NextResponse.json({ volunteers, notice: 'Database disabled; showing sample data.' })
  } catch (error) {
    console.error('Error fetching volunteers:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
