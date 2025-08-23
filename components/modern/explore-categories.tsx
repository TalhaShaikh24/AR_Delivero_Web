"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Sparkles, Star, TrendingUp } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import type { Category } from "@/lib/types/category"
import { useRouter } from 'next/navigation'

interface ExploreCategoriesProps {
  categories?: Category[]
  isLoading?: boolean
  error?: string | null
}

const fallbackCategories = [
  {
    _id: "food",
    title: "Food & Dining",
    description: "Delicious meals from top restaurants",
    image: "/placeholder.svg?height=300&width=400",
    productCount: 1250,
    icon: "🍽️",
    color: "from-orange-400 via-red-400 to-pink-500",
    accent: "bg-orange-500",
    popular: true,
  },
  {
    _id: "grocery",
    title: "Groceries",
    description: "Fresh produce and daily essentials",
    image: "/placeholder.svg?height=300&width=400",
    productCount: 850,
    icon: "🛒",
    color: "from-green-400 via-emerald-400 to-teal-500",
    accent: "bg-green-500",
    popular: false,
  },
  {
    _id: "petroleum",
    title: "Fuel Delivery",
    description: "Convenient fuel delivery service",
    image: "/placeholder.svg?height=300&width=400",
    productCount: 45,
    icon: "⛽",
    color: "from-blue-400 via-indigo-400 to-purple-500",
    accent: "bg-blue-500",
    popular: false,
  },
  {
    _id: "pharmacy",
    title: "Pharmacy",
    description: "Medicines and health products",
    image: "/placeholder.svg?height=300&width=400",
    productCount: 320,
    icon: "💊",
    color: "from-purple-400 via-pink-400 to-rose-500",
    accent: "bg-purple-500",
    popular: true,
  },
  {
    _id: "electronics",
    title: "Electronics",
    description: "Latest gadgets and accessories",
    image: "/placeholder.svg?height=300&width=400",
    productCount: 680,
    icon: "📱",
    color: "from-cyan-400 via-blue-400 to-indigo-500",
    accent: "bg-cyan-500",
    popular: false,
  },
  {
    _id: "fashion",
    title: "Fashion",
    description: "Trendy clothes and accessories",
    image: "/placeholder.svg?height=300&width=400",
    productCount: 920,
    icon: "👗",
    color: "from-pink-400 via-rose-400 to-red-500",
    accent: "bg-pink-500",
    popular: true,
  },
]

export default function ExploreCategories({ categories, isLoading, error }: ExploreCategoriesProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)

  // Inside the component
