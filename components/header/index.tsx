"use client"

import { useState } from "react"
import Link from "next/link"
import { MapPin, Menu, X } from "lucide-react"
import CartIcon from "@/components/cart/cart-icon"
import Image from "next/image"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-gradient-to-r from-[#2a75a8] via-[#328bb8] to-[#3a9dcb] text-white shadow-md relative z-50">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-white rounded-full p-1.5 shadow-sm transition-transform group-hover:scale-105">
              <Image src="/icons/logo.svg" alt="AR Delivero Logo" width={28} height={28} className="text-[#328bb8]" />
            </div>
            <span className="text-xl font-bold tracking-tight">AR Delivero</span>
          </Link>
        </div>

        {/* Desktop Navigation - Centered */}
        <nav className="hidden md:flex items-center justify-center absolute left-1/2 transform -translate-x-1/2">
          <div className="bg-white/10 rounded-full px-1 py-1 flex items-center">
            <Link href="/" className="px-4 py-2 rounded-full text-sm font-medium hover:bg-white/20 transition-colors">
              Home
            </Link>
            <Link
              href="/categories"
              className="px-4 py-2 rounded-full text-sm font-medium hover:bg-white/20 transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/offers"
              className="px-4 py-2 rounded-full text-sm font-medium hover:bg-white/20 transition-colors"
            >
              Offers
            </Link>
            <Link
              href="/help"
              className="px-4 py-2 rounded-full text-sm font-medium hover:bg-white/20 transition-colors"
            >
              Help
            </Link>
          </div>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-5">
          <div className="hidden sm:flex items-center text-sm bg-white/10 px-3 py-1.5 rounded-full">
            <MapPin className="h-4 w-4 mr-1.5 text-[#6bc83e]" />
            <span>New York, NY</span>
          </div>
          <CartIcon />
          <Link href="/account">
            <div className="h-9 w-9 rounded-full bg-white text-[#328bb8] flex items-center justify-center shadow-sm hover:shadow-md transition-all hover:scale-105">
              <span className="text-sm font-bold">T</span>
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden ml-2 p-1 rounded-full hover:bg-white/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden absolute top-full left-0 right-0 bg-gradient-to-b from-[#328bb8] to-[#2a75a8] shadow-lg transform transition-all duration-300 ease-in-out ${
          mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="container mx-auto p-4 space-y-4">
          <Link
            href="/"
            className="block px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-center font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            href="/categories"
            className="block px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-center font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Categories
          </Link>
          <Link
            href="/offers"
            className="block px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-center font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Offers
          </Link>
          <Link
            href="/help"
            className="block px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-center font-medium"
            onClick={() => setMobileMenuOpen(false)}
          >
            Help
          </Link>

          <div className="sm:hidden flex items-center justify-center text-sm bg-white/10 px-3 py-2 rounded-lg">
            <MapPin className="h-4 w-4 mr-1.5 text-[#6bc83e]" />
            <span>New York, NY</span>
          </div>
        </div>
      </div>
    </header>
  )
}
