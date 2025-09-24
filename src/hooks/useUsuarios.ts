import useSWR from "swr";
import api from "@/lib/api";
import { Usuario } from "@/lib/types";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export function useUsuarios() {
  const { data, error, mutate, isLoading } = useSWR<Usuario[]>(
    "/usuarios",
    fetcher
  );

  return {
    usuarios: data,
    isLoading,
    isError: error,
    mutate,
  };
}
