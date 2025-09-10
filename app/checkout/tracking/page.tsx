"use client"

import { useEffect, useState, useRef } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useRouter, useSearchParams } from "next/navigation"
import { MapPin, Truck, ChefHat, Package, XCircle, CheckCircle, MessageSquare, X } from "lucide-react"
import { io, Socket } from "socket.io-client"
import { motion, AnimatePresence } from "framer-motion"
import debounce from "lodash.debounce"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OrderService } from "@/services/OrderService"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Assuming Order type is defined in "@/lib/types/order"
interface Message {
  _id?: string
  senderId: string
  senderRole: string
  receiverId: string
  receiverRole: string
  messageType: string
  message: string
  seen?: boolean
  createdAt?: string
  timestamp?: string
}

interface MenuItem {
  _id: string
  menuName: string
  price: number
  description: string
  images: string[]
}

interface Order {
  _id: string
  orderStatus: string
  userOtp: string
  estimatedTime: string
  riderId?: string
  riderInfo?: Array<{ fullName: string }>
  isRiderAccept?: boolean
  restaurantInfo: Array<{
    restaurantLocation: {
      coordinates: [number, number]
    }
  }>
  menuItems: MenuItem[]
}

interface MessageHistory {
  messages: Message[]
}

export default function TrackingPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [orders, setOrders] = useState<Order[]>([])
  const [previousOrders, setPreviousOrders] = useState<Order[]>([])
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const [orderStatus, setOrderStatus] = useState("Pending")
  const [userOTP, setUserOTP] = useState(null) as any
  const [estimatedTime, setEstimatedTime] = useState("30-45 minutes")
  const [socket, setSocket] = useState<Socket | null>(null)
  const [rider, setRider] = useState<{ id: string; name?: string; phone?: string; vehicle?: string; isAccepted?: boolean } | null>(null)
  const [restaurantLocation, setRestaurantLocation] = useState<{ lng: any; lat?: any } | null>(null)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<HTMLDivElement>(null)
  const [hasCurrentOrder, setHasCurrentOrder] = useState(true)
  const [map, setMap] = useState<any>(null)

  // Filter states for previous orders
  const [filters, setFilters] = useState<{
    status: string
    paymentType: string
    paymentStatus: string
    startDate: string
    endDate: string
  }>({
    status: "All",
    paymentType: "All",
    paymentStatus: "All",
    startDate: "",
    endDate: "",
  })

  // Load Google Maps script
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (!document.getElementById("google-maps-script")) {
        const script = document.createElement("script")
        script.id = "google-maps-script"
        script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDvV_gbVMAhfQpxyUn_SyzlsfZrnz0rUtY&libraries=places`
        script.async = true
        script.defer = true
        document.head.appendChild(script)
      }
    }
    loadGoogleMapsScript()
  }, [])

  // Initialize Google Map when rider accepts the order
  useEffect(() => {
    if (
      rider?.isAccepted &&
      mapRef.current &&
      typeof window !== "undefined" &&
      (window as any).google &&
      (window as any).google.maps
    ) {
      const mapOptions = {
        center: { lat: restaurantLocation?.lat, lng: restaurantLocation?.lng },
        zoom: 14,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
        styles: [
          {
            featureType: "all",
            elementType: "all",
            stylers: [{ saturation: -20 }],
          },
        ],
      }

      const googleObj = (window as any).google
      if (!googleObj || !googleObj.maps) return

      const googleMap = new googleObj.maps.Map(mapRef.current, mapOptions)
      setMap(googleMap)

      if (rider?.id) {
        const riderLat = restaurantLocation?.lat || 37.7749
        const riderLng = restaurantLocation?.lng || -122.4194
        const marker = new googleObj.maps.Marker({
          position: { lat: riderLat, lng: riderLng },
          map: googleMap,
          title: rider.name || "Rider",
        })
      }
    }
  }, [rider?.isAccepted, restaurantLocation])

  // Socket for current orders
  useEffect(() => {
    const socketInstance = io("https://api.ardelivero.com", {
      transports: ["websocket"],
      secure: true,
      path: "/socket.io/",
    })

    setSocket(socketInstance)

    const emitGetCurrentOrder = debounce((socket: Socket, userId: string) => {
      socket.emit("getCurrentOrder", userId)
    }, 300)

    socketInstance.on("connect", () => {
      console.log("Socket Connected")
      const user = JSON.parse(localStorage.getItem("user") ?? "{}")
      if (user?._id) {
        socketInstance.emit("userLogin", { userId: user._id })
        emitGetCurrentOrder(socketInstance, user._id)
      }
    })

    socketInstance.on("currentOrder", (data: Order[]) => {
      setOrders(data)
      if (!data || data.length === 0) {
        setHasCurrentOrder(false)
        setSelectedOrderId(null)
        return
      }

      setHasCurrentOrder(true)
      if (!selectedOrderId && data.length > 0) {
        setSelectedOrderId(data[0]._id)
      }

      const selectedOrder = data.find(order => order._id === selectedOrderId as any) || data[0]
      setOrderStatus(normalizeStatus(selectedOrder?.orderStatus))
      setUserOTP(selectedOrder?.userOtp)
      setEstimatedTime(selectedOrder?.estimatedTime || "30-45 minutes")
      setRestaurantLocation({
        lat: selectedOrder?.restaurantInfo[0].restaurantLocation.coordinates[0],
        lng: selectedOrder?.restaurantInfo[0].restaurantLocation.coordinates[1]
      })

      if (selectedOrder?.riderId) {
        setRider({
          id: selectedOrder.riderId,
          name: selectedOrder?.riderInfo?.[0]?.fullName || "Rider Name",
          isAccepted: selectedOrder?.isRiderAccept || false,
        })
      } else {
        setRider(null)
      }
    })

    socketInstance.on("orderAccepted", (data) => {
      emitGetCurrentOrder(socketInstance, data?.userId)
    })

    socketInstance.on("orderReady", (data) => {
      emitGetCurrentOrder(socketInstance, data?.userId)
    })

    socketInstance.on("riderAssigned", (data) => {
      emitGetCurrentOrder(socketInstance, data?.userId)
    })

    socketInstance.on("riderOrderAccepted", (data) => {
      emitGetCurrentOrder(socketInstance, data?.userId)
    })

    socketInstance.on("riderOrderPickup", (data) => {
      emitGetCurrentOrder(socketInstance, data?.userId)
    })

    socketInstance.on("orderDelivered", (data) => {
      emitGetCurrentOrder(socketInstance, data?.userId)
    })

    socketInstance.on("orderCancelled", (data) => {
      emitGetCurrentOrder(socketInstance, data?.userId)
    })

    socketInstance.on("receive_message", (message: Message) => {
      setMessages((prev) => {
        if (!prev.some((m) => m._id === message._id)) {
          return [...prev, { ...message, timestamp: new Date(message.createdAt || message.timestamp || Date.now()).toLocaleTimeString() }]
        }
        return prev
      })
      if (message.senderId === rider?.id && message._id) {
        socketInstance.emit("seen", { messageId: message._id })
      }
    })

    socketInstance.on("message_sent", (message: Message) => {
      setMessages((prev) => {
        return [
          ...prev.filter((m) => m._id !== message._id),
          { ...message, timestamp: new Date(message.createdAt || message.timestamp || Date.now()).toLocaleTimeString() },
        ]
      })
    })

    socketInstance.on("message_seen", ({ messageId }: { messageId: string }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === messageId ? { ...msg, seen: true } : msg
        )
      )
    })

    socketInstance.on("all-messages", (messageHistory: MessageHistory) => {
      if (messageHistory?.messages) {
        setMessages(
          messageHistory.messages.map((msg) => ({
            ...msg,
            timestamp: new Date(msg.createdAt || Date.now()).toLocaleTimeString(),
          }))
        )
      }
    })

    return () => {
      socketInstance.disconnect()
    }
  }, [searchParams, selectedOrderId])

  // Fetch previous orders using OrderService
  useEffect(() => {
    const fetchPreviousOrders = async () => {
      try {
        const user = JSON.parse(localStorage.getItem("user") ?? "{}")
        if (user?._id) {
          const orders = await OrderService.getAllUserOrders(user._id, filters)
          // Ensure orders are mapped to the correct Order type if needed
          setPreviousOrders(
            orders.map((order: any) => ({
              ...order,
              userOtp: order.userOtp ?? "",
              estimatedTime: order.estimatedTime ?? "",
            }))
          )
        }
      } catch (error) {
        console.error("Failed to fetch previous orders:", error)
      }
    }

    fetchPreviousOrders()
  }, [filters])

  useEffect(() => {
    if (socket && rider?.id) {
      const user = JSON.parse(localStorage.getItem("user") ?? "{}")
      socket.emit("all-message", {
        senderId: user._id,
        receiverId: rider.id,
      })
    }
  }, [socket, rider?.id])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const normalizeStatus = (status: string) => {
    switch (status?.toLowerCase()) {
      case "pending":
        return "Pending"
      case "processing":
        return "Processing"
      case "ready":
        return "Ready"
      case "onway":
        return "OnWay"
      case "delivered":
        return "Delivered"
      case "cancelled":
        return "Cancelled"
      default:
        return "Pending"
    }
  }

  const statusSteps = [
    { status: "Pending", Icon: Package, label: "Order Placed", color: "text-gray-500" },
    { status: "Processing", Icon: ChefHat, label: "Preparing Order", color: "text-yellow-500" },
    { status: "Ready", Icon: ChefHat, label: "Ready for Pickup", color: "text-blue-500" },
    { status: "OnWay", Icon: Truck, label: "On the Way", color: "text-blue-600" },
    { status: "Delivered", Icon: CheckCircle, label: "Delivered", color: "text-green-500" },
    { status: "Cancelled", Icon: XCircle, label: "Cancelled", color: "text-red-500" },
  ]

  const getProgressWidth = () => {
    const index = statusSteps.findIndex((step) => step.status === orderStatus)
    return index >= 0 ? `${(index / (statusSteps.length - 2)) * 100}%` : "10%"
  }

  const CurrentIcon = statusSteps.find((step) => step.status === orderStatus)?.Icon

  const handleChatWithRider = () => {
    setIsChatOpen(true)
  }

  const handleSendMessage = () => {
    if (newMessage.trim() && socket && rider) {
      const user = JSON.parse(localStorage.getItem("user") ?? "{}")
      const message: Message = {
        senderId: user._id,
        senderRole: "user",
        receiverId: rider.id,
        receiverRole: "rider",
        messageType: "text",
        message: newMessage,
        timestamp: new Date().toISOString(),
      }
      socket.emit("send_message-one-to-one", message)
      setMessages((prev) => [
        ...prev,
        { ...message, timestamp: new Date().toLocaleTimeString(), seen: false },
      ])
      setNewMessage("")
    }
  }

  const handleCloseChat = () => {
    setIsChatOpen(false)
  }

  const currentOrders = orders.filter(order => order.orderStatus.toLowerCase() !== "delivered")
  // No need to filter here since API handles it
  // const previousOrders = orders.filter(order => order.orderStatus.toLowerCase() === "delivered")

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-blue-50 to-gray-100">
      <Header />
      <main className="flex-1 py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <Tabs defaultValue="current" className="w-full">
            <TabsList className="flex justify-center gap-2 p-1 bg-gray-100 rounded-lg shadow-inner mb-8">
              <TabsTrigger
                value="current"
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 rounded-lg transition-all duration-300 hover:bg-white hover:text-black data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-black"
              >
                📦 Current Orders
              </TabsTrigger>
              <TabsTrigger
                value="previous"
                className="flex-1 px-4 py-2 text-sm font-medium text-gray-600 rounded-lg transition-all duration-300 hover:bg-white hover:text-black data-[state=active]:bg-white data-[state=active]:shadow-md data-[state=active]:text-black"
              >
                🕓 Previous Orders
              </TabsTrigger>
            </TabsList>

            <TabsContent value="current">
              <div className="flex flex-col md:flex-row gap-6">
                {/* Order Selection Sidebar */}
                <div className="md:w-1/3 bg-white p-6 rounded-2xl shadow-xl border border-gray-200">
                  <h2 className="text-xl font-semibold mb-4">Your Orders</h2>
                  {currentOrders.length === 0 ? (
                    <p className="text-gray-600">No current orders</p>
                  ) : (
                    <div className="space-y-4">
                      {currentOrders.map((order) => (
                        <motion.div
                          key={order._id}
                          className={`p-4 rounded-lg border cursor-pointer ${
                            selectedOrderId === order._id ? "border-[#3a9dcb] bg-blue-50" : "border-gray-200"
                          }`}
                          onClick={() => setSelectedOrderId(order._id)}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <h3 className="font-medium">Order #{order._id.slice(-6)}</h3>
                          <p className="text-sm text-gray-600">Status: {normalizeStatus(order.orderStatus)}</p>
                          <div className="mt-2">
                            <p className="text-sm font-semibold">Items:</p>
                            {order.menuItems.map((item) => (
                              <div key={item._id} className="flex items-center gap-2 mt-1">
                                <img src={"https://api.ardelivero.com/"+item.images[0]} alt={item.menuName} className="w-8 h-8 rounded object-cover" />
                                <div>
                                  <p className="text-sm">{item.menuName}</p>
                                  <p className="text-xs text-gray-500">₹ {item.price}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Order Tracking Details */}
                <div className="md:w-2/3 bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
                  {selectedOrderId && currentOrders.find(order => order._id === selectedOrderId) ? (
                    <>
                      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
                        Track Order #{selectedOrderId.slice(-6)}
                      </h1>

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={orderStatus}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.3 }}
                          className="flex justify-center mb-6"
                        >
                          {CurrentIcon && (
                            <CurrentIcon
                              className={`h-16 w-16 ${statusSteps.find((step) => step.status === orderStatus)?.color} animate-pulse`}
                            />
                          )}
                        </motion.div>
                      </AnimatePresence>

                      <h2 className="text-2xl font-semibold text-center mb-4 text-gray-700">
                        {statusSteps.find((step) => step.status === orderStatus)?.label}
                      </h2>
                      {userOTP && (
                        <p className="text-gray-600 text-center mb-8">
                          Order OTP: <span className="font-medium">{userOTP}</span>
                        </p>
                      )}

                      <p className="text-gray-600 text-center mb-8">
                        Estimated Delivery Time: <span className="font-medium">{estimatedTime}</span>
                      </p>

                      <div className="mb-8">
                        <h3 className="text-lg font-semibold mb-4">Order Items</h3>
                        <div className="space-y-4">
                          {currentOrders
                            .find(order => order._id === selectedOrderId)
                            ?.menuItems.map((item) => (
                              <div key={item._id} className="flex items-center gap-4">
                                <img src={"https://api.ardelivero.com/"+item.images[0]} alt={item.menuName} className="w-16 h-16 rounded object-cover" />
                                <div>
                                  <p className="font-medium">{item.menuName}</p>
                                  <p className="text-sm text-gray-500">₹ {item.price}</p>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>

                      <AnimatePresence>
                        {rider && rider.isAccepted && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.3 }}
                            className="bg-gray-50 p-6 rounded-lg mb-8 border border-gray-200 relative"
                          >
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                              <Truck className="h-5 w-5 text-[#3a9dcb] mr-2" />
                              Rider Information
                            </h3>
                            <div className="text-gray-600 space-y-2">
                              <p><span className="font-medium">Name:</span> {rider.name || "N/A"}</p>
                            </div>
                            <Button
                              variant="default"
                              className="mt-4 w-full bg-[#3a9dcb] hover:bg-[#2a8dbb] text-white rounded-lg py-4 text-base transition-all duration-300 transform hover:scale-105"
                              onClick={handleChatWithRider}
                            >
                              <MessageSquare className="h-5 w-5 mr-2" />
                              Chat with Rider
                            </Button>

                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "300px" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-6 relative"
                            >
                              <div className="absolute inset-0 bg-black bg-opacity-30 z-10" />
                              <div
                                ref={mapRef}
                                className="w-full h-[300px] rounded-lg relative z-20"
                              />
                            </motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <div className="relative mb-12">
                        <div className="overflow-hidden h-3 mb-6 text-xs flex rounded-full bg-gray-200">
                          <motion.div
                            animate={{ width: getProgressWidth() }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#3a9dcb] rounded-full"
                          />
                        </div>
                        <div className="flex justify-between text-sm text-gray-600">
                          {statusSteps.slice(0, -1).map((step, index) => (
                            <motion.span
                              key={step.status}
                              initial={{ opacity: 0.5 }}
                              animate={{
                                opacity: statusSteps.findIndex((s) => s.status === orderStatus) >= index ? 1 : 0.5,
                                scale: statusSteps.findIndex((s) => s.status === orderStatus) === index ? 1.1 : 1,
                              }}
                              transition={{ duration: 0.3 }}
                              className="flex flex-col items-center"
                            >
                              <span
                                className={`h-3 w-3 rounded-full mb-2 ${
                                  statusSteps.findIndex((s) => s.status === orderStatus) >= index
                                    ? "bg-[#3a9dcb]"
                                    : "bg-gray-300"
                                }`}
                              />
                              {step.label}
                            </motion.span>
                          ))}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Button
                          variant="default"
                          className="w-full bg-[#3a9dcb] hover:bg-[#2a8dbb] text-white rounded-lg py-6 text-lg transition-all duration-300 transform hover:scale-105"
                          onClick={() => router.push("/")}
                        >
                          Continue Shopping
                        </Button>
                      </div>
                    </>
                  ) : (
                    <p className="text-gray-600 text-center">Select an order to view details</p>
                  )}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="previous">
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-200">
                <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Previous Orders</h1>

                {/* Filter Controls */}
                <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                    <Select
                      value={filters.status}
                      onValueChange={(value) => setFilters({ ...filters, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="Delivered">Delivered</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Type</label>
                    <Select
                      value={filters.paymentType}
                      onValueChange={(value) => setFilters({ ...filters, paymentType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Payment Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="Cash">Cash</SelectItem>
                        <SelectItem value="Mpay">Mpay</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                    <Select
                      value={filters.paymentStatus}
                      onValueChange={(value) => setFilters({ ...filters, paymentStatus: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select Payment Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="All">All</SelectItem>
                        <SelectItem value="Pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <Input
                      type="date"
                      value={filters.startDate}
                      onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <Input
                      type="date"
                      value={filters.endDate}
                      onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
                    />
                  </div>
                </div>

                {previousOrders.length === 0 ? (
                  <p className="text-gray-600 text-center">No previous orders</p>
                ) : (
                  <div className="space-y-6">
                    {previousOrders.map((order) => (
                      <motion.div
                        key={order._id}
                        className="p-6 rounded-lg border border-gray-200"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-lg font-semibold">Order #{order._id.slice(-6)}</h3>
                        <p className="text-sm text-gray-600">Status: {normalizeStatus(order.orderStatus)}</p>
                        <p className="text-sm text-gray-600">Delivered on: {new Date().toLocaleDateString()}</p>
                        <div className="mt-4">
                          <p className="text-sm font-semibold">Items:</p>
                          {order.menuItems.map((item) => (
                            <div key={item._id} className="flex items-center gap-4 mt-2">
                              <img src={"https://api.ardelivero.com/"+item.images[0]} alt={item.menuName} className="w-12 h-12 rounded object-cover" />
                              <div>
                                <p className="font-medium">{item.menuName}</p>
                                <p className="text-sm text-gray-500">₹ {item.price}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
                <div className="mt-8">
                  <Button
                    variant="default"
                    className="w-full bg-[#3a9dcb] hover:bg-[#2a8dbb] text-white rounded-lg py-6 text-lg transition-all duration-300 transform hover:scale-105"
                    onClick={() => router.push("/")}
                  >
                    Continue Shopping
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <AnimatePresence>
        {isChatOpen && rider?.isAccepted && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 flex flex-col"
          >
            <div className="flex justify-between items-center p-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-800">Chat with {rider?.name || "Rider"}</h3>
              <Button
                variant="ghost"
                onClick={handleCloseChat}
                className="text-gray-600 hover:text-gray-800"
              >
                <X className="h-6 w-6" />
              </Button>
            </div>
            <div className="flex-1 p-4 overflow-y-auto">
              {messages.map((msg, index) => (
                <div
                  key={msg._id || index}
                  className={`mb-4 flex ${
                    msg.senderId === JSON.parse(localStorage.getItem("user") ?? "{}")._id
                      ? "justify-end"
                      : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      msg.senderId === JSON.parse(localStorage.getItem("user") ?? "{}")._id
                        ? "bg-[#3a9dcb] text-white"
                        : "bg-gray-200 text-gray-800"
                    }`}
                  >
                    <p>{msg.message}</p>
                    <div className="flex justify-between items-center text-xs text-gray-500 mt-1">
                      <span>{msg.timestamp}</span>
                      {msg.senderId === JSON.parse(localStorage.getItem("user") ?? "{}")._id && (
                        <span>{msg.seen ? "Seen" : "Sent"}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <div className="p-4 border-t border-gray-200">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#3a9dcb]"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendMessage()
                  }}
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-[#3a9dcb] hover:bg-[#2a8dbb] text-white"
                >
                  Send
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-40 sm:hidden"
            onClick={handleCloseChat}
          />
        )}
      </AnimatePresence>

      <Footer />
    </div>
  )
}