"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { mutate } from "swr";

export default function NovoClientePage() {
  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    api.post("/clientes", { nome, cnpj, endereco, telefone });
    mutate("/clientes"); // <- atualiza a lista de clientes
    router.push("/clientes");
  };

  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-bold mb-6">Novo Cliente</h1>

      {/* Definindo que o form tera 12 colunas*/}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 space-y-4 grid grid-cols-12 gap-4"
      >
        {/*O nome ocupa 8 colunas */}
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

        {/*O cnpj ocupa 4 colunas */}
        <div className="col-span-12 md:col-span-4">
          <label className="block text-sm font-medium mb-1">CNPJ</label>
          <input
            type="text"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/*O endereco ocupa 6 colunas */}
        <div className="col-span-12 md:col-span-6">
          <label className="block text-sm font-medium mb-1">Endereço</label>
          <input
            type="text"
            value={endereco}
            onChange={(e) => setEndereco(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        {/*O telefone ocupa 6 colunas */}
        <div className="col-span-12 md:col-span-6">
          <label className="block text-sm font-medium mb-1">Telefone</label>
          <input
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="flex justify-end gap-2 col-span-12 mt-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Salvar
          </button>

          <button
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            onClick={() => router.push("/clientes")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
