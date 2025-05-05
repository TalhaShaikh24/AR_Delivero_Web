"use client"

import Header from "@/components/header"
import SearchBar from "@/components/search-bar"
import HeroSlider from "@/components/hero-slider"
import CategoriesSection from "@/components/categories-section"
import ServiceOptions from "@/components/service-options"
import OrderOptions from "@/components/order-options"
import PopularCategories from "@/components/popular-categories"
import TopRestaurants from "@/components/top-restaurants"
import BlogSection from "@/components/blog-section"
import MobileAppSection from "@/components/mobile-app-section"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <SearchBar />
      <main className="flex-1">
        <HeroSlider />
        <CategoriesSection />
        <ServiceOptions />
        <OrderOptions />
        <PopularCategories />
        <TopRestaurants />
        <BlogSection />
        <MobileAppSection />
      </main>
      <Footer />
    </div>
  )
}
