"use client"
import { useState } from "react"
import Link from "next/link"

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Language Academy
        </Link>
        
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium">Home</Link>
          <Link href="/resources" className="text-gray-600 hover:text-blue-600 font-medium">Resources</Link>
          <Link href="/video-room" className="text-gray-600 hover:text-blue-600 font-medium">Video Room</Link>
          <Link href="/calendar" className="text-gray-600 hover:text-blue-600 font-medium">Calendar</Link>
          <Link href="/flashcards" className="text-gray-600 hover:text-blue-600 font-medium">Flashcards</Link>
          <Link href="/dashboard" className="text-gray-600 hover:text-blue-600 font-medium">Dashboard</Link>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/register" className="hidden md:block bg-gradient-to-r from-blue-600 to-purple-600 text-white px-5 py-2 rounded-full font-medium hover:shadow-lg transition text-sm">Sign Up</Link>
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden text-gray-600 focus:outline-none"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t px-4 pb-4 pt-2 space-y-2">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-600 hover:text-blue-600 font-medium">Home</Link>
          <Link href="/resources" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-600 hover:text-blue-600 font-medium">Resources</Link>
          <Link href="/video-room" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-600 hover:text-blue-600 font-medium">Video Room</Link>
          <Link href="/calendar" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-600 hover:text-blue-600 font-medium">Calendar</Link>
          <Link href="/flashcards" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-600 hover:text-blue-600 font-medium">Flashcards</Link>
          <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block py-2 text-gray-600 hover:text-blue-600 font-medium">Dashboard</Link>
          <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="block mt-2 text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 rounded-full font-medium">Sign Up</Link>
        </div>
      )}
    </nav>
  )
}