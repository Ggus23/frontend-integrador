"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, Tags } from "lucide-react";
import NextLink from "next/link";
import { useRouter } from 'next/navigation';

interface categorias {
  id: number;
  nombre: string;
  descripcion: string;
}

export function CreateProject() {
  const [formData, setFormData] = useState({
    id_usuario: "",
    nombre: "", // Corregido
    descripcion: "",
    category: "",
    Obj_aprendizaje: "", // Corregido
  });
  const [Categoria, setCategorias] = useState<categorias[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const router = useRouter();

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/categories`);
        if (!res.ok) {
          throw new Error(`Failed to fetch categorias: ${res.status} ${res.statusText}`);
        }
        const data: categorias[] = await res.json();
        setCategorias(data);
      } catch (err: any) {
        console.error("Error fetching categorias:", err);
        setError(err.message || "Error al cargar los categorias.");
      }
    };

    fetchCategorias();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (field: string, value: string) => {
    if (field === "category") {
      setFormData({ ...formData, [field]: value }); // Almacenar como cadena
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setError(null);

    const requestData = {
      nombre: formData.nombre,
      descripcion: formData.descripcion,
      Obj_aprendizaje: formData.Obj_aprendizaje,
      id_categoria: parseInt(formData.category),
      id_usuario: 1 // O obtén este ID de tu sistema de autenticación
    };

    console.log("Datos a enviar:", requestData);

    try {
      const token = localStorage.getItem('token'); // O donde guardes tu token

      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/projects`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          descripcion: formData.descripcion,
          Obj_aprendizaje: formData.Obj_aprendizaje,
          id_categoria: parseInt(formData.category),
          id_usuario: 4  // O el ID del usuario autenticado
        })
      });
      const responseData = await res.json();

      if (!res.ok) {
        throw new Error(responseData.message || "Error al crear proyecto");
      }

      setStatus("success");
      router.push('/twinspace');
    } catch (error: any) {
      console.error("Error completo:", error);
      setError(error.message || "Error desconocido al crear proyecto");
      setStatus("error");
    }
  };
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-orange-950">Crear Nuevo Proyecto</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nombre">Título del Proyecto</Label>
            <Input
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              placeholder="Ej: Exploradores del Clima"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea
              id="descripcion"
              name="descripcion"
              value={formData.descripcion}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Describe brevemente de qué trata tu proyecto..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="categoria" className="text-sm font-medium text-gray-700">
              Categoria
            </Label>
            <div className="relative">
              <Select onValueChange={(value) => handleSelectChange("category", value)} value={formData.category}>
                <SelectTrigger className="w-full pl-10">
                  <SelectValue placeholder="Selecciona una categoria" />
                </SelectTrigger>
                <SelectContent>
                  {Categoria.map((categoria) => (
                    <SelectItem key={categoria.id} value={categoria.id.toString()}>
                      {categoria.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Tags className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="Obj_aprendizaje">Objetivos de Aprendizaje</Label>
            <Textarea
              id="Obj_aprendizaje"
              name="Obj_aprendizaje"
              value={formData.Obj_aprendizaje}
              onChange={handleChange}
              rows={3}
              placeholder="¿Qué aprenderán los estudiantes con este proyecto?"
            />
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {status === "success" && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-600">
                ¡Tu proyecto ha sido creado con éxito! Pronto estará disponible para colaboración.
              </AlertDescription>
            </Alert>
          )}

          <div className="flex justify-end space-x-2">
            <Button variant="outline" className="flex items-center">
              <NextLink href="/UseProfile" className="flex items-center text-sm font-medium">
                Cancelar
              </NextLink>
            </Button>
            <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white"
              disabled={status === "loading"}>
              {status === "loading" ? "Creando..." : "Crear Proyecto"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}