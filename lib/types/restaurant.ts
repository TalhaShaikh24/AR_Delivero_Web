export interface Restaurant {
  _id: string
  fullName: string
  email: string
  ownerPhoneNumber: string
  ownerAddress: string
  ownerCity: string
  ownerState: string
  ownerCountry: string
  ownerPostalCode: string
  ownerLocation: {
    type: string
    coordinates: number[]
  }
  establishName: string
  thumbnail: string
  restaurantPhoneNumber: string
  restaurantEmail: string
  establishDate: string
  payoutOfRestaurant: number
  categories: RestaurantCategory[]
  restaurantAddress: string
  restaurantCity: string
  restaurantState: string
  restaurantCountry: string
  restaurantPostalCode: string
  restaurantLocation: {
    type: string
    coordinates: number[]
  }
  openHours: OpenHours
  restaurantStatus: string
  status: boolean
  averageRating: number
  bankInfo?: {
    accountNumber: string
    accountHolderName: string
    branchName: string
    bankName: string
    ifscCode: string
  }
  isSpokeSame: boolean
  closedDates: string[]
  ratings: any[]
  createdAt: string
  updatedAt: string
  categoryDetails?: CategoryDetail[]
}

export interface RestaurantCategory {
  categoryId: string
  _id: string
  categoryInfo?: CategoryDetail
  menuItems?: MenuItem[]
}

export interface CategoryDetail {
  _id: string
  title: string
  description: string
  image: string
  menuStatus: string
  status: boolean
  createdAt: string
  updatedAt: string
}

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
}

export interface OpenHours {
  monday: DayHours
  tuesday: DayHours
  wednesday: DayHours
  thursday: DayHours
  friday: DayHours
  saturday: DayHours
  sunday: DayHours
}

export interface DayHours {
  from: string
  to: string
}

export interface RestaurantResponse {
  message: string
  data: Restaurant[]
}
