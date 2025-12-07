
import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/db'

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get all statistics in parallel
    const [
      totalDonations,
      totalDonationAmount,
      totalVolunteers,
      totalEvents,
      totalContacts,
      urgentContacts,
      recentDonations,
      recentVolunteers,
      recentContacts,
      upcomingEvents
    ] = await Promise.all([
      // Total donations count
      prisma.donation.count({ where: { status: 'COMPLETED' } }),
      
      // Total donation amount
      prisma.donation.aggregate({
        where: { status: 'COMPLETED' },
        _sum: { amount: true }
      }).then((result: { _sum: { amount: any } }) => result._sum.amount || 0),
      
      // Total active volunteers
      prisma.volunteer.count({ where: { isActive: true } }),
      
      // Total events
      prisma.event.count({ where: { isActive: true } }),
      
      // Total contact submissions
      prisma.contactSubmission.count(),
      
      // Urgent contact submissions
      prisma.contactSubmission.count({ where: { isUrgent: true, status: { not: 'CLOSED' } } }),
      
      // Recent donations (last 10)
      prisma.donation.findMany({
        where: { status: 'COMPLETED' },
        orderBy: { createdAt: 'desc' },
        take: 10,
        select: {
          id: true,
          amount: true,
          donorName: true,
          createdAt: true
        }
      }),
      
      // Recent volunteers (last 10)
      prisma.volunteer.findMany({
        where: { isActive: true },
        orderBy: { createdAt: 'desc' },
        take: 10,
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          createdAt: true
        }
      }),
      
      // Recent contact submissions (last 10)
      prisma.contactSubmission.findMany({
        orderBy: { createdAt: 'desc' },
        take: 10,
        select: {
          id: true,
          name: true,
          subject: true,
          isUrgent: true,
          createdAt: true
        }
      }),
      
      // Upcoming events (next 10)
      prisma.event.findMany({
        where: { 
          isActive: true,
          isPublic: true,
          startDate: { gte: new Date() }
        },
        orderBy: { startDate: 'asc' },
        take: 10,
        select: {
          id: true,
          title: true,
          startDate: true,
          currentVolunteers: true,
          maxVolunteers: true
        }
      })
    ])

    const dashboardStats = {
      totalDonations,
      totalDonationAmount,
      totalVolunteers,
      totalEvents,
      totalContacts,
      urgentContacts,
      recentDonations,
      recentVolunteers,
      recentContacts,
      upcomingEvents
    }

    return NextResponse.json(dashboardStats)
  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
