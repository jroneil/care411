
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const events = [
      {
        id: '1',
        title: 'Community Food Drive',
        description: 'Join us to distribute groceries to local families.',
        location: 'Central Park',
        address: '123 Main St, Haverhill, MA',
        startDate: new Date().toISOString(),
        endDate: null,
        startTime: '10:00 AM',
        endTime: '2:00 PM',
        category: 'COMMUNITY',
        maxVolunteers: 25,
        currentVolunteers: 12,
        imageUrl: null,
        contactEmail: 'events@411cares.org',
        contactPhone: '555-987-6543',
        requirements: 'Comfortable clothing, ability to lift light boxes.',
        createdBy: { firstName: 'Alex', lastName: 'Johnson', email: 'alex@example.com' },
      }
    ]

    return NextResponse.json({ events })
  } catch (error) {
    console.error('Error fetching events:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()

    const {
      title,
      description,
      location,
      address,
      startDate,
      endDate,
      startTime,
      endTime,
      isAllDay,
      category,
      maxVolunteers,
      imageUrl,
      contactEmail,
      contactPhone,
      requirements,
      createdById
    } = data

    if (!title || !startDate || !createdById) {
      return NextResponse.json(
        { error: 'Title, start date, and creator ID are required' },
        { status: 400 }
      )
    }

    return NextResponse.json({
      message: 'Event creation disabled while database is offline',
      event: {
        id: 'temp-event',
        title,
        description,
        location,
        startDate,
        category,
      }
    })
  } catch (error) {
    console.error('Event creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
