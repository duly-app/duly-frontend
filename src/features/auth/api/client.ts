const API_URL = import.meta.env.VITE_API_URL;
const ACCESS_TOKEN_KEY = 'accessToken';

export function getAccessToken(): string | null {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token: string): void {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function clearAccessToken(): void {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
}

export async function refreshAccessToken(): Promise<string> {
  const response = await request('/refresh', { method: 'POST' });

  if (!response.ok) {
    clearAccessToken();
    throw new Error('Session expired. Please log in again.');
  }

  const { token } = await response.json();
  setAccessToken(token);

  return token;
}

export async function logout(): Promise<void> {
  try {
    await request('/logout', { method: 'POST' });
  } finally {
    clearAccessToken();
  }
}

export async function apiClient<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  let response = await authorizedRequest(endpoint, options);

  if (response.status === 401) {
    await refreshAccessToken();
    response = await authorizedRequest(endpoint, options);
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Request failed');
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

async function authorizedRequest(endpoint: string, options: RequestInit): Promise<Response> {
  const headers = new Headers(options.headers || {});

  const token = getAccessToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  return request(endpoint, { ...options, headers });
}

/**
 * Every call to the API goes through here, so `credentials: 'include'` is stated
 * once. Login depends on it to have its Set-Cookie honoured, and /refresh
 * depends on it to send that cookie back.
 */
export async function request(endpoint: string, options: RequestInit = {}): Promise<Response> {
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');

  return fetch(`${API_URL}${endpoint}`, { ...options, headers, credentials: 'include' });
}
