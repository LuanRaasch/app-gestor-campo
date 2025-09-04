import Sidebar from "@/components/layout/Sidebar";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-screen">
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
    </div>
  );
}
