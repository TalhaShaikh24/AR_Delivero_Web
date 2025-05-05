import Image from "next/image"
import Link from "next/link"

export default function CategoriesSection() {
  return (
    <section className="py-8 bg-[#F9FAFB]">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold mb-4">Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <Link href="/categories/food" className="block">
            <div className="relative rounded-lg overflow-hidden h-[220px]">
              <Image src="../assets/food.png?height=120&width=400" alt="Food category" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/30 p-4 flex flex-col justify-end">
                <h3 className="text-white font-bold text-xl">Foods</h3>
                <p className="text-white text-sm">Explore our menu</p>
              </div>
            </div>
          </Link>
          <Link href="/categories/petroleum" className="block">
            <div className="relative rounded-lg overflow-hidden h-[220px]">
              <Image
                src="../assets/petrolium.png?height=120&width=400"
                alt="Petroleum category"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/30 p-4 flex flex-col justify-end">
                <h3 className="text-white font-bold text-xl">Petroleum</h3>
                <p className="text-white text-sm">Fuel delivery service</p>
              </div>
            </div>
          </Link>
          <Link href="/categories/grocery" className="block">
            <div className="relative rounded-lg overflow-hidden h-[220px]">
              <Image src="../assets/grocery.png?height=120&width=400" alt="Grocery category" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/30 p-4 flex flex-col justify-end">
                <h3 className="text-white font-bold text-xl">Grocery</h3>
                <p className="text-white text-sm">Fresh groceries</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
