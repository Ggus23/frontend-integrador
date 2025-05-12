"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, MessageSquare, ImageIcon, MessageCircle } from "lucide-react";
import Link from "next/link";

interface Proyecto {
  id_proyecto: string;
  nombre: string;
  descripcion: string;
  docente: string;
  mensaje_bienvenida: string;
  // Agrega más campos si tu backend los retorna
}

export function ProjectOverview() {
  const { id } = useParams(); // ← id_proyecto viene como "id"
  const [project, setProject] = useState<Proyecto | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects/${id}`);
        const data = await res.json();
        setProject(data);
      } catch (error) {
        console.error("Error fetching project:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProject();
    }
  }, [id]);

  if (loading) {
    return <div className="text-center py-8">Cargando proyecto...</div>;
  }

  if (!project) {
    return <div className="text-center py-8">Proyecto no encontrado</div>;
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-orange-50">
          <CardTitle className="text-2xl font-bold text-orange-950">{project.nombre}</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-start space-x-4 mb-6">
            <Avatar className="h-12 w-12">
              <AvatarImage src="/avatars/teacher.jpg" alt={project.docente} />
              <AvatarFallback>{project.docente?.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">Mensaje de {project.docente}</h3>
              <p className="text-gray-600">{project.mensaje_bienvenida}</p>
            </div>
          </div>

          <CardContent className="p-6 flex justify-center">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8 grid-flow-row dense">
              <Button
                variant="outline"
                className="flex flex-col items-center justify-center h-24 border-orange-200 hover:bg-orange-50"
                asChild
              >
                <Link href="/twinspace/dashboard/participants">
                  <Users className="h-6 w-6 mb-2 text-orange-600" />
                  <span>Participantes</span>
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
                  <span>Recursos Compartidos</span>
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
        </CardContent>
      </Card>
      <br />
    </div>
  );
}