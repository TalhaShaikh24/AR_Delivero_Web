"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Play, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

const heroSlides = [
  {
    image: "../assets/bg-02.jpg",
    title: "",
    subtitle: "",
    description: "",
    cta: "Order Now",
    accent: "🍕",
  },
  {
    image: "../assets/bg-03.jpg",
    title: "",
    subtitle: "",
    description: "",
    cta: "Explore Menu",
    accent: "⭐",
  },
  {
    image: "../assets/bg-04.jpg",
    title: "",
    subtitle: "",
    description: "",
    cta: "Explore Menu",
    accent: "🚀",
  },
]

export default function ModernHero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)

  useEffect(() => {
    if (!isPlaying) return
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isPlaying])

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Slides */}
      {heroSlides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-1000 ${
            currentSlide === index ? "opacity-100 scale-100" : "opacity-0 scale-105"
          }`}
        >
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
        </div>
      ))}

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-white/20 rounded-full animate-pulse`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          ></div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <div className="max-w-4xl mx-auto">
          {/* Accent */}
          <div className="text-6xl mb-4 animate-bounce">{heroSlides[currentSlide].accent}</div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl font-bold mb-4 leading-tight">
            <span className="bg-gradient-to-r from-white via-white to-[#6bc83e] bg-clip-text text-transparent">
              {heroSlides[currentSlide].title}
            </span>
          </h1>

          {/* Subtitle */}
          <h2 className="text-3xl md:text-5xl font-light mb-6 text-white/90">{heroSlides[currentSlide].subtitle}</h2>

          {/* Description */}
          <p className="text-lg md:text-xl mb-8 text-white/80 max-w-2xl mx-auto leading-relaxed">
            {heroSlides[currentSlide].description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#6bc83e] to-[#5ab32e] hover:from-[#5ab32e] hover:to-[#4a9625] text-white border-none shadow-2xl hover:shadow-[#6bc83e]/25 transition-all duration-300 hover:scale-105 px-8 py-6 text-lg rounded-full"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              {heroSlides[currentSlide].cta}
            </Button>

            {/* <Button
              variant="outline"
              size="lg"
              className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 px-8 py-6 text-lg rounded-full transition-all duration-300 hover:scale-105"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button> */}
          </div>

          {/* Stats */}
          {/* <div className="grid grid-cols-3 gap-8 mt-16 max-w-2xl mx-auto">
            {[
              { number: "50K+", label: "Happy Customers" },
              { number: "1000+", label: "Partner Restaurants" },c
              { number: "30min", label: "Avg Delivery Time" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-[#6bc83e] mb-1">{stat.number}</div>
                <div className="text-sm text-white/70">{stat.label}</div>
              </div>
            ))}
          </div> */}
        </div>
      </div>

      {/* Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm rounded-full p-3 hover:bg-white/20 transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm rounded-full p-3 hover:bg-white/20 transition-all duration-300 hover:scale-110"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-[#6bc83e] scale-125" : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* Play/Pause */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute bottom-8 right-8 z-20 bg-white/10 backdrop-blur-sm rounded-full p-2 hover:bg-white/20 transition-all duration-300"
      >
        {isPlaying ? (
          <div className="w-4 h-4 flex gap-1">
            <div className="w-1 h-4 bg-white rounded"></div>
            <div className="w-1 h-4 bg-white rounded"></div>
          </div>
        ) : (
          <Play className="h-4 w-4 text-white ml-0.5" />
        )}
      </button>
    </section>
  )
}
