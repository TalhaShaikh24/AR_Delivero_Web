"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Header from "@/components/header"
import SearchBar from "@/components/search-bar"
import Footer from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { restaurantService, type Restaurant } from "@/services/restaurant-service"
import { CategoryService } from "@/services/category-service"
import { Skeleton } from "@/components/ui/skeleton"
import { Clock, MapPin, Star } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function CategoryPage() {
  const params = useParams()
  const categoryId = params.category as string

  const [loading, setLoading] = useState(true)
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]) // Ensures restaurants is always an array
  const [category, setCategory] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        // Fetch category details
        const categoryData = await CategoryService.getCategoryById(categoryId)
        setCategory(categoryData)

        // Fetch restaurants for this category
        const restaurantData = await restaurantService.getRestaurantsByCategory(categoryId)
        setRestaurants(restaurantData || []) // Ensure default empty array if no restaurants

        setLoading(false)
      } catch (error) {
        console.error("Error fetching data:", error)
        setError("Failed to load restaurants. Please try again later.")
        setLoading(false)
      }
    }

    if (categoryId) {
      fetchData()
    }
  }, [categoryId])

  const categoryName =
    category?.title || (categoryId ? categoryId.charAt(0).toUpperCase() + categoryId.slice(1) : "Category")

  // Helper function to format open hours
  const formatOpenHours = (restaurant: Restaurant) => {
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" }).toLowerCase()
    const hours = restaurant.openHours[today as keyof typeof restaurant.openHours]
    return hours ? `${hours.from} - ${hours.to}` : "Closed"
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <SearchBar />
        <main className="flex-1 py-8">
          <div className="container mx-auto px-4">
            <Skeleton className="h-10 w-1/4 mb-6" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {Array(4)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="bg-white rounded-lg overflow-hidden shadow-sm border">
                    <Skeleton className="h-[200px] w-full" />
                    <div className="p-4">
                      <Skeleton className="h-6 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-1/2 mb-4" />
                      <Skeleton className="h-4 w-1/4" />
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <SearchBar />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">{categoryName} Restaurants</h1>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Ensure safe rendering of restaurants */}
          {!error && Array.isArray(restaurants) && restaurants.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-lg text-gray-500">No restaurants found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {restaurants.map((restaurant) => (
                <Link href={`/restaurants/${restaurant._id}`} key={restaurant._id} className="block">
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm border hover:shadow-md transition-shadow">
                    <div className="h-[200px] relative">
                      <Image
                        src={restaurantService.getImageUrl(restaurant.thumbnail) || "/placeholder.svg"}
                        alt={restaurant.establishName}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-[#6bc83e]">
                          <Star className="h-3 w-3 mr-1 fill-current" />
                          {restaurant.averageRating || "New"}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-4">
                      <h2 className="font-bold text-lg">{restaurant.establishName}</h2>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <MapPin className="h-4 w-4 mr-1" />
                        <p className="truncate">{restaurant.restaurantAddress}</p>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 mt-1">
                        <Clock className="h-4 w-4 mr-1" />
                        <p>Open: {formatOpenHours(restaurant)}</p>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {restaurant.categoryDetails?.slice(0, 3).map((cat) => (
                          <Badge key={cat._id} variant="outline" className="text-xs">
                            {cat.title}
                          </Badge>
                        ))}
                        {restaurant.categoryDetails?.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{restaurant.categoryDetails.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
