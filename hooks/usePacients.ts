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

const updatePaciente = async (
  idPaciente: number,
  tipoSanguineo: string,
  doencasCronicas: string,
  alergia: string
): Promise<IPaciente> => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    const response = await axiosCadastro.put(
      `/pacientes/${idPaciente}`,
      {
        tipoSanguineo,
        alergia,
        doencasCronicas,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar paciente", error);
    throw new Error("Falha ao atualizar paciente");
  }
};

const deletePaciente = async (idPaciente: number) => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    await axiosCadastro.delete(`/pacientes/${idPaciente}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Erro ao deletar paciente", error);
    throw new Error("Falha ao deletar paciente");
  }
};

const updatePasswordAndEmailPaciente = async (
  idPaciente: number,
  email: string,
  senha?: string
): Promise<IPaciente> => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    const response = await axiosCadastro.patch(
      `/pacientes/updateEmailOrPassword/${idPaciente}`,
      {
        email,
        senha,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao cadastrar Paciente", error);
    throw new Error("Falha ao cadastrar Paciente");
  }
};

export {
  fetchPacienteById,
  createPaciente,
  fetchPacientes,
  updatePaciente,
  deletePaciente,
  updatePasswordAndEmailPaciente,
};
