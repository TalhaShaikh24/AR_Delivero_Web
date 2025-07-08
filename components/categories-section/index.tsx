import Image from "next/image"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import type { Category } from "@/lib/types/category"

interface CategoriesSectionProps {
  categories?: Category[]
  isLoading?: boolean
  error?: string | null
}
const API_BASE_URL = "https://api.ardelivero.com"

export default function CategoriesSection({ categories, isLoading = false, error = null }: CategoriesSectionProps) {
  // Fallback data if categories are not provided or still loading
  const fallbackCategories = [
    {
      _id: "food",
      title: "Foods",
      description: "Explore our menu",
      image: "/assets/food.png",
      productCount: 24,
    },
    {
      _id: "petroleum",
      title: "Petroleum",
      description: "Fuel delivery service",
      image: "/assets/petrolium.png",
      productCount: 8,
    },
    {
      _id: "grocery",
      title: "Grocery",
      description: "Fresh groceries",
      image: "/assets/grocery.png",
      productCount: 36,
    },
  ]

  // Use provided categories or fallback if not loading and no error
  const displayCategories =
    !isLoading && !error && categories && categories.length > 0 ? categories : fallbackCategories

  // Render loading skeletons
  if (isLoading) {
    return (
      <section className="py-8 bg-[#F9FAFB]">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[1, 2, 3].map((index) => (
              <div key={index} className="relative rounded-lg overflow-hidden h-[220px]">
                <Skeleton className="h-full w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Render error state
  if (error) {
    return (
      <section className="py-8 bg-[#F9FAFB]">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold mb-4">Categories</h2>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {fallbackCategories.map((category) => (
              <Link href={`/categories/${category._id}`} key={category._id} className="block">
                <div className="relative rounded-lg overflow-hidden h-[220px]">
                  <Image
                    src={category.image || "/placeholder.svg"}
                    alt={category.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 p-4 flex flex-col justify-end">
                    <h3 className="text-white font-bold text-xl">{category.title}</h3>
                    <p className="text-white text-sm">{category.description}</p>
                    <div className="flex items-center mt-2">
                      <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white">
                        {category.productCount} items
                      </Badge>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    )
  }

  // Render categories
  return (
    <section className="py-8 bg-[#F9FAFB]">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {displayCategories.map((category) => (
            <Link href={`/categories/${category._id}`} key={category._id} className="block">
              <div className="relative rounded-lg overflow-hidden h-[220px]">
                <Image
                  src={category.image.startsWith("http") ? category.image : `${API_BASE_URL}${category.image}`}
                  alt={category.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/30 p-4 flex flex-col justify-end">
                  <h3 className="text-white font-bold text-xl">{category.title}</h3>
                  <p className="text-white text-sm">{category.description || `Explore ${category.title}`}</p>
                  <div className="flex items-center mt-2">
                    <Badge variant="secondary" className="bg-white/20 hover:bg-white/30 text-white">
                      {category.productCount} items
                    </Badge>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
