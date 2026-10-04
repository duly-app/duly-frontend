import React, { useState, useEffect } from 'react';
import AuthContext, { type User } from './AuthContext';
import { getMe } from '../api/auth';
import { getAccessToken, setAccessToken, clearAuthData } from '../api/client';

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(() => getAccessToken());
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const logout = () => {
    clearAuthData();
    setToken(null);
    setUser(null);
  };

  const login = (newToken: string, newUser?: User) => {
    setAccessToken(newToken);
    setToken(newToken);
    if (newUser) setUser(newUser);
  };

  useEffect(() => {
    async function initializeAuth() {
      const storedToken = getAccessToken();
      if (!storedToken) {
        setIsLoading(false);
        return;
      }

      try {
        const userData = await getMe();
        setUser(userData);
        setToken(getAccessToken());
      } catch {
        logout();
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
