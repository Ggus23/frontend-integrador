// next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: number; // Cambiado a id
      nombre?: string;
      role?: string;
      recursos?: string;
      participaciones?: string;
      mensajes?: string;
    } & DefaultSession["user"];
  }

  interface User {
    id?:number;
    nombre?: string;
    rol?: string;
    recursos?: string;
    participaciones?: string;
    mensajes?: string;
  }
}