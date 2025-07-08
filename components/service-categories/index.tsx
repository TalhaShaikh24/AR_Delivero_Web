"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Sparkles, Zap, Clock, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function ServiceCategories() {
  const [hoveredService, setHoveredService] = useState<string | null>(null)

  const services = [
    {
      id: "food",
      title: "Food & Dining",
      description: "Delicious meals from top restaurants",
      icon: "/AR FOODS-01.svg",
      color: "from-orange-400 via-red-400 to-pink-500",
      accent: "bg-orange-500",
      popular: true,
      link: "/restaurants",
      comingSoon: false,
    },
    {
      id: "petrol",
      title: "Petrol Delivery",
      description: "Fuel delivery at your doorstep",
      icon: "/PETROL-01.svg",
      color: "from-yellow-400 via-orange-400 to-red-500",
      accent: "bg-yellow-500",
      popular: false,
      link: "#",
      comingSoon: true,
    },
    {
      id: "grocery",
      title: "Grocery",
      description: "Fresh groceries delivered fast",
      icon: "/Grocery-01.svg",
      color: "from-green-400 via-emerald-400 to-teal-500",
      accent: "bg-green-500",
      popular: true,
      link: "#",
      comingSoon: true,
    },
    {
      id: "pharmacy",
      title: "Pharmacy",
      description: "Medicines and health products",
      icon: "/PHARMACY-01.svg",
      color: "from-purple-400 via-pink-400 to-rose-500",
      accent: "bg-purple-500",
      popular: false,
      link: "#",
      comingSoon: true,
    },
  ]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Enhanced Background Pattern */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#6bc83e] to-[#328bb8] rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-[#328bb8] to-purple-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-pink-300 to-yellow-300 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-32 left-1/4 w-4 h-4 bg-[#6bc83e] rounded-full animate-bounce delay-300"></div>
        <div className="absolute top-48 right-1/3 w-3 h-3 bg-[#328bb8] rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-32 left-1/3 w-5 h-5 bg-pink-400 rounded-full animate-bounce delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Enhanced Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-white/80 backdrop-blur-xl px-8 py-4 rounded-full mb-8 shadow-lg border border-white/20">
            <div className="p-2 bg-gradient-to-r from-[#6bc83e] to-[#328bb8] rounded-full">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-[#328bb8] font-semibold text-lg">Our Services</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-gray-900 via-[#328bb8] to-[#6bc83e] bg-clip-text text-transparent leading-tight">
            Choose Your Service
          </h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            From delicious food to essential services, we've got everything you need delivered right to your doorstep
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={service.id}
              className="block group"
              onMouseEnter={() => setHoveredService(service.id)}
              onMouseLeave={() => setHoveredService(null)}
            >
              {service.comingSoon ? (
                <div className={`relative h-[320px] rounded-3xl overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 hover:rotate-1 border border-gray-100 opacity-75`}>
                  {/* Coming Soon Badge */}
                  <div className="absolute top-4 right-4 z-30">
                    <div className="flex items-center gap-1 bg-gradient-to-r from-gray-400 to-gray-600 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                      <Clock className="h-3 w-3" />
                      Coming Soon
                    </div>
                  </div>

                  {/* Icon Section */}
                  <div className="relative h-48 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20`}></div>
                    <div className="relative h-full flex items-center justify-center">
                      <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                        <Image
                          src={service.icon}
                          alt={service.title}
                          width={48}
                          height={48}
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 relative">
                    <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[#328bb8] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-4">
                      {service.description}
                    </p>
                  </div>

                  {/* Hover Effect */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#328bb8] to-[#6bc83e] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
              ) : (
                <Link href={service.link}>
                  <div className={`relative h-[320px] rounded-3xl overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 hover:rotate-1 border border-gray-100`}>
                    {/* Popular Badge */}
                    {service.popular && (
                      <div className="absolute top-4 right-4 z-30">
                        <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                          <TrendingUp className="h-3 w-3" />
                          Popular
                        </div>
                      </div>
                    )}

                    {/* Icon Section */}
                    <div className="relative h-48 overflow-hidden">
                      <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-20`}></div>
                      <div className="relative h-full flex items-center justify-center">
                        <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${service.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                          <Image
                            src={service.icon}
                            alt={service.title}
                            width={48}
                            height={48}
                            className="w-12 h-12 object-contain"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 relative">
                      <h3 className="text-xl font-bold mb-3 text-gray-900 group-hover:text-[#328bb8] transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-4">
                        {service.description}
                      </p>

                      {/* Action Button */}
                      <div className="flex items-center gap-2 text-[#328bb8] font-semibold group-hover:gap-3 transition-all duration-300">
                        <span>Explore Now</span>
                        <Zap className="h-4 w-4 group-hover:scale-110 transition-transform" />
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#328bb8] to-[#6bc83e] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
} 