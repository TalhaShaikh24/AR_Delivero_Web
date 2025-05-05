import Image from "next/image"
import Link from "next/link"

export default function PopularCategories() {
  const categories = [
    { name: "Biryani", slug: "biryani", items: "150+ items" },
    { name: "Pizza", slug: "pizza", items: "120+ items" },
    { name: "Burgers", slug: "burgers", items: "100+ items" },
    { name: "Chinese", slug: "chinese", items: "80+ items" },
    { name: "South Indian", slug: "south-indian", items: "90+ items" },
    { name: "Desserts", slug: "desserts", items: "70+ items" },
    { name: "Beverages", slug: "beverages", items: "60+ items" },
  ]

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold mb-4">Popular Categories</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {categories.map((category, index) => (
            <Link href={`/menu/${category.slug}`} key={index} className="block">
              <div className="bg-white rounded-xl overflow-hidden shadow-sm border">
                <div className="aspect-square relative">
                  <Image
                    src={`../assets/${category.slug}.jpg`}
                    alt={category.name}
                    fill
                    className="object-cover"
                  />
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
