import { axiosCadastro } from "@/config/axios.config";
import IAtendente from "@/types/IAtendente";
import { IPageable } from "@/types/IPageable";

const fetchAtendenteById = async (idAtendente: number): Promise<IAtendente> => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    const response = await axiosCadastro.get(`/atendentes/${idAtendente}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao pegar dados do Atendente", error);
    throw new Error("Falha ao pegar dados do Atendente");
  }
};

const fetchAtendentes = async (numberPage: number): Promise<IPageable> => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    const response = await axiosCadastro.get(`/atendentes`, {
      params: {
        page: numberPage,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao pegar atendentes", error);
    throw new Error("Falha ao pegar atendentes");
  }
};

const createAtendente = async (
  email: string,
  senha: string,
  idDadosPessoais: number
): Promise<IAtendente> => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    const response = await axiosCadastro.post(
      `/atendentes`,
      {
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
    console.error("Erro ao cadastrar atendente", error);
    throw new Error("Falha ao cadastrar atendente");
  }
};

const deleteAtendente = async (idAtendente: number) => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    await axiosCadastro.delete(`/atendentes/${idAtendente}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Erro ao deletar atendente", error);
    throw new Error("Falha ao deletar atendente");
  }
};

export {
  fetchAtendenteById,
  fetchAtendentes,
  deleteAtendente,
  createAtendente,
};
