
"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Smartphone, 
  Search, 
  ShoppingCart, 
  MapPin, 
  Truck, 
  Star,
  Download,
  Apple,
  Play,
  Globe,
  Fuel,
  Plus,
  Clock,
  Shield,
  CheckCircle
} from "lucide-react"

export default function HowItWorks() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  const steps = [
    {
      number: "01",
      title: "Download & Sign Up",
      icon: Smartphone,
      content: "Download AR DELIVERO from the Play Store, Apple Store and Web Site, create your account using your phone number or email, and set up your profile.",
      visual: "A smartphone screen showing the AR DELIVERO logo and a simple sign-up form.",
      color: "from-blue-500 to-cyan-500",
      features: ["Easy registration", "Phone or email signup", "Quick profile setup"]
    },
    {
      number: "02",
      title: "Browse & Select",
      icon: Search,
      content: "Explore food, groceries, and bakery items from your favorite restaurants and stores. Search, filter, and select what you need.",
      visual: "App interface showing a menu with categories (Food, Grocery, Bakery) and product images.",
      color: "from-green-500 to-emerald-500",
      features: ["Multiple categories", "Search & filter", "Favorite stores"]
    },
    {
      number: "03",
      title: "Add to Cart & Checkout",
      icon: ShoppingCart,
      content: "Add items to your cart, confirm your delivery address, and proceed to checkout. Choose secure payment options (Cash on Delivery or Online).",
      visual: "A cart screen with items, delivery address, and a 'Proceed to Checkout' button.",
      color: "from-purple-500 to-pink-500",
      features: ["Easy cart management", "Address confirmation", "Secure payments"]
    },
    {
      number: "04",
      title: "Track in Real-Time",
      icon: MapPin,
      content: "Once the order is placed, track your delivery partner in real time. Receive live updates about preparation, dispatch, and estimated arrival.",
      visual: "A live map with a moving delivery bike icon heading towards a home location pin.",
      color: "from-orange-500 to-red-500",
      features: ["Real-time tracking", "Live updates", "Estimated arrival"]
    },
    {
      number: "05",
      title: "Delivery at Your Doorstep",
      icon: Truck,
      content: "Sit back and relax while our delivery partner brings your order safely to your doorstep. Rate your experience after delivery.",
      visual: "A delivery partner handing a package/food bag to a smiling customer at the door.",
      color: "from-indigo-500 to-purple-500",
      features: ["Safe delivery", "Doorstep service", "Rate experience"]
    }
  ]

  const comingSoonServices = [
    {
      icon: Fuel,
      title: "Petrol Delivery",
      description: "Refuel anytime, anywhere.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Plus,
      title: "Pharmacy Delivery",
      description: "Medicines and healthcare products at your doorstep.",
      color: "from-green-500 to-emerald-500"
    }
  ]

  const downloadLinks = [
    {
      name: "Play Store",
      icon: Play,
      href: "#",
      color: "bg-green-600 hover:bg-green-700"
    },
    {
      name: "App Store",
      icon: Apple,
      href: "#",
      color: "bg-black hover:bg-gray-800"
    },
    {
      name: "Website",
      icon: Globe,
      href: "/",
      color: "bg-[#328bb8] hover:bg-[#2a7ba0]"
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
                How It Works
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                How AR DELIVERO
                <span className="block text-[#6bc83e]">Works</span>
              </h1>
              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed">
                Simple steps to get your essentials delivered right to your doorstep
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                {downloadLinks.map((link, index) => (
                  <Button
                    key={index}
                    className={`${link.color} text-white px-6 py-3 rounded-full flex items-center gap-2 transition-all duration-300 hover:scale-105`}
                    asChild
                  >
                    <a href={link.href}>
                      <link.icon className="w-5 h-5" />
                      {link.name}
                    </a>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Simple 5-Step Process</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Getting your essentials delivered has never been easier
              </p>
            </div>

            <div className="max-w-6xl mx-auto">
              {steps.map((step, index) => (
                <div key={index} className="mb-16 last:mb-0">
                  <Card className={`border-0 shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden ${index % 2 === 0 ? '' : 'ml-auto'} max-w-5xl`}>
                    <CardContent className="p-0">
                      <div className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
                        {/* Content Side */}
                        <div className="flex-1 p-8 md:p-12">
                          <div className="flex items-center mb-6">
                            <div className={`bg-gradient-to-r ${step.color} p-4 rounded-full mr-4`}>
                              <step.icon className="w-8 h-8 text-white" />
                            </div>
                            <div>
                              <span className="text-sm font-semibold text-gray-500 tracking-wide">STEP {step.number}</span>
                              <h3 className="text-2xl md:text-3xl font-bold text-gray-800">{step.title}</h3>
                            </div>
                          </div>
                          <p className="text-gray-600 leading-relaxed mb-6 text-lg">{step.content}</p>
                          <div className="space-y-2">
                            {step.features.map((feature, fIndex) => (
                              <div key={fIndex} className="flex items-center">
                                <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
                                <span className="text-gray-600">{feature}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Visual Side */}
                        <div className="flex-1 relative bg-gradient-to-br from-gray-50 to-gray-100 p-8 md:p-12 min-h-[300px] flex items-center justify-center">
                          <div className={`bg-gradient-to-r ${step.color} opacity-10 absolute inset-0`}></div>
                          <div className="relative text-center">
                            <div className={`bg-gradient-to-r ${step.color} p-8 rounded-3xl shadow-lg inline-block mb-4`}>
                              <step.icon className="w-16 h-16 text-white" />
                            </div>
                            <p className="text-gray-600 italic max-w-sm">{step.visual}</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Flow Visualization */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Your Journey with AR DELIVERO</h2>
              <p className="text-xl text-gray-600">From order to delivery in minutes</p>
            </div>

            <div className="max-w-6xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
                {steps.map((step, index) => (
                  <div 
                    key={index} 
                    className={`text-center cursor-pointer transition-all duration-300 ${activeStep === index ? 'transform scale-110' : 'hover:scale-105'}`}
                    onMouseEnter={() => setActiveStep(index)}
                  >
                    <div className={`bg-gradient-to-r ${step.color} p-6 rounded-full w-20 h-20 mx-auto mb-4 flex items-center justify-center shadow-lg ${activeStep === index ? 'shadow-xl' : ''}`}>
                      <step.icon className="w-8 h-8 text-white" />
                    </div>
                    <h4 className="font-bold text-gray-800 mb-2">{step.title}</h4>
                    <p className="text-sm text-gray-600">Step {step.number}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Coming Soon Section */}
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <Badge className="mb-4 bg-gradient-to-r from-[#328bb8] to-[#6bc83e] text-white">
                Coming Soon 🚀
              </Badge>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Exciting New Services</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                We're expanding our services to serve you better
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {comingSoonServices.map((service, index) => (
                <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-gradient-to-r from-[#6bc83e] to-[#328bb8] text-white">
                      Coming Soon
                    </Badge>
                  </div>
                  <CardContent className="p-8 text-center relative">
                    <div className={`bg-gradient-to-r ${service.color} opacity-5 absolute inset-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                    <div className={`bg-gradient-to-r ${service.color} p-6 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center opacity-75 group-hover:opacity-100 transition-opacity duration-300`}>
                      <service.icon className="w-10 h-10 text-white" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-800 mb-3">{service.title}</h4>
                    <p className="text-gray-600 text-lg">{service.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-[#328bb8] to-[#6bc83e] text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-8">Ready to Get Started?</h2>
              <p className="text-xl leading-relaxed mb-8 text-white/90">
                Join thousands of satisfied customers who trust AR DELIVERO for their daily essentials
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                {downloadLinks.map((link, index) => (
                  <Button
                    key={index}
                    className="bg-white text-[#328bb8] hover:bg-gray-100 px-8 py-4 rounded-full flex items-center gap-3 text-lg font-semibold transition-all duration-300 hover:scale-105"
                    asChild
                  >
                    <a href={link.href}>
                      <link.icon className="w-6 h-6" />
                      Download for {link.name}
                    </a>
                  </Button>
                ))}
              </div>
              <div className="grid md:grid-cols-3 gap-8 mt-16">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <Clock className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">30 min</div>
                  <div className="text-white/80">Average Delivery</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <Shield className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">100%</div>
                  <div className="text-white/80">Secure Payments</div>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <Star className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-2">4.8+</div>
                  <div className="text-white/80">Customer Rating</div>
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
