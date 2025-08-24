import Link from "next/link";
import api from "@/lib/api";
import { Cliente } from "@/lib/types";

const { data: clientes } = await api.get<Cliente[]>("/clientes");

export default function Clientes() {
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
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id} className="hover:bg-gray-50">
              <td className="p-3 border-b">{cliente.id}</td>
              <td className="p-3 border-b">
                <Link
                  href={`/clientes/${cliente.id}`}
                  className="text-blue-600 hover:underline"
                >
                  {cliente.nome}
                </Link>
              </td>
              <td className="p-3 border-b">{cliente.cnpj}</td>
              <td className="p-3 border-b">{cliente.ativo ? "Sim" : "Não"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
