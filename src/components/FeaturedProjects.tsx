import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const projects = [
  {
    title: "Exploradores del Clima",
    description: "Estudiantes de diferentes países colaboran para estudiar y comparar patrones climáticos locales.",
    link: "/projects/climate-explorers",
  },
  {
    title: "Cuentos Sin Fronteras",
    description: "Proyecto de escritura creativa que une a estudiantes para crear historias multiculturales.",
    link: "/projects/stories-without-borders",
  },
  {
    title: "Matemáticas en la Vida Real",
    description: "Aplicación de conceptos matemáticos a situaciones cotidianas en diferentes culturas.",
    link: "/projects/real-life-math",
  },
]

export function FeaturedProjects() {
  return (
    <section className="py-12 bg-orange-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-orange-950 mb-8">Proyectos Destacados</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-orange-950">{project.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white mb-4">{project.description}</p>
                <Button asChild variant="outline" className="w-full">
                  <a href={project.link}>Más información</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}