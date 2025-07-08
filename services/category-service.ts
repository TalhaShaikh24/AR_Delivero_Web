import { api } from "@/lib/api"
import type { Category } from "@/lib/types/category"
import type { Restaurant } from "@/lib/types/restaurant"

/**
 * Service for category-related API calls
 */
export const CategoryService = {
  /**
   * Get all categories
   */
  getAllCategories: async (): Promise<Category[]> => {
    try {
      const response = await api.get<Category[]>("api/v1/category/allCategory")
      return response.data
    } catch (error) {
      console.error("Failed to fetch categories:", error)
      throw error
    }
  },

  /**
   * Get category by ID
   */
  getCategoryById: async (id: string): Promise<Restaurant> => {
    try {
      const response = await api.get<Restaurant>(`api/v1/restaurant/byCategory/${id}`)
      return response.data
    } catch (error) {
      console.error(`Failed to fetch category with ID ${id}:`, error)
      throw error
    }
  },
}
