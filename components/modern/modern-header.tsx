"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Menu, X, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import CartIcon from "@/components/cart/cart-icon"

export default function ModernHeader() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    document.documentElement.classList.toggle("dark")
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-white/20" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#328bb8] to-[#6bc83e] rounded-xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <div className="relative p-2">
                <Image
                  src="../../assets/logo.png"
                  alt="AR Delivero"
                  width={65}
                  height={65}
                  className="transition-transform group-hover:scale-110"
                />
              </div>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-bold bg-gradient-to-r from-[#328bb8] to-[#2e64ab] bg-clip-text text-transparent">
                AR Delivero
              </h1>
              <p className="text-xs text-gray-500">Food & More</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {["Home", "Categories", "Restaurants", "Offers", "Help"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className={`relative transition-colors group ${
                  isScrolled ? "text-gray-700 hover:text-[#328bb8]" : "text-white hover:text-[#328bb8]"
                }`}
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[#328bb8] to-[#6bc83e] transition-all group-hover:w-full"></span>
              </Link>
            ))}
          </nav>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Location */}
            <div className="hidden md:flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-full border border-white/20">
              <MapPin className="h-4 w-4 text-[#6bc83e]" />
              <span className="text-sm text-gray-700">New York, NY</span>
            </div>

            {/* Dark Mode Toggle */}
            {/* <Button
              variant="ghost"
              size="icon"
              onClick={toggleDarkMode}
              className="rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20"
            >
              {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button> */}

            {/* Cart */}
            <div className="relative">
              <CartIcon />
            </div>

            {/* Profile */}
            <Link href="/account">
              <div className="h-10 w-10 rounded-full bg-gradient-to-r from-[#328bb8] to-[#6bc83e] flex items-center justify-center shadow-lg hover:shadow-xl transition-all hover:scale-105">
                <span className="text-white font-bold text-sm">T</span>
              </div>
            </Link>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden rounded-full bg-white/10 backdrop-blur-sm border border-white/20"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden transition-all duration-300 overflow-hidden ${
            mobileMenuOpen ? "max-h-96 opacity-100 mt-4" : "max-h-0 opacity-0"
          }`}
        >
          <div className="bg-white/90 backdrop-blur-xl rounded-2xl border border-white/20 p-4 space-y-3">
            {["Home", "Categories", "Restaurants", "Offers", "Help"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="block px-4 py-3 rounded-xl bg-white/50 hover:bg-white/80 transition-colors text-center font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </Link>
            ))}
            <div className="md:hidden flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-white/50">
              <MapPin className="h-4 w-4 text-[#6bc83e]" />
              <span className="text-sm">New York, NY</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
