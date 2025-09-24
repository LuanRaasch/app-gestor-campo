"use client";

import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";

export default function Navbar() {
  const { user } = useAuth();

  return (
    <nav
      className={`fixed top-0 left-0 md:left-64 right-0 h-16 bg-yellow-500 flex items-center justify-end px-6 shadow-md z-40`}
    >
      {/* Dados do usuário */}
      <div className="flex items-center gap-3">
        <span>{user?.nome}</span>
        <Image
          src="/avatar.png"
          alt="Imagem de Login"
          width={50}
          height={50}
          priority
        />
      </div>
    </nav>
  );
}
