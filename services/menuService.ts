import { api, API_BASE_URL, type ApiResponse } from "@/lib/api"

export interface MenuItem {
  _id: string
  menuName: string
  categoryId: string
  price: number
  sellPrice: number
  ingredients: string[]
  dietaryInfo: string
  description: string
  images: string[]
  servingSize: string
  preparationTime: string
  calories: number
  specialInstructions: string
  tags: string[]
  discount: string
  restaurantInfo: {
    _id: string
    establishName: string
    restaurantCity: string
  }[]
}

export interface CategoryData {
  categoryName: string
  categoryId: string
  menus: MenuItem[]
}

class MenuService {
    async getMenusByCategoryId(categoryId: string): Promise<CategoryData> {
      try {
        const response = await api.post<ApiResponse<CategoryData[]>>(
          `api/v1/restaurant/menuByCategory`,
          {
            categoryIds: [categoryId],
          }
        )
        return response.data[0] || { categoryName: "", categoryId, menus: [] }
      } catch (error) {
        console.error("Error fetching menus by category ID:", error)
        throw error
      }
    }
  
    getImageUrl(path: string): string {
      if (!path) return "/placeholder.svg?height=160&width=400"
      if (path.startsWith("http")) return path
      return `${API_BASE_URL}/${path}`
    }
  }
  

export const menuService = new MenuService()