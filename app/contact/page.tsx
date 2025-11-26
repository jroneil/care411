
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Phone, MapPin, Send, CheckCircle, Loader2, Clock, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Badge } from '@/components/ui/badge'
import { useToast } from '@/hooks/use-toast'

const contactMethods = [
  {
    icon: Phone,
    title: 'Phone',
    description: '(978) 857-7696',
    action: 'tel:(978) 857-7696',
    note: 'Monday - Friday, 9 AM - 5 PM'
  },
  {
    icon: Mail,
    title: 'Email',
    description: 'info@411caresmerrimackvalley.org',
    action: 'mailto:info@411caresmerrimackvalley.org',
    note: 'We respond within 24 hours'
  },
  {
    icon: MapPin,
    title: 'Service Area',
    description: 'Greater Haverhill & Merrimack Valley',
    note: 'Massachusetts'
  }
]

const commonSubjects = [
  'General Information',
  'Volunteer Opportunities', 
  'Donation Questions',
  'Event Information',
  'Partnership Inquiry',
  'Media/Press Inquiry',
  'Other'
]

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    isUrgent: false
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in your name, email, and message",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit contact form')
      }

      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you soon.",
      })

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        isUrgent: false
      })
    } catch (error) {
      console.error('Contact form submission error:', error)
      toast({
        title: "Submission Failed",
        description: "There was an error sending your message. Please try again or call us directly.",
        variant: "destructive"
      })
    } finally {
      setIsSubmitting(false)
    }
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
              Get in Touch
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Contact <span className="text-teal-600">411 Cares</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Have questions, want to volunteer, or need assistance? We&apos;re here to help 
              and would love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {contactMethods.map((method, index) => (
              <motion.div
                key={method.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="text-center border-0 shadow-md hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <method.icon className="w-6 h-6 text-teal-600" />
                    </div>
                    <CardTitle className="text-xl">{method.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-900 font-medium mb-2">
                      {method.action ? (
                        <a 
                          href={method.action} 
                          className="hover:text-teal-600 transition-colors"
                        >
                          {method.description}
                        </a>
                      ) : (
                        method.description
                      )}
                    </CardDescription>
                    <p className="text-sm text-gray-600">{method.note}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="text-2xl flex items-center">
                      <Send className="w-6 h-6 text-teal-600 mr-2" />
                      Send Us a Message
                    </CardTitle>
                    <CardDescription>
                      Fill out the form below and we&apos;ll get back to you as soon as possible.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Contact Information */}
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange('email', e.target.value)}
                            placeholder="Enter your email"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange('phone', e.target.value)}
                            placeholder="(555) 123-4567"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <select
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            value={formData.subject}
                            onChange={(e) => handleInputChange('subject', e.target.value)}
                          >
                            <option value="">Select a subject</option>
                            {commonSubjects.map(subject => (
                              <option key={subject} value={subject}>{subject}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Message */}
                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange('message', e.target.value)}
                          placeholder="Tell us how we can help you or what you'd like to know..."
                          className="resize-none"
                          rows={6}
                          required
                        />
                      </div>

                      {/* Urgent Option */}
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="isUrgent"
                          checked={formData.isUrgent}
                          onCheckedChange={(checked) => handleInputChange('isUrgent', checked as boolean)}
                        />
                        <Label htmlFor="isUrgent" className="text-sm">
                          This is urgent and needs immediate attention
                        </Label>
                      </div>

                      {/* Submit Button */}
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        size="lg"
                        className="w-full bg-teal-600 hover:bg-teal-700"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                            Sending Message...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>

                      <p className="text-xs text-gray-500 text-center">
                        We typically respond to messages within 24 hours. For urgent matters, please call us directly.
                      </p>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Info & FAQ */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center">
                      <Clock className="w-5 h-5 text-teal-600 mr-2" />
                      Response Times
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">General inquiries:</span>
                      <span className="font-medium">24-48 hours</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Volunteer applications:</span>
                      <span className="font-medium">1-2 business days</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Urgent matters:</span>
                      <span className="font-medium">Same day</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Phone calls:</span>
                      <span className="font-medium">Mon-Fri, 9 AM-5 PM</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl">Quick Questions?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">How can I volunteer?</h4>
                      <p className="text-sm text-gray-600">Visit our volunteer page to fill out an application.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">How do I donate?</h4>
                      <p className="text-sm text-gray-600">You can make secure online donations through our donate page.</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">Are donations tax-deductible?</h4>
                      <p className="text-sm text-gray-600">Yes! We&apos;re a 501(c)(3) organization. Tax ID: 85-1657800.</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                <Card className="border-0 shadow-md bg-teal-50">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <Heart className="w-8 h-8 text-teal-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-700 font-medium mb-1">
                        Emergency Assistance
                      </p>
                      <p className="text-xs text-gray-600 leading-relaxed">
                        If you need immediate help with food, shelter, or other emergency assistance, 
                        please call us at (978) 857-7696 or mark your message as urgent.
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
