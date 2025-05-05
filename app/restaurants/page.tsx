import Header from "@/components/header"
import SearchBar from "@/components/search-bar"
import Footer from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

export default function RestaurantsPage() {
  // This would normally come from an API
  const restaurants = [
    {
      id: "grand-kitchen",
      name: "The Grand Kitchen",
      image: "/placeholder.svg?height=160&width=400",
      rating: 4.5,
      cuisines: ["Italian", "Continental"],
      distance: "0.5-0.7 miles",
      offer: "$25 OFF up to $50",
    },
    {
      id: "asian-fusion",
      name: "Asian Fusion",
      image: "/placeholder.svg?height=160&width=400",
      rating: 4.3,
      cuisines: ["Chinese", "Thai", "Japanese"],
      distance: "0.8-1.0 miles",
      offer: "Free Delivery",
    },
    {
      id: "spice-garden",
      name: "Spice Garden",
      image: "/placeholder.svg?height=160&width=400",
      rating: 4.7,
      cuisines: ["Indian", "Mughlai"],
      distance: "0.3-0.5 miles",
      offer: "20% OFF",
    },
    {
      id: "burger-haven",
      name: "Burger Haven",
      image: "/placeholder.svg?height=160&width=400",
      rating: 4.2,
      cuisines: ["American", "Fast Food"],
      distance: "1.0-1.2 miles",
      offer: "Buy 1 Get 1 Free",
    },
    {
      id: "pizza-palace",
      name: "Pizza Palace",
      image: "/placeholder.svg?height=160&width=400",
      rating: 4.4,
      cuisines: ["Italian", "Pizza"],
      distance: "0.7-0.9 miles",
      offer: "30% OFF on Large Pizzas",
    },
    {
      id: "green-eats",
      name: "Green Eats",
      image: "/placeholder.svg?height=160&width=400",
      rating: 4.1,
      cuisines: ["Vegan", "Healthy"],
      distance: "1.2-1.5 miles",
      offer: "Free Drink with Meal",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <SearchBar />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">Restaurants Near You</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurants.map((restaurant) => (
              <Link href={`/restaurants/${restaurant.id}`} key={restaurant.id} className="block">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
                  <div className="h-[160px] relative">
                    <Image
                      src={restaurant.image || "/placeholder.svg"}
                      alt={restaurant.name}
                      fill
                      className="object-cover"
                    />
                    <Badge className="absolute top-2 right-2 bg-[#6bc83e]">{restaurant.rating} ★</Badge>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg">{restaurant.name}</h3>
                    <p className="text-sm text-gray-500">{restaurant.cuisines.join(", ")}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm">{restaurant.distance}</span>
                      <span className="text-sm font-medium text-green-600">{restaurant.offer}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
