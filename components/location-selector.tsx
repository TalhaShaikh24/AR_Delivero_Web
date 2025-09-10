"use client"

import { useState, useRef, useEffect } from 'react'
import { MapPin, Search, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useLocation } from '@/hooks/use-location'
import { LocationData } from '@/services/location-service'

interface LocationSelectorProps {
  children: React.ReactNode
}

export function LocationSelector({ children }: LocationSelectorProps) {
  const { location, isLoading, requestLocation, updateLocation, formattedLocation } = useLocation()
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const searchTimeoutRef = useRef<NodeJS.Timeout>()

  const GOOGLE_MAPS_API_KEY = 'AIzaSyDvV_gbVMAhfQpxyUn_SyzlsfZrnz0rUtY'

  // Search for locations using Google Places API
  const searchLocations = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    try {
      // Use Google Maps JavaScript API instead of direct HTTP requests
      if (typeof window !== 'undefined' && (window as any).google && (window as any).google.maps) {
        const service = new (window as any).google.maps.places.AutocompleteService()
        
        service.getPlacePredictions({
          input: query,
          types: ['geocode'], // Broader type to include cities, towns, villages, etc.
          componentRestrictions: { country: 'in' } // Restrict to India
        }, (predictions: any[], status: string) => {
          console.log('Places API response:', { predictions, status });
          if (status === (window as any).google.maps.places.PlacesServiceStatus.OK && predictions) {
            setSearchResults(predictions);
          } else {
            console.error('Places API error:', status);
            setSearchResults([]);
          }
          setIsSearching(false);
        });
      } else {
        // Fallback: use a simple search with predefined cities
        const indianCities = [
          'Mumbai, Maharashtra',
          'Delhi, Delhi',
          'Bangalore, Karnataka', 
          'Chennai, Tamil Nadu',
          'Kolkata, West Bengal',
          'Hyderabad, Telangana',
          'Pune, Maharashtra',
          'Ahmedabad, Gujarat',
          'Jaipur, Rajasthan',
          'Lucknow, Uttar Pradesh'
        ]
        
        const filteredCities = indianCities.filter(city => 
          city.toLowerCase().includes(query.toLowerCase())
        )
        
        const results = filteredCities.map(city => ({
          place_id: `manual_${city}`,
          description: city,
          types: ['locality']
        }))
        
        setSearchResults(results)
        setIsSearching(false)
      }
    } catch (error) {
      console.error('Location search error:', error)
      setSearchResults([])
      setIsSearching(false)
    }
  }

  // Handle search input changes
  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }

    if (searchQuery.trim()) {
      searchTimeoutRef.current = setTimeout(() => {
        searchLocations(searchQuery)
      }, 500)
    } else {
      setSearchResults([])
    }

    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [searchQuery])

  // Get place details and convert to LocationData
  const selectLocation = async (placeId: string, description: string) => {
    try {
      // Handle manual place IDs (fallback cities)
      if (placeId.startsWith('manual_')) {
        const cityName = description.split(',')[0].trim()
        const stateName = description.split(',')[1]?.trim() || 'Unknown'
        
        const locationData: LocationData = {
          latitude: 0, // We don't have coordinates for manual entries
          longitude: 0,
          formattedAddress: description,
          city: cityName,
          state: stateName,
          country: 'India'
        }

        updateLocation(locationData)
        setIsOpen(false)
        setSearchQuery('')
        setSearchResults([])
        return
      }

      // Use Google Maps JavaScript API for real place details
      if (typeof window !== 'undefined' && (window as any).google && (window as any).google.maps) {
        const service = new (window as any).google.maps.places.PlacesService(document.createElement('div'))
        
        service.getDetails({
          placeId: placeId,
          fields: ['geometry', 'formatted_address', 'address_components']
        }, (place: any, status: string) => {
          if (status === (window as any).google.maps.places.PlacesServiceStatus.OK && place) {
            const { lat, lng } = place.geometry.location
            
            // Extract address components
            const addressComponents = place.address_components || []
            const city = getAddressComponent(addressComponents, ['locality', 'administrative_area_level_2']) || 'Unknown City'
            const state = getAddressComponent(addressComponents, ['administrative_area_level_1']) || 'Unknown State'
            const country = getAddressComponent(addressComponents, ['country']) || 'Unknown Country'

            const locationData: LocationData = {
              latitude: lat(),
              longitude: lng(),
              formattedAddress: place.formatted_address || description,
              city,
              state,
              country
            }

            updateLocation(locationData)
            setIsOpen(false)
            setSearchQuery('')
            setSearchResults([])
          } else {
            console.error('Error getting place details:', status)
          }
        })
      } else {
        // Fallback for when Google Maps API is not available
        const cityName = description.split(',')[0].trim()
        const stateName = description.split(',')[1]?.trim() || 'Unknown'
        
        const locationData: LocationData = {
          latitude: 0,
          longitude: 0,
          formattedAddress: description,
          city: cityName,
          state: stateName,
          country: 'India'
        }

        updateLocation(locationData)
        setIsOpen(false)
        setSearchQuery('')
        setSearchResults([])
      }
    } catch (error) {
      console.error('Error getting place details:', error)
    }
  }

  const getAddressComponent = (components: any[], types: string[]): string | null => {
    for (const component of components) {
      if (component.types.some((type: string) => types.includes(type))) {
        return component.long_name
      }
    }
    return null
  }

  const handleGetCurrentLocation = async () => {
    await requestLocation()
    setIsOpen(false)
  }



  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="h-auto p-0 hover:bg-white/20">
          {children}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Location</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Current Location Button */}
          <Button 
            onClick={handleGetCurrentLocation}
            disabled={isLoading}
            className="w-full"
            variant="outline"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            ) : (
              <MapPin className="h-4 w-4 mr-2" />
            )}
            Use Current Location
          </Button>



          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search for a city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
                onClick={() => setSearchQuery('')}
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>

          {/* Search Results */}
          {isSearching && (
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              <span className="text-sm text-gray-500">Searching...</span>
            </div>
          )}

          {searchResults.length > 0 && (
            <div className="max-h-60 overflow-y-auto space-y-1">
              {searchResults.map((result) => (
                <Button
                  key={result.place_id}
                  variant="ghost"
                  className="w-full justify-start text-left h-auto p-3"
                  onClick={() => selectLocation(result.place_id, result.description)}
                >
                  <MapPin className="h-4 w-4 mr-2 text-gray-400 flex-shrink-0" />
                  <span className="text-sm">{result.description}</span>
                </Button>
              ))}
            </div>
          )}

          {/* Fallback for manual location entry */}
          {searchQuery && searchResults.length === 0 && !isSearching && (
            <div className="pt-2 border-t">
              <p className="text-xs text-gray-500 mb-2">Or enter manually:</p>
              <Button
                variant="outline"
                className="w-full text-xs"
                onClick={() => {
                  const locationData: LocationData = {
                    latitude: 0,
                    longitude: 0,
                    formattedAddress: searchQuery,
                    city: searchQuery,
                    state: 'Unknown',
                    country: 'Unknown'
                  }
                  updateLocation(locationData)
                  setIsOpen(false)
                  setSearchQuery('')
                }}
              >
                Use "{searchQuery}" as location
              </Button>
            </div>
          )}

          {/* Common Indian Cities Fallback */}
          {searchQuery && searchResults.length === 0 && !isSearching && (
            <div className="pt-2 border-t">
              <p className="text-xs text-gray-500 mb-2">Popular cities:</p>
              <div className="grid grid-cols-2 gap-2">
                {['Mumbai', 'Delhi', 'Bangalore', 'Chennai', 'Kolkata', 'Hyderabad', 'Pune', 'Ahmedabad'].map((city) => (
                  <Button
                    key={city}
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => {
                      const locationData: LocationData = {
                        latitude: 0,
                        longitude: 0,
                        formattedAddress: `${city}, India`,
                        city: city,
                        state: 'India',
                        country: 'India'
                      }
                      updateLocation(locationData)
                      setIsOpen(false)
                      setSearchQuery('')
                    }}
                  >
                    {city}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Current Location Display */}
          {location && (
            <div className="pt-4 border-t">
              <p className="text-sm text-gray-500 mb-2">Current Location:</p>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-green-500" />
                  <span className="text-sm font-medium">{formattedLocation}</span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    updateLocation({
                      latitude: 0,
                      longitude: 0,
                      formattedAddress: 'Location not set',
                      city: 'Location not set',
                      state: 'Unknown',
                      country: 'Unknown'
                    })
                    setIsOpen(false)
                  }}
                  className="text-xs text-red-500 hover:text-red-700"
                >
                  Clear
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
} 