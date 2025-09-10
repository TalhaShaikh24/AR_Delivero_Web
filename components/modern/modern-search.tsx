"use client"

import { useState, useEffect, useCallback } from "react"
import { Search, MapPin, Filter, Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import debounce from 'lodash.debounce';

// Interface based on API response
interface Category {
  _id: string
  title: string
  description: string
  image: string
  restaurantId?: string
  subAdminId?: string
  menuStatus: "PENDING" | "APPROVED" | "REJECT"
  rejectReason: string
  status: boolean
  createdAt: string
  updatedAt: string
  __v: number
}

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
  const [categories, setCategories] = useState<Category[]>([])
  const [showDropdown, setShowDropdown] = useState(false)
  const router = useRouter()



  
  // Debounced search function
  const fetchCategories = useCallback(
    debounce(async (query: string) => {
      if (!query) {
        setCategories([])
        return
      }
      try {
        const response = await fetch(
          `https://api.ardelivero.com/api/v1/category/search?query=${encodeURIComponent(query)}`,
          {
            headers: {
              accept: "*/*",
              authorization: "demoServerKey",
            },
          }
        )
        const data = await response.json()
        setCategories(data.data || [])
        setShowDropdown(true)
      } catch (error) {
        console.error("Error fetching categories:", error)
        setCategories([])
      }
    }, 300),
    []
  )

  // Handle search input changes
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setSearchValue(value)
    fetchCategories(value)
  }

  // Handle clicking outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest(".search-container")) {
        setShowDropdown(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Placeholder animation
  useEffect(() => {
    const timer = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % searchSuggestions.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const handleVoiceSearch = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
  
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }
  
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
  
    if (!isListening) {
      setIsListening(true);
      recognition.start();
  
      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setSearchValue(transcript);
        fetchCategories(transcript);
        setIsListening(false);
      };
  
      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };
  
      recognition.onend = () => {
        setIsListening(false);
      };
    }
  };
  

  const handleCategoryClick = (categoryId: string) => {
    setShowDropdown(false)
    router.push(`/menu/category/${categoryId}`)
  }

  const handleSearchSubmit = () => {
    if (searchValue) {
      setShowDropdown(false)
      // You can add navigation or other search logic here
    }
  }

  

  return (
    <section className="relative -mt-20 z-30 pb-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Main Search Bar */}
          <div className="search-container bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-2">
            <div className="flex items-center gap-4">
              {/* Location */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-50 rounded-2xl min-w-fit hidden">
                <MapPin className="h-5 w-5 text-[#6bc83e]" />
                <span className="text-sm font-medium text-gray-700 whitespace-nowrap">New York, NY</span>
              </div>

              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  value={searchValue}
                  onChange={handleSearchChange}
                  onFocus={() => categories.length > 0 && setShowDropdown(true)}
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

                {/* Dropdown for search results */}
                {showDropdown && categories.length > 0 && (
                  <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-xl rounded-xl shadow-xl border border-white/20 max-h-96 overflow-y-auto z-40">
                    {categories.map((category) => (
                      <button
                        key={category._id}
                        onClick={() => handleCategoryClick(category._id)}
                        className="w-full p-4 hover:bg-gray-50 transition-all duration-200 text-left flex items-center gap-3"
                      >
                        <img
                          src={"https://api.ardelivero.com/" + category.image}
                          alt={category.title}
                          className="h-10 w-10 object-cover rounded-lg"
                        />
                        <div>
                          <h3 className="text-md font-semibold text-gray-800">{category.title}</h3>
                          <p className="text-sm text-gray-600 line-clamp-1">{category.description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Search Button */}
              <Button
                size="lg"
                onClick={handleSearchSubmit}
                className="bg-gradient-to-r from-[#328bb8] to-[#2e64ab] hover:from-[#2e64ab] hover:to-[#1e4a7a] px-8 py-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Search
              </Button>
            </div>
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-3 mt-6 justify-center hidden">
            {["🍕 Pizza", "🍔 Burgers", "🍜 Asian", "🥗 Healthy", "🍰 Desserts", "☕ Coffee"].map((filter, index) => (
              <button
                key={index}
                onClick={() => setSearchValue(filter.slice(2))}
                className="px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-white/30 hover:bg-white hover:shadow-lg transition-all duration-300 hover:scale-105 text-sm font-medium"
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Popular Searches */}
          <div className="text-center mt-10 hidden">
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