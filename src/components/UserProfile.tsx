"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function UserProfile() {
  const [profile, setProfile] = useState({
    name: "Juan Pérez",
    email: "juan.perez@example.com",
    role: "Profesor",
    specialty: "Matemáticas",
    bio: "Profesor de matemáticas con 10 años de experiencia en educación secundaria. Apasionado por la innovación educativa y el uso de tecnología en el aula.",
    interests: ["Educación STEM", "Aprendizaje basado en proyectos", "Tecnología educativa"],
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value })
  }

  const handleInterestChange = (value: string) => {
    setProfile((prev) => ({
      ...prev,
      interests: [...prev.interests, value],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica para actualizar el perfil
    console.log("Perfil actualizado:", profile)
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
              <Label htmlFor="role">Rol</Label>
              <Input id="role" name="role" value={profile.role} onChange={handleChange} />
            </div>
            <div>
              <Label htmlFor="specialty">Especialidad</Label>
              <Input id="specialty" name="specialty" value={profile.specialty} onChange={handleChange} />
            </div>
          </div>
          <div>
            <Label htmlFor="bio">Biografía</Label>
            <Textarea id="bio" name="bio" value={profile.bio} onChange={handleChange} rows={4} />
          </div>
          <div>
            <Label htmlFor="interests">Intereses</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {profile.interests.map((interest, index) => (
                <span key={index} className="bg-orange-400 text-blue-100 text-xs font-medium px-2.5 py-0.5 rounded">
                  {interest}
                </span>
              ))}
            </div>
            <Select onValueChange={handleInterestChange}>
              <SelectTrigger className="w-full mt-2">
                <SelectValue placeholder="Agregar interés" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Educación inclusiva">Educación inclusiva</SelectItem>
                <SelectItem value="Gamificación">Gamificación</SelectItem>
                <SelectItem value="Inteligencia artificial en educación">
                  Inteligencia artificial en educación
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button type="submit">Guardar cambios</Button>
        </form>
      </CardContent>
    </Card>
  )
}

