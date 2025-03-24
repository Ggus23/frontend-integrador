import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function Projects() {
  const projects = [
    {
      title: "Proyecto de Matemáticas Interactivas",
      description: "Un proyecto innovador para enseñar matemáticas de forma interactiva.",
    },
    { title: "Ciencias del Medio Ambiente", description: "Estudio global sobre el cambio climático y sus efectos." },
    { title: "Literatura Comparada", description: "Análisis comparativo de obras literarias de diferentes culturas." },
  ]

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-center text-orange-950">Proyectos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">{project.description}</p>
              <Button>Ver detalles</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}