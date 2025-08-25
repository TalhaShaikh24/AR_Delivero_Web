
"use client"

import { useState, useRef, useEffect } from 'react'
import { MapPin, Search, X, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface AddressData {
  doorNumber: string
  street: string
  city: string
  state: string
  country: string
  postalCode: string
  latitude?: number
  longitude?: number
  formattedAddress?: string
}

interface AddressAutocompleteProps {
  label: string
  value: AddressData
  onChange: (address: AddressData) => void
  placeholder?: string
  required?: boolean
}

export function AddressAutocomplete({ 
  label, 
  value, 
  onChange, 
  placeholder = "Search for address...",
  required = false 
}: AddressAutocompleteProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<any[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [showResults, setShowResults] = useState(false)
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Search for addresses using Google Places API
  const searchAddresses = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([])
      return
    }

    setIsSearching(true)
    try {
      if (typeof window !== 'undefined' && (window as any).google && (window as any).google.maps) {
        const service = new (window as any).google.maps.places.AutocompleteService()
        
        service.getPlacePredictions({
          input: query,
          types: ['address']
        }, (predictions: any[], status: string) => {
          if (status === (window as any).google.maps.places.PlacesServiceStatus.OK && predictions) {
            setSearchResults(predictions)
          } else {
            setSearchResults([])
          }
          setIsSearching(false)
        })
      } else {
        // Fallback without Places API
        setSearchResults([])
        setIsSearching(false)
      }
    } catch (error) {
      console.error('Address search error:', error)
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
        searchAddresses(searchQuery)
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

  // Get place details and convert to AddressData
  const selectAddress = async (placeId: string, description: string) => {
    try {
      if (typeof window !== 'undefined' && (window as any).google && (window as any).google.maps) {
        const service = new (window as any).google.maps.places.PlacesService(document.createElement('div'))
        
        service.getDetails({
          placeId: placeId,
          fields: ['geometry', 'formatted_address', 'address_components']
        }, (place: any, status: string) => {
          if (status === (window as any).google.maps.places.PlacesServiceStatus.OK && place) {
            const addressComponents = place.address_components || []
            
            // Extract address components
            const streetNumber = getAddressComponent(addressComponents, ['street_number']) || ''
            const route = getAddressComponent(addressComponents, ['route']) || ''
            const city = getAddressComponent(addressComponents, ['locality', 'administrative_area_level_2']) || ''
            const state = getAddressComponent(addressComponents, ['administrative_area_level_1']) || ''
            const country = getAddressComponent(addressComponents, ['country']) || ''
            const postalCode = getAddressComponent(addressComponents, ['postal_code']) || ''

            const { lat, lng } = place.geometry.location

            const addressData: AddressData = {
              doorNumber: streetNumber,
              street: route,
              city: city,
              state: state,
              country: country,
              postalCode: postalCode,
              latitude: lat(),
              longitude: lng(),
              formattedAddress: place.formatted_address
            }

            onChange(addressData)
            setSearchQuery('')
            setShowResults(false)
            setSearchResults([])
          }
        })
      } else {
        // Fallback without detailed geocoding
        const addressData: AddressData = {
          doorNumber: '',
          street: description.split(',')[0] || '',
          city: description.split(',')[1]?.trim() || '',
          state: description.split(',')[2]?.trim() || '',
          country: 'India',
          postalCode: '',
          formattedAddress: description
        }
        
        onChange(addressData)
        setSearchQuery('')
        setShowResults(false)
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

  const handleInputFocus = () => {
    setShowResults(true)
  }

  const handleInputBlur = () => {
    // Delay hiding results to allow click on results
    setTimeout(() => setShowResults(false), 200)
  }

  return (
    <div className="space-y-2">
      <Label htmlFor="address-search" className="flex items-center gap-2">
        <MapPin className="h-4 w-4" />
        {label} {required && '*'}
      </Label>
      
      <div className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            ref={inputRef}
            id="address-search"
            placeholder={placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            className="pl-10 pr-10"
          />
          {searchQuery && (
            <Button
              type="button"
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
        {showResults && searchResults.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
            {searchResults.map((result) => (
              <button
                key={result.place_id}
                type="button"
                className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 flex items-start gap-3"
                onClick={() => selectAddress(result.place_id, result.description)}
              >
                <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {result.structured_formatting?.main_text || result.description.split(',')[0]}
                  </p>
                  <p className="text-xs text-gray-500">
                    {result.structured_formatting?.secondary_text || result.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Loading State */}
        {showResults && isSearching && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
            <div className="flex items-center justify-center py-4">
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              <span className="text-sm text-gray-500">Searching...</span>
            </div>
          </div>
        )}
      </div>

      {/* Selected Address Display */}
      {value.formattedAddress && (
        <div className="p-3 bg-gray-50 rounded-lg border">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-gray-900">Selected Address:</p>
              <p className="text-sm text-gray-600 mt-1">{value.formattedAddress}</p>
              {(value.doorNumber || value.street) && (
                <p className="text-xs text-gray-500 mt-1">
                  {value.doorNumber} {value.street}, {value.city}, {value.state} {value.postalCode}
                </p>
              )}
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => onChange({
                doorNumber: '',
                street: '',
                city: '',
                state: '',
                country: '',
                postalCode: ''
              })}
              className="text-red-500 hover:text-red-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
