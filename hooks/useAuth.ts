import { axiosCadastro } from "@/config/axios.config";
import ITokenLogado from "@/types/ITokenLogado";

interface AuthProps {
  email: string;
  senha: string;
}

const logarPaciente = async ({ email, senha }: AuthProps) => {
  try {
    const response = await axiosCadastro.post("/pacientes/login", {
      email,
      senha,
    });
    const tokenData: ITokenLogado = response.data;
    localStorage.setItem("token", tokenData.token);

    return { success: true, tokenData };
  } catch (error) {
    console.error("Erro ao realizar login no paciente", error);
    return { success: false, error: "Falha ao realizar login no paciente" };
  }
};

export { logarPaciente };
