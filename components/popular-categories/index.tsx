import Image from "next/image"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { Category } from "@/lib/types/category"

interface PopularCategoriesProps {
  categories?: Category[]
  isLoading?: boolean
  error?: string | null
  heading?: string
}

const API_BASE_URL = "https://api.ardelivero.com"

export default function PopularCategories({heading, categories, isLoading = false, error = null }: PopularCategoriesProps) {
  // Fallback data if categories are not provided or still loading
  const fallbackCategories = [
    { name: "Biryani", slug: "biryani", items: "150+ items" },
    { name: "Pizza", slug: "pizza", items: "120+ items" },
    { name: "Burgers", slug: "burgers", items: "100+ items" },
    { name: "Chinese", slug: "chinese", items: "80+ items" },
    { name: "South Indian", slug: "south-indian", items: "90+ items" },
    { name: "Desserts", slug: "desserts", items: "70+ items" },
    { name: "Beverages", slug: "beverages", items: "60+ items" },
  ]

  // Render loading skeletons
  if (isLoading) {
    return (
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold mb-4">{heading}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {[1, 2, 3, 4, 5, 6, 7].map((index) => (
              <div key={index} className="bg-white rounded-xl overflow-hidden shadow-sm border">
                <div className="aspect-square relative">
                  <Skeleton className="h-full w-full" />
                </div>
                <div className="p-2">
                  <Skeleton className="h-4 w-20 mb-1" />
                  <Skeleton className="h-3 w-16" />
                </div>
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
      <section className="py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold mb-4">Popular Categories</h2>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        </div>
      </section>
    )
  }

  // Use API categories or fallback
  const displayCategories = categories && categories.length > 0 ? categories : fallbackCategories

  // Map API categories to the format needed for display
  const mappedCategories = displayCategories.map((category) => {
    if ("_id" in category) {
      // This is an API category
      return {
        name: category.title,
        slug: category._id,
        items: "100+ items", // Default item count since API doesn't provide this
        image: category.image,
      }
    }
    // This is a fallback category
    return category
  })

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold mb-4">Popular Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {mappedCategories.slice(0, 7).map((category, index) => (
            <Link href={`/categories/${category.slug}`} key={index} className="block">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm border hover:shadow-md transition-shadow categories-card-1">
                <div className="aspect-square relative">
                  {"image" in category && category.image ? (
                    <Image
                      src={category.image.startsWith("http") ? category.image : `${API_BASE_URL}${category.image}`}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <Image
                      src={`/placeholder.svg?height=200&width=200&text=${category.name}`}
                      alt={category.name}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="p-2">
                  <h3 className="font-bold text-sm">{category.name}</h3>
                  <p className="text-xs text-gray-500">{category.items}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
