/**
 * API helper functions for making authenticated requests
 */

type RequestMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestOptions {
  method?: RequestMethod;
  headers?: Record<string, string>;
  body?: string | FormData | URLSearchParams | Blob | ArrayBuffer;
  credentials?: RequestCredentials;
}

interface ApiResponse<T = unknown> {
  data: T | null;
  error: string | null;
  status: number;
}

/**
 * Base API URL from environment or default
 */
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

/**
 * Makes an API request with credentials included by default
 */
export async function fetchApi<T = unknown>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<ApiResponse<T>> {
  const url = endpoint.startsWith('http') ? endpoint : `${API_BASE_URL}${endpoint}`;

  // Default options with credentials included
  const defaultOptions: RequestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include', // Always include credentials
  };

  // Merge with user options
  const fetchOptions: RequestInit = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, fetchOptions);
    const isJson = response.headers.get('content-type')?.includes('application/json');

    // Parse JSON if available, otherwise return empty data
    const data = isJson ? await response.json() : null;

    if (response.ok) {
      return {
        data: data as T,
        error: null,
        status: response.status,
      };
    } else {
      const errorData = data as { error?: string } | null;
      return {
        data: null,
        error: errorData?.error || `Request failed with status ${response.status}`,
        status: response.status,
      };
    }
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
      status: 0, // Network error or other exception
    };
  }
}

/**
 * Convenience methods for common HTTP methods
 */
export const api = {
  get: <T = unknown>(endpoint: string, options?: Omit<RequestOptions, 'method' | 'body'>) =>
    fetchApi<T>(endpoint, { ...options, method: 'GET' }),

  post: <T = unknown>(
    endpoint: string,
    data: Record<string, unknown>,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ) => {
    const body = JSON.stringify(data);
    return fetchApi<T>(endpoint, { ...options, method: 'POST', body });
  },

  put: <T = unknown>(
    endpoint: string,
    data: Record<string, unknown>,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ) => {
    const body = JSON.stringify(data);
    return fetchApi<T>(endpoint, { ...options, method: 'PUT', body });
  },

  delete: <T = unknown>(endpoint: string, options?: Omit<RequestOptions, 'method'>) =>
    fetchApi<T>(endpoint, { ...options, method: 'DELETE' }),

  patch: <T = unknown>(
    endpoint: string,
    data: Record<string, unknown>,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ) => {
    const body = JSON.stringify(data);
    return fetchApi<T>(endpoint, { ...options, method: 'PATCH', body });
  },
};
