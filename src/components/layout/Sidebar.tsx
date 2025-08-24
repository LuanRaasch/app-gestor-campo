"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, Settings, Users, Menu, X, Activity } from "lucide-react";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Botão de menu no topo (visível só em telas menores) */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-900 text-white p-2 rounded-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay (escurece fundo quando sidebar aberta no mobile) */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
        h-full w-64 bg-gray-900 text-white shadow-lg
        fixed md:static top-0 left-0
        transform transition-transform duration-300 z-50
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0
      `}
      >
        <div className="p-6 text-2xl font-bold border-b border-gray-700">
          Gestor de Campo
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <Link
            href="/"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition"
          >
            <Home size={20} />
            <span>Dashboard</span>
          </Link>

          <Link
            href="/usuarios"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition"
          >
            <Users size={20} />
            <span>Usuários</span>
          </Link>

          <Link
            href="/clientes"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition"
          >
            <Users size={20} />
            <span>Clientes</span>
          </Link>

          <Link
            href="/atividades"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition"
          >
            <Activity size={20} />
            <span>Atividades</span>
          </Link>

          <Link
            href="/configuracoes"
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-700 transition"
          >
            <Settings size={20} />
            <span>Configurações</span>
          </Link>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button className="w-full text-left p-2 rounded-lg hover:bg-gray-700 transition">
            Sair
          </button>
        </div>
      </aside>
    </>
  );
}
