import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout"; // Importa el componente de cliente

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
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
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}