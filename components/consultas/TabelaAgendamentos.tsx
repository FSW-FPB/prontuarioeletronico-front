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
  cancelAgendamento,
  getAllAgendamentosByMedicoId,
  serveAgendamento,
  updateAgendamento,
} from "@/hooks/useAgendamento";
import { useAuth } from "@/context/AuthContext";
import IPaciente from "@/types/IPaciente";
import { fetchPacienteById } from "@/hooks/usePacients";
import { createPrescricao } from "@/hooks/usePrescricao";

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

  const [doenca, setDoenca] = useState("");
  const [CID, setCID] = useState("");
  const [obs, setObs] = useState("");
  const [medicamentos, setMedicamentos] = useState([{ nome: "", dosagem: "" }]);

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

  const handleChangeMedicamento = (
    index: number,
    field: string,
    value: string
  ) => {
    const updatedMedicamentos = [...medicamentos];
    updatedMedicamentos[index] = {
      ...updatedMedicamentos[index],
      [field]: value,
    };
    setMedicamentos(updatedMedicamentos);
  };

  const handleAdicionarMedicamento = () => {
    setMedicamentos([...medicamentos, { nome: "", dosagem: "" }]);
  };

  const handleRemoverMedicamento = (index: number) => {
    setMedicamentos(medicamentos.filter((_, i) => i !== index));
  };

  const handleCancelamentoConfirmado = async () => {
    if (selectedAgendamento) {
      await cancelAgendamento(selectedAgendamento.id_consulta);
    }
    setOpenCancelar(false);
    fetchData(); // Recarrega os dados quando o modal é fechado
  };

  const handleFinalizarPrescricao = async () => {
    if (selectedAgendamento) {
      const prescricao = await createPrescricao(
        selectedAgendamento.id_paciente,
        selectedAgendamento.id_medico,
        doenca,
        CID,
        obs,
        medicamentos
      );

      if (prescricao) {
        await serveAgendamento(selectedAgendamento.id_consulta, prescricao._id);
      }
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
                  {agendamento.id_status == 1 ? (
                    <>
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
                    </>
                  ) : (
                    <span
                      style={{
                        color: agendamento.id_status == 2 ? "green" : "red",
                      }}
                    >
                      {agendamento.id_status == 2 ? "ATENDIDO" : "CANCELADO"}
                    </span>
                  )}
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
      <Dialog open={openFinalizar} onClose={() => setOpenFinalizar(false)}>
        <DialogTitle>Finalizar Agendamento com Prescrição</DialogTitle>
        <DialogContent>
          <TextField
            label="Doença"
            value={doenca}
            onChange={(e) => setDoenca(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="CID"
            value={CID}
            onChange={(e) => setCID(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Observação"
            value={obs}
            onChange={(e) => setObs(e.target.value)}
            fullWidth
            margin="normal"
          />
          {medicamentos.map((medicamento, index) => (
            <div key={index} className="flex gap-4 items-center">
              <TextField
                label="Nome do Medicamento"
                value={medicamento.nome}
                onChange={(e) =>
                  handleChangeMedicamento(index, "nome", e.target.value)
                }
                margin="normal"
              />
              <TextField
                label="Dosagem"
                value={medicamento.dosagem}
                onChange={(e) =>
                  handleChangeMedicamento(index, "dosagem", e.target.value)
                }
                margin="normal"
              />
              <Button
                color="error"
                onClick={() => handleRemoverMedicamento(index)}
              >
                Remover
              </Button>
            </div>
          ))}
          <Button onClick={handleAdicionarMedicamento} color="primary">
            Adicionar Medicamento
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenFinalizar(false)} color="primary">
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
