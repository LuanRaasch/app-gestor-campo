"use client";

import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { mutate } from "swr";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";
import { useClientes } from "@/hooks/useClientes";
import api from "@/lib/api";

export default function Clientes() {
  const searchParams = useSearchParams();
  const { clientes, isLoading, isError } = useClientes();
  const router = useRouter();
  const [busca, setBusca] = useState("");

  useEffect(() => {
    if (searchParams.get("toast") === "success") {
      toast.success(`${searchParams.get("msg")}`);
      // Remove todos os parâmetros da URL
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [searchParams]);

  const handleDelete = async (id: number) => {
    await api.delete(`/clientes/${id}`);
    mutate("/clientes"); // <- atualiza a lista de clientes
    toast.success("Deletado com sucesso!");
  };

  const handleEdit = (id: number) => {
    router.push(`/clientes/${id}`);
  };

  // Filtra os clientes pelo nome ou CNPJ
  const clientesFiltrados = clientes?.filter(
    (cliente) =>
      cliente.nome.toLowerCase().includes(busca.toLowerCase()) ||
      cliente.cnpj.toLowerCase().includes(busca.toLowerCase())
  );

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao carregar</p>;

  return (
    <div className="p-6 bg-white rounded-lg border border-gray-200 w-full">
      {/*preciso implementar uma busca pelos itens na tabela */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Clientes</h1>
      </div>

      {/* Campo de busca */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-6">
          <input
            type="text"
            placeholder="Buscar por nome ou CNPJ..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Link
            href="/clientes/novo"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Novo
          </Link>
        </div>
      </div>

      <table className=" w-full border border-gray-200 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-3 border-b">ID</th>
            <th className="text-left p-3 border-b">Nome</th>
            <th className="text-left p-3 border-b">CNPJ</th>
            <th className="text-left p-3 border-b">Ativo</th>
            <th className="text-center p-3 border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          {clientesFiltrados?.map((cliente) => (
            <tr key={cliente.id} className="hover:bg-gray-50">
              <td className="p-3 border-b">{cliente.id}</td>
              <td className="p-3 border-b">{cliente.nome}</td>
              <td className="p-3 border-b">{cliente.cnpj}</td>
              <td className="p-3 border-b">{cliente.ativo ? "Sim" : "Não"}</td>
              <td className="p-3 border-b text-center">
                <div className="inline-flex gap-2 justify-center">
                  <button
                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                    onClick={() => handleEdit(cliente.id)}
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={() => handleDelete(cliente.id)}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
}
