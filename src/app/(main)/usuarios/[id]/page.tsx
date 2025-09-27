"use client";

import { use, useEffect, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { mutate } from "swr";
import api from "@/lib/api";
import { useUsuarioDetail } from "@/hooks/useUsuarioDetail";

export default function EditarUsuario({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const { id } = use(params);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [tipo, setTipo] = useState<"gestor" | "tecnico">("tecnico");
  const [ativo, setAtivo] = useState(true);

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    api.put(`usuarios/${id}`, { nome, email, tipo, ativo });
    mutate("/usuarios");
    router.push("/usuarios?toast=success&msg=Editado com sucesso!");
  };

  const { usuario, isLoading, isError } = useUsuarioDetail(id);

  //Use effect para preencher os campos quando o cliente for carregado
  useEffect(() => {
    if (usuario) {
      setNome(usuario.nome);
      setEmail(usuario.email);
      setTipo(usuario.tipo);
      setAtivo(usuario.ativo);
    }
  }, [usuario]); //só roda quando cliente mudar

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao carregar</p>;
  if (!usuario) return notFound();

  return (
    <div className="p-6 w-full bg-white rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-3">
        <h1 className="text-2xl font-bold">Editar Usuário</h1>
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
          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value as "gestor" | "tecnico")}
            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="gestor">Gestor</option>
            <option value="tecnico">Técnico</option>
          </select>
        </div>

        <div className="col-span-12 md:col-span-8">
          <label className="block text-sm font-medium mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="col-span-12 md:col-span-4 flex items-center mt-6 gap-2">
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
          >
            Salvar
          </button>

          <button
            type="button"
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
