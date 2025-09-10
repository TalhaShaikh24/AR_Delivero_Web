import { api } from "@/lib/api"

export interface MenuItem {
  _id: string
  restaurantId: string
  menuName: string
  categoryId: string
  price: number
  sellPrice: number
  ingredients: string[]
  dietaryInfo: string
  description: string
  images: string[]
  servingSize: string
  menuStatus: string
  preparationTime: string
  calories: number
  specialInstructions: string
  status: boolean
  tags: string[]
  discount: string
  prepInstructions: string
  combo: string
  availabilityTimes: string
  createdAt: string
  updatedAt: string
  __v?: number
  categoryName?: string
}

export interface MenuByCategory {
  _id: string
  categoryName: string
  menus: MenuItem[]
  categoryId: string
}

export interface MenuResponse {
  message: string
  data: MenuByCategory[]
}

export interface SingleMenuResponse {
  code: number
  status: boolean
  message: string
  data: MenuItem
}

/**
 * Service for menu-related API calls
 */
export const MenuService = {
  /**
   * Get menu items by category IDs
   */
  getMenusByCategory: async (categoryIds: string[]): Promise<MenuByCategory[]> => {
    try {
      const response = await api.post<MenuResponse>("api/v1/restaurant/menuByCategory", {
        categoryIds,
      })
      return response.data
    } catch (error) {
      console.error("Failed to fetch menus by category:", error)
      throw error
    }
  },

  /**
   * Get menu item by ID
   */
  
  getMenuById: async (menuId: string): Promise<MenuItem> => {
    try {
  
      const response = await api.get<SingleMenuResponse>(`api/v1/menu/getSingleMenu/${menuId}`, {
        headers: {
          authorization: "demoServerKey",
        },
      })
      return response.data
    } 
    catch (error) {
      console.error(`Failed to fetch menu with ID ${menuId}:`, error)
      throw error
    }
  },

  /**
   * Get related menu items (same category)
   */
  getRelatedMenuItems: async (categoryId: string, currentMenuId: string): Promise<MenuItem[]> => {
    try {
      const menusByCategory = await MenuService.getMenusByCategory([categoryId])
      if (menusByCategory && menusByCategory.length > 0) {
        // Filter out the current item and get up to 4 related items
        return menusByCategory[0].menus.filter((menu) => menu._id !== currentMenuId).slice(0, 4)
      }
      return []
    } catch (error) {
      console.error("Failed to fetch related menu items:", error)
      return []
    }
  },
}
