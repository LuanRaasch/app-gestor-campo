"use client";

import { useEffect, useState } from "react";
import { useAtividades } from "@/hooks/useAtividade";
import ProtectedRoute from "@/components/ProtectedRoute";

const statusMap: Record<string, { label: string; classes: string }> = {
  concluido: {
    label: "Concluída",
    classes:
      "p-3 border-b bgStsConcluida text-white pt-0.5 pl-2 pr-2 pb-0.5 rounded",
  },
  em_andamento: {
    label: "Em Andamento",
    classes: "bgStsEmAndamento text-white pt-0.5 pl-2 pr-2 pb-0.5 rounded",
  },
  pendente: {
    label: "Pendente",
    classes: "bgStsPendente text-white pt-0.5 pl-2 pr-2 pb-0.5 rounded",
  },
};

export default function Atividades() {
  const hoje = new Date();
  const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1);
  const ultimoDia = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0);

  const [dataInicial, setDataInicial] = useState(
    primeiroDia.toISOString().split("T")[0]
  );
  const [dataFinal, setDataFinal] = useState(
    ultimoDia.toISOString().split("T")[0]
  );
  const [busca, setBusca] = useState("");

  const { atividades, isLoading, isError } = useAtividades(
    dataInicial,
    dataFinal
  );

  const atividadesFiltradas = atividades?.filter(
    (atividade) =>
      atividade.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      atividade.titulo.toLowerCase().includes(busca.toLowerCase())
  );

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao carregar</p>;

  return (
    <ProtectedRoute>
      <div className="p-6 w-full bg-white rounded-lg border border-gray-200 space-y-4">
        <div className="space-y-4 grid grid-cols-12 gap-4">
          <div className="col-span-12 md:col-span-6">
            <label className="block text-sm font-medium mb-1">Descrição</label>
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por descrição ou titulo..."
              className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="col-span-6 md:col-span-2">
            <label className="block text-sm font-medium mb-1">
              Data Inicial
            </label>
            <input
              type="date"
              value={dataInicial}
              onChange={(e) => setDataInicial(e.target.value)}
              className="border rounded-lg px-3 py-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="col-span-6 md:col-span-2">
            <label className="block text-sm font-medium mb-1">Data Final</label>
            <input
              type="date"
              value={dataFinal}
              onChange={(e) => setDataFinal(e.target.value)}
              className="border rounded-lg px-3 py-2 w-full max-w-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="col-span-12 md:col-span-2">
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer w-full mt-6 font-semibold"
            >
              Buscar
            </button>
          </div>
        </div>

        <div className="border border-gray-200 shadow-md rounded-lg">
          <table className="w-full overflow-hidden">
            <thead className="bg-gray-100">
              <tr>
                <th className="text-left p-3 border-b">ID</th>
                <th className="text-left p-3 border-b">Titulo</th>
                <th className="text-left p-3 border-b">Descrição</th>
                <th className="text-left p-3 border-b">Status</th>
                <th className="text-left p-3 border-b">Data</th>
              </tr>
            </thead>
            <tbody>
              {atividadesFiltradas?.map((atividade) => (
                <tr
                  key={atividade.id}
                  className="hover:bg-gray-50 cursor-pointer"
                >
                  <td className="p-3 border-b">{atividade.id}</td>
                  <td className="p-3 border-b">{atividade.titulo}</td>
                  <td className="p-3 border-b">{atividade.descricao}</td>
                  <td className="p-3 border-b">
                    <span className={statusMap[atividade.status].classes}>
                      {statusMap[atividade.status].label}
                    </span>
                  </td>
                  <td className="p-3 border-b">{atividade.data}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="p-3 gap-2 flex items-center justify-center bg-gray-100">
            <button className="font-semibold border cursor-pointer px-2 bg-gray-950 text-white hover:bg-gray-700 rounded-sm">
              {"<<"}
            </button>
            <button className="font-semibold border cursor-pointer px-2 bg-gray-950 text-white hover:bg-gray-700 rounded-sm">
              {"<"}
            </button>
            <span className="font-semibold">Página 1 de 10</span>
            <button className="font-semibold border cursor-pointer px-2 bg-gray-950 text-white hover:bg-gray-700 rounded-sm">
              {">"}
            </button>
            <button className="font-semibold border cursor-pointer px-2 bg-gray-950 text-white hover:bg-gray-700 rounded-sm">
              {">>"}
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
