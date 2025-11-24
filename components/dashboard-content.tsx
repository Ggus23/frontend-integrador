"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, CheckCircle, Clock, TrendingUp, Upload, Sparkles } from "lucide-react"
import Link from "next/link"
import { AIProgressBanner } from "@/components/ai/ai-progress-banner"
import { AIProvenanceTag, type ProvenanceSource } from "@/components/ai/ai-provenance-tag"
import { cn } from "@/lib/utils"

type DashboardSummary = {
  role: string
  completed: number
  reviewing: number
  ready: number
  analyzing: number
  total: number
}

type DashboardHistoryItem = {
  id: string | number
  version: string
  source: ProvenanceSource   // 👈 AHORA usa el mismo tipo que AIProvenanceTag
  changes: string
  author: string
  date: string
  status: "approved" | "reviewing" | "draft" | string
}

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000"

function getAccessToken(): string | null {
  if (typeof window === "undefined") return null
  return localStorage.getItem("accessToken")
}

export function DashboardContent() {
  const [summary, setSummary] = useState<DashboardSummary | null>(null)
  const [history, setHistory] = useState<DashboardHistoryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const token = getAccessToken()

        const headers: HeadersInit = {
          "Content-Type": "application/json",
        }
        if (token) {
          headers["Authorization"] = `Bearer ${token}`
        }

        const [summaryRes, historyRes] = await Promise.all([
          fetch(`${API_BASE}/auth/dashboard/summary`, { headers }),
          fetch(`${API_BASE}/auth/dashboard/history`, { headers }),
        ])

        if (!summaryRes.ok) {
          throw new Error(`Error al obtener resumen (${summaryRes.status})`)
        }
        if (!historyRes.ok) {
          throw new Error(`Error al obtener historial (${historyRes.status})`)
        }

        const summaryData: DashboardSummary = await summaryRes.json()
        const historyData: DashboardHistoryItem[] = await historyRes.json()

        if (!cancelled) {
          setSummary(summaryData)
          setHistory(historyData)
        }
      } catch (err: any) {
        console.error("Error cargando dashboard:", err)
        if (!cancelled) {
          setError(err.message ?? "Error al cargar el dashboard")
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [])

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-muted-foreground">Cargando resumen del PGF...</p>
      </div>
    )
  }

  if (error || !summary) {
    return (
      <div className="flex h-full items-center justify-center">
        <p className="text-sm text-red-500">
          {error ?? "No se pudo cargar la información del dashboard."}
        </p>
      </div>
    )
  }

  const aiProgressPercentage =
    summary.total > 0 ? Math.round((summary.completed / summary.total) * 100) : 0

  const stats = [
    {
      title: "Análisis IA Completados",
      value: summary.completed.toString(),
      change: `${summary.total} total`,
      icon: CheckCircle,
      color: "text-primary",
    },
    {
      title: "En Revisión",
      value: summary.reviewing.toString(),
      change: "Requieren atención",
      icon: Clock,
      color: "text-foreground",
    },
    {
      title: "Sugerencias Listas",
      value: summary.ready.toString(),
      change: "Disponibles para revisar",
      icon: Sparkles,
      color: "text-primary",
    },
    {
      title: "Analizando",
      value: summary.analyzing.toString(),
      change: "En proceso",
      icon: TrendingUp,
      color: "text-foreground",
    },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Bienvenido de nuevo
        </h2>
        <p className="text-muted-foreground">Resumen del análisis IA de tu PGF</p>
      </div>

      <AIProgressBanner
        message={`Análisis del PGF en progreso: ${aiProgressPercentage}% completado`}
        progress={aiProgressPercentage}
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={cn("h-5 w-5", stat.color)} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/pgf">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <FileText className="mr-2 h-4 w-4 text-foreground" />
                Ver PGF completo
              </Button>
            </Link>
            <Link href="/upload">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Upload className="mr-2 h-4 w-4 text-foreground" />
                Cargar nuevo PGF
              </Button>
            </Link>
            <Link href="/generator">
              <Button className="w-full justify-start bg-transparent" variant="outline">
                <Sparkles className="mr-2 h-4 w-4 text-foreground" />
                Generar recursos pedagógicos
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Historial de Validaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {history.slice(0, 3).map((version) => (
                <div
                  key={version.id}
                  className="flex items-start justify-between border-b border-border pb-3 last:border-0 last:pb-0"
                >
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-medium leading-none">
                        Versión {version.version}
                      </p>
                      <AIProvenanceTag source={version.source} />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {version.changes}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {version.author} • {version.date}
                    </p>
                  </div>
                  <span
                    className={cn(
                      "rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ml-2",
                      version.status === "approved"
                        ? "bg-primary text-white"
                        : version.status === "reviewing"
                        ? "bg-secondary text-foreground"
                        : "bg-muted text-foreground",
                    )}
                  >
                    {version.status === "approved"
                      ? "Aprobado"
                      : version.status === "reviewing"
                      ? "En revisión"
                      : "Borrador"}
                  </span>
                </div>
              ))}
            </div>
            <Link href="/history">
              <Button variant="ghost" className="w-full mt-4 text-primary">
                Ver historial completo
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
