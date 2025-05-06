import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, MessageSquare, ImageIcon, Home, MessageCircle } from "lucide-react"
import Link from "next/link"

// Static data for recent activities
const recentActivities = [
  {
    id: 1,
    user: {
      name: "María González",
      avatar: "/avatars/maria.jpg",
      initials: "MG",
    },
    action: "añadió una nueva página",
    target: "Introducción a las Matemáticas",
    time: "hace 2 horas",
  },
  {
    id: 2,
    user: {
      name: "Carlos Rodríguez",
      avatar: "/avatars/carlos.jpg",
      initials: "CR",
    },
    action: "comentó en",
    target: "Proyecto de Ciencias",
    time: "hace 5 horas",
  },
  {
    id: 3,
    user: {
      name: "Ana Martínez",
      avatar: "/avatars/ana.jpg",
      initials: "AM",
    },
    action: "subió 5 fotos a",
    target: "Galería del Proyecto",
    time: "ayer",
  },
  {
    id: 4,
    user: {
      name: "Juan Pérez",
      avatar: "/avatars/juan.jpg",
      initials: "JP",
    },
    action: "creó un nuevo evento",
    target: "Videoconferencia Internacional",
    time: "hace 2 días",
  },
]

// Static data for project info
const projectInfo = {
  title: "Exploradores del Clima Global",
  teacher: "Prof. Laura Sánchez",
  welcomeMessage:
    "¡Bienvenidos a nuestro proyecto colaborativo! Juntos exploraremos los diferentes climas del mundo y cómo afectan a las comunidades locales. Espero que disfruten de esta experiencia de aprendizaje internacional.",
}

export function ProjectOverview() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-orange-50">
          <CardTitle className="text-2xl font-bold text-orange-950">{projectInfo.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-start space-x-4 mb-6">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/avatars/teacher.jpg" alt={projectInfo.teacher} />
              <AvatarFallback>LS</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">Mensaje de {projectInfo.teacher}</h3>
              <p className="text-gray-600">{projectInfo.welcomeMessage}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24 border-orange-200 hover:bg-orange-50"
              asChild
            >
              <Link href="/twinspace/participants">
                <Users className="h-6 w-6 mb-2 text-orange-600" />
                <span>Participantes</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24 border-orange-200 hover:bg-orange-50"
              asChild
            >
              <Link href="/twinspace/pages">
                <Home className="h-6 w-6 mb-2 text-orange-600" />
                <span>Páginas</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24 border-orange-200 hover:bg-orange-50"
              asChild
            >
              <Link href="/twinspace/forum">
                <MessageSquare className="h-6 w-6 mb-2 text-orange-600" />
                <span>Foro</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24 border-orange-200 hover:bg-orange-50"
              asChild
            >
              <Link href="/twinspace/gallery">
                <ImageIcon className="h-6 w-6 mb-2 text-orange-600" />
                <span>Galería</span>
              </Link>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24 border-orange-200 hover:bg-orange-50"
              asChild
            >
              <Link href="/chat">
                <MessageCircle className="h-6 w-6 mb-2 text-orange-600" />
                <span>Chat</span>
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="bg-orange-50">
          <CardTitle className="text-xl font-bold text-orange-950">Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <ul className="space-y-4">
            {recentActivities.map((activity) => (
              <li key={activity.id} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-0">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={activity.user.avatar || "/placeholder.svg"} alt={activity.user.name} />
                  <AvatarFallback>{activity.user.initials}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm">
                    <span className="font-semibold">{activity.user.name}</span> {activity.action}{" "}
                    <span className="text-orange-600">{activity.target}</span>
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </li>
            ))}
          </ul>
          <Button variant="link" className="text-orange-600 mt-4 p-0">
            Ver todas las actividades
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
