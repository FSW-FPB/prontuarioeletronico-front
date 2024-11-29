export default interface IPrescricao {
  _id: string;
  data_prescricao: string;
  paciente_id: number;
  medico_id: number;
  doenca: string;
  CID: string;
  observacao: string;
  medicamentos: [
    {
      dosagem: string;
      informacoes_medicamento: {
        nome: string;
        tipo: string | null;
      };
    }
  ];
}
