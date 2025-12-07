
'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, Heart, Home, Share2 } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Badge } from '@/components/ui/badge'

interface DonationDetails {
  amount: number
  donorEmail: string
  createdAt: string
}

export default function DonationSuccessPage() {
  const searchParams = useSearchParams()
  const [donationDetails, setDonationDetails] = useState<DonationDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const sessionId = searchParams?.get('session_id')

  useEffect(() => {
    if (sessionId) {
      // In a real implementation, you would fetch donation details from your API
      // For now, we'll show a generic success message
      setDonationDetails({
        amount: 0,
        donorEmail: '',
        createdAt: new Date().toISOString()
      })
    }
    setIsLoading(false)
  }, [sessionId])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: '411 Cares Merrimack Valley',
          text: 'I just made a donation to help families in the Merrimack Valley. Join me in supporting our community!',
          url: window.location.origin,
        })
      } catch (error) {
        console.error('Error sharing:', error)
      }
    } else {
      // Fallback for browsers that don't support Web Share API
      const url = `${window.location.origin}`
      navigator.clipboard.writeText(url)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Processing your donation...</p>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  if (!sessionId) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Session</h1>
            <p className="text-gray-600 mb-6">We couldn't find your donation session.</p>
            <Button asChild>
              <Link href="/donate">Try Again</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Success Section */}
      <section className="py-20 bg-gradient-to-br from-green-50 to-teal-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            
            <Badge variant="secondary" className="mb-4 bg-green-100 text-green-800">
              Donation Successful
            </Badge>
            
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Thank You for Your <span className="text-teal-600">Generosity!</span>
            </h1>
            
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 leading-relaxed">
              Your donation will directly impact families in the Merrimack Valley. 
              Together, we&apos;re making our community stronger.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Details & Next Steps */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Donation Details */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Heart className="w-5 h-5 text-teal-600 mr-2" />
                    What Happens Next?
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-teal-600">1</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Receipt Sent</h3>
                      <p className="text-sm text-gray-600">A tax-deductible receipt has been sent to your email.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-teal-600">2</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Funds Allocated</h3>
                      <p className="text-sm text-gray-600">Your donation will be used for food distribution, community support, and emergency assistance.</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-teal-600">3</span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Impact Updates</h3>
                      <p className="text-sm text-gray-600">We&apos;ll keep you informed about how your donation is making a difference.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6"
            >
              <Card className="border-0 shadow-lg">
                <CardHeader>
                  <CardTitle>Get More Involved</CardTitle>
                  <CardDescription>
                    There are many ways to support our community beyond donations.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700" asChild>
                    <Link href="/volunteer">
                      <Heart className="w-4 h-4 mr-2" />
                      Volunteer with Us
                    </Link>
                  </Button>
                  
                  <Button variant="outline" className="w-full" asChild>
                    <Link href="/events">
                      Upcoming Events
                    </Link>
                  </Button>
                  
                  <Button variant="outline" className="w-full" onClick={handleShare}>
                    <Share2 className="w-4 h-4 mr-2" />
                    Share Our Mission
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-md bg-teal-50">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Heart className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-700 font-medium mb-1">
                      Tax ID: 85-1657800
                    </p>
                    <p className="text-xs text-gray-600">
                      411 Cares Merrimack Valley is a 501(c)(3) non-profit organization
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Return Home */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Button size="lg" variant="outline" asChild>
              <Link href="/">
                <Home className="w-5 h-5 mr-2" />
                Return to Homepage
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
