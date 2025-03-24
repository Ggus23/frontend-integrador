"use client";

import { useState, useEffect } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const apiVersion = process.env.REACT_APP_API_VERSION || "v1";

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch(`/api/${apiVersion}/auth/auth`);
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        }
      } catch (error) {
        console.error("Error al verificar la autenticación:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [apiVersion]);

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`/api/${apiVersion}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        // Manejar errores de inicio de sesión
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  const logout = async () => {
    // Implementar lógica de cierre de sesión
  };

  const register = async (userData: Omit<User, "id">) => {
    // Implementar lógica de registro
  };

  return { user, loading, login, logout, register };
}