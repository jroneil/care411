
'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Calendar, MapPin, Users, Clock, ArrowRight, User, Phone } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { format, parseISO, isPast } from 'date-fns'

interface Event {
  id: string
  title: string
  description: string | null
  location: string | null
  address: string | null
  startDate: string
  endDate: string | null
  startTime: string | null
  endTime: string | null
  category: string
  maxVolunteers: number | null
  currentVolunteers: number
  imageUrl: string | null
  contactEmail: string | null
  contactPhone: string | null
  requirements: string | null
}

const categoryColors: Record<string, string> = {
  FOOD_DISTRIBUTION: 'bg-green-100 text-green-800',
  VOLUNTEER_TRAINING: 'bg-blue-100 text-blue-800',
  SEASONAL: 'bg-red-100 text-red-800',
  COMMUNITY: 'bg-purple-100 text-purple-800',
  FUNDRAISING: 'bg-yellow-100 text-yellow-800',
  EDUCATIONAL: 'bg-indigo-100 text-indigo-800',
  OTHER: 'bg-gray-100 text-gray-800'
}

const categoryLabels: Record<string, string> = {
  FOOD_DISTRIBUTION: 'Food Distribution',
  VOLUNTEER_TRAINING: 'Volunteer Training',
  SEASONAL: 'Seasonal Event',
  COMMUNITY: 'Community Event',
  FUNDRAISING: 'Fundraising',
  EDUCATIONAL: 'Educational',
  OTHER: 'Other'
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchEvents()
  }, [])

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/events')
      if (response.ok) {
        const data = await response.json()
        setEvents(data.events || [])
      }
    } catch (error) {
      console.error('Error fetching events:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const upcomingEvents = events.filter(event => !isPast(parseISO(event.startDate)))
  const pastEvents = events.filter(event => isPast(parseISO(event.startDate)))

  const formatEventDate = (dateStr: string, timeStr: string | null) => {
    const date = parseISO(dateStr)
    const dateFormatted = format(date, 'EEEE, MMMM d, yyyy')
    return timeStr ? `${dateFormatted} at ${timeStr}` : dateFormatted
  }

  const getVolunteerStatus = (current: number, max: number | null) => {
    if (!max) return null
    const percentage = (current / max) * 100
    if (percentage >= 90) return { color: 'text-red-600', text: 'Nearly Full' }
    if (percentage >= 70) return { color: 'text-yellow-600', text: 'Filling Up' }
    return { color: 'text-green-600', text: 'Spots Available' }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading events...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-teal-50 to-blue-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <Badge variant="secondary" className="mb-4">
              Community Events
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Upcoming <span className="text-teal-600">Events</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Join us for volunteer opportunities, community gatherings, and events that make 
              a real difference in the Merrimack Valley.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Upcoming Events
            </h2>
            <p className="text-xl text-gray-600">
              Mark your calendar and join us in making a difference
            </p>
          </motion.div>

          {upcomingEvents.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No Upcoming Events</h3>
              <p className="text-gray-600">Check back soon for new volunteer opportunities and community events.</p>
            </div>
          ) : (
            <div className="grid lg:grid-cols-2 gap-8">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                    {event.imageUrl && (
                      <div className="aspect-video relative rounded-t-lg overflow-hidden bg-gray-200">
                        <Image
                          src={event.imageUrl}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <CardHeader className="pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <Badge className={categoryColors[event.category] || categoryColors.OTHER}>
                          {categoryLabels[event.category] || event.category}
                        </Badge>
                        {event.maxVolunteers && (
                          <div className="text-sm">
                            {(() => {
                              const status = getVolunteerStatus(event.currentVolunteers, event.maxVolunteers)
                              return status ? (
                                <span className={status.color}>{status.text}</span>
                              ) : null
                            })()}
                          </div>
                        )}
                      </div>
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                      <div className="space-y-2 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {formatEventDate(event.startDate, event.startTime)}
                        </div>
                        {event.location && (
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            {event.location}
                          </div>
                        )}
                        {event.maxVolunteers && (
                          <div className="flex items-center">
                            <Users className="w-4 h-4 mr-2" />
                            {event.currentVolunteers} / {event.maxVolunteers} volunteers
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {event.description && (
                        <CardDescription className="mb-4 leading-relaxed">
                          {event.description}
                        </CardDescription>
                      )}
                      
                      {event.requirements && (
                        <div className="mb-4 p-3 bg-blue-50 rounded-lg">
                          <p className="text-sm text-blue-800">
                            <strong>Requirements:</strong> {event.requirements}
                          </p>
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row gap-3">
                        <Button 
                          className="flex-1 bg-teal-600 hover:bg-teal-700"
                          onClick={() => {
                            if (event.contactEmail) {
                              window.location.href = `mailto:${event.contactEmail}?subject=Volunteer Interest: ${event.title}`
                            }
                          }}
                        >
                          <User className="w-4 h-4 mr-2" />
                          Volunteer for This Event
                        </Button>
                        
                        {event.contactPhone && (
                          <Button variant="outline" asChild>
                            <a href={`tel:${event.contactPhone}`}>
                              <Phone className="w-4 h-4 mr-2" />
                              Call
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <section className="py-20 bg-gray-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                Recent Events
              </h2>
              <p className="text-xl text-gray-600">
                See what we&apos;ve been up to in our community
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastEvents.slice(0, 6).map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full border-0 shadow-md hover:shadow-lg transition-all duration-300">
                    {event.imageUrl && (
                      <div className="aspect-video relative rounded-t-lg overflow-hidden bg-gray-200">
                        <Image
                          src={event.imageUrl}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <CardHeader className="pb-2">
                      <Badge className={categoryColors[event.category] || categoryColors.OTHER} variant="secondary">
                        {categoryLabels[event.category] || event.category}
                      </Badge>
                      <CardTitle className="text-lg">{event.title}</CardTitle>
                      <div className="text-sm text-gray-500">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          {format(parseISO(event.startDate), 'MMM d, yyyy')}
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      {event.description && (
                        <CardDescription className="text-sm leading-relaxed line-clamp-3">
                          {event.description}
                        </CardDescription>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Get Involved?
            </h2>
            <p className="text-xl text-teal-100 mb-8 leading-relaxed">
              Don&apos;t see an event that interests you? Join our volunteer team and 
              we&apos;ll notify you about upcoming opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100" asChild>
                <a href="/volunteer">
                  <Users className="w-5 h-5 mr-2" />
                  Become a Volunteer
                </a>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-teal-600" asChild>
                <a href="/contact">
                  Contact Us
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
