"use client";

import { notFound } from "next/navigation";
import { useState, use, useEffect } from "react";
import { useRouter } from "next/navigation";
import { mutate } from "swr";
import { useClienteDetail } from "@/hooks/useClienteDetail";
import api from "@/lib/api";

export default function ClienteDetalhesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  const [nome, setNome] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [ativo, setAtivo] = useState(true);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    api.put(`clientes/${id}`, { nome, cnpj, endereco, telefone, ativo });
    mutate("/clientes"); // <- atualiza a lista de clientes
    router.push("/clientes?toast=success&msg=Editado com sucesso!");
  };

  const { cliente, isLoading, isError } = useClienteDetail(Number(id));

  //Use effect para preencher os campos quando o cliente for carregado
  useEffect(() => {
    if (cliente) {
      setNome(cliente.nome);
      setCnpj(cliente.cnpj);
      setEndereco(cliente.endereco);
      setTelefone(cliente.telefone);
      setAtivo(cliente.ativo);
    }
  }, [cliente]); //só roda quando cliente mudar

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao carregar</p>;
  if (!cliente) return notFound();

  return (
    <div className="p-6 w-full bg-white rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-3">
        <h1 className="text-2xl font-bold">Editar Cliente</h1>
      </div>

      {/* Definindo que o form tera 12 colunas*/}
      <form
        // onSubmit={handleSubmit}
        className="space-y-4 grid grid-cols-12 gap-4"
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
        <div className="col-span-12 md:col-span-5">
          <label className="block text-sm font-medium mb-1">Telefone</label>
          <input
            type="text"
            value={telefone}
            onChange={(e) => setTelefone(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="col-span-12 md:col-span-1 flex items-center mt-6 gap-2">
          <label className="block text-sm font-medium mb-1 m-0">Ativo</label>
          <input
            type="checkbox"
            checked={ativo}
            onChange={(e) => setAtivo(e.target.checked)}
            className="h-5 w-5 accent-blue-500"
          />
        </div>

        <div className="flex justify-end gap-2 col-span-12 mt-4">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition cursor-pointer"
            onClick={handleSubmit}
          >
            Salvar
          </button>

          <button
            type="button"
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition cursor-pointer"
            onClick={() => router.push("/clientes")}
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
