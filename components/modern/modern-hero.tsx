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

  const scrollToFeaturedRestaurants = () => {
    const featuredSection = document.getElementById("featured-restaurants")
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: "smooth" })
    } else {
      console.warn("Featured Restaurants section not found")
    }
  }

  return (
    <section className="Kanit relative h-[300px] sm:h-[80vh] flex items-center justify-center overflow-hidden">
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
            className={`absolute w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/20 rounded-full animate-pulse`}
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
      <div className="relative z-10 container mx-auto px-4 sm:px-6 text-center text-white">
        <div className="max-w-3xl mx-auto">
          {/* Accent */}
          <div className="text-4xl sm:text-6xl mb-3 sm:mb-4 animate-bounce">{heroSlides[currentSlide].accent}</div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold mb-3 sm:mb-4 leading-tight">
            <span className="bgilag-gradient-to-r from-white via-white to-[#6bc83e] bg-clip-text text-transparent">
              {heroSlides[currentSlide].title}
            </span>
          </h1>

          {/* Subtitle */}
          <h2 className="text-xl sm:text-2xl md:text-4xl font-light mb-4 sm:mb-6 text-white/90">
            {heroSlides[currentSlide].subtitle}
          </h2>

          {/* Description */}
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 text-white/80 max-w-xl mx-auto leading-relaxed">
            {heroSlides[currentSlide].description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Button
              size="lg"
              onClick={scrollToFeaturedRestaurants}
              className="bg-gradient-to-r from-[#6bc83e] to-[#5ab32e] hover:from-[#5ab32e] hover:to-[#4a9625] text-white border-none shadow-2xl hover:shadow-[#6bc83e]/25 transition-all duration-300 hover:scale-105 px-6 py-4 sm:px-8 sm:py-6 text-base sm:text-lg rounded-full"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              {heroSlides[currentSlide].cta}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm rounded-full p-2 sm:p-3 hover:bg-white/20 transition-all duration-300 hover:scale-110"
      >
        <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 bg-white/10 backdrop-blur-sm rounded-full p-2 sm:p-3 hover:bg-white/20 transition-all duration-300 hover:scale-110"
      >
        <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2 sm:gap-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? "bg-[#6bc83e] scale-125" : "bg-white/50 hover:bg-white/80"
            }`}
          />
        ))}
      </div>

      {/* Play/Pause */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="absolute bottom-4 sm:bottom-8 right-4 sm:right-8 z-20 bg-white/10 backdrop-blur-sm rounded-full p-1.5 sm:p-2 hover:bg-white/20 transition-all duration-300"
      >
        {isPlaying ? (
          <div className="w-3 h-3 sm:w-4 sm:h-4 flex gap-0.5 sm:gap-1">
            <div className="w-0.5 sm:w-1 h-3 sm:h-4 bg-white rounded"></div>
            <div className="w-0.5 sm:w-1 h-3 sm:h-4 bg-white rounded"></div>
          </div>
        ) : (
          <Play className="h-3 w-3 sm:h-4 sm:w-4 text-white ml-0.5" />
        )}
      </button>
    </section>
  )
}