"use client"

import type React from "react"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { CreditCard, MapPin, Truck } from "lucide-react"

export default function CheckoutPage() {
  const router = useRouter()
  const { items, subtotal, clearCart } = useCart()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zipCode: "",
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  })

  const deliveryFee = 2.99
  const tax = subtotal * 0.08
  const total = subtotal + deliveryFee + tax

  if (items.length === 0) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-1 py-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
            <p className="mb-6">Add some items to your cart before checking out.</p>
            <Button onClick={() => router.push("/")}>Continue Shopping</Button>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      // Process payment and place order
      clearCart()
      router.push("/checkout/confirmation")
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-8 bg-[#F9FAFB]">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">Checkout</h1>

          {/* Checkout Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center">
              <div
                className={`rounded-full h-10 w-10 flex items-center justify-center ${step >= 1 ? "bg-[#328bb8] text-white" : "bg-gray-200"}`}
              >
                1
              </div>
              <div className={`h-1 w-16 ${step >= 2 ? "bg-[#328bb8]" : "bg-gray-200"}`}></div>
              <div
                className={`rounded-full h-10 w-10 flex items-center justify-center ${step >= 2 ? "bg-[#328bb8] text-white" : "bg-gray-200"}`}
              >
                2
              </div>
              <div className={`h-1 w-16 ${step >= 3 ? "bg-[#328bb8]" : "bg-gray-200"}`}></div>
              <div
                className={`rounded-full h-10 w-10 flex items-center justify-center ${step >= 3 ? "bg-[#328bb8] text-white" : "bg-gray-200"}`}
              >
                3
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-2/3">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                {step === 1 && (
                  <div>
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                      <MapPin className="mr-2 h-5 w-5" /> Delivery Address
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium mb-1">
                            Full Name
                          </label>
                          <Input id="name" name="name" value={formData.name} onChange={handleInputChange} required />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium mb-1">
                            Email
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-1">
                          Phone Number
                        </label>
                        <Input id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
                      </div>
                      <div>
                        <label htmlFor="address" className="block text-sm font-medium mb-1">
                          Address
                        </label>
                        <Input
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="city" className="block text-sm font-medium mb-1">
                            City
                          </label>
                          <Input id="city" name="city" value={formData.city} onChange={handleInputChange} required />
                        </div>
                        <div>
                          <label htmlFor="zipCode" className="block text-sm font-medium mb-1">
                            ZIP Code
                          </label>
                          <Input
                            id="zipCode"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="pt-4">
                        <Button type="submit" className="w-full bg-[#328bb8]">
                          Continue to Delivery
                        </Button>
                      </div>
                    </form>
                  </div>
                )}

                {step === 2 && (
                  <div>
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                      <Truck className="mr-2 h-5 w-5" /> Delivery Options
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="space-y-3">
                        <label className="flex items-center p-4 border rounded-lg">
                          <input type="radio" name="deliveryOption" value="standard" defaultChecked className="mr-3" />
                          <div>
                            <p className="font-medium">Standard Delivery</p>
                            <p className="text-sm text-gray-500">Delivery within 30-45 minutes</p>
                          </div>
                          <span className="ml-auto">$2.99</span>
                        </label>
                        <label className="flex items-center p-4 border rounded-lg">
                          <input type="radio" name="deliveryOption" value="express" className="mr-3" />
                          <div>
                            <p className="font-medium">Express Delivery</p>
                            <p className="text-sm text-gray-500">Delivery within 15-20 minutes</p>
                          </div>
                          <span className="ml-auto">$5.99</span>
                        </label>
                        <label className="flex items-center p-4 border rounded-lg">
                          <input type="radio" name="deliveryOption" value="scheduled" className="mr-3" />
                          <div>
                            <p className="font-medium">Scheduled Delivery</p>
                            <p className="text-sm text-gray-500">Choose your preferred time</p>
                          </div>
                          <span className="ml-auto">$3.99</span>
                        </label>
                      </div>
                      <div className="pt-4 flex gap-4">
                        <Button type="button" variant="outline" onClick={() => setStep(1)} className="w-1/2">
                          Back
                        </Button>
                        <Button type="submit" className="w-1/2 bg-[#328bb8]">
                          Continue to Payment
                        </Button>
                      </div>
                    </form>
                  </div>
                )}

                {step === 3 && (
                  <div>
                    <h2 className="text-xl font-bold mb-4 flex items-center">
                      <CreditCard className="mr-2 h-5 w-5" /> Payment
                    </h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium mb-1">
                          Card Number
                        </label>
                        <Input
                          id="cardNumber"
                          name="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          value={formData.cardNumber}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="cardName" className="block text-sm font-medium mb-1">
                          Name on Card
                        </label>
                        <Input
                          id="cardName"
                          name="cardName"
                          value={formData.cardName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiry" className="block text-sm font-medium mb-1">
                            Expiry Date (MM/YY)
                          </label>
                          <Input
                            id="expiry"
                            name="expiry"
                            placeholder="MM/YY"
                            value={formData.expiry}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium mb-1">
                            CVV
                          </label>
                          <Input
                            id="cvv"
                            name="cvv"
                            placeholder="123"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            required
                          />
                        </div>
                      </div>
                      <div className="pt-4 flex gap-4">
                        <Button type="button" variant="outline" onClick={() => setStep(2)} className="w-1/2">
                          Back
                        </Button>
                        <Button type="submit" className="w-1/2 bg-[#328bb8]">
                          Place Order
                        </Button>
                      </div>
                    </form>
                  </div>
                )}
              </div>
            </div>

            <div className="lg:w-1/3">
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex">
                      <div className="h-16 w-16 relative flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg?height=64&width=64"}
                          alt={item.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="ml-4 flex-1">
                        <p className="font-medium">{item.name}</p>
                        <div className="flex justify-between text-sm">
                          <span>
                            {item.quantity} x ${item.price.toFixed(2)}
                          </span>
                          <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
