import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

const teachers = [
  {
    name: "Ana Martínez",
    subject: "Matemáticas",
    country: "España",
    bio: "Apasionada por hacer las matemáticas divertidas y accesibles para todos los estudiantes.",
    avatar: "/ana.jpg",
  },
  {
    name: "John Smith",
    subject: "Ciencias",
    country: "Reino Unido",
    bio: "Promotor de la educación STEM y defensor de proyectos prácticos en el aula.",
    avatar: "/john.jpg",
  },
  {
    name: "Marie Dubois",
    subject: "Literatura",
    country: "Francia",
    bio: "Entusiasta de la literatura comparada y promotora de intercambios culturales a través de la lectura.",
    avatar: "/marie.jpg",
  },
  {
    name: "Carlos Rodríguez",
    subject: "Historia",
    country: "México",
    bio: "Especialista en historia latinoamericana y defensor de la educación multicultural.",
    avatar: "carlos.jpg",
  },
  {
    name: "Yuki Tanaka",
    subject: "Tecnología",
    country: "Japón",
    bio: "Innovadora en la integración de la robótica y la programación en la educación primaria.",
    avatar: "/yuki.jpg",
  },
  {
    name: "Sarah Johnson",
    subject: "Arte",
    country: "Estados Unidos",
    bio: "Artista visual que promueve la creatividad y la expresión personal a través del arte digital.",
    avatar: "/sarah.jpg",
  },
]

export function Teachers() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-center text-orange-950 mb-8">Nuestros Docentes Destacados</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teachers.map((teacher, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader className="pb-0">
              <div className="flex items-center space-x-4">
                <Avatar className="w-16 h-16">
                  <AvatarImage src={teacher.avatar} alt={teacher.name} />
                  <AvatarFallback>{teacher.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-xl font-semibold text-orange-800">{teacher.name}</CardTitle>
                  <p className="text-sm text-gray-600">{teacher.subject}</p>
                  <p className="text-sm text-gray-600">{teacher.country}</p>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <p className="text-gray-700 mb-4">{teacher.bio}</p>
              <Button variant="outline" className="w-full">
                Ver perfil
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}