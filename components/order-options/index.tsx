import Image from "next/image"
import Link from "next/link"

export default function OrderOptions() {
  return (
    <section className="py-8 bg-[#F9FAFB]">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold mb-4">What would you like to order?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <Link href="/categories/food" className="block">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
              <div className="h-[120px] relative">
                <Image src="../assets/food2.jpg?height=120&width=300" alt="Food" fill className="object-cover" />
              </div>
              <div className="p-3">
                <h3 className="font-semibold">Food</h3>
                <p className="text-sm text-gray-500">Delivered in 30 mins</p>
              </div>
            </div>
          </Link>
          <Link href="/categories/petrol" className="block">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
              <div className="h-[120px] relative">
                <Image src="../assets/petrol.jpg?height=120&width=300" alt="Petrol" fill className="object-cover" />
              </div>
              <div className="p-3">
                <h3 className="font-semibold">Petrol</h3>
                <p className="text-sm text-gray-500">At your location in 15 mins</p>
              </div>
            </div>
          </Link>
          <Link href="/categories/grocery" className="block">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
              <div className="h-[120px] relative">
                <Image src="../assets/grocery2.jpg?height=120&width=300" alt="Grocery" fill className="object-cover" />
              </div>
              <div className="p-3">
                <h3 className="font-semibold">Grocery</h3>
                <p className="text-sm text-gray-500">Same day delivery</p>
              </div>
            </div>
          </Link>
          <Link href="/categories/pharmacy" className="block">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
              <div className="h-[120px] relative">
                <Image src="../assets/pharmacy.jpg?height=120&width=300" alt="Pharmacy" fill className="object-cover" />
              </div>
              <div className="p-3">
                <h3 className="font-semibold">Pharmacy</h3>
                <p className="text-sm text-gray-500">Express delivery available</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
