"use client";

import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { Header } from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = { // Movemos metadata fuera del componente
  title: "EduTwinIA",
  description: "Plataforma de colaboración educativa",
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <SessionProvider>
          <Header />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}