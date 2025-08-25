"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MapPin, Menu, X, User, LogOut } from "lucide-react"
import CartIcon from "@/components/cart/cart-icon"
import Image from "next/image"
import { useLocation } from "@/hooks/use-location"
import { LocationSelector } from "@/components/location-selector"
import { AuthService } from "@/services/auth-service"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState<any>(null)
  const { location, requestLocation, formattedLocation } = useLocation()
  const router = useRouter()

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const loggedIn = AuthService.isLoggedIn()
      const user = AuthService.getCurrentUser()
      setIsAuthenticated(loggedIn)
      setCurrentUser(user)
    }

    checkAuth()

    // Listen for storage changes (login/logout in other tabs)
    const handleStorageChange = () => {
      checkAuth()
    }

    window.addEventListener('storage', handleStorageChange)
    return () => window.removeEventListener('storage', handleStorageChange)
  }, [])

  // Request location on first load if not already set
  useEffect(() => {
    // Only request location if no saved location exists
    const savedLocation = localStorage.getItem('userLocation')
    if (!location && !savedLocation) {
      requestLocation()
    }
  }, [location, requestLocation])

  const handleLogout = () => {
    AuthService.logout()
    setIsAuthenticated(false)
    setCurrentUser(null)
    router.push("/")
  }

  return (
    <header className="bg-gradient-to-r from-[#2a75a8] via-[#328bb8] to-[#3a9dcb] text-white shadow-md relative z-50 md:sticky md:top-0">
      <div className="container mx-auto flex items-center justify-between p-4">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className=" p-1.5 shadow-sm transition-transform group-hover:scale-105">
              <Image src="../../assets/logo.png" alt="AR Delivero Logo" width={70} height={70} className="text-[#328bb8]" />
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
              href="/checkout/tracking"
              className="px-4 py-2 rounded-full text-sm font-medium hover:bg-white/20 transition-colors "
            >
              Track Order
            </Link>
            <Link
              href="/offers"
              className="px-4 py-2 rounded-full text-sm font-medium hover:bg-white/20 transition-colors hidden"
            >
              Offers
            </Link>
            <Link
              href="/help"
              className="px-4 py-2 rounded-full text-sm font-medium hover:bg-white/20 transition-colors hidden"
            >
              Help
            </Link>
          </div>
        </nav>

        {/* Right Section */}
        <div className="flex items-center gap-5">
          <LocationSelector>
            <div className="hidden sm:flex items-center text-sm bg-white/10 px-3 py-1.5 rounded-full hover:bg-white/20 transition-colors cursor-pointer">
              <MapPin className="h-4 w-4 mr-1.5 text-[#6bc83e]" />
              <span>{formattedLocation}</span>
            </div>
          </LocationSelector>
          <CartIcon />

          {/* Authentication Section */}
          {isAuthenticated ? (
            <div className="hidden md:flex items-center">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-12 w-12 rounded-full p-0 hover:bg-white/20 transition-all duration-300 hover:scale-105 ring-2 ring-white/20 hover:ring-white/40">
                    <Avatar className="h-11 w-11 border-2 border-white/30 shadow-lg">
                      <AvatarImage src="/placeholder-user.jpg" alt={currentUser?.username || "User"} className="object-cover" />
                      <AvatarFallback className="bg-gradient-to-br from-white/90 to-white/70 text-[#328bb8] font-bold text-lg border border-white/50 shadow-inner">
                        {currentUser?.username?.charAt(0).toUpperCase() || "U"}
                      </AvatarFallback>
                    </Avatar>
                    {/* Online indicator */}
                    <div className="absolute -bottom-0.5 -right-0.5 h-4 w-4 bg-[#6bc83e] border-2 border-white rounded-full shadow-sm"></div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{currentUser?.username}</p>
                      <p className="text-xs leading-none text-muted-foreground">{currentUser?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      My Account
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/profile" className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      Profile Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="text-white hover:bg-white/10"
              >
                <Link href="/login">Login</Link>
              </Button>
              <Button
                size="sm"
                asChild
                className="bg-white text-[#328bb8] hover:bg-gray-100"
              >
                <Link href="/register">Sign Up</Link>
              </Button>
            </div>
          )}

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

          <LocationSelector>
            <div className="sm:hidden flex items-center justify-center text-sm bg-white/10 px-3 py-2 rounded-lg hover:bg-white/20 transition-colors cursor-pointer">
              <MapPin className="h-4 w-4 mr-1.5 text-[#6bc83e]" />
              <span>{formattedLocation}</span>
            </div>
          </LocationSelector>

          {/* Mobile Authentication */}
          {isAuthenticated ? (
            <div className="md:hidden flex flex-col gap-3">
              {/* Mobile Profile Header */}
              <div className="flex items-center gap-4 px-4 py-3 bg-white/10 rounded-lg backdrop-blur-sm">
                <div className="relative">
                  <Avatar className="h-12 w-12 border-2 border-white/40 shadow-lg">
                    <AvatarImage src="/placeholder-user.jpg" alt={currentUser?.username || "User"} className="object-cover" />
                    <AvatarFallback className="bg-gradient-to-br from-white/90 to-white/70 text-[#328bb8] font-bold">
                      {currentUser?.username?.charAt(0).toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-[#6bc83e] border-2 border-white rounded-full"></div>
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-white">{currentUser?.username}</p>
                  <p className="text-sm text-white/70">{currentUser?.email}</p>
                </div>
              </div>
              
              <Link
                href="/account"
                className="flex items-center justify-center px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="h-4 w-4 mr-2" />
                My Account
              </Link>
              <Link
                href="/profile"
                className="flex items-center justify-center px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                <User className="h-4 w-4 mr-2" />
                Profile Settings
              </Link>
              <button
                onClick={() => {
                  handleLogout()
                  setMobileMenuOpen(false)
                }}
                className="flex items-center justify-center px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors font-medium"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          ) : (
            <div className="md:hidden flex flex-col gap-2">
              <Link
                href="/login"
                className="block px-4 py-3 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-center font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Link>
              <Link
                href="/register"
                className="block px-4 py-3 rounded-lg bg-white text-[#328bb8] hover:bg-gray-100 transition-colors text-center font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
} 