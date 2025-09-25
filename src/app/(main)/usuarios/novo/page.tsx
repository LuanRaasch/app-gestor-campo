"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { mutate } from "swr";
import api from "@/lib/api";

export default function NovoUsuario() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmaSenha, setConfirmaSenha] = useState("");
  const [tipo, setTipo] = useState<"gestor" | "tecnico">("tecnico");

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    api.post("/auth/register", { nome, email, confirmaSenha, tipo });
    mutate("/usuarios");
    router.push("/usuarios?toast=success&msg=Cadastrado com sucesso!");
  };

  return (
    <div className="p-6 w-full bg-white rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-3">
        <h1 className="text-2xl font-bold">Novo Usuário</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="bg-white space-y-4 grid grid-cols-12 gap-4"
      >
        <div className="col-span-12 md:col-span-8">
          <label className="block text-sm font-medium mb-1">Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="col-span-12 md:col-span-4">
          <label className="block text-sm font-medium mb-1">Tipo</label>
          <select className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
            <option value="gestor">Gestor</option>
            <option value="tecnico">Técnico</option>
          </select>
        </div>

        <div className="col-span-12 md:col-span-12">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="col-span-12 md:col-span-6">
          <label className="block text-sm font-medium mb-1">Senha</label>
          <input
            type="password"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="col-span-12 md:col-span-6">
          <label className="block text-sm font-medium mb-1">
            Confirmar Senha
          </label>
          <input
            type="password"
            value={confirmaSenha}
            onChange={(e) => setConfirmaSenha(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex justify-end gap-2 col-span-12 mt-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition cursor-pointer"
          >
            Salvar
          </button>

          <button
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition cursor-pointer"
            onClick={() => router.push("/usuarios")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
