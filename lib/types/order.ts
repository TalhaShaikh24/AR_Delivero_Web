export interface Order {
    _id: string
    restaurantId: string
    userId: string
    orderStatus: string
    paymentType: string
    paymentStatus: string
    subtotal: number
    totalAmount: number
    deliveryAddress: string
    deliveryCharge: number
    gst: number
    platformFee: number
    orderDate: string
    riderTip: number
    deliveryInstruction: string
    deliveryTimes: {
      min: string
      max: string
    }
    items: {
      menuId: string
      quantity: number
      _id: string
    }[]
    restaurantInfo: any[] // You can type this properly if needed
    userInfo: any[]
    riderInfo: any[]
    menuItems: any[]
    createdAt: string
    updatedAt: string
  }
  