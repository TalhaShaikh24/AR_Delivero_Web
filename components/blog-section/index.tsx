import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function BlogSection() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold mb-4">Our Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/blog/city-cafes" className="block">
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border">
              <div className="h-[200px] relative">
                <Image src="../assets/blog_01.jpg?height=200&width=600" alt="Food blog" fill className="object-cover" />
                <Badge className="absolute bottom-2 left-2 bg-[#328bb8]">Food Blogging</Badge>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg">All City Cafes and Restaurants Switched to Delivery Mode</h3>
                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span>December 12, 2023</span>
                  <span>•</span>
                  <span>5 min read</span>
                </div>
              </div>
            </div>
          </Link>
          <div className="grid grid-cols-1 gap-4">
            <Link href="/blog/creative-packaging" className="block">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm border flex flex-col sm:flex-row">
                <div className="sm:w-1/3 h-[120px] sm:h-auto relative">
                  <Image
                    src="../assets/blog_02.jpg?height=120&width=200"
                    alt="Marketing blog"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 sm:w-2/3">
                  <Badge className="mb-2 bg-[#328bb8]">Marketing</Badge>
                  <h3 className="font-bold">Creative Packaging as a Successful Marketing Move</h3>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>December 10, 2023</span>
                    <span>•</span>
                    <span>3 min read</span>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/blog/food-delivery-services" className="block">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm border flex flex-col sm:flex-row">
                <div className="sm:w-1/3 h-[120px] sm:h-auto relative">
                  <Image
                    src="../assets/blog_03.jpg?height=120&width=200"
                    alt="Food delivery blog"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 sm:w-2/3">
                  <Badge className="mb-2 bg-[#328bb8]">Food Delivery</Badge>
                  <h3 className="font-bold">Modern Food Delivery Services Overview</h3>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>December 8, 2023</span>
                    <span>•</span>
                    <span>4 min read</span>
                  </div>
                </div>
              </div>
            </Link>

            <Link href="/blog/bottled-water" className="block">
              <div className="bg-white rounded-lg overflow-hidden shadow-sm border flex flex-col sm:flex-row">
                <div className="sm:w-1/3 h-[120px] sm:h-auto relative">
                  <Image
                    src="../assets/blog_04.jpg?height=120&width=200"
                    alt="Water delivery blog"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 sm:w-2/3">
                  <Badge className="mb-2 bg-[#328bb8]">Bottled Water</Badge>
                  <h3 className="font-bold">Bottled Water Home Delivery Companies</h3>
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    <span>December 5, 2023</span>
                    <span>•</span>
                    <span>3 min read</span>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <Link href="/blog">
            <Button variant="outline" className="bg-[#328bb8] text-white hover:bg-[#2e64ab] border-[#328bb8]">
              Read More
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
