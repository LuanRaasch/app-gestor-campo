"use client";

import Sidebar from "@/components/layout/Sidebar";
import Navbar from "@/components/layout/Navbar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Navbar fixa no topo */}
      <Navbar />
      <div className="flex flex-1">
        {/* Sidebar fixa no desktop */}
        <aside className="hidden md:block w-64">
          <Sidebar />
        </aside>

        {/* Sidebar responsiva (exibida no mobile com toggle) */}
        <aside className="md:hidden">
          <Sidebar />
        </aside>

        {/* Conteúdo principal */}
        <main className="flex-1 p-6 mt-16">{children}</main>
      </div>
    </div>
  );
}
