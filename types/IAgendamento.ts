export interface IAgendamento {
  id_consulta: number;
  data_consulta: string;
  horario_atendimento: string;
  horario_encerramento: string;
  id_paciente: number;
  id_medico: number;
  id_prescricao: string | null;
  id_status: number;
  updatedAt: string;
  createdAt: string;
  motivo: string | null;
  Status?: {
    descricao: string;
  };
}
