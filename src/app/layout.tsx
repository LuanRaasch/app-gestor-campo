import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/layout/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gestor de Campo",
  description: "Gestou de campo para gerenciar atividades e usuários",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`flex min-h-screen bg-gray-100 ${geistSans.variable} ${geistMono.variable}`}
      >
        {/* Sidebar fixa no desktop */}
        <div className="hidden md:block w-64">
          <Sidebar />
        </div>

        {/* Sidebar responsiva (toggle só no mobile) */}
        <div className="md:hidden">
          <Sidebar />
        </div>

        {/* Conteúdo principal */}
        <main className="flex-1 p-6">{children}</main>
      </body>
    </html>
  );
}
