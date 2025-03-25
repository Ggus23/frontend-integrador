// next-auth.d.ts
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      nombre?: string;
      rol?: string;
      recursos?: string;
      participaciones?: string;
      mensajes?: string;
    } & DefaultSession["user"];
  }

  interface User {
    nombre?: string;
    rol?: string;
    recursos?: string;
    participaciones?: string;
    mensajes?: string;
  }
}