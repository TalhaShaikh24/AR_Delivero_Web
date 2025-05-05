"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight, Utensils, Store } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Hero slider data
const heroSlides = [
  {
    image:
      "../assets/slide-1.jpg",
    title: "Delicious Food",
    subtitle: "Delivered to Your Door",
    description: "Experience the finest restaurants in your city",
  },
  {
    image: "/placeholder.svg?height=400&width=1200",
    title: "Fresh Ingredients",
    subtitle: "Quality You Can Trust",
    description: "We source only the best ingredients for your meals",
  },
  {
    image: "/placeholder.svg?height=400&width=1200",
    title: "Fast Delivery",
    subtitle: "Hot Food at Your Doorstep",
    description: "Our delivery partners ensure your food arrives quickly",
  },
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev === 0 ? heroSlides.length - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  // Auto-advance slides
  useEffect(() => {
    const timer = setTimeout(() => {
      nextSlide()
    }, 5000)
    return () => clearTimeout(timer)
  }, [currentSlide])

  return (
    <section className="relative">
      <div className="relative h-[300px] md:h-[400px] overflow-hidden">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
              currentSlide === index ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/40">
              <div className="container mx-auto h-full flex flex-col justify-center items-center text-center text-white px-4">
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{slide.title}</h1>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">{slide.subtitle}</h2>
                <p className="mb-6 text-sm md:text-base">{slide.description}</p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/categories">
                    <Button className="bg-[#6bc83e] hover:bg-[#5ab32e] text-white border-none">
                      <Utensils className="w-4 h-4 mr-2" />
                      Order Now
                    </Button>
                  </Link>
                  <Link href="/restaurants">
                    <Button variant="outline" className="bg-white text-black hover:bg-gray-100">
                      <Store className="w-4 h-4 mr-2" />
                      View Restaurants
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 z-20 hover:bg-white"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 z-20 hover:bg-white"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Slide indicators */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${currentSlide === index ? "bg-white" : "bg-white/50"}`}
              onClick={() => {
                setCurrentSlide(index)
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
