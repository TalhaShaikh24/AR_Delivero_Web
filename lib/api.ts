/**
 * API helper for making HTTP requests
 */

// Define the base URL from environment variable or fallback to a default
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.ardelivero.com"


// Error type for API responses
export interface ApiError {
  message: string
  status: number
}

// Generic API response type
export interface ApiResponse<T> {
  message: string
  data: T
  [key: string]: any // For any additional fields in the response
}

// Options for API requests
export interface ApiOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH"
  headers?: Record<string, string>
  body?: any
  cache?: RequestCache
  next?: { revalidate?: number | false }
}

/**
 * Generic fetch API function with error handling
 */
export const fetchApi = async <T>(endpoint: string, options: RequestInit = {}): Promise<{ ok: boolean, status: number, data: T, message?: string }> => {
  const url = `${API_BASE_URL}/${endpoint}`

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    "authorization": "demoServerKey",
    ...(options.headers as Record<string, string>),
  }

  const response = await fetch(url, { ...options, headers })

  let data: any = null
  try {
    data = await response.json()
  } catch {
    // response body is not JSON or empty
  }

  return {
    ok: response.ok,
    status: response.status,
    data,
    message: data?.message || response.statusText,
  }
}


/**
 * API helper functions for common HTTP methods
 */

export const api = {
  get: async <T>(endpoint: string, options: RequestInit = {}) => {
    const res = await fetchApi<T>(endpoint, { ...options, method: 'GET' })
    if (!res.ok) throw res
    return res.data
  },
  post: async <T>(endpoint: string, data: any, options: RequestInit = {}) => {
    const res = await fetchApi<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data),
    })
    if (!res.ok) throw res
    return res.data
  },
  put: async <T>(endpoint: string, data: any, options: RequestInit = {}) => {
    const res = await fetchApi<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data),
    })
    if (!res.ok) throw res
    return res.data
  },
  delete: async <T>(endpoint: string, options: RequestInit = {}) => {
    const res = await fetchApi<T>(endpoint, { ...options, method: 'DELETE' })
    if (!res.ok) throw res
    return res.data
  },
}
