"use client"

import { useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { CheckCircle } from "lucide-react"

export default function ConfirmationPage() {
  const router = useRouter()
  const orderNumber = Math.floor(10000 + Math.random() * 90000)

  // Simulate order tracking
  useEffect(() => {
    // This would normally come from an API
  }, [])

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-8 bg-[#F9FAFB]">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-gray-600 mb-6">
              Thank you for your order. Your order has been received and is being processed.
            </p>

            <div className="bg-[#F9FAFB] p-4 rounded-lg mb-6">
              <p className="font-medium">Order Number</p>
              <p className="text-xl font-bold">{orderNumber}</p>
            </div>

            <div className="space-y-4 mb-8">
              <div>
                <h3 className="font-medium">Estimated Delivery Time</h3>
                <p>30-45 minutes</p>
              </div>

              <div>
                <h3 className="font-medium">Delivery Address</h3>
                <p>123 Main St, New York, NY 10001</p>
              </div>

              <div>
                <h3 className="font-medium">Payment Method</h3>
                <p>Credit Card (ending in 3456)</p>
              </div>
            </div>

            <div className="space-y-4">
              <Button className="w-full bg-[#328bb8]" onClick={() => router.push("/orders/tracking")}>
                Track Order
              </Button>
              <Button variant="outline" className="w-full" onClick={() => router.push("/")}>
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
