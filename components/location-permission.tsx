"use client"

import { useState, useEffect } from 'react'
import { MapPin, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLocation } from '@/hooks/use-location'

export function LocationPermission() {
  const { location, requestLocation, error } = useLocation()
  const [showPermission, setShowPermission] = useState(false)
  const [hasRequested, setHasRequested] = useState(false)

  useEffect(() => {
    // Check if location permission has been requested before
    const hasRequestedBefore = localStorage.getItem('locationPermissionRequested')
    const savedLocation = localStorage.getItem('userLocation')
    
    // Only show permission request if no saved location and not requested before
    if (!location && !savedLocation && !hasRequestedBefore && !hasRequested) {
      // Show permission request after a short delay
      const timer = setTimeout(() => {
        setShowPermission(true)
      }, 1000)
      
      return () => clearTimeout(timer)
    }
  }, [location, hasRequested])

  const handleAllowLocation = async () => {
    setHasRequested(true)
    localStorage.setItem('locationPermissionRequested', 'true')
    
    try {
      await requestLocation()
      setShowPermission(false)
    } catch (error) {
      console.error('Location permission denied:', error)
      setShowPermission(false)
    }
  }

  const handleDenyLocation = () => {
    setHasRequested(true)
    localStorage.setItem('locationPermissionRequested', 'true')
    setShowPermission(false)
  }

  if (!showPermission || location) {
    return null
  }

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 mx-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-blue-100 p-2 rounded-full">
              <MapPin className="h-5 w-5 text-blue-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-sm font-semibold text-gray-900">
                Enable Location Access
              </h3>
              <p className="text-xs text-gray-600 mt-1">
                Allow location access to find restaurants and services near you
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDenyLocation}
            className="h-6 w-6 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex space-x-2 mt-3">
          <Button
            onClick={handleAllowLocation}
            size="sm"
            className="flex-1 text-xs"
          >
            Allow
          </Button>
          <Button
            onClick={handleDenyLocation}
            variant="outline"
            size="sm"
            className="flex-1 text-xs"
          >
            Not Now
          </Button>
        </div>
        
        {error && (
          <p className="text-xs text-red-500 mt-2">
            {error}
          </p>
        )}
      </div>
    </div>
  )
} 