'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Lock, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export default function AdminLoginPage() {
  const router = useRouter()

  useEffect(() => {
    router.prefetch('/admin')
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Card className="border-0 shadow-xl">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Lock className="w-8 h-8 text-teal-600" />
              </div>
              <CardTitle className="text-2xl font-bold">Admin Access</CardTitle>
              <CardDescription>
                Authentication is temporarily disabled. You can access the dashboard directly.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6 text-sm text-gray-600">
                <p>
                  We&apos;re currently working without a database or authentication layer. This means you can view the admin dashboard without logging in, but any changes you make will not be saved.
                </p>
                <p className="font-medium text-gray-800">
                  When authentication is restored, you&apos;ll need valid admin credentials to access this area.
                </p>
                <Button
                  className="w-full bg-teal-600 hover:bg-teal-700"
                  size="lg"
                  onClick={() => router.push('/admin')}
                >
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">
                  This area will be restricted to authorized administrators once authentication is re-enabled.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mt-8"
        >
          <Button variant="outline" asChild>
            <a href="/">
              ← Back to Website
            </a>
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
