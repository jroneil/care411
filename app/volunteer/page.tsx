
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, Users, Clock, MapPin, CheckCircle, Loader2, Phone, Mail, User } from 'lucide-react'
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

const volunteerAreas = [
  'Food Distribution Events',
  'Community Outreach',
  'Event Planning & Coordination',
  'Social Media & Marketing',
  'Administrative Support',
  'Fundraising Events',
  'Transportation Services',
  'Translation Services (Spanish)',
  'Other'
]

const timeAvailability = [
  'Weekday Mornings',
  'Weekday Afternoons',
  'Weekday Evenings',
  'Weekend Mornings',
  'Weekend Afternoons',
  'Weekend Evenings',
  'Flexible/As Needed'
]

export default function VolunteerPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    skills: '',
    availability: [] as string[],
    interests: [] as string[],
    experience: '',
    emergencyContact: '',
    emergencyPhone: '',
    backgroundCheck: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleCheckboxChange = (field: 'availability' | 'interests', value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked
        ? [...prev[field], value]
        : prev[field].filter(item => item !== value)
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!formData.firstName || !formData.lastName || !formData.email) {
      toast({
        title: "Required Fields Missing",
        description: "Please fill in your name and email address",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/volunteer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          availability: formData.availability.join(', '),
          interests: formData.interests.join(', ')
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit volunteer application')
      }

      toast({
        title: "Application Submitted!",
        description: "Thank you for volunteering! We'll be in touch soon.",
      })

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zipCode: '',
        skills: '',
        availability: [],
        interests: [],
        experience: '',
        emergencyContact: '',
        emergencyPhone: '',
        backgroundCheck: false,
      })
    } catch (error) {
      console.error('Volunteer submission error:', error)
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
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
              Join Our Team
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Volunteer with <span className="text-teal-600">411 Cares</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Make a meaningful difference in your community. Join our team of dedicated volunteers 
              helping families in the Merrimack Valley area.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Volunteer with Us?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              More than just giving back—you&apos;ll gain meaningful connections and valuable experience
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Heart,
                title: 'Make a Real Impact',
                description: 'See the direct results of your efforts in helping local families and neighbors.'
              },
              {
                icon: Users,
                title: 'Build Community',
                description: 'Connect with like-minded individuals who share your passion for helping others.'
              },
              {
                icon: Clock,
                title: 'Flexible Schedule',
                description: 'Choose volunteer opportunities that fit your availability and interests.'
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <benefit.icon className="w-6 h-6 text-teal-600" />
                    </div>
                    <CardTitle className="text-xl">{benefit.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="leading-relaxed">
                      {benefit.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Volunteer Application
            </h2>
            <p className="text-xl text-gray-600">
              Tell us about yourself and how you&apos;d like to help our community
            </p>
          </motion.div>

          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Users className="w-6 h-6 text-teal-600 mr-2" />
                Join Our Volunteer Team
              </CardTitle>
              <CardDescription>
                Fill out this application and we&apos;ll contact you about upcoming volunteer opportunities.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="flex items-center">
                        <User className="w-4 h-4 mr-2 text-gray-400" />
                        First Name *
                      </Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        placeholder="Enter your first name"
                        className="pl-10"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        placeholder="Enter your last name"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="flex items-center">
                        <Mail className="w-4 h-4 mr-2 text-gray-400" />
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        placeholder="Enter your email"
                        className="pl-10"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="flex items-center">
                        <Phone className="w-4 h-4 mr-2 text-gray-400" />
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="(555) 123-4567"
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address" className="flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                      Address (Optional)
                    </Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange('address', e.target.value)}
                      placeholder="Street address"
                      className="pl-10"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        placeholder="City"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange('zipCode', e.target.value)}
                        placeholder="01830"
                      />
                    </div>
                  </div>
                </div>

                {/* Volunteer Interests */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Areas of Interest</h3>
                  <p className="text-sm text-gray-600">Select the volunteer activities you&apos;re interested in (check all that apply):</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {volunteerAreas.map((area) => (
                      <div key={area} className="flex items-center space-x-2">
                        <Checkbox
                          id={`interest-${area}`}
                          checked={formData.interests.includes(area)}
                          onCheckedChange={(checked) => 
                            handleCheckboxChange('interests', area, checked as boolean)
                          }
                        />
                        <Label htmlFor={`interest-${area}`} className="text-sm">
                          {area}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Availability */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Availability</h3>
                  <p className="text-sm text-gray-600">When are you typically available to volunteer?</p>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {timeAvailability.map((time) => (
                      <div key={time} className="flex items-center space-x-2">
                        <Checkbox
                          id={`time-${time}`}
                          checked={formData.availability.includes(time)}
                          onCheckedChange={(checked) => 
                            handleCheckboxChange('availability', time, checked as boolean)
                          }
                        />
                        <Label htmlFor={`time-${time}`} className="text-sm">
                          {time}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills & Experience */}
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="skills">Skills & Talents</Label>
                    <Textarea
                      id="skills"
                      value={formData.skills}
                      onChange={(e) => handleInputChange('skills', e.target.value)}
                      placeholder="Tell us about any relevant skills, talents, or professional experience..."
                      className="resize-none"
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="experience">Previous Volunteer Experience</Label>
                    <Textarea
                      id="experience"
                      value={formData.experience}
                      onChange={(e) => handleInputChange('experience', e.target.value)}
                      placeholder="Describe any previous volunteer experience (or write 'None' if this is your first time)..."
                      className="resize-none"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Emergency Contact */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Emergency Contact</h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                      <Input
                        id="emergencyContact"
                        value={formData.emergencyContact}
                        onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                        placeholder="Full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                      <Input
                        id="emergencyPhone"
                        type="tel"
                        value={formData.emergencyPhone}
                        onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                        placeholder="(555) 123-4567"
                      />
                    </div>
                  </div>
                </div>

                {/* Background Check */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <Checkbox
                      id="backgroundCheck"
                      checked={formData.backgroundCheck}
                      onCheckedChange={(checked) => 
                        setFormData(prev => ({ ...prev, backgroundCheck: checked as boolean }))
                      }
                    />
                    <Label htmlFor="backgroundCheck" className="text-sm leading-relaxed">
                      I am willing to undergo a background check if required for certain volunteer positions
                    </Label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-6">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="w-full bg-teal-600 hover:bg-teal-700"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Submitting Application...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />
                        Submit Volunteer Application
                      </>
                    )}
                  </Button>
                </div>

                <p className="text-xs text-gray-500 text-center">
                  By submitting this application, you agree to be contacted about volunteer opportunities with 411 Cares Merrimack Valley.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  )
}
