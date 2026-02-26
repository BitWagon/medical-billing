'use client';

import { useState, useEffect, useContext, createContext } from "react";
import { useRouter } from "next/navigation";

// Create Auth Context
const AuthContext = createContext();

/**
 * AuthProvider wraps the app and provides authentication state
 * @param {ReactNode} children
 */
export function AuthProvider({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

/**
 * Hook to access auth context
 */
export function useAuth() {
  return useContext(AuthContext);
}

/**
 * Hook to manage authentication state
 */
function useProvideAuth() {
  const router = useRouter();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /**
   * Load user from localStorage / token
   */
  useEffect(() => {
    const storedUser = localStorage.getItem("authUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  /**
   * Login function
   * @param {string} token - JWT token
   * @param {object} userData - user info
   */
  const login = (token, userData) => {
    localStorage.setItem("authToken", token);
    localStorage.setItem("authUser", JSON.stringify(userData));
    setUser(userData);
    router.push("/dashboard"); // redirect after login
  };

  /**
   * Logout function
   */
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
    setUser(null);
    router.push("/auth/login"); // redirect to login
  };

  /**
   * Check if user is authenticated
   */
  const isAuthenticated = () => !!user;

  return {
    user,
    loading,
    login,
    logout,
    isAuthenticated,
  };
}