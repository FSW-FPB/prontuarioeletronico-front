import { axiosCadastro } from "@/config/axios.config";
import IMedico from "@/types/IMedico";
import { IPageable } from "@/types/IPageable";

const fetchMedicoById = async (idMedico: number): Promise<IMedico> => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    const response = await axiosCadastro.get(`/medicos/${idMedico}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao pegar dados do Medico", error);
    throw new Error("Falha ao pegar dados do Medico");
  }
};

const fetchMedicos = async (
  numberPage: number,
  pageSize?: number
): Promise<IPageable> => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    const response = await axiosCadastro.get(`/medicos`, {
      params: {
        page: numberPage,
        size: pageSize || 20,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao pegar medicos", error);
    throw new Error("Falha ao pegar medicos");
  }
};

const createMedico = async (
  email: string,
  senha: string,
  crm: string,
  especialidade: string,
  idDadosPessoais: number
): Promise<IMedico> => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    const response = await axiosCadastro.post(
      `/medicos`,
      {
        especialidade,
        crm,
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
    console.error("Erro ao cadastrar medico", error);
    throw new Error("Falha ao cadastrar medico");
  }
};

const updateMedico = async (
  idMedico: number,
  crm: string,
  especialidade: string
): Promise<IMedico> => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    const response = await axiosCadastro.put(
      `/medicos/${idMedico}`,
      {
        crm,
        especialidade,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao atualizar Medico", error);
    throw new Error("Falha ao atualizar Medico");
  }
};

const deleteMedico = async (idMedico: number) => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    await axiosCadastro.delete(`/medicos/${idMedico}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Erro ao deletar medico", error);
    throw new Error("Falha ao deletar medico");
  }
};

const updatePasswordAndEmailMedico = async (
  idMedico: number,
  email: string,
  senha?: string
): Promise<IMedico> => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    const response = await axiosCadastro.patch(
      `/medicos/updateEmailOrPassword/${idMedico}`,
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
    console.error("Erro ao cadastrar Medico", error);
    throw new Error("Falha ao cadastrar Medico");
  }
};

export {
  fetchMedicoById,
  createMedico,
  fetchMedicos,
  updateMedico,
  deleteMedico,
  updatePasswordAndEmailMedico,
};
