import Header from "@/components/header"
import SearchBar from "@/components/search-bar"
import Footer from "@/components/footer"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

export default function CategoryPage({ params }: { params: { category: string } }) {
  // This would normally come from an API
  const categoryItems = [
    {
      id: "item1",
      name: "Delicious Burger",
      image: "/placeholder.svg?height=160&width=300",
      price: 12.99,
      rating: 4.5,
      restaurant: "Burger Haven",
    },
    {
      id: "item2",
      name: "Veggie Pizza",
      image: "/placeholder.svg?height=160&width=300",
      price: 14.99,
      rating: 4.3,
      restaurant: "Pizza Palace",
    },
    {
      id: "item3",
      name: "Chicken Biryani",
      image: "/placeholder.svg?height=160&width=300",
      price: 16.99,
      rating: 4.7,
      restaurant: "Spice Garden",
    },
    {
      id: "item4",
      name: "Pasta Carbonara",
      image: "/placeholder.svg?height=160&width=300",
      price: 13.99,
      rating: 4.2,
      restaurant: "Italian Delight",
    },
    {
      id: "item5",
      name: "Sushi Platter",
      image: "/placeholder.svg?height=160&width=300",
      price: 22.99,
      rating: 4.8,
      restaurant: "Asian Fusion",
    },
    {
      id: "item6",
      name: "Caesar Salad",
      image: "/placeholder.svg?height=160&width=300",
      price: 9.99,
      rating: 4.1,
      restaurant: "Green Eats",
    },
  ]

  const categoryName = params.category.charAt(0).toUpperCase() + params.category.slice(1)

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <SearchBar />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">{categoryName}</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categoryItems.map((item) => (
              <Link href={`/menu/${item.id}`} key={item.id} className="block">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
                  <div className="h-[160px] relative">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                    <Badge className="absolute top-2 right-2 bg-[#6bc83e]">{item.rating} ★</Badge>
                  </div>
                  <div className="p-4">
                    <h2 className="font-bold text-lg">{item.name}</h2>
                    <p className="text-sm text-gray-500">{item.restaurant}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="font-medium">${item.price.toFixed(2)}</span>
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
