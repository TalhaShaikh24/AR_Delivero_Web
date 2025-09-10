"use client"

import { useState, useEffect } from "react"
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const testimonials = [
  {
    id: 1,
    name: "Talha Shaikh",
    role: "Food Enthusiast",
    avatar: "/userIcon.png",
    rating: 5,
    text: "AR Delivero has completely transformed my dining experience. The food arrives hot, fresh, and exactly as ordered. Their delivery time is incredibly fast!",
    orderCount: 47,
    location: "Srinagar, India",
  },
  {
    id: 2,
    name: "M.Ali",
    role: "Busy Professional",
    avatar: "/userIcon.png",
    rating: 5,
    text: "As someone who works long hours, AR Delivero is a lifesaver. The app is intuitive, and I can track my order in real-time. Highly recommended!",
    orderCount: 32,
    location: "",
  },
  {
    id: 3,
    name: "Bilal",
    role: "College Student",
    avatar: "/userIcon.png",
    rating: 5,
    text: "The variety of restaurants and the student discounts make AR Delivero perfect for my budget. Plus, the customer service is exceptional!",
    orderCount: 28,
    location: "Baramulla, India",
  },
  {
    id: 4,
    name: "Asad",
    role: "Family Man",
    avatar: "/userIcon.png",
    rating: 5,
    text: "Feeding a family of five can be challenging, but AR Delivero makes it easy. Great portions, fair prices, and the kids love the variety!",
    orderCount: 65,
    location: "Baramulla, India",
  },
  {
    id: 5,
    name: "Musaddiq",
    role: "Health Conscious",
    avatar: "/userIcon.png",
    rating: 5,
    text: "I love that AR Delivero has so many healthy options. The nutritional information is clear, and the fresh ingredients really show in the taste.",
    orderCount: 41,
    location: "Handwara, India",
  },
]

export default function TestimonialsCarousel() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const timer = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [isAutoPlaying])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-[#328bb8]/5 via-white to-[#6bc83e]/5 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#6bc83e] rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-64 h-64 bg-[#328bb8] rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-[#328bb8]/10 to-[#6bc83e]/10 px-6 py-3 rounded-full mb-6">
            <Quote className="h-5 w-5 text-[#328bb8]" />
            <span className="text-[#328bb8] font-medium">Testimonials</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            What Our Customers Say
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Don't just take our word for it. Here's what our satisfied customers have to say about their experience
          </p>
        </div>

        {/* Testimonial Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="relative h-96 md:h-80">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={`absolute inset-0 transition-all duration-700 ${
                  currentTestimonial === index
                    ? "opacity-100 translate-x-0"
                    : index < currentTestimonial
                      ? "opacity-0 -translate-x-full"
                      : "opacity-0 translate-x-full"
                }`}
              >
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 h-full flex flex-col justify-between relative overflow-hidden">
                  {/* Background Quote */}
                  <Quote className="absolute top-6 right-6 h-16 w-16 text-[#328bb8]/10" />

                  {/* Content */}
                  <div>
                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>

                    {/* Testimonial Text */}
                    <blockquote className="text-lg md:text-xl text-gray-700 leading-relaxed mb-8 font-medium">
                      "{testimonial.text}"
                    </blockquote>
                  </div>

                  {/* Author Info */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-16 w-16 border-2 border-[#328bb8]/20">
                        <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                        <AvatarFallback className="bg-gradient-to-r from-[#328bb8] to-[#6bc83e] text-white font-bold">
                          {testimonial.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                        <p className="text-gray-600 text-sm">{testimonial.role}</p>
                        <p className="text-gray-500 text-xs">{testimonial.location}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <Badge className="bg-[#6bc83e]/10 text-[#6bc83e] border-[#6bc83e]/20">
                        {testimonial.orderCount} orders
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white shadow-lg rounded-full hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-100"
          >
            <ChevronLeft className="h-6 w-6 text-gray-600" />
          </button>

          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white shadow-lg rounded-full hover:shadow-xl transition-all duration-300 hover:scale-110 border border-gray-100"
          >
            <ChevronRight className="h-6 w-6 text-gray-600" />
          </button>

          {/* Indicators */}
          <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 flex gap-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentTestimonial === index ? "bg-[#328bb8] scale-125" : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          {[
            { number: "4.9/5", label: "Average Rating" },
            { number: "50K+", label: "Happy Customers" },
            { number: "98%", label: "Satisfaction Rate" },
            { number: "24/7", label: "Customer Support" },
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
