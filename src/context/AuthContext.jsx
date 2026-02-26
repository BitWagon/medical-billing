'use client';

import { createContext, useContext } from "react";
import { useAuth, AuthProvider as AuthHookProvider } from "@/hooks/useAuth";

/**
 * AuthContext - wraps the app to provide authentication state
 * Use the useAuthContext() hook in any component to access user info
 */

const AuthContext = createContext();

/**
 * AuthProvider wraps the app and provides auth state
 */
export function AuthProvider({ children }) {
  return (
    <AuthHookProvider>
      <AuthContext.Provider value={useAuth()}>
        {children}
      </AuthContext.Provider>
    </AuthHookProvider>
  );
}

/**
 * Custom hook to consume AuthContext
 */
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}