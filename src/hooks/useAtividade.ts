import useSWR from "swr";
import api from "@/lib/api";
import { Atividade } from "@/lib/types";

const fetcher = (url: string) => api.get(url).then((res) => res.data);

export function useAtividades(
  dataInicial?: string,
  dataFinal?: string,
  status?: string
) {
  const { data, error, mutate, isLoading } = useSWR<Atividade[]>(
    `/atividades?data_inicio=${dataInicial || ""}&data_fim=${
      dataFinal || ""
    }&status=${status || ""}`,
    fetcher
  );

  return {
    atividades: data,
    isLoading,
    isError: error,
    mutate,
  };
}
