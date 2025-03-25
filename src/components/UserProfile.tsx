"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";

export function UserProfile() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    rol: "",
    recursos: "",
    participaciones: "",
    mensajes: "",
  });

  useEffect(() => {
    if (session?.user) {
      setProfile({
        name: session.user.nombre || "", // Verifica si existe
        email: session.user.email || "", // Verifica si existe
        rol: session.user.rol || "", // Verifica si existe
        recursos: session.user.recursos || "", // Verifica si existe
        participaciones: session.user.participaciones || "", // Verifica si existe
        mensajes: session.user.mensajes || "", // Verifica si existe
      });
    }
  }, [session]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica para actualizar el perfil en el backend
    console.log("Perfil actualizado:", profile);
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
            <div>
              <Label htmlFor="recursos">Recursos</Label>
              <Input id="recursos" name="recursos" value={profile.recursos} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="participaciones">Participaciones</Label>
              <Input id="participaciones" name="participaciones" value={profile.participaciones} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="mensajes">Mensajes</Label>
              <Input id="mensajes" name="mensajes" value={profile.mensajes} onChange={handleChange} />
            </div>
          </div>
          <Button type="submit">Guardar cambios</Button>
        </form>
      </CardContent>
    </Card>
  );
}