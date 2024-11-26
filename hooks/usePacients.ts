import { axiosCadastro } from "@/config/axios.config";
import IPaciente from "@/types/IPaciente";
import { IPageable } from "@/types/IPageable";

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

const fetchPacientes = async (numberPage: number): Promise<IPageable> => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    const response = await axiosCadastro.get(`/pacientes`, {
      params: {
        page: numberPage,
      },
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

const createPaciente = async (
  email: string,
  senha: string,
  tipoSanguineo: string,
  doencasCronicas: string,
  alergia: string,
  idDadosPessoais: number
): Promise<IPaciente> => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    const response = await axiosCadastro.post(
      `/pacientes`,
      {
        tipoSanguineo,
        alergia,
        doencasCronicas,
        email,
        senha,
        dadosPessoais: {
          id: idDadosPessoais,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar paciente", error);
    throw new Error("Falha ao cadastrar paciente");
  }
};

export { fetchPacienteById, createPaciente, fetchPacientes };
