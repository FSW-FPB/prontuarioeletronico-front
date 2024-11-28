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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
} from "@mui/material";
import { Edit, Cancel, CheckCircle } from "@mui/icons-material";
import { IAgendamento } from "@/types/IAgendamento";
import {
  getAllAgendamentosByMedicoId,
  updateAgendamento,
} from "@/hooks/useAgendamento";
import { useAuth } from "@/context/AuthContext";
import IPaciente from "@/types/IPaciente";
import { fetchPacienteById } from "@/hooks/usePacients";

const formatDate = (date: string) => {
  const d = new Date(date);
  if (isNaN(d.getTime())) return "Data inválida";
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

const formatTime = (time: string) => {
  const [hours, minutes] = time.split(":");
  if (!hours || !minutes) return "Hora inválida";
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
  const [openCancelar, setOpenCancelar] = useState(false);
  const [openEditar, setOpenEditar] = useState(false);
  const [openFinalizar, setOpenFinalizar] = useState(false);
  const [selectedAgendamento, setSelectedAgendamento] =
    useState<IAgendamento | null>(null);

  const [horarioAtendimento, setHorarioAtendimento] = useState("");
  const [horarioEncerramento, setHorarioEncerramento] = useState("");

  const handleCancelar = (agendamento: IAgendamento) => {
    setSelectedAgendamento(agendamento);
    setOpenCancelar(true);
  };

  const handleEditar = (agendamento: IAgendamento) => {
    setSelectedAgendamento(agendamento);
    setHorarioAtendimento(agendamento.horario_atendimento);
    setHorarioEncerramento(agendamento.horario_encerramento);
    setOpenEditar(true);
  };

  const handleFinalizar = (agendamento: IAgendamento) => {
    setSelectedAgendamento(agendamento);
    setOpenFinalizar(true);
  };

  const handleAtualizar = async () => {
    if (selectedAgendamento) {
      await updateAgendamento(
        selectedAgendamento.id_consulta,
        horarioAtendimento,
        horarioEncerramento
      );
    }
    setOpenEditar(false);
    fetchData(); // Recarrega os dados quando o modal é fechado
  };

  const handleCancelamentoConfirmado = () => {
    if (selectedAgendamento) {
      console.log("Cancelar agendamento", selectedAgendamento.id_consulta);
      // Lógica de cancelamento
    }
    setOpenCancelar(false);
    fetchData(); // Recarrega os dados quando o modal é fechado
  };

  const handleFinalizarPrescricao = () => {
    if (selectedAgendamento) {
      console.log(
        "Finalizar agendamento com prescrição",
        selectedAgendamento.id_consulta
      );
      // Lógica de finalizar e criar prescrição
    }
    setOpenFinalizar(false);
    fetchData(); // Recarrega os dados quando o modal é fechado
  };

  const fetchData = async () => {
    if (!medicoId) return;

    try {
      const data = await getAllAgendamentosByMedicoId(medicoId);
      setAgendamentos(data);
      const updatedPacientes = new Map<number, IPaciente>();
      await Promise.all(
        data.map(async (agendamento) => {
          if (!updatedPacientes.has(agendamento.id_paciente)) {
            const paciente = await fetchPacienteById(agendamento.id_paciente);
            updatedPacientes.set(agendamento.id_paciente, paciente);
          }
        })
      );
      setPacientes(updatedPacientes);
    } catch (error) {
      console.error("Erro ao buscar histórico ou pacientes:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [medicoId]);

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
                    onClick={() => handleEditar(agendamento)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                    color="error"
                    onClick={() => handleCancelar(agendamento)}
                  >
                    <Cancel />
                  </IconButton>
                  <IconButton
                    color="success"
                    onClick={() => handleFinalizar(agendamento)}
                  >
                    <CheckCircle />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal de Cancelamento */}
      <Dialog
        open={openCancelar}
        onClose={() => {
          setOpenCancelar(false);
          fetchData();
        }}
      >
        <DialogTitle>
          Tem certeza que deseja cancelar este agendamento?
        </DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenCancelar(false);
              fetchData();
            }}
            color="primary"
          >
            Não
          </Button>
          <Button onClick={handleCancelamentoConfirmado} color="secondary">
            Sim
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de Edição */}
      <Dialog
        open={openEditar}
        onClose={() => {
          setOpenEditar(false);
          fetchData();
        }}
      >
        <DialogTitle>Editar Agendamento</DialogTitle>
        <DialogContent>
          <TextField
            label="Horário de Atendimento"
            value={horarioAtendimento}
            onChange={(e) => setHorarioAtendimento(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Horário de Encerramento"
            value={horarioEncerramento}
            onChange={(e) => setHorarioEncerramento(e.target.value)}
            fullWidth
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenEditar(false);
              fetchData();
            }}
            color="primary"
          >
            Cancelar
          </Button>
          <Button onClick={handleAtualizar} color="secondary">
            Atualizar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de Finalização */}
      <Dialog
        open={openFinalizar}
        onClose={() => {
          setOpenFinalizar(false);
          fetchData();
        }}
      >
        <DialogTitle>Finalizar Agendamento com Prescrição</DialogTitle>
        <DialogActions>
          <Button
            onClick={() => {
              setOpenFinalizar(false);
              fetchData();
            }}
            color="primary"
          >
            Cancelar
          </Button>
          <Button onClick={handleFinalizarPrescricao} color="secondary">
            Finalizar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default TabelaAgendamentos;
