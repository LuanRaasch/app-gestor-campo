"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function NovoClientePage() {
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Aqui no futuro você envia para sua API
    console.log("Cliente cadastrado:", { nome, cnpj });

    router.push("/clientes");
  };

  return (
    <div className="p-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Novo Cliente</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">CNPJ</label>
          <input
            type="text"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Salvar
        </button>
      </form>
    </div>
  );
}
