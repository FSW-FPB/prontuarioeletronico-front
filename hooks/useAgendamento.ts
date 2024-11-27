import { axiosAgendamento } from "@/config/axios.config";
import { IAgendamento } from "@/types/IAgendamento";

const createAgendamento = async (
  data_consulta: string,
  horario_atendimento: string,
  horario_encerramento: string,
  id_paciente: number,
  id_medico: number,
  motivo: string
): Promise<IAgendamento> => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    const response = await axiosAgendamento.post(`/consultas`, {
      data_consulta,
      horario_atendimento,
      horario_encerramento,
      motivo,
      id_paciente,
      id_medico,
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao pegar dados do Medico", error);
    throw new Error("Falha ao pegar dados do Medico");
  }
};

export { createAgendamento };
