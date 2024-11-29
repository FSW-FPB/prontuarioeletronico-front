import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar";
import { useAuth } from "@/context/AuthContext";
import { fetchPacienteById } from "@/hooks/usePacients";
import { fetchMedicos } from "@/hooks/useMedicos";
import { createAgendamento } from "@/hooks/useAgendamento";
import IPaciente from "@/types/IPaciente";
import IMedico from "@/types/IMedico";

function Agendamento() {
  const { idUsuario } = useAuth();
  const [paciente, setPaciente] = useState<IPaciente | null>(null);
  const [medicos, setMedicos] = useState<IMedico[]>([]);
  const [selectedMedico, setSelectedMedico] = useState<number | null>(null);
  const [dataConsulta, setDataConsulta] = useState<string>("");
  const [horaConsulta, setHoraConsulta] = useState<string>("");
  const [motivo, setMotivo] = useState<string>("");
  const [minDate, setMinDate] = useState<string>("");

  useEffect(() => {
    if (idUsuario) {
      const fetchPaciente = async () => {
        const data = await fetchPacienteById(idUsuario);
        setPaciente(data);
      };

      fetchPaciente();
    }
  }, [idUsuario]);

  useEffect(() => {
    const today = new Date();
    const todayString = today.toISOString().split("T")[0]; // Formato YYYY-MM-DD
    setMinDate(todayString);

    const fetchMedicosList = async () => {
      const data = await fetchMedicos(0, 99999);

      if (
        Array.isArray(data.content) &&
        data.content.every((item) => "crm" in item)
      ) {
        setMedicos(data.content as IMedico[]);
      } else {
        console.error("Erro: dados retornados não são médicos");
      }
    };

    fetchMedicosList();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedMedico || !dataConsulta || !horaConsulta) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }
    try {
      if (!idUsuario) return;
      const [horas, minutos] = horaConsulta.split(":").map(Number);
      const consultaDate = new Date();
      consultaDate.setHours(horas);
      consultaDate.setMinutes(minutos + 20);
      const horarioEncerramento = `${consultaDate
        .getHours()
        .toString()
        .padStart(2, "0")}:${consultaDate
        .getMinutes()
        .toString()
        .padStart(2, "0")}`;

      await createAgendamento(
        dataConsulta,
        horaConsulta,
        horarioEncerramento,
        idUsuario,
        selectedMedico,
        motivo
      );

      setMotivo("");
      setDataConsulta("");
      setHoraConsulta("");
      setSelectedMedico(null);
    } catch (error) {
      console.error("Erro ao criar o agendamento:", error);
      alert("Ocorreu um erro ao agendar. Tente novamente.");
    }
  };

  if (!idUsuario) {
    return <div>Carregando...</div>; // Exibe um estado de carregamento ou mensagem
  }

  return (
    <div className="flex" style={{ color: "#696969" }}>
      <Sidebar activePage="agendamento" />
      <main className="flex-1 flex items-center justify-center p-8 bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl w-full">
          {/* Imagem de Cabeçalho */}
          <div className="header-image mb-6">
            <img
              src="https://via.placeholder.com/800x100"
              alt="Imagem inicial"
              className="w-full rounded-md"
            />
          </div>

          <h1 className="text-2xl font-semibold mb-4 text-center text-gray-900">
            Agende aqui sua consulta
          </h1>
          <p className="text-gray-600 mb-8 text-center">
            Simplificamos o processo para você marcar seus compromissos,
            garantindo uma experiência prática e eficiente.
          </p>

          <form className="grid grid-cols-2 gap-6" onSubmit={handleSubmit}>
            {/* Nome Completo */}
            <div className="flex flex-col">
              <label className="mb-2 text-gray-700">
                Insira seu nome completo:*
              </label>
              <input
                type="text"
                className="w-full bg-gray-200 border border-teal-500 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Nome completo"
                disabled
                value={paciente?.dadosPessoais.nome}
              />
            </div>

            {/* CPF */}
            <div className="flex flex-col">
              <label className="mb-2 text-gray-700">Insira seu CPF:*</label>
              <input
                type="text"
                className="w-full bg-gray-200 border border-teal-500 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="CPF"
                disabled
                value={paciente?.dadosPessoais.cpf}
              />
            </div>

            {/* Data de Nascimento */}
            <div className="flex flex-col">
              <label className="mb-2 text-gray-700">
                Insira sua data de nascimento:*
              </label>
              <input
                type="date"
                className="w-full bg-gray-200 border border-teal-500 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                disabled
                value={paciente?.dadosPessoais.data_nascimento}
              />
            </div>

            {/* Contato */}
            <div className="flex flex-col">
              <label className="mb-2 text-gray-700">
                Contato (Telefone ou E-mail):*
              </label>
              <input
                type="text"
                className="w-full bg-gray-200 border border-teal-500 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Telefone ou E-mail"
                disabled
                value={paciente?.email || paciente?.dadosPessoais.telefone}
              />
            </div>

            {/* Data da Consulta */}
            <div className="flex flex-col">
              <label className="mb-2 text-gray-700">
                Digite a data desejada para a consulta:*
              </label>
              <input
                type="date"
                className="w-full bg-gray-50 border border-teal-500 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
                min={minDate}
                value={dataConsulta}
                onChange={(e) => setDataConsulta(e.target.value)}
              />
            </div>

            {/* Horário da Consulta */}
            <div className="flex flex-col">
              <label className="mb-2 text-gray-700">
                Escolha o horário que melhor se adequa a você:*
              </label>
              <input
                type="time"
                className="w-full bg-gray-50 border border-teal-500 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
                value={horaConsulta}
                onChange={(e) => setHoraConsulta(e.target.value)}
              />
            </div>

            {/* Motivo da Visita */}
            <div className="flex flex-col col-span-2">
              <label className="mb-2 text-gray-700">
                Descreva brevemente o motivo da sua visita:
              </label>
              <input
                type="text"
                className="w-full bg-gray-50 border border-teal-500 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Ex.: check-up, etc."
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
              />
            </div>

            {/* Especialidade */}
            <div className="flex flex-col col-span-2">
              <label className="mb-2 text-gray-700">
                Selecione o médico ou a especialidade desejada para a consulta:*
              </label>
              <select
                className="w-full bg-gray-50 border border-teal-500 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
                value={selectedMedico || ""}
                onChange={(e) => setSelectedMedico(Number(e.target.value))}
              >
                <option value="" disabled>
                  Selecione o médico ou a especialidade
                </option>
                {medicos.map((medico) => (
                  <option
                    key={medico.id}
                    value={medico.id}
                    className="text-gray-800"
                  >
                    <span>
                      {medico.dadosPessoais.nome} || {medico.especialidade}
                    </span>
                  </option>
                ))}
              </select>
            </div>

            {/* Botão de Agendar */}
            <div className="col-span-2">
              <button
                type="submit"
                className="w-full bg-teal-600 text-white font-semibold py-2 rounded hover:bg-teal-700 transition duration-300"
              >
                Agendar
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Agendamento;
