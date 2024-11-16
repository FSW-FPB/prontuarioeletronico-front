import { axiosCadastro } from "@/config/axios.config";
import IMedico from "@/types/IMedico";

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

export { fetchMedicoById };
