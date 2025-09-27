"use client";

import Link from "next/link";
import { Edit, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { mutate } from "swr";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSearchParams } from "next/navigation";
import { useUsuarios } from "@/hooks/useUsuarios";
import api from "@/lib/api";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Usuarios() {
  const searchParams = useSearchParams();
  const [busca, setBusca] = useState("");
  const { usuarios, isLoading, isError } = useUsuarios();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("toast") === "success") {
      toast.success(`${searchParams.get("msg")}`);
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, [searchParams]);

  const handleDelete = async (id: number) => {
    await api.delete(`usuarios/${id}`);
    mutate("/usuarios");
    toast.success("Deletado com sucesso!");
  };

  const handleEdit = (id: number) => {
    router.push(`usuarios/${id}`);
  };

  const usuariosFiltrados = usuarios?.filter((usuario) =>
    usuario.nome.toLowerCase().includes(busca.toLowerCase())
  );

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao carregar</p>;

  return (
    // <ProtectedRoute>
    <div className="bg-amber bg-white w-full p-6 border border-gray-200 rounded-lg">
      <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-3">
        <h1 className="text-2xl font-bold">Usuários</h1>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-6">
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="border rounded-lg px-3 py-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Link
            href="usuarios/novo"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Novo
          </Link>
        </div>
      </div>

      <table className="w-full border border-gray-200 shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-3 border-b">ID</th>
            <th className="text-left p-3 border-b">Nome</th>
            <th className="text-left p-3 border-b">Tipo</th>
            <th className="text-left p-3 border-b">Ativo</th>
            <th className="text-center p-3 border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          {usuariosFiltrados?.map((usuario) => (
            <tr key={usuario.id} className="hover:bg-gray-50 cursor-pointer">
              <td className="p-3 border-b">{usuario.id}</td>
              <td className="p-3 border-b">{usuario.nome}</td>
              <td className="p-3 border-b">
                {usuario.tipo === "gestor" ? (
                  <span className="text-amber-400 font-bold">Gestor</span>
                ) : (
                  <span className="text-black font-bold">Técnico</span>
                )}
              </td>
              <td className="p-3 border-b">
                {usuario.ativo ? (
                  <span className="bg-green-600 text-white pt-0.5 pl-2 pr-2 pb-0.5 rounded">
                    {"Sim"}
                  </span>
                ) : (
                  <span className="bg-red-600 text-white pt-0.5 pl-2 pr-2 pb-0.5 rounded">
                    {"Não"}
                  </span>
                )}
              </td>
              <td className="p-3 border-b text-center">
                <div className="inline-flex gap-2 justify-center">
                  <button
                    className="text-blue-500 hover:text-blue-700 cursor-pointer"
                    onClick={() => handleEdit(usuario.id)}
                  >
                    <Edit size={20} />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-700 cursor-pointer"
                    onClick={() => handleDelete(usuario.id)}
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex content-end justify-end mt-2 text-sm text-gray-600">
        {usuariosFiltrados?.length} registros.
      </div>
      <ToastContainer />
    </div>
    /* </ProtectedRoute> */
  );
}
