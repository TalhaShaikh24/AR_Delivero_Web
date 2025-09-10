import { api } from "@/lib/api"
import type { Order } from "@/lib/types/order"  // You will need to define this type

/**
 * Service for order-related API calls
 */
export const OrderService = {
  /**
   * Get all orders for a user
   * @param userId User ID
   * @param filters Optional filters like status, paymentType etc.
   */
  getAllUserOrders: async (
    userId: string,
    filters: {
      status?: string
      paymentType?: string
      paymentStatus?: string
      startDate?: string
      endDate?: string
    } = {}
  ): Promise<Order[]> => {
    try {
      const params = new URLSearchParams({
        status: filters.status || "All",
        paymentType: filters.paymentType || "All",
        paymentStatus: filters.paymentStatus || "All",
        startDate: filters.startDate || "",
        endDate: filters.endDate || "",
      })

      const response = await api.get<{ data: Order[] }>(
        `api/v1/order/getAllUserOrders/${userId}?${params.toString()}`
      )
      return response?.data
    } catch (error) {
      console.error(`Failed to fetch orders for user ${userId}:`, error)
      throw error
    }
  },
}
