
'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  Users, 
  Heart, 
  Calendar, 
  Mail, 
  DollarSign, 
  TrendingUp,
  Clock,
  UserCheck,
  AlertTriangle
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import Link from 'next/link'

interface DashboardStats {
  totalDonations: number
  totalDonationAmount: number
  totalVolunteers: number
  totalEvents: number
  totalContacts: number
  urgentContacts: number
  recentDonations: Array<{
    id: string
    amount: number
    donorName: string | null
    createdAt: string
  }>
  recentVolunteers: Array<{
    id: string
    firstName: string
    lastName: string
    email: string
    createdAt: string
  }>
  recentContacts: Array<{
    id: string
    name: string
    subject: string | null
    isUrgent: boolean
    createdAt: string
  }>
  upcomingEvents: Array<{
    id: string
    title: string
    startDate: string
    currentVolunteers: number
    maxVolunteers: number | null
  }>
}

export default function AdminDashboard() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'loading') return
    
    if (!session || session.user?.role !== 'ADMIN') {
      router.push('/admin/login')
      return
    }

    fetchDashboardStats()
  }, [session, status, router])

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/admin/dashboard')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading dashboard...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!session || session.user?.role !== 'ADMIN') {
    return null
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Dashboard Header */}
      <section className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
                <p className="text-gray-600">Welcome back! Here&apos;s your organization overview.</p>
              </div>
              <div className="mt-4 lg:mt-0">
                <Badge variant="secondary" className="bg-teal-100 text-teal-800">
                  <UserCheck className="w-4 h-4 mr-1" />
                  Administrator
                </Badge>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Key Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card className="border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Donations</CardTitle>
              <DollarSign className="h-4 w-4 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {formatCurrency(stats?.totalDonationAmount || 0)}
              </div>
              <p className="text-xs text-gray-600">
                {stats?.totalDonations || 0} donations received
              </p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Active Volunteers</CardTitle>
              <Users className="h-4 w-4 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats?.totalVolunteers || 0}</div>
              <p className="text-xs text-gray-600">Registered volunteers</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Scheduled Events</CardTitle>
              <Calendar className="h-4 w-4 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats?.totalEvents || 0}</div>
              <p className="text-xs text-gray-600">Total events created</p>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Contact Messages</CardTitle>
              <Mail className="h-4 w-4 text-teal-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stats?.totalContacts || 0}</div>
              <p className="text-xs text-gray-600">
                {stats?.urgentContacts ? (
                  <span className="text-red-600 font-medium">
                    {stats.urgentContacts} urgent
                  </span>
                ) : (
                  'No urgent messages'
                )}
              </p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mb-8"
        >
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <BarChart3 className="w-5 h-5 text-teal-600 mr-2" />
                Quick Actions
              </CardTitle>
              <CardDescription>Manage your organization&apos;s content and data</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button asChild className="bg-teal-600 hover:bg-teal-700">
                  <Link href="/admin/events/new">
                    <Calendar className="w-4 h-4 mr-2" />
                    Create Event
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/admin/volunteers">
                    <Users className="w-4 h-4 mr-2" />
                    View Volunteers
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/admin/donations">
                    <Heart className="w-4 h-4 mr-2" />
                    View Donations
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/admin/contacts">
                    <Mail className="w-4 h-4 mr-2" />
                    View Messages
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Activity */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Recent Donations */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="w-5 h-5 text-teal-600 mr-2" />
                  Recent Donations
                </CardTitle>
                <CardDescription>Latest donation activity</CardDescription>
              </CardHeader>
              <CardContent>
                {stats?.recentDonations && stats.recentDonations.length > 0 ? (
                  <div className="space-y-3">
                    {stats.recentDonations.slice(0, 5).map((donation) => (
                      <div key={donation.id} className="flex items-center justify-between py-2">
                        <div>
                          <p className="font-medium text-gray-900">
                            {donation.donorName || 'Anonymous'}
                          </p>
                          <p className="text-sm text-gray-600">{formatDate(donation.createdAt)}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-teal-600">
                            {formatCurrency(donation.amount)}
                          </p>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" asChild className="w-full mt-4">
                      <Link href="/admin/donations">View All Donations</Link>
                    </Button>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No donations yet</p>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Contact Messages */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Clock className="w-5 h-5 text-teal-600 mr-2" />
                  Recent Messages
                </CardTitle>
                <CardDescription>Latest contact form submissions</CardDescription>
              </CardHeader>
              <CardContent>
                {stats?.recentContacts && stats.recentContacts.length > 0 ? (
                  <div className="space-y-3">
                    {stats.recentContacts.slice(0, 5).map((contact) => (
                      <div key={contact.id} className="flex items-start justify-between py-2">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2">
                            <p className="font-medium text-gray-900">{contact.name}</p>
                            {contact.isUrgent && (
                              <Badge variant="destructive" className="text-xs">
                                <AlertTriangle className="w-3 h-3 mr-1" />
                                Urgent
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 truncate">
                            {contact.subject || 'No subject'}
                          </p>
                          <p className="text-xs text-gray-500">{formatDate(contact.createdAt)}</p>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" size="sm" asChild className="w-full mt-4">
                      <Link href="/admin/contacts">View All Messages</Link>
                    </Button>
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No messages yet</p>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Upcoming Events */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Card className="border-0 shadow-md">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 text-teal-600 mr-2" />
                Upcoming Events
              </CardTitle>
              <CardDescription>Events requiring your attention</CardDescription>
            </CardHeader>
            <CardContent>
              {stats?.upcomingEvents && stats.upcomingEvents.length > 0 ? (
                <div className="space-y-4">
                  {stats.upcomingEvents.slice(0, 3).map((event) => (
                    <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div>
                        <h3 className="font-medium text-gray-900">{event.title}</h3>
                        <p className="text-sm text-gray-600">{formatDate(event.startDate)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {event.currentVolunteers} / {event.maxVolunteers || '∞'} volunteers
                        </p>
                        {event.maxVolunteers && (
                          <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                            <div
                              className="bg-teal-600 h-2 rounded-full"
                              style={{
                                width: `${Math.min((event.currentVolunteers / event.maxVolunteers) * 100, 100)}%`
                              }}
                            ></div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  <Button variant="outline" size="sm" asChild className="w-full">
                    <Link href="/admin/events">Manage All Events</Link>
                  </Button>
                </div>
              ) : (
                <p className="text-gray-500 text-center py-4">No upcoming events scheduled</p>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <Footer />
    </div>
  )
}
