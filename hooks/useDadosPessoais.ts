import { axiosCadastro } from "@/config/axios.config";
import IDadosPessoais from "@/types/IDadosPessoais";

const fetchDadosPessoaisByCPF = async (
  cpf: string
): Promise<IDadosPessoais> => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    const response = await axiosCadastro.get(`/dados-pessoais/cpf/${cpf}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Erro ao pegar dados Pessoais", error);
    throw new Error("Falha ao pegar dados Pessoais");
  }
};

const createDadosPessoais = async (
  nome: string,
  cpf: string,
  telefone: string,
  cep: string,
  data_nascimento: string,
  genero: string,
  imgUrl: string
): Promise<{
  data: {
    id: number;
    nome: string;
    cpf: string;
    telefone: string;
    cep: string;
    data_nascimento: string;
    status: string;
    imgUrl: string;
    genero: string;
  };
  error: string;
} | null> => {
  try {
    const token = sessionStorage.getItem("token");

    if (!token) {
      throw new Error("Token de autenticação não encontrado");
    }

    const response = await axiosCadastro.post(
      `/dados-pessoais`,
      {
        nome,
        cpf,
        telefone,
        cep,
        data_nascimento,
        status: "ATIVO",
        imgUrl: imgUrl
          ? imgUrl
          : "https://static.vecteezy.com/ti/vetor-gratis/p1/9292244-default-avatar-icon-vector-of-social-media-user-vetor.jpg",
        genero,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    return null;
  }
};

export { fetchDadosPessoaisByCPF, createDadosPessoais };
