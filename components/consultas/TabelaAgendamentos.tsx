import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import { Edit, Cancel, CheckCircle } from "@mui/icons-material";
import { IAgendamento } from "@/types/IAgendamento";
import { getAllAgendamentosByMedicoId } from "@/hooks/useAgendamento";
import { useAuth } from "@/context/AuthContext";
import IPaciente from "@/types/IPaciente";
import { fetchPacienteById } from "@/hooks/usePacients";

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

function TabelaAgendamentos() {
  const [agendamentos, setAgendamentos] = useState<IAgendamento[]>([]);
  const [pacientes, setPacientes] = useState<Map<number, IPaciente>>(
    new Map<number, IPaciente>()
  );
  const { idUsuario: medicoId } = useAuth();

  // Funções de ação para cada opção
  const handleAtualizar = (id: number) => {
    console.log("Atualizar agendamento com ID:", id);
    // Implemente a lógica para atualizar o agendamento
  };

  const handleCancelar = (id: number) => {
    console.log("Cancelar agendamento com ID:", id);
    // Implemente a lógica para cancelar o agendamento
  };

  const handleFinalizar = (id: number) => {
    console.log("Finalizar agendamento com ID:", id);
    // Implemente a lógica para finalizar o agendamento
  };

  useEffect(() => {
    if (!medicoId) {
      return; // Não faz nada se o pacienteId não estiver disponível
    }

    const fetchData = async () => {
      try {
        const data = await getAllAgendamentosByMedicoId(medicoId);
        setAgendamentos(data);

        // Buscar pacientes associados aos agendamentos
        if (data && data.length > 0) {
          const updatedPacientes = new Map<number, IPaciente>();
          await Promise.all(
            data.map(async (agendamento) => {
              if (!updatedPacientes.has(agendamento.id_paciente)) {
                const paciente = await fetchPacienteById(
                  agendamento.id_paciente
                );
                updatedPacientes.set(agendamento.id_paciente, paciente);
              }
            })
          );
          setPacientes(updatedPacientes);
        }
      } catch (error) {
        console.error("Erro ao buscar histórico ou pacientes:", error);
      }
    };

    fetchData();
  }, [medicoId]);

  if (!medicoId) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="mt-8 w-full">
      <h2 className="text-xl font-semibold mb-4 text-gray-600">Agendamentos</h2>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Data</TableCell>
              <TableCell>Paciente</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {agendamentos.map((agendamento, index) => (
              <TableRow key={index}>
                <TableCell>
                  {`${formatDate(agendamento.data_consulta)} ${formatTime(
                    agendamento.horario_atendimento
                  )}`}
                </TableCell>
                <TableCell>
                  {pacientes.get(agendamento.id_paciente)
                    ? pacientes.get(agendamento.id_paciente)?.dadosPessoais.nome
                    : "Carregando..."}
                </TableCell>
                <TableCell>{agendamento.Status?.descricao}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleAtualizar(agendamento.id_consulta)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleCancelar(agendamento.id_consulta)}
                  >
                    <Cancel />
                  </IconButton>
                  <IconButton
                    color="success"
                    onClick={() => handleFinalizar(agendamento.id_consulta)}
                  >
                    <CheckCircle />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default TabelaAgendamentos;
