import React, { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { IAgendamento } from "@/types/IAgendamento";
import { useAuth } from "@/context/AuthContext";
import { getAllAgendamentosByPacienteId } from "@/hooks/useAgendamento";
import { fetchMedicoById } from "@/hooks/useMedicos";
import IMedico from "@/types/IMedico";
import Link from "next/link";

// Função para formatar a data no formato DD/MM/YYYY
const formatDate = (date: string) => {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "Data inválida"; // Verifica se a data é válida
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Mês é 0-indexed
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

// Função para formatar o horário
const formatTime = (time: string) => {
  const [hours, minutes] = time.split(":");
  if (!hours || !minutes) return "Hora inválida"; // Verifica se o horário está no formato correto
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
    2,
    "0"
  )}`;
};

function HistoricoMedicoComponent() {
  const [historico, setHistorico] = useState<IAgendamento[] | null>(null);
  const [medicos, setMedicos] = useState<Map<number, IMedico>>(
    new Map<number, IMedico>()
  );
  const { idUsuario: pacienteId } = useAuth();

  // Verifica se pacienteId está disponível dentro do useEffect
  useEffect(() => {
    if (!pacienteId) {
      return; // Não faz nada se o pacienteId não estiver disponível
    }

    const fetchData = async () => {
      try {
        // Buscar histórico médico
        const data = await getAllAgendamentosByPacienteId(pacienteId);
        setHistorico(data);

        // Buscar médicos associados aos agendamentos
        if (data && data.length > 0) {
          const updatedMedicos = new Map<number, IMedico>();
          await Promise.all(
            data.map(async (agendamento) => {
              if (!updatedMedicos.has(agendamento.id_medico)) {
                const medico = await fetchMedicoById(agendamento.id_medico);
                updatedMedicos.set(agendamento.id_medico, medico);
              }
            })
          );
          setMedicos(updatedMedicos);
        }
      } catch (error) {
        console.error("Erro ao buscar histórico ou médicos:", error);
      }
    };

    fetchData(); // Chama a função quando o componente for montado ou pacienteId mudar
  }, [pacienteId]); // Dependência do pacienteId

  if (!pacienteId) {
    return <div>Carregando...</div>; // Exibe carregando enquanto pacienteId não estiver disponível
  }

  return (
    <div className="flex">
      <Sidebar activePage="controle-usuario" />
      <main className="flex-1 flex items-start justify-center p-8 bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-9xl mt-5">
          <h1 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Histórico Médico
          </h1>

          <TableContainer component={Paper} sx={{ textWrap: "nowrap" }}>
            <Table
              sx={{ minWidth: 650 }}
              aria-label="tabela de histórico médico"
            >
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Data da Consulta</TableCell>
                  <TableCell>Nome do Médico</TableCell>
                  <TableCell>Especialidade(s)</TableCell>
                  <TableCell>Motivo da Consulta</TableCell>
                  <TableCell>Prescrição</TableCell>
                  <TableCell align="center">Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {historico &&
                  historico.map((row, index) => (
                    <TableRow key={index}>
                      <TableCell>{row.id_consulta}</TableCell>
                      <TableCell>
                        {`${formatDate(row.data_consulta)} ${formatTime(
                          row.horario_atendimento
                        )}`}
                      </TableCell>
                      <TableCell>
                        {medicos.get(row.id_medico)
                          ? medicos.get(row.id_medico)?.dadosPessoais.nome
                          : "Carregando..."}
                      </TableCell>
                      <TableCell>
                        {medicos.get(row.id_medico)
                          ? medicos.get(row.id_medico)?.especialidade
                          : "Carregando..."}
                      </TableCell>
                      <TableCell>
                        {row.motivo ? row.motivo : "Motivo não especificado"}
                      </TableCell>
                      <TableCell>
                        {row.id_prescricao ? (
                          <Link href={`/prescricao?id=${row.id_prescricao}`}>
                            Ver prescrição
                          </Link>
                        ) : (
                          <span className="text-gray-400">
                            Consulta não foi realizada
                          </span>
                        )}
                      </TableCell>
                      <TableCell>{row.Status?.descricao}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </main>
    </div>
  );
}

export default HistoricoMedicoComponent;
