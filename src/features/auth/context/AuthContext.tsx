import { createContext } from 'react';

export interface User {
  id: string;
  username: string;
  email: string;
}

export interface AuthContextType {
  token: string | null;
  user: User | null;
  loggedIn: boolean;
  isLoading: boolean;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
