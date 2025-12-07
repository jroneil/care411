
'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Heart, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 relative">
              <Image
                src="/logo.png"
                alt="411 Cares Merrimack Valley"
                fill
                className="object-contain"
              />
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold text-gray-900">411 Cares</h1>
              <p className="text-xs text-teal-600">Merrimack Valley</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-teal-600 transition-colors font-medium">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-teal-600 transition-colors font-medium">
              About
            </Link>
            <Link href="/events" className="text-gray-700 hover:text-teal-600 transition-colors font-medium">
              Events
            </Link>
            <Link href="/volunteer" className="text-gray-700 hover:text-teal-600 transition-colors font-medium">
              Volunteer
            </Link>
            <Link href="/contact" className="text-gray-700 hover:text-teal-600 transition-colors font-medium">
              Contact
            </Link>
            <Button asChild className="bg-teal-600 hover:bg-teal-700">
              <Link href="/donate">
                <Heart className="w-4 h-4 mr-2" />
                Donate
              </Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/admin">Admin</Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <Link 
              href="/" 
              className="block px-3 py-2 text-gray-700 hover:text-teal-600 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="block px-3 py-2 text-gray-700 hover:text-teal-600 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link 
              href="/events" 
              className="block px-3 py-2 text-gray-700 hover:text-teal-600 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Events
            </Link>
            <Link 
              href="/volunteer" 
              className="block px-3 py-2 text-gray-700 hover:text-teal-600 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Volunteer
            </Link>
            <Link 
              href="/contact" 
              className="block px-3 py-2 text-gray-700 hover:text-teal-600 transition-colors font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <div className="px-3 py-2">
              <Button asChild className="w-full bg-teal-600 hover:bg-teal-700">
                <Link href="/donate" onClick={() => setIsMenuOpen(false)}>
                  <Heart className="w-4 h-4 mr-2" />
                  Donate
                </Link>
              </Button>
            </div>
            <div className="px-3 py-2">
              <Button variant="outline" asChild className="w-full">
                <Link href="/admin" onClick={() => setIsMenuOpen(false)}>Admin</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
