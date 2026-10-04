const API_URL = import.meta.env.VITE_API_URL;

export function getAccessToken(): string | null {
  return localStorage.getItem('accessToken');
}

export function setAccessToken(token: string): void {
  localStorage.setItem('accessToken', token);
}

export function clearAuthData(): void {
  localStorage.removeItem('accessToken');
}

export async function apiClient<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
  const headers = new Headers(options.headers || {});
  headers.set('Content-Type', 'application/json');

  const token = getAccessToken();
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  let response = await getEndpointResponse(endpoint, options, headers);

  if (response.status === 401) {
    const newToken = await getRefreshToken();
    setAccessToken(newToken);

    headers.set('Authorization', `Bearer ${newToken}`);
    response = await getEndpointResponse(endpoint, options, headers);
  }

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Request failed');
  }

  return response.json();
}

const getRefreshToken = async (): Promise<string> => {
  const response = await getEndpointResponse(
    '/refresh',
    { method: 'POST' },
    new Headers({ 'Content-Type': 'application/json' }),
  );

  if (!response.ok) {
    clearAuthData();
    throw new Error('Session expired. Please log in again.');
  }

  const { token: newToken } = await response.json();
  setAccessToken(newToken);

  return newToken;
};

const getEndpointResponse = async (
  endpoint: string,
  options: RequestInit,
  headers: Headers,
): Promise<Response> => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: 'include',
  });
  return response;
};
