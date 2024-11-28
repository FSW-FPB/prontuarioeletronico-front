import { axiosAgendamento } from "@/config/axios.config";
import { IAgendamento } from "@/types/IAgendamento";
import IFila from "@/types/IFila";

const createAgendamento = async (
  data_consulta: string,
  horario_atendimento: string,
  horario_encerramento: string,
  id_paciente: number,
  id_medico: number,
  motivo: string
): Promise<IAgendamento> => {
  try {
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
    console.error("Erro ao criar Agendamento", error);
    throw new Error("Falha ao criar Agendamento");
  }
};

const getFila = async (): Promise<IFila[]> => {
  try {
    const response = await axiosAgendamento.get(`/fila`);
    return response.data;
  } catch (error) {
    console.error("Erro ao pegar fila", error);
    throw new Error("Falha ao pegar fila");
  }
};

const getAllAgendamentosByPacienteId = async (
  idPaciente: number,
  idStatus?: number
): Promise<IAgendamento[]> => {
  try {
    let url = `/consultas/paciente/${idPaciente}`;
    if (idStatus) {
      url += `?id_status=${idStatus}`;
    }
    const response = await axiosAgendamento.get(url);

    return response.data;
  } catch (error) {
    console.error("Erro ao pegar dados do agendamento", error);
    throw new Error("Falha ao pegar dados do agendamento");
  }
};

const getAllAgendamentosByMedicoId = async (
  idMedico: number
): Promise<IAgendamento[]> => {
  try {
    const response = await axiosAgendamento.get(
      `/consultas/medico/${idMedico}`
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao pegar dados do agendamento", error);
    throw new Error("Falha ao pegar dados do agendamento");
  }
};

const updateAgendamento = async (
  idAgendamento: number,
  horario_atendimento: string,
  horario_encerramento: string
): Promise<IAgendamento[]> => {
  try {
    const response = await axiosAgendamento.put(`/consultas/${idAgendamento}`, {
      horario_atendimento,
      horario_encerramento,
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao pegar dados do agendamento", error);
    throw new Error("Falha ao pegar dados do agendamento");
  }
};

export {
  createAgendamento,
  getAllAgendamentosByPacienteId,
  getFila,
  getAllAgendamentosByMedicoId,
  updateAgendamento,
};
