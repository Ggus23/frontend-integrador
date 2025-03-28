"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession, signOut } from "next-auth/react";
import NextLink from "next/link";
import { useRouter } from 'next/navigation';

export function UserProfile() {
  const { data: session, update } = useSession();
  const [profile, setProfile] = useState({
    id: "",
    name: "",
    email: "",
    rol: "",
  });

  useEffect(() => {
    if (session?.user) {
      console.log("useEffect Session User:", session.user);
      setProfile({
        id: session.user.id?.toString() || "",
        name: session.user.name || "",
        email: session.user.email || "",
        rol: session.user.role || "",
      });
    }
  }, [session?.user]); // Solo se ejecuta cuando session.user cambia

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!session?.user) {
        console.error("Session user is undefined.");
        return;
      }
      const id = session?.user.id;
      if (!id) {
        console.error("ID is undefined, cannot update profile");
        return;
      }
      console.log("ID:", id);
      console.log("Profile:", profile);
      console.log("Session User:", session?.user);
      console.log("URL:", `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`);

      const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_usuario: id,
          nombre: profile.name,
          email: profile.email,
          rol: profile.rol,
        }),
      });

      if (response.ok) {
        console.log("Perfil actualizado con éxito");
        update();
      } else {
        console.error("Error al actualizar el perfil");
        const errorData = await response.json();
        console.log("Detalles del error:", errorData);
      }
    } catch (error) {
      console.error("Error al actualizar el perfil:", error);
    }
  };

  if (!session) {
    return <div>Cargando...</div>;
  }


  return (
    <Card>
      <CardHeader>
        <CardTitle>Mi Perfil</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder-user.jpg" alt={profile.name} />
              <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button>Cambiar foto</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" name="name" value={profile.name} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={profile.email} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="rol">Rol</Label>
              <Input id="rol" name="rol" value={profile.rol} onChange={handleChange} />
            </div>
          </div>
          <Button type="submit">Guardar cambios</Button>
        </form>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 pt-6 border-t border-gray-200">
          <Button variant="outline" className="flex items-center">
            <NextLink href="/create-project" className="flex items-center text-sm font-medium">
              Crear Proyectos
            </NextLink>
          </Button>
          <Button variant="outline" className="flex items-center">
            <NextLink href="/my-projects" className="flex items-center text-sm font-medium">
              Ver Proyectos
            </NextLink>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}