import Link from "next/link";

const clientes = [
  { id: 1, nome: "Empresa A", cnpj: "12.345.678/0001-99" },
  { id: 2, nome: "Empresa B", cnpj: "98.765.432/0001-11" },
];

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
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <tr key={cliente.id} className="hover:bg-gray-50">
              <td className="p-3 border-b">{cliente.id}</td>
              <td className="p-3 border-b">{cliente.nome}</td>
              <td className="p-3 border-b">{cliente.cnpj}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
