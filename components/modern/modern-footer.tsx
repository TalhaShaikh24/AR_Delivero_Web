"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { MapPin, Phone, Mail, Facebook, Twitter, Instagram, Youtube, ArrowRight, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ModernFooter() {
  const [email, setEmail] = useState("")

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    setEmail("")
  }

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat"></div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 pt-16 pb-8 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-[#328bb8] to-[#6bc83e] rounded-xl blur-lg opacity-30"></div>
                <div className="relative bg-white p-2 rounded-xl">
                  <Image src="../../assets/logo.png" alt="AR Delivero" width={40} height={40} />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold">AR Delivero</h3>
                <p className="text-gray-400 text-sm">Food & More</p>
              </div>
            </Link>

            <p className="text-gray-300 leading-relaxed">
              Your trusted partner for food delivery, groceries, and essential services. We bring convenience to your
              doorstep with quality and speed.
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {[
                { icon: Facebook, href: "#", color: "hover:text-blue-400" },
                { icon: Twitter, href: "#", color: "hover:text-sky-400" },
                { icon: Instagram, href: "#", color: "hover:text-pink-400" },
                { icon: Youtube, href: "#", color: "hover:text-red-400" },
              ].map((social, index) => (
                <Link
                  key={index}
                  href={social.href}
                  className={`p-3 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300 hover:scale-110 ${social.color}`}
                >
                  <social.icon className="h-5 w-5" />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "About Us", href: "/about" },
                { label: "How It Works", href: "/how-it-works" },
                { label: "Careers", href: "/careers" },
                { label: "Press", href: "/press" },
                { label: "Blog", href: "/blog" },
                { label: "Help Center", href: "/help" },
              ].map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-[#6bc83e] transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-bold mb-6">Our Services</h4>
            <ul className="space-y-3">
              {[
                { label: "Food Delivery", href: "/categories/food" },
                { label: "Grocery Delivery", href: "/categories/grocery" },
                { label: "Fuel Delivery", href: "/categories/petroleum" },
                { label: "Pharmacy", href: "/categories/pharmacy" },
                { label: "Corporate Catering", href: "/corporate" },
                { label: "Gift Cards", href: "/gift-cards" },
              ].map((service, index) => (
                <li key={index}>
                  <Link
                    href={service.href}
                    className="text-gray-300 hover:text-[#6bc83e] transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <ArrowRight className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div>
            <h4 className="text-lg font-bold mb-6">Get In Touch</h4>

            {/* Contact Info */}
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-[#6bc83e] mt-0.5 flex-shrink-0" />
                <p className="text-gray-300 text-sm leading-relaxed">
                  Rehmani Tech building, Bye pass road Handwara, Kashmir. Near North Kashmir nursing home.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-[#6bc83e]" />
                <div className="text-gray-300 text-sm">
                  <p>+91 1955295310</p>
                  <p>+91 9682329952</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-[#6bc83e]" />
                <p className="text-gray-300 text-sm">admin@ardelivero.com</p>
              </div>
            </div>

            {/* Newsletter */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
              <h5 className="font-bold mb-3">Newsletter</h5>
              <p className="text-gray-400 text-sm mb-4">Subscribe for exclusive deals and updates</p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:bg-white/20"
                  required
                />
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#328bb8] to-[#6bc83e] hover:from-[#2e64ab] hover:to-[#5ab32e] text-white"
                >
                  Subscribe
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-4 text-gray-400 text-sm">
              <p>© 2024 AR Delivero. All rights reserved.</p>
              <div className="flex items-center gap-1">
                <span>Made with</span>
                <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                <span>in Kashmir</span>
              </div>
            </div>

            <div className="flex gap-6 text-sm">
              <Link href="/privacy-policy" className="text-gray-400 hover:text-[#6bc83e] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-and-conditions" className="text-gray-400 hover:text-[#6bc83e] transition-colors">
                Terms of Service
              </Link>
              <Link href="/refund-policy" className="text-gray-400 hover:text-[#6bc83e] transition-colors">
                Refund Policy
              </Link>
              <Link href="/return-policy-suppliers" className="text-gray-400 hover:text-[#6bc83e] transition-colors">
                Return Policy for Suppliers
              </Link>
              <Link href="/cookies" className="text-gray-400 hover:text-[#6bc83e] transition-colors">
                Cookie Policy
              </Link>
              <Link href="/account-deletion" className="text-gray-400 hover:text-[#6bc83e] transition-colors">
                Account Deletion
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
