import { apiClient } from './client';
import { type User } from '../context/AuthContext';

const API_URL = import.meta.env.VITE_API_URL;

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegistrationPayload {
  username: string;
  email: string;
  password: string;
  registration_code: string;
}

export interface LoginResponse {
  token: string;
}

export async function login(payload: LoginPayload): Promise<LoginResponse> {
  const res = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message ?? 'Login failed');
  }

  return res.json();
}

export async function signup(payload: RegistrationPayload): Promise<null> {
  const res = await fetch(`${API_URL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.message ?? 'Registration failed');
  }

  return null;
}

export async function getMe(): Promise<User> {
  return apiClient<User>('/me');
}
