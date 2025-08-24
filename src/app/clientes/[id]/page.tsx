import { notFound } from "next/navigation";

const clientes = [
  { id: 1, nome: "Empresa A", cnpj: "12.345.678/0001-99" },
  { id: 2, nome: "Empresa B", cnpj: "98.765.432/0001-11" },
];

export default function ClienteDetalhesPage({
  params,
}: {
  params: { id: string };
}) {
  const cliente = clientes.find((c) => c.id === Number(params.id));

  if (!cliente) {
    return notFound(); // mostra 404 se não existir
  }

  return (
    <div className="p-6 max-w-lg">
      <h1 className="text-2xl font-bold mb-6">Detalhes do Cliente</h1>

      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <div>
          <p className="text-sm text-gray-500">ID</p>
          <p className="text-lg font-medium">{cliente.id}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Nome</p>
          <p className="text-lg font-medium">{cliente.nome}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">CNPJ</p>
          <p className="text-lg font-medium">{cliente.cnpj}</p>
        </div>

        <div className="pt-4 flex gap-3">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
            Editar
          </button>
          <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition">
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
}
