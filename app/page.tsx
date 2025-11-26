
'use client'

import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Heart, Users, Calendar, HandHeart, Phone, Mail, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Badge } from '@/components/ui/badge'

const stats = [
  { number: 25000, label: 'Facebook Community Members', suffix: '+' },
  { number: 500, label: 'Families Helped Monthly', suffix: '+' },
  { number: 50, label: 'Active Volunteers', suffix: '+' },
  { number: 12, label: 'Monthly Events', suffix: '+' }
]

const services = [
  {
    icon: HandHeart,
    title: 'Food Distribution',
    description: 'Monthly food distribution events helping families access nutritious meals and essential groceries.'
  },
  {
    icon: Users,
    title: 'Community Support',
    description: 'Connecting community members with resources for housing, employment, and emergency assistance.'
  },
  {
    icon: Heart,
    title: 'Volunteer Programs',
    description: 'Meaningful volunteer opportunities that make a real difference in our neighbors\' lives.'
  },
  {
    icon: Calendar,
    title: 'Community Events',
    description: 'Regular events that bring our community together and strengthen neighborhood bonds.'
  }
]

function AnimatedCounter({ end, duration = 2000, suffix = '', prefix = '' }: {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
}) {
  const [ref, inView] = useInView({ triggerOnce: true })
  
  return (
    <span ref={ref} className="text-4xl font-bold text-teal-600">
      {inView && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {prefix}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration / 1000, ease: "easeOut" }}
          >
            {Math.floor(end).toLocaleString()}
          </motion.span>
          {suffix}
        </motion.span>
      )}
    </span>
  )
}

export default function HomePage() {
  const [heroRef, heroInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [servicesRef, servicesInView] = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative bg-gradient-to-br from-teal-50 to-blue-50 py-20 overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('https://www.shutterstock.com/image-vector/smooth-beige-wave-gradient-background-260nw-2473307171.jpg bg-cover bg-center opacity-10"></div>
        
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center lg:text-left"
            >
              <Badge variant="secondary" className="mb-4">
                501(c)(3) Non-Profit Organization
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
                Together, We Are{' '}
                <span className="text-teal-600">411 Cares</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                Forging a safe and healthy community through collaborative efforts. 
                We address poverty, food insecurity, and unemployment in the Greater Haverhill and Merrimack Valley area.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild className="bg-teal-600 hover:bg-teal-700">
                  <Link href="/donate">
                    <Heart className="w-5 h-5 mr-2" />
                    Make a Donation
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/volunteer">
                    <Users className="w-5 h-5 mr-2" />
                    Volunteer Today
                  </Link>
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={heroInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-2xl bg-gray-200">
                <Image
                  src="https://media.istockphoto.com/id/1496112689/photo/young-multiracial-group-stacking-hands-together-happy-diverse-friends-united-at-community.jpg?s=612x612&w=0&k=20&c=ARk3sEhEElK3M27oN-VcVNtAEULHJzZetRihjLsXuu8="
                  alt="Community members working together"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section 
        ref={statsRef}
        className="py-20 bg-white"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={statsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Our Community Impact
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              See how our community comes together to make a difference in the Merrimack Valley
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={statsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                className="text-center"
              >
                <AnimatedCounter
                  end={stat.number}
                  suffix={stat.suffix}
                />
                <p className="text-gray-600 mt-2 text-sm lg:text-base">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section 
        ref={servicesRef}
        className="py-20 bg-gray-50"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              How We Help Our Community
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From food distribution to volunteer coordination, we&apos;re here to support our neighbors
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                animate={servicesInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md">
                  <CardHeader className="text-center pb-4">
                    <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <service.icon className="w-6 h-6 text-teal-600" />
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center text-gray-600 leading-relaxed">
                      {service.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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
              Ready to Make a Difference?
            </h2>
            <p className="text-xl text-teal-100 mb-8 leading-relaxed">
              Join our community of caring neighbors. Whether through volunteering, donating, 
              or attending our events, every contribution matters.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-teal-600 hover:bg-gray-100" asChild>
                <Link href="/volunteer">
                  <Users className="w-5 h-5 mr-2" />
                  Become a Volunteer
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-teal-600" asChild>
                <Link href="/events">
                  <Calendar className="w-5 h-5 mr-2" />
                  View Events
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                Get in Touch
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                Have questions or want to learn more about how you can help? 
                We&apos;d love to hear from you!
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-teal-600" />
                  <span className="text-gray-700">(978) 857-7696</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-teal-600" />
                  <span className="text-gray-700">info@411caresmerrimackvalley.org</span>
                </div>
              </div>
              <Button className="mt-8 bg-teal-600 hover:bg-teal-700" asChild>
                <Link href="/contact">
                  Send Us a Message
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/3] relative rounded-2xl overflow-hidden shadow-lg bg-gray-200">
                <Image
                  src="https://northofboston.org/wp-content/uploads/2024/02/20220825_SI_Haverhill_033-scaled.jpg"
                  alt="Haverhill, Massachusetts community"
                  fill
                  className="object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
