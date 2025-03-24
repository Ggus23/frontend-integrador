import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="bg-orange-950 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          EduTwinIA
        </Link>
        <nav className="hidden md:flex space-x-4">
          <Link href="/" className="hover:text-orange-300 transition-colors">
            Inicio
          </Link>
          <Link href="/projects" className="hover:text-orange-300 transition-colors">
            Proyectos
          </Link>
          <Link href="/teachers" className="hover:text-orange-300 transition-colors">
            Docentes
          </Link>
          <Link href="/events" className="hover:text-orange-300 transition-colors">
            Eventos
          </Link>
          <Link href="/training" className="hover:text-orange-300 transition-colors">
            Formación
          </Link>
        </nav>
        <div className="space-x-2">
          <Button asChild variant="outline" className="bg-orange-900 text-white hover:bg-orange-800">
            <Link href="/login">Iniciar Sesión</Link>
          </Button>
          <Button asChild className="bg-orange-500 text-white hover:bg-orange-400">
            <Link href="/register">Registrarse</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}



