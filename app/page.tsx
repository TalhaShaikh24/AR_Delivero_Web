"use client"

import { useEffect, useState } from "react"
import ModernHeader from "@/components/modern/modern-header"
import ModernHero from "@/components/modern/modern-hero"
import ModernSearch from "@/components/modern/modern-search"
import ServiceCategories from "@/components/service-categories"
import FeaturedRestaurants from "@/components/modern/featured-restaurants"
import ExploreCategories from "@/components/modern/explore-categories"
import HowItWorks from "@/components/modern/how-it-works"
import PromotionsBanner from "@/components/modern/promotions-banner"
import TestimonialsCarousel from "@/components/modern/testimonials-carousel"
import ModernCTA from "@/components/modern/modern-cta"
import ModernFooter from "@/components/modern/modern-footer"
import ChatWidget from "@/components/modern/chat-widget"
import { CategoryService } from "@/services/category-service"
import { restaurantService } from "@/services/restaurant-service"
import { useApi } from "@/hooks/use-api"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)

  const {
    data: categories = [],
    isLoading: isCategoriesLoading,
    error: categoriesError,
  } = useApi(CategoryService.getAllCategories)

  const {
    data: restaurants = [],
    isLoading: isRestaurantsLoading,
    error: restaurantsError,
  } = useApi(restaurantService.getRestaurantsByLocation)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <div
      className={`flex flex-col min-h-screen transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
    >
      <ModernHeader />
      <main className="flex-1 overflow-hidden">
        <ModernHero />
        <ModernSearch />
        <ServiceCategories />
        <FeaturedRestaurants restaurants={restaurants} isLoading={isRestaurantsLoading} error={restaurantsError} />
        <ExploreCategories categories={categories} isLoading={isCategoriesLoading} error={categoriesError} />
        <HowItWorks />
        <PromotionsBanner />
        <TestimonialsCarousel />
        <ModernCTA />
      </main>
      <ModernFooter />
      <ChatWidget />
    </div>
  )
}
