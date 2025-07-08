"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Gift, Percent, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const promotions = [
  {
    id: 1,
    title: "Upto 10% OFF",
    subtitle: "Delicious Tikka",
    description: "Get 50% off on your first order. Valid for new customers only.",
    code: "WELCOME50",
    image: "/assets/promotions-images/p1.jpg?height=300&width=500",
    gradient: "from-orange-500 to-red-500",
    icon: Gift,
    validUntil: "Dec 31, 2024",
  },
  {
    id: 2,
    title: "Free Delivery",
    subtitle: "Orders Above $25",
    description: "Enjoy free delivery on all orders above $25. No minimum order required.",
    code: "FREEDEL25",
    image: "/assets/promotions-images/p2.jpg?height=300&width=500",
    gradient: "from-green-500 to-emerald-500",
    icon: Percent,
    validUntil: "Dec 31, 2024",
  },
  {
    id: 3,
    title: "Buy 1 Get 1",
    subtitle: "Pizza Special",
    description: "Order any large pizza and get another one absolutely free.",
    code: "BOGO2024",
    image: "/assets/promotions-images/p3.jpg?height=300&width=500",
    gradient: "from-purple-500 to-pink-500",
    icon: Gift,
    validUntil: "Dec 31, 2024",
  },
]

export default function PromotionsBanner() {
  const [currentPromo, setCurrentPromo] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      setCurrentPromo((prev) => (prev + 1) % promotions.length)
    }, 4000)

    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const nextPromo = () => {
    setCurrentPromo((prev) => (prev + 1) % promotions.length)
  }

  const prevPromo = () => {
    setCurrentPromo((prev) => (prev - 1 + promotions.length) % promotions.length)
  }

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    // You could add a toast notification here
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#6bc83e]/20 to-[#328bb8]/20 px-6 py-3 rounded-full mb-6 backdrop-blur-sm border border-white/10">
            <Gift className="h-5 w-5 text-[#6bc83e]" />
            <span className="text-[#6bc83e] font-medium">Special Offers</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Exclusive Deals</h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Don't miss out on these amazing offers. Save more on your favorite meals!
          </p>
        </div>

        {/* Promotion Slider */}
        <div className="relative max-w-6xl mx-auto">
          <div className="relative h-80 md:h-96 rounded-3xl overflow-hidden">
            {promotions.map((promo, index) => {
              const Icon = promo.icon
              return (
                <div
                  key={promo.id}
                  className={`absolute inset-0 transition-all duration-700 ${
                    currentPromo === index ? "opacity-100 scale-100" : "opacity-0 scale-105"
                  }`}
                >
                  {/* Background */}
                  <div className={`absolute inset-0 bg-gradient-to-r ${promo.gradient}`}></div>

                  {/* Pattern Overlay */}
                  <div className="absolute inset-0 bg-black/20"></div>

                  {/* Content */}
                  <div className="relative h-full flex items-center">
                    <div className="container mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                      {/* Text Content */}
                      <div className="text-white space-y-6">
                        <div className="flex items-center gap-3">
                          <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                            <Icon className="h-8 w-8 text-white" />
                          </div>
                          <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                            <Clock className="h-3 w-3 mr-1" />
                            Valid until {promo.validUntil}
                          </Badge>
                        </div>

                        <div>
                          <h3 className="text-5xl md:text-6xl font-bold mb-2">{promo.title}</h3>
                          <h4 className="text-2xl md:text-3xl font-light mb-4 text-white/90">{promo.subtitle}</h4>
                          <p className="text-lg text-white/80 leading-relaxed max-w-md">{promo.description}</p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                          <Button
                            size="lg"
                            className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                          >
                            Order Now
                          </Button>

                          <button
                            onClick={() => copyCode(promo.code)}
                            className="px-8 py-6 bg-white/10 backdrop-blur-sm border border-white/30 rounded-full text-white hover:bg-white/20 transition-all duration-300 text-lg font-medium"
                          >
                            Code: {promo.code}
                          </button>
                        </div>
                      </div>

                      {/* Image */}
                      <div className="hidden lg:block relative">
                        <div className="relative w-full h-64 rounded-2xl overflow-hidden">
                          <Image
                            src={promo.image || "/placeholder.svg"}
                            alt={promo.title}
                            fill
                            className="object-cover"
                          />
                          <div className="absolute inset-0 bg-white/10 backdrop-blur-[1px]"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          {/* Navigation */}
          <button
            onClick={prevPromo}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>

          <button
            onClick={nextPromo}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300 hover:scale-110"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>

          {/* Indicators */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3">
            {promotions.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPromo(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentPromo === index ? "bg-white scale-125" : "bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>

          {/* Auto-play Toggle */}
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="absolute top-6 right-6 p-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all duration-300"
          >
            {isAutoPlaying ? (
              <div className="w-4 h-4 flex gap-1">
                <div className="w-1 h-4 bg-white rounded"></div>
                <div className="w-1 h-4 bg-white rounded"></div>
              </div>
            ) : (
              <div className="w-4 h-4 border-l-4 border-white ml-1"></div>
            )}
          </button>
        </div>
      </div>
    </section>
  )
}
