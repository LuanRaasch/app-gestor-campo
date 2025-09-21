"use client";

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

// Dados fictícios
const atividades = [
  { tecnico: "João", concluidas: 10, pendentes: 2, andamento: 3 },
  { tecnico: "Maria", concluidas: 8, pendentes: 4, andamento: 5 },
  { tecnico: "Carlos", concluidas: 12, pendentes: 1, andamento: 2 },
];

export default function DashboardPage() {
  const [filtroTecnico, setFiltroTecnico] = useState<string>("");

  const dadosFiltrados = filtroTecnico
    ? atividades.filter((a) => a.tecnico === filtroTecnico)
    : atividades;

  return (
    <div className="p-6 space-y-6">
      {/* Filtros */}
      <div className="flex gap-4 flex-wrap">
        <select
          className="border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={filtroTecnico}
          onChange={(e) => setFiltroTecnico(e.target.value)}
        >
          <option value="">Todos os técnicos</option>
          <option value="João">João</option>
          <option value="Maria">Maria</option>
          <option value="Carlos">Carlos</option>
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
            {dadosFiltrados.reduce((acc, cur) => acc + cur.concluidas, 0)}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-sm font-semibold text-gray-600">Pendentes</h2>
          <p className="text-3xl font-bold mt-2">
            {dadosFiltrados.reduce((acc, cur) => acc + cur.pendentes, 0)}
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow p-4">
          <h2 className="text-sm font-semibold text-gray-600">Em Andamento</h2>
          <p className="text-3xl font-bold mt-2">
            {dadosFiltrados.reduce((acc, cur) => acc + cur.andamento, 0)}
          </p>
        </div>
      </div>

      {/* Gráfico de colunas */}
      <div className="bg-white rounded-2xl shadow p-4">
        <h2 className="text-lg font-bold mb-4">Atividades por Técnico</h2>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={dadosFiltrados}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="tecnico" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="concluidas" fill="#22c55e" name="Concluídas" />
            <Bar dataKey="pendentes" fill="#facc15" name="Pendentes" />
            <Bar dataKey="andamento" fill="#3b82f6" name="Em Andamento" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
