"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Clock, MapPin, Heart, Award, Zap } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import type { RestaurantByLocation } from "@/services/restaurant-service"
import { API_BASE_URL } from "@/lib/api"

interface FeaturedRestaurantsProps {
  restaurants?: RestaurantByLocation[]
  isLoading?: boolean
  error?: string | null
}

const fallbackRestaurants = [
  {
    _id: "1",
    establishName: "Bella Italia",
    restaurantCity: "Downtown",
    thumbnail: "/placeholder.svg?height=200&width=300",
    averageRating: 4.8,
    openHours: [],
    categoryDetails: [
      { _id: "1", title: "Italian" },
      { _id: "2", title: "Pizza" },
    ],
  },
  {
    _id: "2",
    establishName: "Sushi Master",
    restaurantCity: "Midtown",
    thumbnail: "/placeholder.svg?height=200&width=300",
    averageRating: 4.9,
    openHours: [],
    categoryDetails: [
      { _id: "3", title: "Japanese" },
      { _id: "4", title: "Sushi" },
    ],
  },
  {
    _id: "3",
    establishName: "Burger Palace",
    restaurantCity: "Uptown",
    thumbnail: "/placeholder.svg?height=200&width=300",
    averageRating: 4.6,
    openHours: [],
    categoryDetails: [
      { _id: "5", title: "American" },
      { _id: "6", title: "Burgers" },
    ],
  },
]

export default function FeaturedRestaurants({ restaurants, isLoading, error }: FeaturedRestaurantsProps) {
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [filter, setFilter] = useState("all")

  const displayRestaurants = !isLoading && !error && restaurants?.length ? restaurants.slice(0, 6) : fallbackRestaurants

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(id)) {
        newFavorites.delete(id)
      } else {
        newFavorites.add(id)
      }
      return newFavorites
    })
  }

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Skeleton className="h-8 w-64 mx-auto mb-4" />
            <Skeleton className="h-4 w-96 mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-3xl overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-6 space-y-3">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#6bc83e]/10 px-4 py-2 rounded-full mb-4">
            <Award className="h-5 w-5 text-[#6bc83e]" />
            <span className="text-[#6bc83e] font-medium">Featured</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            Top Restaurants
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover the most popular restaurants in your area, handpicked for exceptional quality and taste
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {["all", "popular", "new", "nearby", "top-rated"].map((filterOption) => (
            <Button
              key={filterOption}
              variant={filter === filterOption ? "default" : "outline"}
              onClick={() => setFilter(filterOption)}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                filter === filterOption
                  ? "bg-gradient-to-r from-[#328bb8] to-[#2e64ab] text-white shadow-lg"
                  : "bg-white hover:bg-gray-50 border-gray-200"
              }`}
            >
              {filterOption.charAt(0).toUpperCase() + filterOption.slice(1).replace("-", " ")}
            </Button>
          ))}
        </div>

        {/* Restaurant Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayRestaurants.map((restaurant, index) => (
            <div
              key={restaurant._id}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={
                    restaurant.thumbnail?.startsWith("http")
                      ? restaurant.thumbnail
                      : `${API_BASE_URL}/${restaurant.thumbnail}` || "/placeholder.svg"
                  }
                  alt={restaurant.establishName}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Badges */}
                <div className="absolute top-4 left-4 flex gap-2">
                  <Badge className="bg-[#6bc83e] text-white">
                    <Star className="h-3 w-3 mr-1 fill-white" />
                    {restaurant.averageRating > 0 ? restaurant.averageRating.toFixed(1) : "New"}
                  </Badge>
                  {index < 3 && (
                    <Badge className="bg-orange-500 text-white">
                      <Zap className="h-3 w-3 mr-1" />
                      Popular
                    </Badge>
                  )}
                </div>

                {/* Favorite Button */}
                <button
                  onClick={(e) => {
                    e.preventDefault()
                    toggleFavorite(restaurant._id)
                  }}
                  className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 hover:scale-110"
                >
                  <Heart
                    className={`h-4 w-4 transition-colors ${
                      favorites.has(restaurant._id) ? "text-red-500 fill-red-500" : "text-gray-600"
                    }`}
                  />
                </button>

                {/* Quick Action */}
                <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100 rounded-full">
                    Quick Order
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <Link href={`/restaurants/${restaurant._id}`}>
                  <h3 className="font-bold text-xl mb-2 group-hover:text-[#328bb8] transition-colors">
                    {restaurant.establishName}
                  </h3>
                </Link>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{restaurant.restaurantCity}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>25-35 min</span>
                  </div>
                </div>

                {/* Categories */}
                {restaurant.categoryDetails && restaurant.categoryDetails.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {restaurant.categoryDetails.slice(0, 2).map((category) => (
                      <Badge
                        key={category._id}
                        variant="outline"
                        className="text-xs border-gray-200 hover:border-[#328bb8] hover:text-[#328bb8] transition-colors"
                      >
                        {category.title}
                      </Badge>
                    ))}
                    {restaurant.categoryDetails.length > 2 && (
                      <Badge variant="outline" className="text-xs border-gray-200">
                        +{restaurant.categoryDetails.length - 2}
                      </Badge>
                    )}
                  </div>
                )}

                {/* Action */}
                <Link href={`/restaurants/${restaurant._id}`}>
                  <Button className="w-full bg-gradient-to-r from-[#328bb8] to-[#2e64ab] hover:from-[#2e64ab] hover:to-[#1e4a7a] text-white rounded-xl transition-all duration-300 hover:shadow-lg">
                    View Menu
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12 hidden">
          <Link href="/restaurants">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-4 rounded-full border-2 border-[#328bb8] text-[#328bb8] hover:bg-[#328bb8] hover:text-white transition-all duration-300 hover:scale-105"
            >
              View All Restaurants
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
