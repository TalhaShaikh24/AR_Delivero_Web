import Header from "@/components/header"
import SearchBar from "@/components/search-bar"
import Footer from "@/components/footer"
import Link from "next/link"
import Image from "next/image"

export default function CategoriesPage() {
  const categories = [
    { name: "Food", slug: "food", image: "/placeholder.svg?height=200&width=400" },
    { name: "Petrol", slug: "petrol", image: "/placeholder.svg?height=200&width=400" },
    { name: "Grocery", slug: "grocery", image: "/placeholder.svg?height=200&width=400" },
    { name: "Pharmacy", slug: "pharmacy", image: "/placeholder.svg?height=200&width=400" },
    { name: "Electronics", slug: "electronics", image: "/placeholder.svg?height=200&width=400" },
    { name: "Fashion", slug: "fashion", image: "/placeholder.svg?height=200&width=400" },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <SearchBar />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">Browse Categories</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link href={`/categories/${category.slug}`} key={category.slug} className="block">
                <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
                  <div className="h-[200px] relative">
                    <Image
                      src={category.image || "/placeholder.svg"}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h2 className="font-bold text-lg">{category.name}</h2>
                    <p className="text-sm text-gray-500">Browse {category.name.toLowerCase()} items</p>
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
