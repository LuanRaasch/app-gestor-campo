"use client";

import { useResumoAtividadesTecnico } from "@/hooks/useResumoAtividadesTecnico";
import { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

export default function Dashboard() {
  const [filtroUsuario, setFiltroUsuario] = useState<string>("");
  const { atividades, isLoading, isError } = useResumoAtividadesTecnico();

  const dadosFiltrados = filtroUsuario
    ? atividades?.filter((a) => a.nome === filtroUsuario)
    : atividades;

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao carregar dados</p>;

  return (
    <div className="p-6 space-y-6">
      {/* Filtros */}
      <div className="flex gap-4 flex-wrap">
        <select
          className="border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filtroUsuario}
          onChange={(e) => setFiltroUsuario(e.target.value)}
        >
          <option value="">Todos os Usuários</option>
          {atividades?.map((atividade) => (
            <option key={atividade.id} value={atividade.nome}>
              {atividade.nome}
            </option>
          ))}
        </select>

        {/* depois podemos adicionar select de empresa e input de período */}
      </div>

      {/* Cards resumo */}
      <div className="grid gap-6 md:grid-cols-3">
        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-sm font-semibold text-gray-600">
            Tarefas Concluídas
          </h2>
          <p className="text-3xl font-bold mt-2">
            {dadosFiltrados?.reduce((acc, cur) => acc + cur.concluidas, 0)}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-sm font-semibold text-gray-600">Pendentes</h2>
          <p className="text-3xl font-bold mt-2">
            {dadosFiltrados?.reduce((acc, cur) => acc + cur.pendentes, 0)}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-sm font-semibold text-gray-600">Em Andamento</h2>
          <p className="text-3xl font-bold mt-2">
            {dadosFiltrados?.reduce((acc, cur) => acc + cur.em_andamento, 0)}
          </p>
        </div>
      </div>

      {/* Gráfico de colunas */}
      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-lg font-bold mb-4">Atividades por Usuário</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={dadosFiltrados}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="id" //Monta a coluna pelo id
              tickFormatter={(id) => {
                //Aqui vai verificar o nome do usuario pelo id
                const atividade = dadosFiltrados?.find((a) => a.id === id);
                return atividade ? atividade.nome : id;
              }}
            />
            <YAxis />
            <Tooltip
              labelFormatter={(id) => {
                //Aqui vai verificar o nome do usuario pelo id
                const atividade = dadosFiltrados?.find((a) => a.id === id);
                return atividade ? atividade.nome : id;
              }}
            />
            <Legend />
            <Bar dataKey="concluidas" fill="#22c55e" name="Concluídas" />
            <Bar dataKey="pendentes" fill="#facc15" name="Pendentes" />
            <Bar dataKey="em_andamento" fill="#3b82f6" name="Em Andamento" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
