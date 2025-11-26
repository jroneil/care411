
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

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

    // Check if volunteer already exists
    const existingVolunteer = await prisma.volunteer.findUnique({
      where: { email }
    })

    if (existingVolunteer) {
      return NextResponse.json(
        { error: 'A volunteer with this email address already exists' },
        { status: 400 }
      )
    }

    // Create new volunteer
    const volunteer = await prisma.volunteer.create({
      data: {
        firstName,
        lastName,
        email,
        phone: phone || null,
        address: address || null,
        city: city || null,
        zipCode: zipCode || null,
        skills: skills || null,
        availability: availability || null,
        interests: interests || null,
        experience: experience || null,
        emergencyContact: emergencyContact || null,
        emergencyPhone: emergencyPhone || null,
        backgroundCheck: backgroundCheck || false,
        isActive: true
      }
    })

    return NextResponse.json({
      message: 'Volunteer application submitted successfully',
      volunteer: {
        id: volunteer.id,
        firstName: volunteer.firstName,
        lastName: volunteer.lastName,
        email: volunteer.email
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
    const volunteers = await prisma.volunteer.findMany({
      where: { isActive: true },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phone: true,
        city: true,
        interests: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json({ volunteers })
  } catch (error) {
    console.error('Error fetching volunteers:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
