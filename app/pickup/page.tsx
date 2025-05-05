import Header from "@/components/header"
import SearchBar from "@/components/search-bar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { ShoppingBag, Clock, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function PickupPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <SearchBar />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">Pickup Service</h1>

          <div className="bg-white rounded-lg overflow-hidden shadow-sm border mb-8">
            <div className="h-[200px] md:h-[300px] relative">
              <Image src="/placeholder.svg?height=300&width=1200" alt="Pickup service" fill className="object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center text-white p-4">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">Skip the Wait</h2>
                  <p className="text-lg md:text-xl">Order ahead and pick up at your convenience</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <ShoppingBag className="h-8 w-8 text-[#328bb8]" />
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">Order Ahead</h3>
              <p className="text-gray-600">Place your order in advance and pick it up when it's ready.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <Clock className="h-8 w-8 text-[#328bb8]" />
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">Save Time</h3>
              <p className="text-gray-600">No waiting in line. Your order will be ready when you arrive.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <MapPin className="h-8 w-8 text-[#328bb8]" />
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">Convenient Locations</h3>
              <p className="text-gray-600">Multiple pickup points across the city for your convenience.</p>
            </div>
          </div>

          <div className="bg-[#F9FAFB] p-6 rounded-lg mb-8">
            <h2 className="text-xl font-bold mb-4">How Pickup Works</h2>
            <ol className="list-decimal pl-5 space-y-2">
              <li>Browse restaurants and select your items</li>
              <li>Choose "Pickup" as your order method</li>
              <li>Select your preferred pickup time</li>
              <li>Pay for your order online</li>
              <li>Receive a notification when your order is ready</li>
              <li>Show your order confirmation at the restaurant</li>
              <li>Collect your order and enjoy!</li>
            </ol>
          </div>

          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">Ready to order for pickup?</h2>
            <Link href="/categories">
              <Button className="bg-[#328bb8]">Browse Categories</Button>
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
