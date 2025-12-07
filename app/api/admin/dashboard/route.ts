
import { NextRequest, NextResponse } from 'next/server'

export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  try {
    const now = new Date()
    const dashboardStats = {
      totalDonations: 12,
      totalDonationAmount: 4250,
      totalVolunteers: 48,
      totalEvents: 6,
      totalContacts: 23,
      urgentContacts: 3,
      recentDonations: [
        { id: '1', amount: 250, donorName: 'Alex Johnson', createdAt: now.toISOString() },
        { id: '2', amount: 100, donorName: 'Taylor Smith', createdAt: now.toISOString() },
      ],
      recentVolunteers: [
        { id: '1', firstName: 'Jamie', lastName: 'Lee', email: 'jamie@example.com', createdAt: now.toISOString() },
        { id: '2', firstName: 'Riley', lastName: 'Patel', email: 'riley@example.com', createdAt: now.toISOString() },
      ],
      recentContacts: [
        { id: '1', name: 'Morgan Chen', subject: 'Food assistance', isUrgent: true, createdAt: now.toISOString() },
        { id: '2', name: 'Priya Singh', subject: 'Volunteer info', isUrgent: false, createdAt: now.toISOString() },
      ],
      upcomingEvents: [
        {
          id: '1',
          title: 'Community Food Drive',
          startDate: now.toISOString(),
          currentVolunteers: 12,
          maxVolunteers: 25,
        },
        {
          id: '2',
          title: 'Winter Clothing Distribution',
          startDate: now.toISOString(),
          currentVolunteers: 8,
          maxVolunteers: 30,
        },
      ],
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
