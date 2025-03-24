"use client"

import type React from "react"
import { useRouter } from "next/navigation";
import axios from "axios";
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { UserPlus, User, Mail, Lock, School, Loader2 } from "lucide-react"

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    colegio: "",
  });
  const [isLoading, setIsLoading] = useState(false); // Separado correctamente
  const [error, setError] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
  
    if (formData.password !== formData.confirmPassword) {
      setError("Las contraseñas no coinciden");
      setIsLoading(false);
      return;
    }
  
    try {
      await axios.post("http://localhost:3001/auth/register", formData);
      router.push("/login");
    } catch (error: any) {
      setError(error.response?.data?.message || "Error al registrarse");
    } finally {
      setIsLoading(false);
    }
    
  };

  const handleSelectChange = (value: string) => {
    setFormData({ ...formData, colegio: value });
  };

  
  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-orange-600 to-orange-400 text-white p-6">
        <CardTitle className="text-2xl font-bold flex items-center justify-center">
          <UserPlus className="mr-2" /> Registro de Usuario
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">
              Nombre completo
            </Label>
            <div className="relative">
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="pl-10 w-full"
                placeholder="Nombre completo"
              />
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-sm font-medium text-gray-700">
              Correo electrónico
            </Label>
            <div className="relative">
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="pl-10 w-full"
                placeholder="Correo electrónico"
              />
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="school" className="text-sm font-medium text-gray-700">
              Colegio
            </Label>
            <div className="relative">
              <Select onValueChange={handleSelectChange}>
                  <SelectTrigger className="w-full pl-10">
                  <SelectValue placeholder="Selecciona un colegio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Colegio A">Colegio A</SelectItem>
                  <SelectItem value="Colegio B">Colegio B</SelectItem>
                  <SelectItem value="Colegio C">Colegio C</SelectItem>
                </SelectContent>
              </Select>
              <School className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="password" className="text-sm font-medium text-gray-700">
              Contraseña
            </Label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="pl-10 w-full"
                placeholder="••••••••"
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-sm font-medium text-gray-700">
              Confirmar contraseña
            </Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                onChange={handleChange}
                required
                className="pl-10 w-full"
                placeholder="••••••••"
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <Button
          type="submit"
          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
          disabled={isLoading} // Deshabilita el botón mientras se carga
          >
          {isLoading ? ( // Muestra un ícono de carga si está cargando
          <div className="flex items-center justify-center">
          <Loader2 className="mr-2 h-4 w-4 animate-spin" /> {/* Ícono de carga */}
          Registrando...
          </div>
          ) : (
          "Registrarse" // Texto normal cuando no está cargando
          )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="bg-gray-50 p-6 flex justify-center">
        <p className="text-sm text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <Link href="/login" className="text-orange-600 hover:text-orange-800 font-medium">
            Inicia sesión
          </Link>
        </p>
      </CardFooter>
    </Card>
  )
}