const router = useRouter()

  const displayCategories =
    !isLoading && !error && categories?.length
      ? categories.map((cat, index) => ({
          ...cat,
          icon: fallbackCategories[index % fallbackCategories.length]?.icon || "🏪",
          color: fallbackCategories[index % fallbackCategories.length]?.color || "from-gray-400 to-gray-500",
          accent: fallbackCategories[index % fallbackCategories.length]?.accent || "bg-gray-500",
          popular: fallbackCategories[index % fallbackCategories.length]?.popular || false,
        }))
      : fallbackCategories

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="h-64 rounded-t-3xl" />
                <div className="p-6 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex justify-between items-center pt-2">
                    <Skeleton className="h-4 w-20" />
                    <Skeleton className="h-10 w-10 rounded-xl" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

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
            <span className="text-[#328bb8] font-semibold text-lg">Discover Amazing Categories</span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-gray-900 via-[#328bb8] to-[#6bc83e] bg-clip-text text-transparent leading-tight">
            Browse Categories
          </h2>
          <p className="text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed">
            From delicious food to daily essentials, discover everything you need delivered to your doorstep with
            lightning-fast service
          </p>
        </div>

        {/* Enhanced Categories Grid with Better Image Integration */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {displayCategories.map((category, index) => (
            <div
            key={category._id}
            className="block group cursor-pointer"
            onClick={() => {
              router.push(`/categories/${category._id}`)
              // Inject state using history API
              history.replaceState({ name: category.title }, "")
            }}
            onMouseEnter={() => setHoveredCategory(category._id)}
            onMouseLeave={() => setHoveredCategory(null)}
            >
              <div className="relative h-[420px] rounded-3xl overflow-hidden bg-white shadow-xl hover:shadow-2xl transition-all duration-700 hover:-translate-y-4 hover:rotate-1 border border-gray-100 group">
                {/* Popular Badge */}
                {category.popular && (
                  <div className="absolute top-4 right-4 z-30">
                    <div className="flex items-center gap-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm">
                      <Star className="h-3 w-3 fill-current" />
                      Popular
                    </div>
                  </div>
                )}

                {/* Enhanced Image Section - Takes up more space */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src={
                      category.image?.startsWith("http")
                        ? category.image
                        : `https://api.ardelivero.com${category.image}` || "/placeholder.svg?height=400&width=600"
                    }
                    alt={category.title}
                    fill
                    className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:brightness-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={index < 3}
                  />

                  {/* Subtle gradient overlay to ensure text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>

                  {/* Floating Icon on Image */}
                  <div className="absolute top-4 left-4 z-20 display-none group-hover:block">
                    <div className="w-14 h-14 bg-white/90 backdrop-blur-xl rounded-2xl flex items-center justify-center text-xl shadow-lg border border-white/50 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500">
                      {category.icon}
                    </div>
                  </div>

                  {/* Product Count Badge on Image */}
                  <div className="absolute bottom-4 left-4 z-20">
                    <Badge className="bg-white/90 text-gray-800 border-white/50 font-semibold backdrop-blur-sm">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {category.productCount || 0} items
                    </Badge>
                  </div>

                  {/* Shimmer Effect on Image */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"></div>
                </div>

                {/* Content Section - Clean white background */}
                <div className="relative h-40 bg-white p-6 flex flex-col justify-between">
                  {/* Colored accent bar */}
                  <div
                    className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${category.color || "from-gray-400 to-gray-600"}`}
                  ></div>

                  <div className="space-y-3">
                    <h3 className="text-2xl font-bold text-gray-900 group-hover:text-[#328bb8] transition-colors leading-tight">
                      {category.title}
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
                      {category.description || `Explore ${category.title}`}
                    </p>
                  </div>

                  {/* Enhanced CTA */}
                  <div className="flex items-center justify-between pt-2">
                    <div className="flex flex-col">
                      <span className="text-[#328bb8] font-bold text-sm">Explore Now</span>
                      <span className="text-gray-400 text-xs">Fast delivery</span>
                    </div>
                    <div
                      className={`p-3 bg-gradient-to-r ${category.color || "from-gray-400 to-gray-600"} rounded-xl transition-all duration-500 shadow-md group-hover:shadow-lg group-hover:scale-110 ${
                        hoveredCategory === category._id ? "translate-x-2 rotate-12" : ""
                      }`}
                    >
                      <ArrowRight className="h-4 w-4 text-white" />
                    </div>
                  </div>
                </div>

                {/* Hover glow effect */}
                <div
                  className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 bg-gradient-to-br ${category.color || "from-gray-400 to-gray-600"} blur-xl -z-10`}
                ></div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced View All Button */}
        <div className="text-center mt-20 hidden">
          <Link href="/categories">
            <Button
              size="lg"
              className="bg-gradient-to-r from-[#328bb8] via-[#2e64ab] to-[#6bc83e] hover:from-[#6bc83e] hover:via-[#328bb8] hover:to-[#2e64ab] text-white px-12 py-6 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-110 text-lg font-bold border-2 border-white/20 backdrop-blur-xl"
            >
              <Sparkles className="mr-3 h-6 w-6" />
              View All Categories
              <ArrowRight className="ml-3 h-6 w-6" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
