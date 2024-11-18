import { axiosCadastro } from "@/config/axios.config";
import IPaciente from "@/types/IPaciente";

// Função para buscar paciente por ID
const fetchPacienteById = async (idPaciente: number): Promise<IPaciente> => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    const response = await axiosCadastro.get(`/pacientes/${idPaciente}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao pegar dados do Paciente", error);
    throw new Error("Falha ao pegar dados do Paciente");
  }
};

export { fetchPacienteById };
