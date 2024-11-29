import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar";
import { FaWalking } from "react-icons/fa";
import {
  getAllAgendamentosByPacienteId,
  getFila,
} from "@/hooks/useAgendamento";
import IFila from "@/types/IFila";
import { useAuth } from "@/context/AuthContext";

function ListEspera() {
  const [posicao, setPosicao] = useState<number | null>(null);
  const [filaInfo, setFilaInfo] = useState<IFila | null>(null);
  const { idUsuario: pacienteId } = useAuth(); // Substituir pelo ID real do paciente

  useEffect(() => {
    const fetchPosicaoNaFila = async () => {
      try {
        if (!pacienteId) return;

        const agendamentos = await getAllAgendamentosByPacienteId(pacienteId);
        if (agendamentos.length === 0) {
          console.warn("Nenhum agendamento encontrado para o paciente.");
          return;
        }
        const idConsulta = agendamentos[0].id_consulta;

        const fila = await getFila();
        const filaAtual = fila.find(
          (item: IFila) => item.id_consulta === idConsulta
        );

        if (filaAtual) {
          setFilaInfo(filaAtual);
          setPosicao(filaAtual.lugar_fila);
        } else {
          console.warn("A consulta não está na fila.");
        }
      } catch (error) {
        console.error("Erro ao buscar a posição na fila:", error);
      }
    };

    fetchPosicaoNaFila();
  }, [pacienteId]);

  if (!pacienteId) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex h-screen">
      <Sidebar activePage="listwaiting" />

      {/* Conteúdo Principal com Imagem Placeholder */}
      <main className="main-content flex-1 bg-gray-50">
        {/* Imagem Placeholder sem espaçamento */}
        <div className="header-image">
          <img
            src="https://via.placeholder.com/800x100"
            alt="Imagem de cabeçalho"
            className="w-full h-auto"
          />
        </div>

        {/* Conteúdo centralizado */}
        <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-md text-center mx-auto mt-12 max-w-2xl">
          <h1 className="text-2xl font-semibold mb-4 text-gray-900">
            Você está vendo a sua posição atual na fila de atendimento.
          </h1>
          <p className="text-gray-700 mb-12">
            À medida que avançamos, sua posição mudará até que você seja
            chamado.
          </p>

          {/* Ícone centralizado */}
          <div className="text-8xl text-gray-800 mb-6">
            <FaWalking />
          </div>

          {filaInfo ? (
            <>
              <p className="text-xl font-semibold mb-2 text-gray-900">
                Você está na posição{" "}
                <span className="font-bold">{filaInfo.lugar_fila}</span> da
                fila.
              </p>
              <p className="text-lg text-gray-700 mb-8">
                Seu atendimento está agendado para{" "}
                <span className="font-bold">
                  {filaInfo.horario_atendimento}
                </span>
                .
              </p>
            </>
          ) : (
            <p className="text-lg text-gray-700 mb-8">
              Buscando sua posição na fila...
            </p>
          )}

          <p className="text-gray-600 mb-4">
            Lembre-se de ter seus documentos prontos!
          </p>
          <a href="#" className="text-teal-600 font-semibold underline">
            Precisa de ajuda? Fale conosco
          </a>
        </div>
      </main>
    </div>
  );
}

export default ListEspera;
