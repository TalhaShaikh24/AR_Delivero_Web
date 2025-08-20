export interface LocationData {
  latitude: number
  longitude: number
  formattedAddress: string
  city: string
  state: string
  country: string
}

class LocationService {
  private readonly GOOGLE_MAPS_API_KEY = 'AIzaSyDvV_gbVMAhfQpxyUn_SyzlsfZrnz0rUtY'

  /**
   * Get user's current location using browser geolocation
   */
  async getCurrentLocation(): Promise<LocationData> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'))
        return
      }

      navigator.geolocation.getCurrentPosition(
        async (position) => {
          try {
            const { latitude, longitude } = position.coords
            const locationData = await this.reverseGeocode(latitude, longitude)
            resolve(locationData)
          } catch (error) {
            // If reverse geocoding fails, still return the coordinates
            console.warn('Reverse geocoding failed, using coordinates:', error)
            resolve({
              latitude,
              longitude,
              formattedAddress: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
              city: 'Current Location',
              state: 'Unknown',
              country: 'Unknown'
            })
          }
        },
        (error) => {
          let errorMessage = 'Failed to get location'
          switch (error.code) {
            case error.PERMISSION_DENIED:
              errorMessage = 'Location permission denied'
              break
            case error.POSITION_UNAVAILABLE:
              errorMessage = 'Location information unavailable'
              break
            case error.TIMEOUT:
              errorMessage = 'Location request timed out'
              break
            default:
              errorMessage = `Geolocation error: ${error.message}`
          }
          reject(new Error(errorMessage))
        },
        {
          enableHighAccuracy: true,
          timeout: 15000,
          maximumAge: 300000 // 5 minutes
        }
      )
    })
  }

  /**
   * Reverse geocode coordinates to get formatted address
   */
  async reverseGeocode(latitude: number, longitude: number): Promise<LocationData> {
    try {
      // Use Google Maps JavaScript API if available
      if (typeof window !== 'undefined' && (window as any).google && (window as any).google.maps) {
        return new Promise((resolve, reject) => {
          const geocoder = new (window as any).google.maps.Geocoder()
          
          geocoder.geocode({ location: { lat: latitude, lng: longitude } }, (results: any[], status: string) => {
            if (status === 'OK' && results && results.length > 0) {
              const result = results[0]
              const addressComponents = result.address_components

              // Extract address components
              const city = this.getAddressComponent(addressComponents, ['locality', 'administrative_area_level_2']) || 'Unknown City'
              const state = this.getAddressComponent(addressComponents, ['administrative_area_level_1']) || 'Unknown State'
              const country = this.getAddressComponent(addressComponents, ['country']) || 'Unknown Country'

              resolve({
                latitude,
                longitude,
                formattedAddress: result.formatted_address,
                city,
                state,
                country
              })
            } else {
              reject(new Error('No location data found'))
            }
          })
        })
      } else {
        // Fallback to HTTP request (may have CORS issues)
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${this.GOOGLE_MAPS_API_KEY}`
        )
        
        if (!response.ok) {
          throw new Error('Failed to fetch location data')
        }

        const data = await response.json()
        
        if (data.status !== 'OK' || !data.results || data.results.length === 0) {
          throw new Error('No location data found')
        }

        const result = data.results[0]
        const addressComponents = result.address_components

        // Extract address components
        const city = this.getAddressComponent(addressComponents, ['locality', 'administrative_area_level_2']) || 'Unknown City'
        const state = this.getAddressComponent(addressComponents, ['administrative_area_level_1']) || 'Unknown State'
        const country = this.getAddressComponent(addressComponents, ['country']) || 'Unknown Country'

        return {
          latitude,
          longitude,
          formattedAddress: result.formatted_address,
          city,
          state,
          country
        }
      }
    } catch (error) {
      console.error('Reverse geocoding error:', error)
      // Fallback to coordinates if geocoding fails
      return {
        latitude,
        longitude,
        formattedAddress: `${latitude.toFixed(4)}, ${longitude.toFixed(4)}`,
        city: 'Current Location',
        state: 'Unknown',
        country: 'Unknown'
      }
    }
  }

  /**
   * Get address component by type
   */
  private getAddressComponent(components: any[], types: string[]): string | null {
    for (const component of components) {
      if (component.types.some((type: string) => types.includes(type))) {
        return component.long_name
      }
    }
    return null
  }

  /**
   * Save location to localStorage
   */
  saveLocation(location: LocationData): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('userLocation', JSON.stringify(location))
      // Trigger a custom event to notify other components
      window.dispatchEvent(new CustomEvent('locationChanged', { detail: location }))
    }
  }

  /**
   * Get location from localStorage
   */
  getSavedLocation(): LocationData | null {
    if (typeof window === 'undefined') return null
    
    const saved = localStorage.getItem('userLocation')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (error) {
        console.error('Failed to parse saved location:', error)
        return null
      }
    }
    return null
  }

  /**
   * Clear saved location
   */
  clearSavedLocation(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('userLocation')
    }
  }

  /**
   * Format location for display
   */
  formatLocationForDisplay(location: LocationData): string {
    return `${location.city}, ${location.state}`
  }
}

export const locationService = new LocationService() 