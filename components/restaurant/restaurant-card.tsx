import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Clock, MapPin, Star } from "lucide-react"
import { type Restaurant, RestaurantService } from "@/services/restaurant-service"
import { API_BASE_URL } from "@/lib/api"

interface RestaurantCardProps {
  restaurant: Restaurant
}

export default function RestaurantCard({ restaurant }: RestaurantCardProps) {
  const thumbnailUrl = restaurant.thumbnail
    ? `${API_BASE_URL}/${restaurant.thumbnail}`
    : "/placeholder.svg?height=160&width=300"

  const currentDayHours = RestaurantService.getCurrentDayOpeningHours(restaurant.openHours)
  const formattedHours = RestaurantService.formatOpeningHours(currentDayHours)
  const isOpen = RestaurantService.isRestaurantOpen(restaurant.openHours)

  return (
    <Link href={`/restaurants/${restaurant._id}`} className="block">
      <div className="bg-white rounded-lg overflow-hidden shadow-sm border hover:shadow-md transition-shadow">
        <div className="h-[160px] relative">
          <Image
            src={thumbnailUrl || "/placeholder.svg"}
            alt={restaurant.establishName}
            fill
            className="object-cover"
          />
          <div className="absolute top-2 right-2 flex gap-2">
            <Badge className="bg-[#6bc83e]">
              <Star className="h-3 w-3 mr-1 fill-white" />
              {restaurant.averageRating > 0 ? restaurant.averageRating.toFixed(1) : "New"}
            </Badge>
            <Badge className={isOpen ? "bg-[#6bc83e]" : "bg-red-500"}>{isOpen ? "Open Now" : "Closed"}</Badge>
          </div>
        </div>
        <div className="p-4">
          <h2 className="font-bold text-lg">{restaurant.establishName}</h2>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <MapPin className="h-4 w-4 mr-1" />
            <p className="truncate">{restaurant.restaurantCity}</p>
          </div>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <Clock className="h-4 w-4 mr-1" />
            <p>{formattedHours}</p>
          </div>
          {restaurant.categoryDetails && restaurant.categoryDetails.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {restaurant.categoryDetails.slice(0, 2).map((category) => (
                <Badge key={category._id} variant="outline" className="text-xs">
                  {category.title}
                </Badge>
              ))}
              {restaurant.categoryDetails.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{restaurant.categoryDetails.length - 2} more
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  )
}
