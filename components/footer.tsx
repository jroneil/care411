
import Link from 'next/link'
import { Heart, Phone, Mail, MapPin } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="w-6 h-6 text-teal-400" />
              <h3 className="text-lg font-bold">411 Cares</h3>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Together, we are 411 Cares—where caring is just the beginning. 
              Forging a safe and healthy community through collaborative efforts.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Get Involved</h3>
            <div className="space-y-2">
              <Link href="/volunteer" className="block text-gray-300 hover:text-teal-400 transition-colors text-sm">
                Volunteer with Us
              </Link>
              <Link href="/donate" className="block text-gray-300 hover:text-teal-400 transition-colors text-sm">
                Make a Donation
              </Link>
              <Link href="/events" className="block text-gray-300 hover:text-teal-400 transition-colors text-sm">
                Upcoming Events
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Phone className="w-4 h-4" />
                <span>(978) 857-7696</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Mail className="w-4 h-4" />
                <span>info@411caresmerrimackvalley.org</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <MapPin className="w-4 h-4" />
                <span>Greater Haverhill & Merrimack Valley</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} 411 Cares Merrimack Valley. 501(c)(3) Non-Profit Organization. Tax ID: 85-1657800
          </p>
        </div>
      </div>
    </footer>
  )
}
