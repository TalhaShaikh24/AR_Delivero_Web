import Header from "@/components/header"
import SearchBar from "@/components/search-bar"
import Footer from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function RestaurantPage({ params }: { params: { slug: string } }) {
  // This would normally come from an API
  const restaurant = {
    name: params.slug
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
    rating: 4.5,
    cuisines: ["Italian", "Continental"],
    deliveryTime: "30-45 min",
    minOrder: "$15",
    address: "123 Main St, New York, NY",
    image: "/placeholder.svg?height=300&width=1200",
  }

  const menuItems = [
    {
      id: "item1",
      name: "Margherita Pizza",
      description: "Classic pizza with tomato sauce, mozzarella, and basil",
      price: 12.99,
      image: "/placeholder.svg?height=120&width=200",
      category: "Pizza",
    },
    {
      id: "item2",
      name: "Pepperoni Pizza",
      description: "Pizza topped with pepperoni slices",
      price: 14.99,
      image: "/placeholder.svg?height=120&width=200",
      category: "Pizza",
    },
    {
      id: "item3",
      name: "Spaghetti Carbonara",
      description: "Pasta with eggs, cheese, pancetta, and pepper",
      price: 16.99,
      image: "/placeholder.svg?height=120&width=200",
      category: "Pasta",
    },
    {
      id: "item4",
      name: "Chicken Alfredo",
      description: "Fettuccine pasta with creamy Alfredo sauce and grilled chicken",
      price: 18.99,
      image: "/placeholder.svg?height=120&width=200",
      category: "Pasta",
    },
    {
      id: "item5",
      name: "Caesar Salad",
      description: "Fresh romaine lettuce with Caesar dressing, croutons, and parmesan",
      price: 9.99,
      image: "/placeholder.svg?height=120&width=200",
      category: "Salads",
    },
    {
      id: "item6",
      name: "Tiramisu",
      description: "Classic Italian dessert with coffee-soaked ladyfingers and mascarpone",
      price: 7.99,
      image: "/placeholder.svg?height=120&width=200",
      category: "Desserts",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <SearchBar />
      <main className="flex-1">
        <div className="h-[200px] relative">
          <Image src={restaurant.image || "/placeholder.svg"} alt={restaurant.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-black/40 flex items-end">
            <div className="container mx-auto px-4 pb-6">
              <h1 className="text-3xl font-bold text-white">{restaurant.name}</h1>
              <div className="flex items-center gap-2 text-white mt-2">
                <Badge className="bg-[#6bc83e]">{restaurant.rating} ★</Badge>
                <span>{restaurant.cuisines.join(", ")}</span>
                <span>•</span>
                <span>{restaurant.deliveryTime}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-3/4">
              <h2 className="text-xl font-bold mb-4">Menu</h2>
              <div className="space-y-6">
                {["Pizza", "Pasta", "Salads", "Desserts"].map((category) => (
                  <div key={category}>
                    <h3 className="text-lg font-semibold mb-3">{category}</h3>
                    <div className="space-y-4">
                      {menuItems
                        .filter((item) => item.category === category)
                        .map((item) => (
                          <Link href={`/menu/${item.id}`} key={item.id} className="block">
                            <div className="flex border-b pb-4">
                              <div className="h-20 w-20 relative flex-shrink-0">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  fill
                                  className="object-cover rounded-md"
                                />
                              </div>
                              <div className="ml-4 flex-1">
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                                <p className="font-medium mt-1">${item.price.toFixed(2)}</p>
                              </div>
                            </div>
                          </Link>
                        ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="md:w-1/4">
              <div className="bg-white p-4 rounded-lg border sticky top-4">
                <h3 className="font-bold mb-2">Restaurant Info</h3>
                <p className="text-sm mb-2">{restaurant.address}</p>
                <p className="text-sm mb-2">Minimum order: {restaurant.minOrder}</p>
                <p className="text-sm">Delivery time: {restaurant.deliveryTime}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
