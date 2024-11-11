// src/contexts/authContext.ts
import { createContext } from "react";

interface AuthContextProps {
  isAuthenticated: boolean;
  loading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  loading: true,
  login: () => {},
  logout: () => {},
});

export default AuthContext;
