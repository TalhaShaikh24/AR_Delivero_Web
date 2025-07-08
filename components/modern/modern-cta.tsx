"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { Download, Smartphone, Apple, Play, ArrowRight, Bell, Gift } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ModernCTA() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubscribed(true)
      setEmail("")
      // Handle newsletter subscription
    }
  }

  return (
    <section className="py-20 bg-gradient-to-br from-[#328bb8] via-[#2e64ab] to-[#1e4a7a] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="text-white space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
                <Smartphone className="h-4 w-4" />
                <span className="text-sm font-medium">Download Our App</span>
              </div>

              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Get the AR Delivero
                <span className="block text-[#6bc83e]">Mobile App</span>
              </h2>

              <p className="text-xl text-white/90 leading-relaxed mb-8">
                Experience faster ordering, exclusive app-only deals, real-time tracking, and seamless payments.
                Download now and get 20% off your first app order!
              </p>
            </div>

            {/* App Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { icon: Bell, text: "Push Notifications" },
                { icon: Gift, text: "Exclusive Deals" },
                { icon: ArrowRight, text: "Real-time Tracking" },
                { icon: Download, text: "Offline Ordering" },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20"
                >
                  <feature.icon className="h-5 w-5 text-[#6bc83e]" />
                  <span className="text-sm font-medium">{feature.text}</span>
                </div>
              ))}
            </div>

            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-black hover:bg-gray-900 text-white px-6 py-4 rounded-xl transition-all duration-300 hover:scale-105 flex items-center gap-3"
              >
                <Apple className="h-6 w-6" />
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-bold">App Store</div>
                </div>
              </Button>

              <Button
                size="lg"
                className="bg-black hover:bg-gray-900 text-white px-6 py-4 rounded-xl transition-all duration-300 hover:scale-105 flex items-center gap-3"
              >
                <Play className="h-6 w-6" />
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-sm font-bold">Google Play</div>
                </div>
              </Button>
            </div>

            {/* Newsletter Signup */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <h3 className="text-xl font-bold mb-3">Stay Updated</h3>
              <p className="text-white/80 text-sm mb-4">Subscribe to our newsletter for exclusive deals and updates</p>

              {!isSubscribed ? (
                <form onSubmit={handleSubscribe} className="flex gap-3">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-white/20 border-white/30 text-white placeholder:text-white/60 focus:bg-white/30"
                    required
                  />
                  <Button type="submit" className="bg-[#6bc83e] hover:bg-[#5ab32e] text-white px-6 whitespace-nowrap">
                    Subscribe
                  </Button>
                </form>
              ) : (
                <div className="flex items-center gap-2 text-[#6bc83e]">
                  <Bell className="h-5 w-5" />
                  <span className="font-medium">Thanks for subscribing!</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Content - Phone Mockup */}
          <div className="relative">
            <div className="relative mx-auto w-80 h-96 flex flex-col justify-center items-center">
              {/* Phone Frame replaced with static image */}
              <Image src="/assets/app.png" alt="App Mockup" width={180} height={180}  />
              
              

              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-[#6bc83e] rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <Download className="h-6 w-6 text-white" />
              </div>

              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                <Gift className="h-8 w-8 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
