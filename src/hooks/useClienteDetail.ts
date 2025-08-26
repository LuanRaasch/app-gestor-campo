import useSWR from "swr";
import api from "@/lib/api";
import { Cliente } from "@/lib/types";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export function useClienteDetail(id: number) {
  const { data, error, mutate, isLoading } = useSWR<Cliente>(
    `/clientes/${id}`,
    fetcher
  );

  return {
    cliente: data,
    isLoading,
    isError: error,
    mutate, // <- usado para atualizar a lista manualmente
  };
}
