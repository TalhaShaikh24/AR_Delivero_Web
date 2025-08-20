"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function DebugLocation() {
  const [testResult, setTestResult] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)

  const testPlacesAPI = async () => {
    setIsLoading(true)
    setTestResult('Testing...')
    
    try {
      if (typeof window !== 'undefined' && (window as any).google && (window as any).google.maps) {
        const service = new (window as any).google.maps.places.AutocompleteService()
        
        service.getPlacePredictions({
          input: 'mumbai',
          types: ['(cities)']
        }, (predictions: any[], status: string) => {
          const result = {
            status,
            predictions: predictions || [],
            googleMapsLoaded: true
          }
          setTestResult(JSON.stringify(result, null, 2))
          console.log('Debug API response:', result)
          setIsLoading(false)
        })
      } else {
        setTestResult(JSON.stringify({
          error: 'Google Maps API not loaded',
          googleMapsLoaded: false
        }, null, 2))
        setIsLoading(false)
      }
    } catch (error) {
      setTestResult(`Error: ${error}`)
      console.error('Debug API error:', error)
      setIsLoading(false)
    }
  }

  const testGeocodingAPI = async () => {
    setIsLoading(true)
    setTestResult('Testing Geocoding...')
    
    try {
      if (typeof window !== 'undefined' && (window as any).google && (window as any).google.maps) {
        const geocoder = new (window as any).google.maps.Geocoder()
        
        geocoder.geocode({ address: 'mumbai' }, (results: any[], status: string) => {
          const result = {
            status,
            results: results || [],
            googleMapsLoaded: true
          }
          setTestResult(JSON.stringify(result, null, 2))
          console.log('Debug Geocoding response:', result)
          setIsLoading(false)
        })
      } else {
        setTestResult(JSON.stringify({
          error: 'Google Maps API not loaded',
          googleMapsLoaded: false
        }, null, 2))
        setIsLoading(false)
      }
    } catch (error) {
      setTestResult(`Error: ${error}`)
      console.error('Debug Geocoding error:', error)
      setIsLoading(false)
    }
  }

  // return (
  //   <div className="p-4 border rounded-lg">
  //     <h3 className="text-lg font-semibold mb-4">Debug Location APIs</h3>
      
  //     <div className="space-y-2 mb-4">
  //       <Button onClick={testPlacesAPI} disabled={isLoading}>
  //         Test Places API
  //       </Button>
  //       <Button onClick={testGeocodingAPI} disabled={isLoading}>
  //         Test Geocoding API
  //       </Button>
  //     </div>
      
  //     {testResult && (
  //       <div className="mt-4">
  //         <h4 className="font-medium mb-2">Result:</h4>
  //         <pre className="bg-gray-100 p-2 rounded text-xs overflow-auto max-h-60">
  //           {testResult}
  //         </pre>
  //       </div>
  //     )}
  //   </div>
  // )
} 