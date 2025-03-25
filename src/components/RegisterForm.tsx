"use client"

import type React from "react"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { UserPlus, User, Mail, Lock, School, Loader2 } from "lucide-react"
import { signIn } from "next-auth/react";

interface Colegio {
  id: number;
  nombre: string;
}

export default function Register() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [colegio, setColegio] = useState<string>("");
  const [contrasena_hasheada, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [rol, setRol] = useState<string>("");
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string[]>([]);
  const [colegios, setColegios] = useState<Colegio[]>([]);

  useEffect(() => {
    const fetchColegios = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/schools`);
        if (!res.ok) {
          throw new Error("Failed to fetch colegios");
        }
        const data: Colegio[] = await res.json();
        setColegios(data);
      } catch (err) {
        console.error("Error fetching colegios:", err);
        setError(["Error al cargar los colegios."]);
      }
    };

    fetchColegios();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError([]);

    if (contrasena_hasheada !== confirmPassword) {
      setError(["Las contraseñas no coinciden."]);
      setIsLoading(false);
      return;
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre: name,
          email: email,
          colegio: colegio,
          contrasena_hasheada: contrasena_hasheada,
          rol: rol,
        }),
      }
    );

    const responseAPI = await res.json();

    if (!res.ok) {
      if (typeof responseAPI.message === 'string') {
        setError([responseAPI.message]);
      } else if (Array.isArray(responseAPI.message)) {
        setError(responseAPI.message);
      } else {
        setError(["an unknown error occurred"]);
      }
      setIsLoading(false);
      return;
    }

    const responseNextAuth = await signIn("credentials", {
      email,
      contrasena_hasheada,
      redirect: false,
    });

    if (responseNextAuth?.error) {
      if (typeof responseNextAuth?.error === 'string') {
        setError(responseNextAuth.error.split(","));
      } else {
        setError(["an error occurred during sign in"]);
      }
      setIsLoading(false);
      return;
    }

    router.push("/login");
    setIsLoading(false);
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
                value={name}
                onChange={(event) => setName(event.target.value)}
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
                value={email}
                onChange={(event) => setEmail(event.target.value)}
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
              <Select onValueChange={setColegio} value={colegio}>
                <SelectTrigger className="w-full pl-10">
                  <SelectValue placeholder="Selecciona un colegio" />
                </SelectTrigger>
                <SelectContent>
                  {colegios.map((colegio) => (
                    <SelectItem key={colegio.id} value={colegio.nombre}>
                      {colegio.nombre}
                    </SelectItem>
                  ))}
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
                value={contrasena_hasheada}
                onChange={(event) => setPassword(event.target.value)}
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
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
                className="pl-10 w-full"
                placeholder="••••••••"
              />
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="rol" className="text-sm font-medium text-gray-700">
              Rol
            </Label>
            <Input
              id="rol"
              name="rol"
              type="text"
              value={rol}
              onChange={(event) => setRol(event.target.value)}
              required
              className="w-full"
              placeholder="rol"
            />
          </div>
          {error.length > 0 && (
            <Alert variant="destructive">
              <AlertDescription>{error.join(", ")}</AlertDescription>
            </Alert>
          )}
          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="mr-2 h-4 w--4 animate-spin" />
                Registrando...
              </div>
            ) : (
              "Registrarse"
            )}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="bg-gray-50 p-6 flex justify-center">
        <p className="text-sm text-gray-600">
          ¿Ya tienes una cuenta? <Link href="/login" className="text-orange-600 hover:text-orange-800 font-medium">Inicia sesión</Link>
        </p>
      </CardFooter>
    </Card>
  );
}