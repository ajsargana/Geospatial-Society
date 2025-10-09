// API base URL configuration
// In production, this will be the URL of your deployed backend
// In development, Vite proxy handles /api requests to localhost:5000
export const API_BASE_URL = import.meta.env.VITE_API_URL || '';

// Helper function to construct API URLs
export function apiUrl(path: string): string {
  // If VITE_API_URL is set (production), prepend it to the path
  // Otherwise, use relative path (development with Vite proxy)
  if (API_BASE_URL) {
    return `${API_BASE_URL}${path}`;
  }
  return path;
}

// Custom fetch wrapper that handles API URLs automatically
export async function apiFetch(path: string, options?: RequestInit): Promise<Response> {
  const url = apiUrl(path);

  // Debug logging
  console.log('[apiFetch] Request URL:', url);
  console.log('[apiFetch] VITE_API_URL:', import.meta.env.VITE_API_URL);
  console.log('[apiFetch] API_BASE_URL:', API_BASE_URL);

  // Add credentials for cookies/sessions to work across domains
  // Only add Content-Type header for JSON requests (not for FormData)
  const headers: HeadersInit = {};

  // Don't set Content-Type if body is FormData (browser will set it automatically with boundary)
  if (!(options?.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  // Merge with any custom headers
  if (options?.headers) {
    Object.assign(headers, options.headers);
  }

  const fetchOptions: RequestInit = {
    ...options,
    headers,
    credentials: 'include',
  };

  try {
    const response = await fetch(url, fetchOptions);
    console.log('[apiFetch] Response status:', response.status);
    return response;
  } catch (error) {
    console.error('[apiFetch] Fetch failed:', error);
    console.error('[apiFetch] Failed URL:', url);
    throw error;
  }
}
