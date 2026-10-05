import React, { useState, useEffect } from 'react';
import AuthContext, { type User } from './AuthContext';
import { getMe } from '../api/auth';
import {
  getAccessToken,
  setAccessToken,
  clearAccessToken,
  refreshAccessToken,
  logout as logoutRequest,
} from '../api/client';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => getAccessToken());
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = async () => {
    try {
      await logoutRequest();
    } catch (error) {
      console.warn('Logout request failed; clearing local session anyway', error);
    } finally {
      setToken(null);
      setUser(null);
    }
  };

  const login = async (newToken: string) => {
    setAccessToken(newToken);
    setToken(newToken);
    setUser(await getMe());
  };

  useEffect(() => {
    async function initializeAuth() {
      try {
        if (!getAccessToken()) {
          await refreshAccessToken();
        }

        setUser(await getMe());
        setToken(getAccessToken());
      } catch {
        clearAccessToken();
        setToken(null);
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    }

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loggedIn: !!token,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
