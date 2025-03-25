"use client";

import { createContext, useContext, type ReactNode, useEffect, useState } from "react";
import { getSession } from "next-auth/react";

interface AuthContextType {
  user: any;
  loading: boolean;
  login: (email: string, contrasena_hasheada: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: any) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [auth, setAuth] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const session = await getSession();
        setAuth(session);
      } catch (error) {
        console.error("Error fetching auth data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // O un componente de carga personalizado
  }

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}