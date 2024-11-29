import { axiosPrescricao } from "@/config/axios.config";
import IMedicamento from "@/types/IMedicamento";

const fetchMedicamentoByName = async (
  numberPage: number,
  nome: string,
  pageSize?: number
): Promise<{
  current_page: number;
  medicamentos: IMedicamento[];
  total_medicamentos: number;
  total_pages: number;
}> => {
  try {
    const response = await axiosPrescricao.get(`/medicamentos/busca`, {
      params: {
        search: nome,
        page: numberPage,
        limit: pageSize || 100,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao pegar medicamentos", error);
    throw new Error("Falha ao pegar medicamentos");
  }
};

export { fetchMedicamentoByName };
