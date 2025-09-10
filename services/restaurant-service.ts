import { api, API_BASE_URL, type ApiResponse } from "@/lib/api"

export interface Restaurant {
  _id: string
  establishName: string
  thumbnail: string
  restaurantAddress: string
  restaurantCity: string
  restaurantState: string
  restaurantCountry: string
  averageRating: number
  restaurantPhoneNumber: string
  restaurantEmail: string
  openHours: {
    monday: { from: string; to: string }
    tuesday: { from: string; to: string }
    wednesday: { from: string; to: string }
    thursday: { from: string; to: string }
    friday: { from: string; to: string }
    saturday: { from: string; to: string }
    sunday: { from: string; to: string }
  }
  categoryDetails: Array<{
    _id: string
    title: string
    description: string
    image: string
  }>
}

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
}

export interface RestaurantDetail extends Restaurant {
  categories: Array<{
    categoryId: string
    _id: string,
    title: string
      description: string
      image: string,
    categoryInfo: {
      _id: string
      title: string
      description: string
      image: string
    }
    menus: MenuItem[],
    menuItems: MenuItem[],
  }>
}

export interface RestaurantByLocation {
  _id: string
  establishName: string
  thumbnail: string
  restaurantAddress: string
  restaurantCity: string
  restaurantState: string
  restaurantCountry: string
  averageRating: number
  distance: number
  offer?: string
  categoryDetails: Array<{
    _id: string
    title: string
  }>
}

class RestaurantService {
  async getRestaurantsByCategory(categoryId: string): Promise<Restaurant[]> {
    try {
      const response: ApiResponse<Restaurant[]> = await api.get(`api/v1/restaurant/byCategory/${categoryId}`)
      return response.data // ✅ This is Restaurant[]
    } catch (error) {
      console.error("Error fetching restaurants by category:", error)
      return []
    }
  }

  async getRestaurantById(restaurantId: string): Promise<RestaurantDetail | null> {
    try {
      const response = await api.get<ApiResponse<RestaurantDetail[]>>(`api/v1/restaurant/byId/${restaurantId}`)
      return response.data[0] || null
    } catch (error) {
      console.error("Error fetching restaurant details:", error)
      return null
    }
  }

  async getRestaurantsByLocation(latitude = 40.7128, longitude = -74.006): Promise<RestaurantByLocation[]> {
    try {
      const response = await api.get<ApiResponse<RestaurantByLocation[]>>(
        `api/v1/restaurant/getByLocation/${latitude}%2C${longitude}`,
      )
  
      const restaurants = response.data?.top_rated_restaurants || []
  
      // Filter by restaurantStatus === "APPROVED"
      return restaurants.filter(restaurant => restaurant.restaurantStatus === "APPROVED")
    } catch (error) {
      console.error("Error fetching restaurants by location:", error)
      return []
    }
  }
  
  

  getImageUrl(path: string): string {
    if (!path) return "/placeholder.svg?height=160&width=400"
    if (path.startsWith("http")) return path
    return `${API_BASE_URL}/${path}`
  }

  getCurrentDayOpeningHours(openHours: Restaurant["openHours"]) {
    const today = new Date().toLocaleDateString("en-US", { weekday: "long" }).toLowerCase()
    return openHours[today as keyof typeof openHours]
  }

  formatOpeningHours(dayHours: { from: string; to: string } | undefined): string {
    if (!dayHours) {
      return "Closed"
    }
    return `${dayHours.from} - ${dayHours.to}`
  }

  isRestaurantOpen(openHours: Restaurant["openHours"]): boolean {
    const currentDayHours = this.getCurrentDayOpeningHours(openHours)
    if (!currentDayHours) {
      return false
    }

    const now = new Date()
    const from = this.parseTime(currentDayHours.from)
    const to = this.parseTime(currentDayHours.to)

    const fromDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), from.hours, from.minutes, 0)
    const toDate = new Date(now.getFullYear(), now.getMonth(), now.getDate(), to.hours, to.minutes, 0)

    return now >= fromDate && now <= toDate
  }

  private parseTime(time: string): { hours: number; minutes: number } {
    const [hours, minutes] = time.split(":").map(Number)
    return { hours, minutes }
  }

  formatDistance(distance: number): string {
    
    if (distance < 1) {
      return `${(distance * 10).toFixed(1)}-${(distance * 10 + 2).toFixed(1)} miles`
    }
    return `${distance.toFixed(1)}-${(distance + 0.2).toFixed(1)} miles`
  }

  getCuisineTypes(categoryDetails: Array<{ _id: string; title: string }>): string {
    return categoryDetails.map((category) => category.title).join(", ")
  }

  getRandomOffer(): string {
    const offers = ["$25 OFF up to $50", "Free Delivery", "20% OFF", "Buy 1 Get 1 Free", "50% OFF on first order"]
    return offers[Math.floor(Math.random() * offers.length)]
  }
}

export const restaurantService = new RestaurantService()
