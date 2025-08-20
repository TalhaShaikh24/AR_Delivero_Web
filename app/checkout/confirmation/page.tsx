"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import { CheckCircle } from "lucide-react"
import { useCart } from "@/context/cart-context"

export default function ConfirmationPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { clearCart } = useCart()
  const [deliveryAddress, setDeliveryAddress] = useState("")
  const [paymentType, setPaymentType] = useState("")

  useEffect(() => {
    // Get delivery address and payment type from query params or local storage
    const address = searchParams.get("address") || localStorage.getItem("deliveryAddress") || "123 Main St, New York, NY 10001"
    const payment = searchParams.get("paymentType") || localStorage.getItem("paymentType") || "Cash"
    setDeliveryAddress(address)
    setPaymentType(payment)
    
    // Clear cart on confirmation
    clearCart()
    
    // Save to localStorage for persistence
    localStorage.setItem("deliveryAddress", address)
    localStorage.setItem("paymentType", payment)
  }, [searchParams]) // Only include searchParams as dependency

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

            <div className="space-y-4 mb-8">
              <div>
                <h3 className="font-medium">Estimated Delivery Time</h3>
                <p>30-45 minutes</p>
              </div>

              <div>
                <h3 className="font-medium">Delivery Address</h3>
                <p>{deliveryAddress}</p>
              </div>

              <div>
                <h3 className="font-medium">Payment Method</h3>
                <p>{paymentType}</p>
              </div>
            </div>

            <div className="space-y-4">
              <Button className="w-full bg-[#328bb8]" onClick={() => router.push("/checkout/tracking")}>
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