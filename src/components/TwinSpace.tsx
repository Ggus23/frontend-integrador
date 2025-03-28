import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function TwinSpace() {
  const projects = [
    {
      title: "Cultura Global",
      description: "Explora y comparte tradiciones culturales con estudiantes de todo el mundo.",
    },
    { title: "Ciencia Ciudadana", description: "Participa en proyectos de investigación científica colaborativa." },
    { title: "Arte Sin Fronteras", description: "Crea y exhibe obras de arte en colaboración con otros estudiantes." },
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      
      <h2 className="text-3xl font-bold text-center text-orange-950 mb-8">TwinSpace</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <Card key={index} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <CardHeader className="bg-orange-100">
              <CardTitle className="text-xl font-semibold text-orange-950">{project.title}</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <p className="text-gray-600 mb-4">{project.description}</p>
              <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">Unirse al proyecto</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Button className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-3">Crear nuevo proyecto</Button>
      </div>
    </div>
  )
}
