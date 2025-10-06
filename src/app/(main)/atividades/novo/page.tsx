import { Map, UserRoundSearch } from "lucide-react";

export default function NovaAtividade() {
  return (
    <div className="p-6 w-full bg-white rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-6 border-b border-gray-200 pb-3">
        <h1 className="text-2xl font-bold">Nova Atividade</h1>
      </div>

      <form className="grid grid-cols-12 gap-4">
        <div className="col-span-12">
          <h1 className="text-sm font-bold">1 - Informações da Tarefa</h1>
        </div>

        <div className="col-span-12">
          <label className="block text-sm font-medium mb-1">Título</label>
          <input
            type="text"
            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="col-span-12">
          <label className="block text-sm font-medium mb-1">Descrição</label>
          <textarea className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="col-span-12 md:col-span-6">
          <label className="block text-sm font-medium mb-1">Data Início</label>
          <input
            type="date"
            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="col-span-12 md:col-span-6">
          <label className="block text-sm font-medium mb-1">Prazo</label>
          <input
            type="date"
            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="col-span-12 border-t border-dashed border-gray-300">
          <h1 className="text-sm font-bold mt-1">2 - Localização</h1>
        </div>

        <div className="col-span-12">
          <label className="block text-sm font-medium mb-1">Endereço</label>
          <textarea className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div className="col-span-12 md:col-span-6">
          <label className="block text-sm font-medium mb-1">Latitude</label>
          <input
            type="text"
            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="col-span-12 md:col-span-6">
          <label className="block text-sm font-medium mb-1">Longitude</label>
          <input
            type="text"
            className="border rounded-lg px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="col-span-12 flex justify-end">
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer font-semibold"
          >
            <span className="flex justify-center gap-1">
              <Map /> Ver no Mapa
            </span>
          </button>
        </div>

        <div className="col-span-12 border-t border-dashed border-gray-300">
          <h1 className="text-sm font-bold mt-1">3 - Designação do Técnico</h1>
        </div>

        <div className="col-span-12 md:col-span-6">
          <label className="block text-sm font-medium mb-1">Técnico</label>
          <select className="border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full">
            <option value="">Todos os Usuários</option>
          </select>
        </div>

        <div className="col-span-12 md:col-span-6">
          <label className="block text-sm font-medium mb-1">Empresa</label>
          <select className="border rounded-lg px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full">
            <option value="">Todos os Usuários</option>
          </select>
        </div>

        <div className="col-span-12 flex justify-end">
          <button
            type="button"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition cursor-pointer font-semibold"
          >
            <span className="flex justify-center gap-1">
              <UserRoundSearch /> Atribuir Técnico
            </span>
          </button>
        </div>

        <div className="flex justify-end gap-2 col-span-12 border-t border-dashed border-gray-300">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition cursor-pointer font-semibold mt-4"
          >
            Criar
          </button>

          <button
            type="button"
            className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition cursor-pointer font-semibold mt-4"
          >
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
}
