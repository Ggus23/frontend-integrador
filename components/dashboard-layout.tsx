"use client"

import type React from "react"

import { useState } from "react"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { useAuthInit } from "@/lib/use-auth"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true)

  // Procesa tokens del hash y exige sesión para ver el dashboard
  const { isReady } = useAuthInit({ requireAuth: true })

  // Mientras se procesa auth (primer render), mostramos un loader sencillo
  if (!isReady) {
    return (
      <div className="flex h-screen items-center justify-center bg-background text-foreground">
        Cargando panel...
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
