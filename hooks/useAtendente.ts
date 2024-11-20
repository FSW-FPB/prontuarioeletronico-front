import { axiosCadastro } from "@/config/axios.config";
import IAtendente from "@/types/IAtendente";

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

export { fetchAtendenteById };
