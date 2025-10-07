import { createContext, useContext, useState } from 'react';

// 1. Create the context
const AuthContext = createContext(null);

// Custom hook to easily consume the context
export const useAuth = () => useContext(AuthContext);

// 2. Create the provider component
export const AuthProvider = ({ children }) => {
  // Simulate authentication state
  const [user, setUser] = useState(null); // null means logged out
  
  // Simulated login/logout functions
  const login = () => setUser({ id: 1, name: 'TestUser' });
  const logout = () => setUser(null);

  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};





