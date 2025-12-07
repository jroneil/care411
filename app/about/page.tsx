
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Heart, Users, Target, Award } from 'lucide-react'
import Image from 'next/image'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Badge } from '@/components/ui/badge'

const values = [
  {
    icon: Heart,
    title: 'Compassion',
    description: 'We lead with empathy and understanding, treating every community member with dignity and respect.'
  },
  {
    icon: Users,
    title: 'Community',
    description: 'Together we are stronger. We believe in the power of neighbors helping neighbors.'
  },
  {
    icon: Target,
    title: 'Impact',
    description: 'Every action we take is focused on creating meaningful, positive change in peoples\' lives.'
  },
  {
    icon: Award,
    title: 'Integrity',
    description: 'We operate with transparency, accountability, and unwavering commitment to our mission.'
  }
]

const leadership = [
  { name: 'Dee O\'Neil', role: 'Executive Board Member' },
  { name: 'Allis Sears', role: 'Executive Board Member' },
  { name: 'Helen Sheehan', role: 'Executive Board Member' },
  { name: 'Brian Houle', role: 'Executive Board Member' }
]

export default function AboutPage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [storyRef, storyInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [valuesRef, valuesInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative bg-gradient-to-br from-teal-50 to-blue-50 py-20"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <Badge variant="secondary" className="mb-4">
              Our Story
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              About <span className="text-teal-600">411 Cares</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From a Facebook group to a federally recognized 501(c)(3) charity, 
              our journey is rooted in community compassion and the Golden Rule.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Our Story Section */}
      <section 
        ref={storyRef}
        className="py-20 bg-white"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Our Journey
              </h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  What started as a simple Facebook group has grown into a 25,000+ member community 
                  dedicated to helping neighbors in the Greater Haverhill and Merrimack Valley area.
                </p>
                <p>
                  During the challenging times of the pandemic, our community came together in 
                  unprecedented ways. We organized mask distribution, lunch programs for children, 
                  and provided crucial support for first responders and healthcare workers.
                </p>
                <p>
                  Today, as a federally recognized 501(c)(3) charity, we continue to address the 
                  root causes of poverty, food insecurity, home insecurity, and unemployment through 
                  collaborative community efforts.
                </p>
                <p>
                  Guided by compassion and the Golden Rule, we believe that together, we can forge 
                  a safe and healthy community where everyone has the opportunity to thrive.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={storyInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-lg bg-gray-200">
                <Image
                  src="https://thumbs.dreamstime.com/b/volunteers-share-food-to-fortunate-multiethnic-voluntary-individuals-distribute-donated-food-extending-helping-hand-to-311455682.jpg"
                  alt="Volunteers helping community members"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg">
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-teal-600" />
                  </div>
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-lg text-gray-600 leading-relaxed">
                    To forge a safe and healthy community through collaborative efforts, 
                    addressing poverty, food insecurity, home insecurity, and unemployment 
                    in the Greater Haverhill and Merrimack Valley area.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-0 shadow-lg">
                <CardHeader className="text-center pb-6">
                  <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Heart className="w-8 h-8 text-teal-600" />
                  </div>
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-lg text-gray-600 leading-relaxed">
                    A thriving Merrimack Valley where every individual and family has access 
                    to basic needs, opportunities for growth, and the support of a caring community 
                    that believes caring is just the beginning.
                  </CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section 
        ref={valuesRef}
        className="py-20 bg-white"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Core Values
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do in service of our community
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="h-full text-center border-0 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                  <CardHeader className="pb-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-6 h-6 text-teal-600" />
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-gray-600 leading-relaxed">
                      {value.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Executive Leadership
            </h2>
            <p className="text-xl text-gray-600">
              Dedicated community leaders committed to our mission
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadership.map((leader, index) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="text-center border-0 shadow-md">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{leader.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-teal-600 font-medium">
                      {leader.role}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tax Info */}
      <section className="py-12 bg-teal-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              501(c)(3) Non-Profit Organization
            </h3>
            <p className="text-teal-100 text-lg">
              Tax ID: 85-1657800 • All donations are tax-deductible
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
