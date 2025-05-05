import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"

export default function TopRestaurants() {
  return (
    <section className="py-8 bg-[#F9FAFB]">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold mb-4">Top Restaurants</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/restaurants/grand-kitchen" className="block">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
              <div className="h-[160px] relative">
                <Image
                  src="../assets/the-grand-kitchen.jpg?height=160&width=400"
                  alt="The Grand Kitchen"
                  fill
                  className="object-cover"
                />
                <Badge className="absolute top-2 right-2 bg-[#6bc83e]">4.5 ★</Badge>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg">The Grand Kitchen</h3>
                <p className="text-sm text-gray-500">Italian, Continental</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm">0.5-0.7 miles</span>
                  <span className="text-sm font-medium text-green-600">$25 OFF up to $50</span>
                </div>
              </div>
            </div>
          </Link>
          <Link href="/restaurants/asian-fusion" className="block">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
              <div className="h-[160px] relative">
                <Image src="../assets/spice-garden.jpg?height=160&width=400" alt="Asian Fusion" fill className="object-cover" />
                <Badge className="absolute top-2 right-2 bg-[#6bc83e]">4.3 ★</Badge>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg">Asian Fusion</h3>
                <p className="text-sm text-gray-500">Chinese, Thai, Japanese</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm">0.8-1.0 miles</span>
                  <span className="text-sm font-medium text-green-600">Free Delivery</span>
                </div>
              </div>
            </div>
          </Link>
          <Link href="/restaurants/spice-garden" className="block">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
              <div className="h-[160px] relative">
                <Image src="../assets/asian-fusion.jpg?height=160&width=400" alt="Spice Garden" fill className="object-cover" />
                <Badge className="absolute top-2 right-2 bg-[#6bc83e]">4.7 ★</Badge>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg">Spice Garden</h3>
                <p className="text-sm text-gray-500">Indian, Mughlai</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-sm">0.3-0.5 miles</span>
                  <span className="text-sm font-medium text-green-600">20% OFF</span>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
