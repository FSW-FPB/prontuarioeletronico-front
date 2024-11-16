import React, { useState, useEffect } from "react";
import Sidebar from "../../sidebar";
import IPaciente from "@/types/IPaciente";
import { fetchPacienteById } from "@/hooks/usePacients";

interface ClientHomeProps {
  idPaciente: number;
}

function ClientHome({ idPaciente }: ClientHomeProps) {
  const [paciente, setPaciente] = useState<IPaciente | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPacienteById(idPaciente);
        setPaciente(data);
      } catch (error: any) {
        setError(error.message || "Erro ao carregar os dados do paciente.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idPaciente]); // Recarrega quando o idPaciente ou token mudar

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
                paciente?.dadosPessoais.imgUrl ||
                "https://via.placeholder.com/150"
              }
              alt="Foto do usuário"
              className="w-36 h-36 rounded-full mb-4"
            />
            <div>
              <h3 className="text-lg mt-4 font-semibold text-gray-700">
                {paciente?.dadosPessoais.nome || "Nome Usuário"}
              </h3>
              <p className="text-gray-500">
                {paciente?.email || "emailusuario@gmail.com"}
              </p>
            </div>
          </div>

          {/* Detalhes do Usuário */}
          <div className="flex flex-col text-gray-700">
            <div className="flex gap-52 mb-24">
              <div>
                <p className="font-semibold">Gênero</p>
                <p className="text-gray-500">
                  {paciente?.dadosPessoais.genero === "M"
                    ? "Masculino"
                    : paciente?.dadosPessoais.genero === "F"
                    ? "Feminino"
                    : "Não informado"}
                </p>
              </div>
              <div>
                <p className="font-semibold">Data de Nascimento</p>
                <p className="text-gray-500">
                  {paciente?.dadosPessoais.data_nascimento || "Não informado"}
                </p>
              </div>
              <div>
                <p className="font-semibold">Telefone</p>
                <p className="text-gray-500">
                  {paciente?.dadosPessoais.telefone || "Não informado"}
                </p>
              </div>
            </div>
            <div className="flex gap-52">
              <div>
                <p className="font-semibold">CEP</p>
                <p className="text-gray-500">
                  {paciente?.dadosPessoais.cep || "Não informado"}
                </p>
              </div>
              <div>
                <p className="font-semibold">Status do Usuário</p>
                <p className="text-gray-500">
                  {paciente?.dadosPessoais.status || "Ativo"}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Título das Informações Médicas */}
        <h2 className="text-lg font-semibold px-40 py-4 text-gray-700">
          Informações médicas:
        </h2>

        {/* Informações Médicas */}
        <section className="flex px-16 py-10">
          <div className="flex gap-52 mx-52 text-gray-700">
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
      </main>
    </div>
  );
}

export default ClientHome;
