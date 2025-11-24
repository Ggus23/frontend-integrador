"use client"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

type UseAuthOptions = {
  requireAuth?: boolean
}

export function useAuthInit(options?: UseAuthOptions) {
  const { requireAuth = false } = options ?? {}
  const router = useRouter()
  const pathname = usePathname()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    // 1) Leer tokens del hash si vienen del backend
    const hash = window.location.hash
    if (hash.startsWith("#")) {
      const params = new URLSearchParams(hash.slice(1))

      const accessToken = params.get("accessToken")
      const refreshToken = params.get("refreshToken")

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken)
      }
      if (refreshToken) {
        localStorage.setItem("refreshToken", refreshToken)
      }

      // Limpiar el hash para que no quede feo en la barra de direcciones
      if (accessToken || refreshToken) {
        window.history.replaceState(
          null,
          document.title,
          window.location.pathname + window.location.search,
        )
      }
    }

    // 2) Comprobar si hay token almacenado
    const storedAccessToken = localStorage.getItem("accessToken")

    // 3) Si la vista requiere auth y no hay token → redirigir a login
    if (requireAuth && !storedAccessToken) {
      router.replace("/login")
      return
    }

    setIsReady(true)
  }, [requireAuth, router, pathname])

  return { isReady }
}
