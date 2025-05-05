import Header from "@/components/header"
import SearchBar from "@/components/search-bar"
import Footer from "@/components/footer"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function OffersPage() {
  const offers = [
    {
      id: "offer1",
      title: "50% OFF on your first order",
      description: "Use code WELCOME50 to get 50% off on your first order (up to $10)",
      image: "/placeholder.svg?height=200&width=400",
      expiryDate: "May 31, 2023",
      code: "WELCOME50",
    },
    {
      id: "offer2",
      title: "Free delivery on orders above $20",
      description: "No code required. Automatic free delivery on all orders above $20",
      image: "/placeholder.svg?height=200&width=400",
      expiryDate: "Ongoing",
      code: "",
    },
    {
      id: "offer3",
      title: "20% OFF on weekend orders",
      description: "Use code WEEKEND20 to get 20% off on all weekend orders",
      image: "/placeholder.svg?height=200&width=400",
      expiryDate: "June 30, 2023",
      code: "WEEKEND20",
    },
    {
      id: "offer4",
      title: "Buy 1 Get 1 Free on selected items",
      description: "Order selected items and get another one for free",
      image: "/placeholder.svg?height=200&width=400",
      expiryDate: "Limited time offer",
      code: "B1G1FREE",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <SearchBar />
      <main className="flex-1 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">Offers & Promotions</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {offers.map((offer) => (
              <div key={offer.id} className="bg-white rounded-lg overflow-hidden shadow-sm border">
                <div className="h-[200px] relative">
                  <Image src={offer.image || "/placeholder.svg"} alt={offer.title} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h2 className="text-xl font-bold mb-2">{offer.title}</h2>
                  <p className="text-gray-600 mb-4">{offer.description}</p>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-gray-500">Valid until: {offer.expiryDate}</p>
                      {offer.code && (
                        <p className="font-medium mt-1">
                          Code: <span className="text-[#328bb8]">{offer.code}</span>
                        </p>
                      )}
                    </div>
                    <Link href="/">
                      <Button className="bg-[#328bb8]">Order Now</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
