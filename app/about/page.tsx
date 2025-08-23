
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, Target, Eye, Truck, ShoppingCart, Coffee, Fuel, Plus, CheckCircle } from "lucide-react"

export default function AboutUs() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const currentServices = [
    {
      icon: Truck,
      title: "Food Delivery",
      description: "Partnering with restaurants to deliver fresh meals conveniently",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: ShoppingCart,
      title: "Grocery Delivery",
      description: "Daily essentials and household items delivered to your home",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Coffee,
      title: "Bakery Delivery",
      description: "Ensuring your favorite baked items reach you fresh",
      color: "from-yellow-500 to-orange-500"
    }
  ]

  const comingSoonServices = [
    {
      icon: Fuel,
      title: "Petrol Delivery",
      description: "Bringing fuel directly to your location",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Plus,
      title: "Pharmacy Delivery",
      description: "Safe and reliable medicine delivery services",
      color: "from-purple-500 to-pink-500"
    }
  ]

  const leaders = [
    {
      name: "Mr. Ishfaq Nazir",
      role: "Founder & CEO",
      location: "Dubai-based businessman",
      background: "Over 12 years of international experience in telecommunications, web and app development, graphic designing, call center management, and café operations",
      expertise: "Global exposure, entrepreneurial mindset, and technology expertise"
    },
    {
      name: "Mr. Musadiq Nazir",
      role: "Co-Founder & Operations Head",
      location: "Based in Handwara, J&K",
      background: "Postgraduate in Physics with over 5 years of professional experience in teaching and call center operations",
      expertise: "Strong academic foundation, management skills, and local market knowledge"
    }
  ]

  return (
    <div className={`flex flex-col min-h-screen transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#328bb8] via-[#4a9bc9] to-[#6bc83e] text-white py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="w-full h-full"
              style={{ backgroundImage: "radial-gradient(white 1px, transparent 1px)", backgroundSize: "30px 30px" }}
            />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                About AR Delivero
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Revolutionizing Delivery
                <span className="block text-[#6bc83e]">In Jammu & Kashmir</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                A dynamic and customer-focused delivery platform leveraging technology to connect people with essential services at their doorstep
              </p>
              <div className="flex items-center justify-center gap-2 text-white/80">
                <MapPin className="w-5 h-5" />
                <span>First Floor, c/o Musadiq Nazir, Bypass Road, Handwara, Kashmir – 193221</span>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-[#328bb8] to-[#6bc83e] p-3 rounded-full mr-4">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    To simplify everyday life by delivering essentials with speed, reliability, and trust while empowering local businesses and creating employment opportunities in Jammu & Kashmir.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                <CardContent className="p-8">
                  <div className="flex items-center mb-6">
                    <div className="bg-gradient-to-r from-[#6bc83e] to-[#328bb8] p-3 rounded-full mr-4">
                      <Eye className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed">
                    To become the most trusted and comprehensive delivery platform in the region, driving innovation and setting new standards of convenience in the delivery industry.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Our Services</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Comprehensive delivery solutions tailored for the people of Jammu & Kashmir
              </p>
            </div>

            {/* Current Services */}
            <div className="mb-16">
              <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">Current Services</h3>
              <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {currentServices.map((service, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    <CardContent className="p-8 text-center">
                      <div className={`bg-gradient-to-r ${service.color} p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center`}>
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h4>
                      <p className="text-gray-600">{service.description}</p>
                      <div className="mt-4">
                        <CheckCircle className="w-5 h-5 text-green-500 mx-auto" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Coming Soon Services */}
            <div>
              <h3 className="text-2xl font-bold text-center mb-8 text-gray-800">Coming Soon</h3>
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {comingSoonServices.map((service, index) => (
                  <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-gradient-to-r from-[#6bc83e] to-[#328bb8] text-white">
                        Coming Soon
                      </Badge>
                    </div>
                    <CardContent className="p-8 text-center">
                      <div className={`bg-gradient-to-r ${service.color} p-4 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center opacity-75`}>
                        <service.icon className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="text-xl font-bold text-gray-800 mb-3">{service.title}</h4>
                      <p className="text-gray-600">{service.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Leadership Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Leadership Team</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Experienced leaders driving AR Delivero's vision with expertise and local knowledge
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
              {leaders.map((leader, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-start mb-6">
                      <div className="bg-gradient-to-r from-[#328bb8] to-[#6bc83e] p-3 rounded-full mr-4 flex-shrink-0">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-1">{leader.name}</h3>
                        <p className="text-[#328bb8] font-semibold mb-2">{leader.role}</p>
                        <p className="text-gray-500 text-sm mb-4">{leader.location}</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Background</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{leader.background}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-800 mb-2">Expertise</h4>
                        <p className="text-gray-600 text-sm leading-relaxed">{leader.expertise}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Rehmani Group Section */}
        <section className="py-20 bg-gradient-to-r from-[#328bb8] to-[#6bc83e] text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-8">AR Delivero & Rehmani Group</h2>
              <p className="text-xl leading-relaxed mb-8 text-white/90">
                Operating under the umbrella of Rehmani Group, AR DELIVERO is built on a commitment to quality, innovation, and community service. With a clear focus on growth and customer satisfaction, we aim to position ourselves as a leader in the delivery industry of Jammu & Kashmir.
              </p>
              <div className="grid md:grid-cols-3 gap-8 mt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">2024</div>
                  <div className="text-white/80">Established</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">J&K</div>
                  <div className="text-white/80">Based in Kashmir</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">5+</div>
                  <div className="text-white/80">Services Planned</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
