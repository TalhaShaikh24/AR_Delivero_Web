"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import ModernHeader from "@/components/modern/modern-header"
import ModernFooter from "@/components/modern/modern-footer"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { restaurantService, type RestaurantDetail } from "@/services/restaurant-service"
import { Skeleton } from "@/components/ui/skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Phone, Mail, Star, Clock, Heart, Zap } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function RestaurantPage() {
  const params = useParams()
  const restaurantId = params.id as string

  const [loading, setLoading] = useState(true)
  const [restaurant, setRestaurant] = useState<RestaurantDetail | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<string>("")
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const { addItem } = useCart()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const data = await restaurantService.getRestaurantById(restaurantId)
        setRestaurant(data)

        // Set the first category as active tab
        if (data && data.categories && data.categories.length > 0) {
          setActiveTab(data.categories[0].categoryId)
        }

        setLoading(false)
      } catch (error) {
        console.error("Error fetching restaurant:", error)
        setError("Failed to load restaurant details. Please try again later.")
        setLoading(false)
      }
    }

    if (restaurantId) {
      fetchData()
    }
  }, [restaurantId])

  // Helper function to format open hours
  const formatOpenHours = (day: string) => {
    if (!restaurant || !restaurant.openHours) return "Closed"
    const hours = restaurant.openHours[day as keyof typeof restaurant.openHours]
    return hours ? `${hours.from} - ${hours.to}` : "Closed"
  }

  const toggleFavorite = (itemId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(itemId)) {
        newFavorites.delete(itemId)
      } else {
        newFavorites.add(itemId)
      }
      return newFavorites
    })
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Header />
        <main className="flex-1 pt-20">
          <div className="h-[300px] relative">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="container mx-auto px-4 py-8">
            <Skeleton className="h-8 w-1/3 mb-4" />
            <Skeleton className="h-4 w-1/2 mb-2" />
            <Skeleton className="h-4 w-1/4 mb-6" />

            <Skeleton className="h-12 w-full mb-8 rounded-2xl" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Array(6)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="bg-white rounded-3xl overflow-hidden shadow-lg border border-gray-100">
                    <Skeleton className="h-48 w-full" />
                    <div className="p-6 space-y-3">
                      <Skeleton className="h-6 w-3/4" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-1/4" />
                      <Skeleton className="h-10 w-full rounded-xl" />
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

  if (error || !restaurant) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Header />
        <main className="flex-1 py-8 pt-20">
          <div className="container mx-auto px-4">
            <Alert variant="destructive" className="rounded-2xl border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error || "Restaurant not found"}</AlertDescription>
            </Alert>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <div className="h-[350px] relative overflow-hidden">
          <Image
            src={restaurantService.getImageUrl(restaurant.thumbnail) || "/placeholder.svg"}
            alt={restaurant.establishName}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-end">
            <div className="container mx-auto px-4 pb-8">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                    {restaurant.establishName}
                  </h1>
                  <div className="flex items-center gap-4 text-white">
                    <Badge className="bg-[#6bc83e] text-white border-0">
                      <Star className="h-4 w-4 mr-1 fill-current" />
                      {restaurant.averageRating || "New"}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>25-35 min</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{restaurant.restaurantCity}</span>
                    </div>
                  </div>
                </div>
                <Button
                  onClick={() => toggleFavorite(restaurant._id)}
                  className="p-3 bg-white/20 backdrop-blur-sm rounded-full hover:bg-white/30 transition-all duration-300 hover:scale-110"
                >
                  <Heart
                    className={`h-6 w-6 transition-colors ${
                      favorites.has(restaurant._id) ? "text-red-500 fill-red-500" : "text-white"
                    }`}
                  />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Menu Section */}
            <div className="lg:w-3/4">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full h-auto flex flex-wrap bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
                  {restaurant.categories.map((category) => (
                    <TabsTrigger 
                      key={category.categoryId} 
                      value={category.categoryId} 
                      className="flex-grow rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-[#328bb8] data-[state=active]:to-[#2e64ab] data-[state=active]:text-white transition-all duration-300"
                    >
                      {category.categoryInfo.title}
                    </TabsTrigger>
                  ))}
                </TabsList>

                {restaurant.categories.map((category) => (
                  <TabsContent key={category.categoryId} value={category.categoryId} className="mt-8">
                    <div className="mb-8">
                      <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                        {category.categoryInfo.title}
                      </h2>
                      <p className="text-gray-600">Delicious {category.categoryInfo.title.toLowerCase()} options</p>
                    </div>

                    {category.menuItems.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="p-6 bg-gradient-to-r from-[#328bb8]/10 to-[#6bc83e]/10 rounded-3xl inline-block mb-4">
                          <Zap className="h-12 w-12 text-[#328bb8] mx-auto" />
                        </div>
                        <p className="text-gray-500 text-lg">No menu items available in this category.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                        {category.menuItems.map((item) => (
                          <div
                            key={item._id}
                            className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-gray-100"
                          >
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                              <Image
                                src={restaurantService.getImageUrl(item.images[0]) || "/placeholder.svg"}
                                alt={item.menuName}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              
                              {/* Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                              {/* Badges */}
                              <div className="absolute top-4 left-4 flex gap-2">
                                {item.discount && item.discount !== "0" && (
                                  <Badge className="bg-red-500 text-white border-0">
                                    {item.discount}% OFF
                                  </Badge>
                                )}
                                <Badge className="bg-[#6bc83e] text-white border-0">
                                  {item.calories} cal
                                </Badge>
                              </div>

                              {/* Favorite Button */}
                              <button
                                onClick={(e) => {
                                  e.preventDefault()
                                  toggleFavorite(item._id)
                                }}
                                className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-300 hover:scale-110"
                              >
                                <Heart
                                  className={`h-4 w-4 transition-colors ${
                                    favorites.has(item._id) ? "text-red-500 fill-red-500" : "text-gray-600"
                                  }`}
                                />
                              </button>
                            </div>

                            {/* Content */}
                            <div className="p-6">
                              <Link href={`/menu/${item._id}`}>
                                <h3 className="font-bold text-xl mb-2 group-hover:text-[#328bb8] transition-colors">
                                  {item.menuName}
                                </h3>
                              </Link>
                              
                              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                {item.description}
                              </p>
                              
                              <div className="flex justify-between items-center mb-4">
                                <span className="font-bold text-xl text-[#328bb8]">₹{item.sellPrice.toFixed(2)}</span>
                                <span className="text-sm text-gray-500 flex items-center gap-1">
                                  <Clock className="h-3 w-3" />
                                  {item.preparationTime}
                                </span>
                              </div>

                              <Button
                                onClick={(e) => {
                                  e.stopPropagation()
                                  debugger
                                  const cartItem = {
                                    id: item._id,
                                    name: item.menuName,
                                    price: item.sellPrice,
                                    quantity: 1,
                                    image: restaurantService.getImageUrl(item.images[0]) || "/placeholder.svg",
                                    restaurant: restaurant.establishName,
                                    restaurantId: restaurant._id, // Added restaurantId
                                  }
                                  addItem(cartItem)
                                }}
                                className="w-full bg-gradient-to-r from-[#328bb8] to-[#2e64ab] hover:from-[#2e64ab] hover:to-[#1e4a7a] text-white rounded-xl transition-all duration-300 hover:shadow-lg"
                              >
                                Add to Cart
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </TabsContent>
                ))}
              </Tabs>
            </div>

            {/* Restaurant Info Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 sticky top-24">
                <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                  Restaurant Info
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-gradient-to-r from-[#328bb8]/10 to-[#6bc83e]/10 rounded-xl">
                      <MapPin className="h-5 w-5 text-[#328bb8]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 mb-1">Address</p>
                      <p className="text-sm text-gray-600">{restaurant.restaurantAddress}</p>
                      <p className="text-sm text-gray-600">
                        {restaurant.restaurantCity}, {restaurant.restaurantState}, {restaurant.restaurantCountry}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-[#328bb8]/10 to-[#6bc83e]/10 rounded-xl">
                      <Phone className="h-5 w-5 text-[#328bb8]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 mb-1">Phone</p>
                      <p className="text-sm text-gray-600">{restaurant.restaurantPhoneNumber || "Not available"}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-r from-[#328bb8]/10 to-[#6bc83e]/10 rounded-xl">
                      <Mail className="h-5 w-5 text-[#328bb8]" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 mb-1">Email</p>
                      <p className="text-sm text-gray-600">{restaurant.restaurantEmail || "Not available"}</p>
                    </div>
                  </div>

                  <div className="border-t border-gray-100 pt-6">
                    <h4 className="text-lg font-bold mb-4 text-gray-900">Opening Hours</h4>
                    <div className="space-y-3">
                      {["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"].map((day) => (
                        <div key={day} className="flex justify-between items-center">
                          <span className="text-sm font-medium text-gray-600 capitalize">{day}:</span>
                          <span className="text-sm text-gray-900 font-medium">{formatOpenHours(day)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}