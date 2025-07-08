"use client"

import { useState, useEffect } from "react"
import type { ApiError } from "@/lib/api"

interface UseApiOptions<T> {
  initialData?: T
  onSuccess?: (data: T) => void
  onError?: (error: ApiError | Error) => void
  dependencies?: any[]
}

/**
 * Custom hook for data fetching with loading and error states
 */
export function useApi<T>(fetchFn: () => Promise<T>, options: UseApiOptions<T> = {}) {
  const { initialData, onSuccess, onError, dependencies = [] } = options
  const [data, setData] = useState<T | undefined>(initialData)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const fetchData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const result = await fetchFn()

        if (isMounted) {
          setData(result)
          onSuccess?.(result)
        }
      } catch (err) {
        console.error("API request failed:", err)

        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : "An unknown error occurred"
          setError(errorMessage)
          onError?.(err as ApiError | Error)
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    fetchData()

    return () => {
      isMounted = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)

  return { data, isLoading, error, setData }
}
