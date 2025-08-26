"use client";

import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useClientes } from "@/hooks/useClientes";

export default function Clientes() {
  const { clientes, isLoading, isError } = useClientes();
  const router = useRouter();

  const handleEdit = (id: number) => {
    router.push(`/clientes/${id}`);
  };

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao carregar</p>;

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <Link
          href="/clientes/novo"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Novo
        </Link>
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
          {clientes?.map((cliente) => (
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
                    // onClick={() => handleDelete(id)}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
