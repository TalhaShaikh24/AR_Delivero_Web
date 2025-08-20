"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { CreditCard, MapPin } from "lucide-react"
import { AuthService } from "@/services/auth-service"
import AuthModal from "@/components/auth/auth-modal"
import { Dialog } from "@/components/ui/dialog"
import { toast } from "@/components/ui/use-toast"

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
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [paymentType, setPaymentType] = useState("Cash")
  const [showQrModal, setShowQrModal] = useState(false)
  const [qrUrl, setQrUrl] = useState("")
  const [redirectUrl, setRedirectUrl] = useState("")
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  const [txnId, setTxnId] = useState("")

  const deliveryFee = 2.99
  const tax = subtotal * 0.08
  const total = subtotal + deliveryFee + tax

  useEffect(() => {
    const isLoggedIn = AuthService.isLoggedIn()
    setIsAuthenticated(isLoggedIn)
    if (!isLoggedIn && items.length > 0) {
      setIsAuthModalOpen(true)
    }
  }, [items.length])

  debugger
  useEffect(() => {
    debugger
    console.log("txnId inside useEffect:", txnId);
    if (!txnId) return;
    
    const interval = setInterval(async () => {
      try {
        const res = await fetch(`https://qrstuff.me/gateway/check_txn/${txnId}`);
        const data = await res.json();
        console.log("Polling txn status:", data);
  
        if (data?.txn_status === "success") {
          clearInterval(interval);
          toast({ title: "Payment Successful", description: "Your payment was received." });
          await placeOrder();
          setShowQrModal(false);
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    }, 3000);
  
    return () => clearInterval(interval);
  }, [txnId]);
  
  

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

  const handlePaymentTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPaymentType(e.target.value)
  }

  // Helper to generate random txn id
  function generateRandomId(length = 10) {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    let result = ""
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  }

  // Mpay UPI QR API call
  async function handleMpayPayment() {
    setIsPlacingOrder(true)
    const url = "https://api.ardelivero.com/api/v1/create-mpay-qr"
    const headers = { "Content-Type": "application/json", Authorization: "demoServerKey" }
    const body = {
      amount: total.toFixed(2),
      product_name: "AR Delivero Order",
      customer_name: formData.name,
      customer_number: formData.phone,
      customer_email: formData.email,
    }
    try {
      const res = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      })
      const data = await res.json()
      if (res.status === 200 && data.status) {
        const paymentUrl = data.data.payment_url;
        const txnIdFromUrl = paymentUrl.split('/').pop(); // 👈 Extract txn_id
      
        setQrUrl(paymentUrl);
        setRedirectUrl(data.data.redirect_url);
        setTxnId(txnIdFromUrl); // 👈 Save extracted txn ID here
        setShowQrModal(true);
      }      
       else {
        toast({ title: "Payment Failed", description: data.message || "Failed to create Mpay QR code." })
      }
    } catch (e) {
      toast({ title: "Payment Failed", description: "An error occurred while generating the QR code." })
    } finally {
      setIsPlacingOrder(false)
    }
  }

  // Place order (simulate API call)
  async function placeOrder() {
    setIsPlacingOrder(true)
    try {
      const user = AuthService.getCurrentUser()
      const userId = user?._id || ""
      const restaurantId = items.length > 0 ? items[0].restaurantId || "" : ""

      const cartItems = items.map((i) => ({
        menuId: i.id,
        quantity: i.quantity,
      }))

      const platformFee = 20
      const deliveryCharge = 10
      const gst = 8
      const riderTip = 0
      const deliveryInstruction = "this is"
      const deliveryTimes = {
        min: "0",
        max: "10",
      }
      const orderDate = new Date().toISOString()

      const totalAmount = (subtotal + deliveryCharge + platformFee + gst).toString()

      const payload = {
        restaurantId,
        userId,
        paymentType,
        subtotal: subtotal.toString(),
        totalAmount,
        deliveryAddress: formData.address || "this is test address",
        deliveryCharge: deliveryCharge.toString(),
        platformFee: platformFee.toString(),
        gst: gst.toString(),
        orderDate,
        items: JSON.stringify(cartItems),
        riderTip: riderTip.toString(),
        deliveryInstruction,
        deliveryTimes: JSON.stringify(deliveryTimes),
      }

      const res = await fetch("https://api.ardelivero.com/api/v1/order/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "demoServerKey",
        },
        body: JSON.stringify(payload),
      })

      const data = await res.json()

      if (res.ok && data.status) {
        clearCart()
        toast({ title: "Order placed!", description: "Your order has been placed successfully." })
        if (paymentType === "Mpay" && redirectUrl) {
          window.location.href = redirectUrl
        } else {
          router.push("/checkout/confirmation")
        }
      } else {
        toast({ title: "Order failed", description: data.message || "Failed to place order." })
      }
    } catch (e) {
      toast({ title: "Order failed", description: "An error occurred while placing your order." })
    } finally {
      setIsPlacingOrder(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      if (paymentType === "Cash") {
        await placeOrder()
      } else if (paymentType === "Mpay") {
        await handleMpayPayment()
      }
    }
  }

  const handleAuthSuccess = () => {
    setIsAuthenticated(true)
    setIsAuthModalOpen(false)
    router.replace("/checkout")
  }

 
  

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
    

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} onSuccess={handleAuthSuccess} mode="login" />

      {isAuthenticated ? (
        <main className="flex-1 py-8 bg-[#F9FAFB]">
          <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold mb-6">Checkout</h1>

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
                        <CreditCard className="mr-2 h-5 w-5" /> Choose Payment Method
                      </h2>
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2">
                          <label className="flex items-center p-4 border rounded-lg">
                            <input
                              type="radio"
                              name="paymentType"
                              value="COD"
                              checked={paymentType === "Cash"}
                              onChange={handlePaymentTypeChange}
                              className="mr-3"
                            />
                            <div>
                              <p className="font-medium">Cash on Delivery (Cash)</p>
                              <p className="text-sm text-gray-500">Pay with cash when your order arrives</p>
                            </div>
                          </label>
                          <label className="flex items-center p-4 border rounded-lg">
                            <input
                              type="radio"
                              name="paymentType"
                              value="Mpay"
                              checked={paymentType === "Mpay"}
                              onChange={handlePaymentTypeChange}
                              className="mr-3"
                            />
                            <div>
                              <p className="font-medium">Mpay UPI QR</p>
                              <p className="text-sm text-gray-500">Pay instantly using UPI QR code</p>
                            </div>
                          </label>
                        </div>
                        <div className="pt-4">
                          <Button type="submit" className="w-full bg-[#328bb8]">
                            Continue
                          </Button>
                        </div>
                      </form>
                    </div>
                  )}
                  {step === 2 && (
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
                        <div className="pt-4 flex gap-4">
                          <Button type="button" variant="outline" onClick={() => setStep(1)} className="w-1/2">
                            Back
                          </Button>
                          <Button type="submit" className="w-1/2 bg-[#328bb8]">
                            Continue
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
                        {paymentType === "Cash" && (
                          <div className="pt-4 flex gap-4">
                            <Button type="button" variant="outline" onClick={() => setStep(2)} className="w-1/2">
                              Back
                            </Button>
                            <Button type="submit" className="w-1/2 bg-[#328bb8]" disabled={isPlacingOrder}>
                              {isPlacingOrder ? "Placing Order..." : "Place Order"}
                            </Button>
                          </div>
                        )}
                        {paymentType === "Mpay" && (
                          <div className="pt-4 flex gap-4">
                            <Button type="button" variant="outline" onClick={() => setStep(2)} className="w-1/2">
                              Back
                            </Button>
                            <Button type="submit" className="w-1/2 bg-[#328bb8]" disabled={isPlacingOrder}>
                              {isPlacingOrder ? "Processing..." : "Get QR & Pay"}
                            </Button>
                          </div>
                        )}
                      </form>
                      {paymentType === "Mpay" && showQrModal && (
                        <Dialog open={showQrModal} onOpenChange={setShowQrModal}>
                          <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
                            <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
                              <h3 className="text-lg font-bold mb-4">Scan to Pay with UPI</h3>
                              {qrUrl ? (
                                <iframe src={qrUrl} title="UPI QR" className="w-full h-96 border rounded" />
                              ) : (
                                <p>Loading QR...</p>
                              )}
                              <div className="mt-4 flex flex-col gap-2">
                                <Button
                                  onClick={async () => {
                                    setShowQrModal(false)
                                    await placeOrder()
                                  }}
                                  className="bg-[#328bb8] w-full"
                                  disabled={isPlacingOrder}
                                >
                                  {isPlacingOrder ? "Processing..." : "I have paid, Place Order"}
                                </Button>
                                <Button variant="outline" onClick={() => setShowQrModal(false)} className="w-full">
                                  Cancel
                                </Button>
                                
                              </div>
                            </div>
                          </div>
                        </Dialog>
                      )}
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
                              {item.quantity} x ₹{item.price.toFixed(2)}
                            </span>
                            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Fee</span>
                      <span>₹{deliveryFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>₹{tax.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg pt-2 border-t">
                      <span>Total</span>
                      <span>₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <main className="flex-1 py-8">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
            <p className="mb-6">Please log in or continue as guest to proceed with checkout.</p>
            <Button onClick={() => setIsAuthModalOpen(true)}>Authenticate to Continue</Button>
          </div>
        </main>
      )}
      <Footer />
    </div>
  )
}





