import useSWR from "swr";
import api from "@/lib/api";
import { Usuario } from "@/lib/types";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export function useUsuarioDetail(id: number) {
  const { data, error, mutate, isLoading } = useSWR<Usuario>(
    `/usuarios/${id}`,
    fetcher
  );

  return {
    usuario: data,
    isLoading,
    isError: error,
    mutate, // <- usado para atualizar a lista manualmente
  };
}
