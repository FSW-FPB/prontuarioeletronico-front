import React from "react";
import Sidebar from "../../../components/sidebar";

function Agendamento() {
  return (
    <div className="flex">
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
            Simplificamos o processo para você marcar seus compromissos, garantindo uma experiência prática e eficiente.
          </p>

          <form className="grid grid-cols-2 gap-6">
            {/* Nome Completo */}
            <div className="flex flex-col">
              <label className="mb-2 text-gray-700">Insira seu nome completo:*</label>
              <input
                type="text"
                className="w-full bg-gray-50 border border-teal-500 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Nome completo"
                required
              />
            </div>

            {/* CPF */}
            <div className="flex flex-col">
              <label className="mb-2 text-gray-700">Insira seu CPF:*</label>
              <input
                type="text"
                className="w-full bg-gray-50 border border-teal-500 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="CPF"
                required
              />
            </div>

            {/* Data de Nascimento */}
            <div className="flex flex-col">
              <label className="mb-2 text-gray-700">Insira sua data de nascimento:*</label>
              <input
                type="date"
                className="w-full bg-gray-50 border border-teal-500 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            {/* Contato */}
            <div className="flex flex-col">
              <label className="mb-2 text-gray-700">Contato (Telefone ou E-mail):*</label>
              <input
                type="text"
                className="w-full bg-gray-50 border border-teal-500 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Telefone ou E-mail"
                required
              />
            </div>

            {/* Data da Consulta */}
            <div className="flex flex-col">
              <label className="mb-2 text-gray-700">Digite a data desejada para a consulta:*</label>
              <input
                type="date"
                className="w-full bg-gray-50 border border-teal-500 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            {/* Horário da Consulta */}
            <div className="flex flex-col">
              <label className="mb-2 text-gray-700">Escolha o horário que melhor se adequa a você:*</label>
              <input
                type="time"
                className="w-full bg-gray-50 border border-teal-500 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              />
            </div>

            {/* Motivo da Visita */}
            <div className="flex flex-col col-span-2">
              <label className="mb-2 text-gray-700">Descreva brevemente o motivo da sua visita:</label>
              <input
                type="text"
                className="w-full bg-gray-50 border border-teal-500 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Ex.: check-up, etc."
              />
            </div>

            {/* Especialidade */}
            <div className="flex flex-col col-span-2">
              <label className="mb-2 text-gray-700">Selecione o médico ou a especialidade desejada para a consulta:*</label>
              <select
                className="w-full bg-gray-50 border border-teal-500 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
                required
              >
                <option value="" className="text-gray-600">Escolha uma especialidade</option>
                <option value="cardiologia" className="text-gray-800">Cardiologia</option>
                <option value="dermatologia" className="text-gray-800">Dermatologia</option>
                <option value="pediatria" className="text-gray-800">Pediatria</option>
                {/* Adicione mais especialidades conforme necessário */}
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
