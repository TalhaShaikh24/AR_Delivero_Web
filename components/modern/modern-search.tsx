"use client"

import { useState, useEffect } from "react"
import { Search, MapPin, Filter, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const searchSuggestions = [
  "Pizza near me",
  "Chinese food",
  "Burger delivery",
  "Healthy salads",
  "Italian cuisine",
  "Sushi rolls",
]

export default function ModernSearch() {
  const [searchValue, setSearchValue] = useState("")
  const [placeholderIndex, setPlaceholderIndex] = useState(0)
  const [isListening, setIsListening] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % searchSuggestions.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const handleVoiceSearch = () => {
    setIsListening(!isListening)
    // Voice search implementation would go here
  }

  return (
    <section className="relative -mt-20 z-30 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Main Search Bar */}
          <div className="bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-2">
            <div className="flex items-center gap-4">
              {/* Location */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-2xl min-w-fit">
                <MapPin className="h-5 w-5 text-[#6bc83e]" />
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">New York, NY</span>
              </div>

              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  placeholder={`Search for ${searchSuggestions[placeholderIndex]}...`}
                  className="pl-12 pr-12 py-6 text-lg border-none bg-transparent focus:ring-0 placeholder:text-gray-400"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleVoiceSearch}
                  className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-full transition-all duration-300 ${
                    isListening ? "bg-red-100 text-red-500 animate-pulse" : "hover:bg-gray-100"
                  }`}
                >
                  <Mic className="h-5 w-5" />
                </Button>
              </div>

              {/* Filter Button */}
              <Button
                variant="outline"
                className="px-6 py-6 rounded-2xl border-gray-200 hover:bg-gray-50 transition-all duration-300"
              >
                <Filter className="h-5 w-5 mr-2" />
                Filters
              </Button>

              {/* Search Button */}
              <Button
                size="lg"
                className="bg-gradient-to-r from-[#328bb8] to-[#2e64ab] hover:from-[#2e64ab] hover:to-[#1e4a7a] px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Search
              </Button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-3 mt-6 justify-center">
            {["🍕 Pizza", "🍔 Burgers", "🍜 Asian", "🥗 Healthy", "🍰 Desserts", "☕ Coffee"].map((filter, index) => (
              <button
                key={index}
                className="px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-white/30 hover:bg-white hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm font-medium"
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Popular Searches */}
          <div className="text-center mt-6">
            <p className="text-gray-600 text-sm mb-3">Popular searches:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {searchSuggestions.slice(0, 4).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => setSearchValue(suggestion)}
                  className="text-[#328bb8] hover:text-[#2e64ab] text-sm underline-offset-4 hover:underline transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
