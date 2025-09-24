import useSWR from "swr";
import api from "@/lib/api";
import { ResumoAtividadesTecnico } from "@/lib/types";

const fetcher = (url: string) => api.get(url).then((res) => res.data);
export function useResumoAtividadesTecnico() {
  const { data, error, mutate, isLoading } = useSWR<ResumoAtividadesTecnico[]>(
    "/atividades/dashboard/porTecnico",
    fetcher
  );

  return {
    atividades: data,
    isLoading,
    isError: error,
    mutate,
  };
}
