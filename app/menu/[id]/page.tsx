"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import Header from "@/components/header"
import SearchBar from "@/components/search-bar"
import Footer from "@/components/footer"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Minus, Plus, ShoppingBag, Clock, Utensils } from "lucide-react"
import { useCart } from "@/context/cart-context"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Skeleton } from "@/components/ui/skeleton"
import { MenuService, type MenuItem } from "@/services/menu-service"
import { API_BASE_URL } from "@/lib/api"


export default function MenuItemPage() {
  const router = useRouter()
  const params = useParams()
  const menuId = params.id as string
  const { addItem, toggleCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [menuItem, setMenuItem] = useState<MenuItem | null>(null)
  const [loading, setLoading] = useState(true)
  const [relatedItems, setRelatedItems] = useState<MenuItem[]>([])

  useEffect(() => {
    const fetchMenuItem = async () => {
      try {
        setLoading(true)
        const item = await MenuService.getMenuById(menuId)
        debugger;
        setMenuItem(item)

        // Fetch related items (same category)
        if (item && item.categoryId) {
          const related = await MenuService.getRelatedMenuItems(item.categoryId, item._id)
          setRelatedItems(related)
        }

        setLoading(false)
      } catch (error) {
        console.error("Error fetching menu item:", error)
        setLoading(false)
      }
    }

    if (menuId) {
      fetchMenuItem()
    }
  }, [menuId])

  const handleAddToCart = () => {
    if (!menuItem) return

    // Add item to cart
    addItem({
      id: menuItem._id,
      name: menuItem.menuName,
      price: menuItem.sellPrice,
      quantity,
      image: getImageUrl(menuItem.images[0]),
      restaurant: menuItem.restaurantId,
    })

    // Open cart
    toggleCart()
  }

  if (loading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <SearchBar />
        <main className="flex-1 py-8">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="md:w-1/2">
                <Skeleton className="h-[400px] w-full rounded-lg" />
              </div>
              <div className="md:w-1/2">
                <Skeleton className="h-10 w-3/4 mb-2" />
                <Skeleton className="h-6 w-1/2 mb-4" />
                <Skeleton className="h-24 w-full mb-6" />
                <Skeleton className="h-8 w-1/4 mb-8" />
                <Skeleton className="h-10 w-full mb-4" />
                <Skeleton className="h-12 w-full" />
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!menuItem) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <SearchBar />
        <main className="flex-1 py-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Item not found</h1>
            <Button onClick={() => router.push("/")} className="bg-[#328bb8]">
              Back to Home
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const getImageUrl = (path: string) => {
    if (!path) return "/placeholder.svg?height=400&width=600"
    if (path.startsWith("http")) return path
    return `${API_BASE_URL}${path}`
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <SearchBar />
      <main className="flex-1 py-8 bg-[#F9FAFB]">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/2">
                <div className="h-[300px] md:h-[500px] relative">
                  <Image
                    src={getImageUrl(menuItem.images[0]) || "/placeholder.svg"}
                    alt={menuItem.menuName}
                    fill
                    className="object-cover"
                  />
                  {menuItem.discount && menuItem.discount !== "0" && (
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-red-500 text-white px-3 py-1 text-sm font-bold">
                        {menuItem.discount}% OFF
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              <div className="md:w-1/2 p-6 md:p-8">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">{menuItem.menuName}</h1>

                {menuItem.categoryName && <p className="text-gray-500 mb-4">Category: {menuItem.categoryName}</p>}

                <div className="flex items-center gap-2 mb-4">
                  <Badge variant="outline" className="bg-[#f8f9fa] text-gray-700">
                    <Clock className="h-3 w-3 mr-1" />
                    {menuItem.preparationTime || "20-30 min"}
                  </Badge>

                  <Badge variant="outline" className="bg-[#f8f9fa] text-gray-700">
                    <Utensils className="h-3 w-3 mr-1" />
                    {menuItem.servingSize || "1 serving"}
                  </Badge>

                  {menuItem.calories && (
                    <Badge variant="outline" className="bg-[#f8f9fa] text-gray-700">
                      {menuItem.calories} cal
                    </Badge>
                  )}
                </div>

                <p className="text-gray-700 mb-6">{menuItem.description}</p>

                <div className="flex items-center mb-6">
                  <div className="text-2xl font-bold text-[#328bb8]">${menuItem.sellPrice.toFixed(2)}</div>
                  {menuItem.price !== menuItem.sellPrice && (
                    <div className="ml-2 text-gray-500 line-through">${menuItem.price.toFixed(2)}</div>
                  )}
                </div>

                <Tabs defaultValue="details" className="mb-6">
                  <TabsList className="mb-2">
                    <TabsTrigger value="details">Details</TabsTrigger>
                    <TabsTrigger value="ingredients">Ingredients</TabsTrigger>
                    <TabsTrigger value="dietary">Dietary Info</TabsTrigger>
                  </TabsList>

                  <TabsContent value="details" className="text-sm text-gray-600">
                    <div className="space-y-2">
                      {menuItem.specialInstructions && (
                        <div>
                          <span className="font-medium">Special Instructions:</span> {menuItem.specialInstructions}
                        </div>
                      )}
                      {menuItem.prepInstructions && (
                        <div>
                          <span className="font-medium">Preparation Instructions:</span> {menuItem.prepInstructions}
                        </div>
                      )}
                      {menuItem.tags && menuItem.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {menuItem.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </TabsContent>

                  <TabsContent value="ingredients" className="text-sm text-gray-600">
                    {menuItem.ingredients && menuItem.ingredients.length > 0 ? (
                      <ul className="list-disc pl-5 space-y-1">
                        {menuItem.ingredients.map((ingredient, index) => (
                          <li key={index}>{ingredient}</li>
                        ))}
                      </ul>
                    ) : (
                      <p>No ingredient information available.</p>
                    )}
                  </TabsContent>

                  <TabsContent value="dietary" className="text-sm text-gray-600">
                    {menuItem.dietaryInfo ? (
                      <div>
                        {menuItem.dietaryInfo.split("  ").map((item, index) => (
                          <div key={index} className="mb-1">
                            • {item.trim()}
                          </div>
                        ))}
                      </div>
                    ) : (
                      <p>No dietary information available.</p>
                    )}
                  </TabsContent>
                </Tabs>

                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium">Quantity</h3>
                    <div className="flex items-center border rounded-md">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-10 text-center">{quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <Button className="w-full bg-[#328bb8] h-12 text-lg" onClick={handleAddToCart}>
                  <ShoppingBag className="mr-2 h-5 w-5" /> Add to Cart - ${(menuItem.sellPrice * quantity).toFixed(2)}
                </Button>
              </div>
            </div>
          </div>

          {/* Related Items */}
          {relatedItems.length > 0 && (
            <div className="mt-12">
              <h2 className="text-xl font-bold mb-4">You might also like</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {relatedItems.map((item) => (
                  <div
                    key={item._id}
                    className="bg-white rounded-lg overflow-hidden shadow-sm border hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => router.push(`/menu/${item._id}`)}
                  >
                    <div className="h-[160px] relative">
                      <Image
                        src={getImageUrl(item.images[0]) || "/placeholder.svg"}
                        alt={item.menuName}
                        fill
                        className="object-cover"
                      />
                      {item.discount && item.discount !== "0" && (
                        <Badge className="absolute top-2 left-2 bg-red-500">{item.discount}% OFF</Badge>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold">{item.menuName}</h3>
                      <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
                      <div className="flex justify-between items-center mt-2">
                        <p className="font-medium">${item.sellPrice.toFixed(2)}</p>
                        <Button
                          size="sm"
                          className="bg-[#328bb8]"
                          onClick={(e) => {
                            e.stopPropagation()
                            addItem({
                              id: item._id,
                              name: item.menuName,
                              price: item.sellPrice,
                              quantity: 1,
                              image: getImageUrl(item.images[0]),
                              restaurant: item.restaurantId,
                            })
                          }}
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}
