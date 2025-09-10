"use client"
import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { menuService } from "@/services/menuService"
import { Skeleton } from "@/components/ui/skeleton"
import { MapPin, Clock, Heart, Star } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import Header from "@/components/header"
import Footer from "@/components/footer"

interface MenuItem {
  _id: string
  menuName: string
  description: string
  sellPrice: number
  images: string[]
  discount: string
  calories: number
  preparationTime: string
  restaurantInfo: {
    _id: string
    establishName: string
    restaurantCity: string
    averageRating?: number
  }[]
}

interface CategoryData {
  categoryName: string
  categoryId: string
  menus: MenuItem[]
  image?: string // Optional category image from API
}

export default function CategoryMenusPage() {
  const params = useParams()
  const categoryId = params.categoryId as string

  const [loading, setLoading] = useState(true)
  const [categoryData, setCategoryData] = useState<CategoryData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const { addItem, toggleCart } = useCart()

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const response = await menuService.getMenusByCategoryId(categoryId)
        setCategoryData(response)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching category menus:", error)
        setError("Failed to load menu items. Please try again later.")
        setLoading(false)
      }
    }

    if (categoryId) {
      fetchData()
    }
  }, [categoryId])

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
          <div className="h-[350px] relative">
            <Skeleton className="h-full w-full" />
          </div>
          <div className="container mx-auto px-4 py-8">
            <Skeleton className="h-8 w-1/3 mb-4" />
            <Skeleton className="h-4 w-1/2 mb-8" />
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

  if (error || !categoryData || !categoryData.menus) {
    return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Header />
        <main className="flex-1 py-8 pt-20">
          <div className="container mx-auto px-4">
            <Alert variant="destructive" className="rounded-2xl border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error || "No menu items found for this category"}</AlertDescription>
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
      <main className="flex-1">
        {/* Hero Section */}
        <div className="h-[250px] sm:h-[550px] relative overflow-hidden">
          <Image
            src={"/assets/banner-menus.png"}
            alt={categoryData.categoryName}
            fill
            className="object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex items-center">
            <div className="container mx-auto px-4">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {categoryData.categoryName}
              </h1>
              <div className="flex items-center gap-4 text-white">
                <div className="flex items-center gap-1 text-1xl md:text-2xl">
                  <MapPin className="h-4 w-4" />
                  <span>
                    {categoryData.menus[0]?.restaurantInfo[0]?.restaurantCity || "Unknown City"}
                  </span>
                </div>
                {/* {categoryData.menus[0]?.restaurantInfo[0]?.averageRating && (
                  <Badge className="bg-[#6bc83e] text-white border-0">
                    <Star className="h-4 w-4 mr-1 fill-current" />
                    {categoryData.menus[0].restaurantInfo[0].averageRating || "New"}
                  </Badge>
                )} */}
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12">
          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              {categoryData.categoryName} Delights
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Explore our handpicked selection of delicious {categoryData.categoryName.toLowerCase()} dishes crafted to satisfy your cravings.
            </p>
          </div>

          {categoryData.menus.length === 0 ? (
            <div className="text-center py-12">
              <div className="p-6 bg-gradient-to-r from-[#328bb8]/10 to-[#6bc83e]/10 rounded-3xl inline-block mb-4">
                <Clock className="h-12 w-12 text-[#328bb8] mx-auto" />
              </div>
              <p className="text-gray-500 text-lg">No menu items available in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categoryData.menus.map((item) => (
                <div
                  key={item._id}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200"
                >
                  <div className="relative h-52 overflow-hidden">
                    <Image
                      src={menuService.getImageUrl(item.images[0]) || "/placeholder.svg"}
                      alt={item.menuName}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>
                    <div className="absolute top-3 left-3 flex gap-2">
                      {item.discount && item.discount !== "0" && (
                        <Badge className="bg-[#328bb8] text-white font-semibold px-3 py-1 rounded-full shadow-sm">
                          {item.discount}% OFF
                        </Badge>
                      )}
                      <Badge className="bg-[#6bc83e] text-white font-semibold px-3 py-1 rounded-full shadow-sm">
                        {item.calories} cal
                      </Badge>
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault()
                        toggleFavorite(item._id)
                      }}
                      className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-md rounded-full hover:bg-white hover:scale-110 transition-all duration-300"
                    >
                      <Heart
                        className={`h-5 w-5 transition-colors ${
                          favorites.has(item._id) ? "text-red-600 fill-red-600" : "text-gray-700"
                        }`}
                      />
                    </button>
                  </div>
                  <div className="p-5 space-y-3">
                    <div className="space-y-1">
                      <div className="inline-block bg-gradient-to-r from-[#328bb8] to-[#6bc83e] text-white text-xs font-semibold uppercase tracking-wide px-3 py-1 rounded-full shadow-sm">
                        {item.restaurantInfo[0]?.establishName || "Unknown Restaurant"}
                      </div>
                      <h3 className="font-bold text-2xl text-gray-900 group-hover:bg-gradient-to-r group-hover:from-[#328bb8] group-hover:to-[#6bc83e] group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                        {item.menuName}
                      </h3>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2 leading-relaxed">
                      {item.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xl text-[#328bb8] bg-clip-text">
                        ₹{item.sellPrice.toFixed(2)}
                      </span>
                      <span className="text-sm text-gray-500 flex items-center gap-1">
                        <Clock className="h-4 w-4 text-[#328bb8]" />
                        {item.preparationTime}
                      </span>
                    </div>
                    <Button
                      onClick={(e) => {
                        e.stopPropagation()
                        const cartItem = {
                          id: item._id,
                          name: item.menuName,
                          price: item.sellPrice,
                          quantity: 1,
                          image: menuService.getImageUrl(item.images[0]) || "/placeholder.svg",
                          restaurant: item.restaurantInfo[0]?.establishName || "Unknown Restaurant",
                          restaurantId: item.restaurantInfo[0]?._id || "",
                        }
                        addItem(cartItem)
                        toggleCart()
                      }}
                      className="w-full bg-gradient-to-r from-[#328bb8] to-[#2e64ab] hover:from-[#2e64ab] hover:to-[#1e4a7a] text-white font-semibold rounded-full py-3 transition-all duration-300 hover:shadow-lg"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}