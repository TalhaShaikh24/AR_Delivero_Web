import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import { type RestaurantByLocation, restaurantService } from "@/services/restaurant-service"

interface TopRestaurantsProps {
  restaurants: RestaurantByLocation[]
  isLoading: boolean
  error: any 
}

export default function TopRestaurants({ restaurants, isLoading, error }: TopRestaurantsProps) {
 
  if (error) {
    return (
      <section className="py-8 bg-[#F9FAFB]">
        <div className="container mx-auto px-4">
          <h2 className="text-xl font-bold mb-4">Top Restaurants</h2>
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Failed to load restaurants. Please try again later.</AlertDescription>
          </Alert>
        </div>
      </section>
    )
  }

  return (
    <section className="py-8 bg-[#F9FAFB]">
      <div className="container mx-auto px-4">
        <h2 className="text-xl font-bold mb-4">Top Restaurants</h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {isLoading ? (
            // Loading skeletons
            Array(3)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm border">
                  <Skeleton className="h-[160px] w-full" />
                  <div className="p-4">
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-1/2 mb-4" />
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-4 w-1/4" />
                      <Skeleton className="h-4 w-1/3" />
                    </div>
                  </div>
                </div>
              ))
          ) : restaurants && restaurants.length > 0 ? (
            // Actual restaurant data
            restaurants
              .slice(0, 3)
              .map((restaurant) => (
                <Link href={`/restaurants/${restaurant._id}`} key={restaurant._id} className="block">
                  <div className="bg-white rounded-lg overflow-hidden shadow-sm border hover:shadow-md transition-shadow duration-300 restaurant-card-1">
                    <div className="h-[160px] relative">
                      <Image
                        src={restaurantService.getImageUrl(restaurant.thumbnail) || "/placeholder.svg"}
                        alt={restaurant.establishName}
                        fill
                        className="object-cover"
                      />
                      <Badge className="absolute top-2 right-2 bg-[#6bc83e]">
                        {restaurant.averageRating.toFixed(1)} ★
                      </Badge>
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg">{restaurant.establishName}</h3>
                      <p className="text-sm text-gray-500">
                        {restaurant.categoryDetails && restaurant.categoryDetails.length > 0
                          ? restaurantService.getCuisineTypes(restaurant.categoryDetails)
                          : "Various Cuisines"}
                      </p>
                      <div className="flex justify-between items-center mt-2">
                        {/* <span className="text-sm">{restaurantService.formatDistance(restaurant.distance)}</span> */}
                        <span className="text-sm font-medium text-green-600">
                          {restaurant.offer || restaurantService.getRandomOffer()}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))
          ) : (
            // Fallback for no data
            <div className="col-span-3 text-center py-8">
              <p className="text-gray-500">No restaurants found in your area.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
