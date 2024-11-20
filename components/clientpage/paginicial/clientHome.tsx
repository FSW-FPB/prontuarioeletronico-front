import React, { useState, useEffect } from "react";
import Sidebar from "../../sidebar";
import IPaciente from "@/types/IPaciente";
import IMedico from "@/types/IMedico";
import { fetchPacienteById } from "@/hooks/usePacients";
import { fetchMedicoById } from "@/hooks/useMedicos";
import { fetchAtendenteById } from "@/hooks/useAtendente";
import IAtendente from "@/types/IAtendente";

interface ClientHomeProps {
  idUser: number;
  tipoUsuario: number;
}

function ClientHome({ idUser, tipoUsuario }: ClientHomeProps) {
  const [paciente, setPaciente] = useState<IPaciente | null>(null);
  const [medico, setMedico] = useState<IMedico | null>(null);
  const [atendente, setAtendente] = useState<IAtendente | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        if (tipoUsuario === 1) {
          const data = await fetchPacienteById(idUser);
          setMedico(null);
          setAtendente(null);
          setPaciente(data);
        } else if (tipoUsuario === 2) {
          const data = await fetchMedicoById(idUser);
          setPaciente(null);
          setAtendente(null);
          setMedico(data);
        } else if (tipoUsuario === 3) {
          const data = await fetchAtendenteById(idUser);
          setPaciente(null);
          setMedico(null);
          setAtendente(data);
        }
      } catch (error: any) {
        setError(error.message || "Erro ao carregar os dados.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idUser, tipoUsuario]);

  return (
    <div className="flex bg-gray-200 font-roboto">
      {/* Sidebar */}
      <Sidebar activePage="home" />

      {/* Display Principal */}
      <main className="flex-grow">
        {/* Cabeçalho */}
        <div className="w-full mb-12">
          <img
            src="https://via.placeholder.com/800x100"
            alt="Imagem inicial"
            className="w-full h-auto"
          />
        </div>

        {/* Informações do Usuário */}
        <section className="flex items-center justify-center px-20 py-20">
          <div className="flex flex-col items-center mr-44 text-center">
            <img
              src={
                tipoUsuario === 1
                  ? paciente?.dadosPessoais.imgUrl ||
                    "https://via.placeholder.com/150"
                  : tipoUsuario === 2
                  ? medico?.dadosPessoais.imgUrl ||
                    "https://via.placeholder.com/150"
                  : atendente?.dadosPessoais.imgUrl ||
                    "https://via.placeholder.com/150"
              }
              alt="Foto do usuário"
              className="w-36 h-36 rounded-full mb-4"
            />
            <div>
              <h3 className="text-lg mt-4 font-semibold text-gray-700">
                {tipoUsuario === 1
                  ? paciente?.dadosPessoais.nome || "Nome Usuário"
                  : tipoUsuario === 2
                  ? medico?.dadosPessoais.nome || "Nome Médico"
                  : atendente?.dadosPessoais.nome || "Nome Atendente"}
              </h3>
              <p className="text-gray-500">
                {tipoUsuario === 1
                  ? paciente?.email || "emailusuario@gmail.com"
                  : tipoUsuario === 2
                  ? medico?.email || "emailmedico@gmail.com"
                  : atendente?.email || "emailatendente@gmail.com"}
              </p>
            </div>
          </div>

          {/* Detalhes do Usuário */}
          <div className="flex flex-col text-gray-700">
            <div className="flex gap-52 mb-24">
              <div>
                <p className="font-semibold">Gênero</p>
                <p className="text-gray-500">
                  {tipoUsuario === 1
                    ? paciente?.dadosPessoais.genero === "M"
                      ? "Masculino"
                      : paciente?.dadosPessoais.genero === "F"
                      ? "Feminino"
                      : "Não informado"
                    : tipoUsuario === 2
                    ? medico?.dadosPessoais.genero === "M"
                      ? "Masculino"
                      : medico?.dadosPessoais.genero === "F"
                      ? "Feminino"
                      : "Não informado"
                    : atendente?.dadosPessoais.genero === "M"
                    ? "Masculino"
                    : atendente?.dadosPessoais.genero === "F"
                    ? "Feminino"
                    : "Não informado"}
                </p>
              </div>
              <div>
                <p className="font-semibold">Data de Nascimento</p>
                <p className="text-gray-500">
                  {tipoUsuario === 1
                    ? paciente?.dadosPessoais.data_nascimento || "Não informado"
                    : tipoUsuario === 2
                    ? medico?.dadosPessoais.data_nascimento || "Não informado"
                    : atendente?.dadosPessoais.data_nascimento ||
                      "Não informado"}
                </p>
              </div>
              <div>
                <p className="font-semibold">Telefone</p>
                <p className="text-gray-500">
                  {tipoUsuario === 1
                    ? paciente?.dadosPessoais.telefone || "Não informado"
                    : tipoUsuario === 2
                    ? medico?.dadosPessoais.telefone || "Não informado"
                    : atendente?.dadosPessoais.telefone || "Não informado"}
                </p>
              </div>
            </div>
            <div className="flex gap-52">
              <div>
                <p className="font-semibold">CEP</p>
                <p className="text-gray-500">
                  {tipoUsuario === 1
                    ? paciente?.dadosPessoais.cep || "Não informado"
                    : tipoUsuario === 2
                    ? medico?.dadosPessoais.cep || "Não informado"
                    : atendente?.dadosPessoais.cep || "Não informado"}
                </p>
              </div>
              <div>
                <p className="font-semibold">Status do Usuário</p>
                <p className="text-gray-500">
                  {tipoUsuario === 1
                    ? paciente?.dadosPessoais.status || "Ativo"
                    : tipoUsuario === 2
                    ? medico?.dadosPessoais.status || "Ativo"
                    : atendente?.dadosPessoais.status || "Ativo"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Informações do Médico */}
        {tipoUsuario === 2 && (
          <section className="flex justify-center w-full py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 max-w-4xl w-full text-gray-700">
              <div>
                <p className="font-semibold">Especialidade(s)</p>
                <p className="text-gray-500">
                  {medico?.especialidade || "Não informado"}
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Título das Informações Médicas */}
        {tipoUsuario === 1 && (
          <h2 className="text-lg font-semibold px-40 py-4 text-gray-700 text-center">
            Informações médicas:
          </h2>
        )}

        {/* Informações Médicas */}
        {tipoUsuario === 1 && (
          <section className="flex justify-center px-16 py-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-4xl w-full text-gray-700">
              <div>
                <p className="font-semibold">Tipo Sanguíneo</p>
                <p className="text-gray-500">
                  {paciente?.tipoSanguineo || "Não informado"}
                </p>
              </div>
              <div>
                <p className="font-semibold">Alergia</p>
                <p className="text-gray-500">
                  {paciente?.alergia || "Não informado"}
                </p>
              </div>
              <div>
                <p className="font-semibold">Doença Crônica</p>
                <p className="text-gray-500">
                  {paciente?.doencasCronicas || "Não informado"}
                </p>
              </div>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default ClientHome;
