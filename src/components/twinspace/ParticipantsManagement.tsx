"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Search, UserPlus, Mail } from "lucide-react"

// Static data for participants
const participants = [
  {
    id: 1,
    name: "Laura Sánchez",
    email: "laura.sanchez@escuela.edu",
    role: "Coordinador",
    avatar: "/avatars/laura.jpg",
    initials: "LS",
    school: "Colegio San José",
    country: "España",
  },
  {
    id: 2,
    name: "Carlos Rodríguez",
    email: "carlos.rodriguez@escuela.edu",
    role: "Profesor",
    avatar: "/avatars/carlos.jpg",
    initials: "CR",
    school: "Escuela Primaria Norte",
    country: "México",
  },
  {
    id: 3,
    name: "Ana Martínez",
    email: "ana.martinez@escuela.edu",
    role: "Profesor",
    avatar: "/avatars/ana.jpg",
    initials: "AM",
    school: "Liceo Internacional",
    country: "Colombia",
  },
  {
    id: 4,
    name: "Miguel Torres",
    email: "miguel.torres@escuela.edu",
    role: "Estudiante",
    avatar: "/avatars/miguel.jpg",
    initials: "MT",
    school: "Colegio San José",
    country: "España",
  },
  {
    id: 5,
    name: "Sofía López",
    email: "sofia.lopez@escuela.edu",
    role: "Estudiante",
    avatar: "/avatars/sofia.jpg",
    initials: "SL",
    school: "Escuela Primaria Norte",
    country: "México",
  },
  {
    id: 6,
    name: "Juan Pérez",
    email: "juan.perez@escuela.edu",
    role: "Invitado",
    avatar: "/avatars/juan.jpg",
    initials: "JP",
    school: "Universidad Pedagógica",
    country: "Argentina",
  },
]

export function ParticipantsManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [showInviteForm, setShowInviteForm] = useState(false)
  const [inviteEmail, setInviteEmail] = useState("")
  const [inviteRole, setInviteRole] = useState("Estudiante")

  const filteredParticipants = participants.filter(
    (participant) =>
      participant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.school.toLowerCase().includes(searchTerm.toLowerCase()) ||
      participant.country.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const getRoleBadgeColor = (role: string) => {
    const colors: Record<string, string> = {
      Coordinador: "bg-purple-100 text-purple-800",
      Profesor: "bg-blue-100 text-blue-800",
      Estudiante: "bg-green-100 text-green-800",
      Invitado: "bg-orange-100 text-orange-800",
    }
    return colors[role] || "bg-gray-100 text-gray-800"
  }

  const handleInvite = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would send an invitation
    console.log("Invitación enviada a:", inviteEmail, "con rol:", inviteRole)
    setInviteEmail("")
    setShowInviteForm(false)
  }

  const handleRoleChange = (participantId: number, newRole: string) => {
    // In a real app, this would update the user's role
    console.log("Cambio de rol para usuario ID:", participantId, "Nuevo rol:", newRole)
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="bg-orange-50 flex flex-row items-center justify-between">
          <CardTitle className="text-xl font-bold text-orange-950">Participantes del Proyecto</CardTitle>
          <Button
            onClick={() => setShowInviteForm(!showInviteForm)}
            className="bg-orange-500 hover:bg-orange-600 text-white"
          >
            <UserPlus className="mr-2 h-4 w-4" /> Invitar Participante
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          {showInviteForm && (
            <div className="mb-6 p-4 bg-orange-50 rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Invitar Nuevo Participante</h3>
              <form onSubmit={handleInvite} className="space-y-4">
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="email">Correo Electrónico</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <Input
                      id="email"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      className="pl-10"
                      value={inviteEmail}
                      onChange={(e) => setInviteEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="flex flex-col space-y-2">
                  <Label htmlFor="role">Rol</Label>
                  <Select value={inviteRole} onValueChange={setInviteRole}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccionar rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Profesor">Profesor</SelectItem>
                      <SelectItem value="Estudiante">Estudiante</SelectItem>
                      <SelectItem value="Invitado">Invitado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button type="button" variant="outline" onClick={() => setShowInviteForm(false)}>
                    Cancelar
                  </Button>
                  <Button type="submit" className="bg-orange-500 hover:bg-orange-600 text-white">
                    Enviar Invitación
                  </Button>
                </div>
              </form>
            </div>
          )}

          <div className="mb-4 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              placeholder="Buscar participantes..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Participante</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Escuela</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">País</th>
                  <th className="text-left py-3 px-4 font-semibold text-sm text-gray-600">Rol</th>
                  <th className="text-right py-3 px-4 font-semibold text-sm text-gray-600">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {filteredParticipants.map((participant) => (
                  <tr key={participant.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={participant.avatar || "/placeholder.svg"} alt={participant.name} />
                          <AvatarFallback>{participant.initials}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{participant.name}</p>
                          <p className="text-xs text-gray-500">{participant.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-sm">{participant.school}</td>
                    <td className="py-3 px-4 text-sm">{participant.country}</td>
                    <td className="py-3 px-4">
                      <Badge className={getRoleBadgeColor(participant.role)}>{participant.role}</Badge>
                    </td>
                    <td className="py-3 px-4 text-right">
                      {participant.role !== "Coordinador" && (
                        <Select
                          defaultValue={participant.role}
                          onValueChange={(value) => handleRoleChange(participant.id, value)}
                        >
                          <SelectTrigger className="w-[130px] h-8 text-xs">
                            <SelectValue placeholder="Cambiar rol" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Profesor">Profesor</SelectItem>
                            <SelectItem value="Estudiante">Estudiante</SelectItem>
                            <SelectItem value="Invitado">Invitado</SelectItem>
                          </SelectContent>
                        </Select>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredParticipants.length === 0 && (
            <div className="text-center py-8">
              <p className="text-gray-500">No se encontraron participantes con esos criterios de búsqueda.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}