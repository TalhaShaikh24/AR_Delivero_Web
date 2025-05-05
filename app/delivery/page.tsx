import Header from "@/components/header"
import SearchBar from "@/components/search-bar"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Truck, Clock, MapPin } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function DeliveryPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <SearchBar />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">Delivery Service</h1>

          <div className="bg-white rounded-lg overflow-hidden shadow-sm border mb-8">
            <div className="h-[200px] md:h-[300px] relative">
              <Image
                src="/placeholder.svg?height=300&width=1200"
                alt="Delivery service"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                <div className="text-center text-white p-4">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">Fast & Reliable Delivery</h2>
                  <p className="text-lg md:text-xl">Get your favorite items delivered to your doorstep</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <Truck className="h-8 w-8 text-[#328bb8]" />
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">Express Delivery</h3>
              <p className="text-gray-600">Get your orders delivered within 30 minutes in selected areas.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <Clock className="h-8 w-8 text-[#328bb8]" />
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">Scheduled Delivery</h3>
              <p className="text-gray-600">Plan ahead and schedule your deliveries at your preferred time.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border text-center">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-4 rounded-full">
                  <MapPin className="h-8 w-8 text-[#328bb8]" />
                </div>
              </div>
              <h3 className="text-lg font-bold mb-2">Live Tracking</h3>
              <p className="text-gray-600">Track your delivery in real-time from restaurant to your doorstep.</p>
            </div>
          </div>

          <div className="bg-[#F9FAFB] p-6 rounded-lg mb-8">
            <h2 className="text-xl font-bold mb-4">Delivery Areas</h2>
            <p className="mb-4">We currently deliver to the following areas:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-3 rounded-lg text-center">Manhattan</div>
              <div className="bg-white p-3 rounded-lg text-center">Brooklyn</div>
              <div className="bg-white p-3 rounded-lg text-center">Queens</div>
              <div className="bg-white p-3 rounded-lg text-center">Bronx</div>
              <div className="bg-white p-3 rounded-lg text-center">Staten Island</div>
              <div className="bg-white p-3 rounded-lg text-center">Jersey City</div>
              <div className="bg-white p-3 rounded-lg text-center">Hoboken</div>
              <div className="bg-white p-3 rounded-lg text-center">Long Island City</div>
            </div>
          </div>

          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">Ready to order?</h2>
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
