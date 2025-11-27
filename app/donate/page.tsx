
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart, DollarSign, Users, CheckCircle, ArrowRight, Loader2 } from 'lucide-react'
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

const presetAmounts = [25, 50, 100, 250]

const impactExamples = [
  { amount: 25, description: 'Provides a week of groceries for a family of four' },
  { amount: 50, description: 'Supports two families with emergency food assistance' },
  { amount: 100, description: 'Helps fund a community food distribution event' },
  { amount: 250, description: 'Sponsors holiday meals for 10 families in need' }
]

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null)
  const [customAmount, setCustomAmount] = useState('')
  const [donorName, setDonorName] = useState('')
  const [donorEmail, setDonorEmail] = useState('')
  const [message, setMessage] = useState('')
  const [isAnonymous, setIsAnonymous] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount)
    setCustomAmount('')
  }

  const handleCustomAmountChange = (value: string) => {
    setCustomAmount(value)
    setSelectedAmount(null)
  }

  const getDonationAmount = () => {
    if (selectedAmount) return selectedAmount
    if (customAmount) return parseFloat(customAmount)
    return 0
  }

  const handleDonation = async () => {
    // Payment functionality temporarily disabled
    toast({
      title: "Donations Temporarily Disabled",
      description: "We're currently updating our payment system. Please check back soon or contact us directly to make a donation.",
      variant: "default"
    })
    return
    
    // Original payment code commented out for now
    /*
    const amount = getDonationAmount()
    
    if (amount < 1) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a donation amount of at least $1",
        variant: "destructive"
      })
      return
    }

    if (!donorEmail) {
      toast({
        title: "Email Required",
        description: "Please enter your email address",
        variant: "destructive"
      })
      return
    }

    setIsProcessing(true)

    try {
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount * 100, // Convert to cents
          donorName: isAnonymous ? 'Anonymous' : donorName,
          donorEmail,
          message,
          isAnonymous
        }),
      })

      const { clientSecret, error } = await response.json()

      if (error) {
        throw new Error(error)
      }

      // Redirect to Stripe Checkout URL
      if (clientSecret) {
        window.location.href = clientSecret
      } else {
        throw new Error('No checkout URL received')
      }
    } catch (error) {
      console.error('Donation error:', error)
      toast({
        title: "Donation Failed",
        description: "There was an error processing your donation. Please try again.",
        variant: "destructive"
      })
    } finally {
      setIsProcessing(false)
    }
    */
  }

  const currentImpact = impactExamples.find(impact => impact.amount === getDonationAmount()) ||
    impactExamples.find(impact => impact.amount <= getDonationAmount())

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
              Make a Difference
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Support Our <span className="text-teal-600">Community</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Your donation directly impacts families in the Merrimack Valley, 
              helping provide food, support, and hope to those who need it most.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Donation Form */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
                      <Heart className="w-6 h-6 text-teal-600 mr-2" />
                      Make Your Donation
                    </CardTitle>
                    <CardDescription>
                      All donations are tax-deductible. You will receive a receipt via email.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Amount Selection */}
                    <div className="space-y-4">
                      <Label className="text-lg font-semibold">Donation Amount</Label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {presetAmounts.map((amount) => (
                          <Button
                            key={amount}
                            variant={selectedAmount === amount ? "default" : "outline"}
                            className={`h-12 ${selectedAmount === amount ? 'bg-teal-600 hover:bg-teal-700' : ''}`}
                            onClick={() => handleAmountSelect(amount)}
                          >
                            ${amount}
                          </Button>
                        ))}
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-5 h-5 text-gray-400" />
                        <Input
                          type="number"
                          placeholder="Enter custom amount"
                          value={customAmount}
                          onChange={(e) => handleCustomAmountChange(e.target.value)}
                          min="1"
                          step="1"
                          className="pl-8"
                        />
                      </div>
                    </div>

                    {/* Donor Information */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="donorName">Full Name</Label>
                        <Input
                          id="donorName"
                          value={donorName}
                          onChange={(e) => setDonorName(e.target.value)}
                          placeholder="Enter your full name"
                          disabled={isAnonymous}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="donorEmail">Email Address *</Label>
                        <Input
                          id="donorEmail"
                          type="email"
                          value={donorEmail}
                          onChange={(e) => setDonorEmail(e.target.value)}
                          placeholder="Enter your email"
                          required
                        />
                      </div>
                    </div>

                    {/* Message */}
                    <div className="space-y-2">
                      <Label htmlFor="message">Message (Optional)</Label>
                      <Textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Leave a message of support..."
                        className="resize-none"
                        rows={3}
                      />
                    </div>

                    {/* Anonymous Option */}
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="anonymous"
                        checked={isAnonymous}
                        onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
                      />
                      <Label htmlFor="anonymous" className="text-sm">
                        Make this donation anonymous
                      </Label>
                    </div>

                    {/* Donate Button */}
                    <Button
                      onClick={handleDonation}
                      disabled={isProcessing || getDonationAmount() < 1}
                      size="lg"
                      className="w-full bg-teal-600 hover:bg-teal-700"
                    >
                      {isProcessing ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Heart className="w-5 h-5 mr-2" />
                          Donate ${getDonationAmount() || 0}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>

                    <div className="space-y-2">
                      <p className="text-xs text-gray-500 text-center">
                        Secure payment processed by Stripe. We never store your payment information.
                      </p>
                      <div className="bg-amber-50 border border-amber-200 rounded-md p-3">
                        <p className="text-sm text-amber-800 text-center">
                          <strong>Note:</strong> Online donations are temporarily unavailable. Please contact us directly to make a donation.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Impact & Info */}
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <Card className="border-0 shadow-md">
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center">
                      <Users className="w-5 h-5 text-teal-600 mr-2" />
                      Your Impact
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {currentImpact ? (
                      <div className="space-y-2">
                        <p className="font-semibold text-2xl text-teal-600">
                          ${currentImpact.amount}
                        </p>
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {currentImpact.description}
                        </p>
                      </div>
                    ) : (
                      <p className="text-gray-600">
                        Every donation makes a difference in our community.
                      </p>
                    )}
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
                    <CardTitle className="text-xl flex items-center">
                      <CheckCircle className="w-5 h-5 text-teal-600 mr-2" />
                      Tax Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Organization:</span>
                      <span className="font-medium">411 Cares Merrimack Valley</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Tax ID:</span>
                      <span className="font-medium">85-1657800</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Status:</span>
                      <span className="font-medium">501(c)(3) Non-Profit</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">
                      Your donation is tax-deductible to the full extent allowed by law.
                    </p>
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
                      <p className="text-sm text-gray-600 leading-relaxed">
                        "Together, we are 411 Cares—where caring is just the beginning."
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Examples */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              See Your Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Every dollar you donate directly supports families in our community
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {impactExamples.map((example, index) => (
              <motion.div
                key={example.amount}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center border-0 shadow-md hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <CardTitle className="text-2xl text-teal-600">
                      ${example.amount}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="leading-relaxed">
                      {example.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
