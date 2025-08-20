"use client"

import { useState, useEffect, useCallback } from 'react'
import { locationService, LocationData } from '@/services/location-service'

interface UseLocationReturn {
  location: LocationData | null
  isLoading: boolean
  error: string | null
  requestLocation: () => Promise<void>
  updateLocation: (newLocation: LocationData) => void
  clearLocation: () => void
  formattedLocation: string
}

export function useLocation(): UseLocationReturn {
  const [location, setLocation] = useState<LocationData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load saved location on mount
  useEffect(() => {
    const savedLocation = locationService.getSavedLocation()
    if (savedLocation) {
      setLocation(savedLocation)
    }
  }, [])

  // Listen for location changes from other components
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'userLocation' && e.newValue) {
        try {
          const newLocation = JSON.parse(e.newValue)
          setLocation(newLocation)
        } catch (error) {
          console.error('Failed to parse location from storage:', error)
        }
      }
    }

    const handleLocationChange = (e: CustomEvent) => {
      setLocation(e.detail)
    }

    window.addEventListener('storage', handleStorageChange)
    window.addEventListener('locationChanged', handleLocationChange as EventListener)
    
    return () => {
      window.removeEventListener('storage', handleStorageChange)
      window.removeEventListener('locationChanged', handleLocationChange as EventListener)
    }
  }, [])

  const requestLocation = useCallback(async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const currentLocation = await locationService.getCurrentLocation()
      setLocation(currentLocation)
      locationService.saveLocation(currentLocation)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to get location'
      setError(errorMessage)
      console.error('Location request failed:', err)
    } finally {
      setIsLoading(false)
    }
  }, [])

  const updateLocation = useCallback((newLocation: LocationData) => {
    setLocation(newLocation)
    locationService.saveLocation(newLocation)
    setError(null)
  }, [])

  const clearLocation = useCallback(() => {
    setLocation(null)
    locationService.clearSavedLocation()
    setError(null)
    // Trigger location change event
    window.dispatchEvent(new CustomEvent('locationChanged', { detail: null }))
  }, [])

  const formattedLocation = location 
    ? locationService.formatLocationForDisplay(location)
    : 'Location not set'

  return {
    location,
    isLoading,
    error,
    requestLocation,
    updateLocation,
    clearLocation,
    formattedLocation
  }
} 