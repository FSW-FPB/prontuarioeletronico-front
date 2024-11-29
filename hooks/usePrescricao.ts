import { axiosPrescricao } from "@/config/axios.config";
import IPrescricao from "@/types/IPrescricao";

const createPrescricao = async (
  paciente_id: number,
  medico_id: number,
  doenca: string,
  CID: string,
  observacao: string,
  medicamentos: { nome: string; dosagem: string }[]
): Promise<IPrescricao> => {
  try {
    const response = await axiosPrescricao.post(`/prescricoes`, {
      paciente_id,
      medico_id,
      doenca,
      CID,
      observacao: observacao ? observacao : "Nada observado",
      medicamentos,
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao criar Prescricao", error);
    throw new Error("Falha ao criar Prescricao");
  }
};

const fetchPrescricaoById = async (_id: string): Promise<IPrescricao> => {
  try {
    const response = await axiosPrescricao.get(`/prescricoes/${_id}`);

    return response.data;
  } catch (error) {
    console.error("Erro ao pegar Prescricao", error);
    throw new Error("Falha ao pegar Prescricao");
  }
};

export { createPrescricao, fetchPrescricaoById };
