"use client"

import { useState, useEffect, useRef } from "react"
import { Search, ShoppingCart, Truck, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: Search,
    title: "Browse & Search",
    description: "Discover restaurants and stores near you with our smart search",
    color: "from-blue-500 to-cyan-500",
    delay: 0,
  },
  {
    icon: ShoppingCart,
    title: "Add to Cart",
    description: "Select your favorite items and customize your order",
    color: "from-purple-500 to-pink-500",
    delay: 200,
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Track your order in real-time as it's delivered to your door",
    color: "from-green-500 to-emerald-500",
    delay: 400,
  },
  {
    icon: CheckCircle,
    title: "Enjoy Your Meal",
    description: "Sit back, relax, and enjoy your delicious food",
    color: "from-orange-500 to-red-500",
    delay: 600,
  },
]

export default function HowItWorks() {
  const [visibleSteps, setVisibleSteps] = useState<boolean[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate steps one by one
            steps.forEach((_, index) => {
              setTimeout(() => {
                setVisibleSteps((prev) => {
                  const newVisible = [...prev]
                  newVisible[index] = true
                  return newVisible
                })
              }, index * 200)
            })
          }
        })
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#6bc83e] rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-[#328bb8] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#328bb8]/10 to-[#6bc83e]/10 px-6 py-3 rounded-full mb-6">
            <CheckCircle className="h-5 w-5 text-[#328bb8]" />
            <span className="text-[#328bb8] font-medium">Simple Process</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Getting your favorite food delivered is easier than ever. Just follow these simple steps
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-[#328bb8] via-[#6bc83e] to-[#328bb8] opacity-20 -translate-y-1/2"></div>

          {steps.map((step, index) => {
            const Icon = step.icon
            const isVisible = visibleSteps[index]

            return (
              <div
                key={index}
                className={`relative group transition-all duration-700 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${step.delay}ms` }}
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-8 h-8 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center text-sm font-bold text-gray-600 z-10">
                  {index + 1}
                </div>

                {/* Card */}
                <div className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100 relative overflow-hidden">
                  {/* Background Gradient */}
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${step.color} opacity-10 rounded-full blur-2xl transition-opacity group-hover:opacity-20`}
                  ></div>

                  {/* Icon */}
                  <div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 relative z-10`}
                  >
                    <Icon className="h-8 w-8 text-white" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[#328bb8] transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>

                  {/* Hover Effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#328bb8] to-[#6bc83e] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          {[
            { number: "30min", label: "Average Delivery" },
            { number: "50K+", label: "Happy Customers" },
            { number: "1000+", label: "Partner Restaurants" },
            { number: "99.9%", label: "Uptime" },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-[#328bb8] mb-2">{stat.number}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
