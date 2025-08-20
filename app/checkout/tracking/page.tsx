"use client"

import { useEffect, useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import { MapPin, Truck, ChefHat, Package } from "lucide-react"
import { io, Socket } from "socket.io-client"

export default function TrackingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [orderStatus, setOrderStatus] = useState("pending")
  const [estimatedTime, setEstimatedTime] = useState("30-45 minutes")
  const [socket, setSocket] = useState<Socket | null>(null)
  const [orderId, setOrderId] = useState<string>("")

  useEffect(() => {
    
    const orderIdFromParams = searchParams.get("orderId") || localStorage.getItem("orderId") || "mock-order-id"
    setOrderId(orderIdFromParams)
    
    // Initialize Socket.IO connection
    const socketInstance = io("http://157.173.220.225:3100", {
      
      transports: ["websocket"],
     
    })

    setSocket(socketInstance)

    socketInstance.on("connect", () => {
      debugger
      console.log("Socket.IO connectedd")
      // Emit userLogin event
      socketInstance.emit("userLogin", { userId: localStorage.getItem("userId") || "mock-user-id" })
      
      // Request current order status
      socketInstance.emit("getCurrentOrder", orderIdFromParams)
    })
debugger
    // Handle order status updates
    socketInstance.on("currentOrder", (data) => {
      console.log("Current order data received:", data);
      setOrderStatus(data.status || "pending");
      setEstimatedTime(data.estimatedTime || "30-45 minutes");
    });

    socketInstance.on("orderAccepted", (data) => {
      setOrderStatus("preparing")
      setEstimatedTime(data.estimatedTime || "30-45 minutes")
    })

    socketInstance.on("orderReady", (data) => {
      setOrderStatus("preparing")
      setEstimatedTime(data.estimatedTime || "25-35 minutes")
    })

    socketInstance.on("riderAssigned", (data) => {
      setOrderStatus("in-transit")
      setEstimatedTime(data.estimatedTime || "15-25 minutes")
    })

    socketInstance.on("riderOrderPickup", (data) => {
      setOrderStatus("in-transit")
      setEstimatedTime(data.estimatedTime || "10-20 minutes")
    })

    socketInstance.on("orderDelivered", (data) => {
      setOrderStatus("delivered")
      setEstimatedTime("Delivered")
    })

    // Error handling
    socketInstance.on("orderNotFound", () => {
      console.error("Order not found")
    })

    socketInstance.on("serverError", (error) => {
      console.error("Server error:", error)
    })

    socketInstance.on("connect_error", (error) => {
      console.error("Socket connection error:", error)
    })

    // Cleanup on component unmount
    return () => {
      socketInstance.disconnect()
      console.log("Socket.IO disconnected")
    }
  }, [searchParams])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Package className="h-6 w-6 text-gray-500" />
      case "preparing":
        return <ChefHat className="h-6 w-6 text-yellow-500" />
      case "in-transit":
        return <Truck className="h-6 w-6 text-blue-500" />
      case "delivered":
        return <MapPin className="h-6 w-6 text-green-500" />
      default:
        return <Package className="h-6 w-6 text-gray-500" />
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case "pending":
        return "Order Received"
      case "preparing":
        return "Being Prepared"
      case "in-transit":
        return "Out for Delivery"
      case "delivered":
        return "Delivered"
      default:
        return "Order Received"
    }
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-8 bg-[#F9FAFB]">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="bg-white p-8 rounded-lg shadow-sm text-center">
            <h1 className="text-2xl font-bold mb-6">Track Your Order</h1>
            
            <div className="mb-8">
              <div className="flex justify-center mb-4">
                {getStatusIcon(orderStatus)}
              </div>
              <h2 className="text-xl font-semibold mb-2">{getStatusText(orderStatus)}</h2>
              <p className="text-gray-600 mb-4">
                Estimated Delivery Time: {estimatedTime}
              </p>
              
              <div className="relative pt-2">
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: orderStatus === "delivered" ? "100%" : orderStatus === "in-transit" ? "66%" : orderStatus === "preparing" ? "33%" : "10%" }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#328bb8]"
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500">
                  <span>Received</span>
                  <span>Preparing</span>
                  <span>In Transit</span>
                  <span>Delivered</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
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