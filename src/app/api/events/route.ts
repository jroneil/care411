
import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    const events = await prisma.event.findMany({
      where: { 
        isActive: true,
        isPublic: true 
      },
      orderBy: { startDate: 'asc' },
      include: {
        createdBy: {
          select: {
            firstName: true,
            lastName: true,
            email: true
          }
        }
      }
    })

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

    // Create new event
    const event = await prisma.event.create({
      data: {
        title,
        description: description || null,
        location: location || null,
        address: address || null,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        startTime: startTime || null,
        endTime: endTime || null,
        isAllDay: isAllDay || false,
        category: category || 'COMMUNITY',
        maxVolunteers: maxVolunteers ? parseInt(maxVolunteers) : null,
        currentVolunteers: 0,
        imageUrl: imageUrl || null,
        contactEmail: contactEmail || null,
        contactPhone: contactPhone || null,
        requirements: requirements || null,
        createdById,
        isPublic: true,
        isActive: true
      }
    })

    return NextResponse.json({
      message: 'Event created successfully',
      event
    })
  } catch (error) {
    console.error('Event creation error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
