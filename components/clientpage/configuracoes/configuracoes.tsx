import React from "react";
import Sidebar from "../../../components/sidebar";

function Configuracoes() {
  return (
    <div className="flex">
      <Sidebar activePage="configuracoes" />
      <main className="flex-1 bg-gray-50">

        <div className="header-image">
          <img
            src="https://via.placeholder.com/800x100"
            alt="Imagem de cabeçalho"
            className="w-full h-auto"
          />
        </div>
        <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto">

          <h1 className="text-2xl font-semibold mb-6 text-center">
            Altere seus dados aqui. As mudanças feitas nessa página refletirão na tela inicial.
          </h1>

          <form className="grid grid-cols-2 gap-6">
            {/* Nome */}
            <div>
              <label className="block font-semibold mb-1">Nome:</label>
              <input
                type="text"
                className="w-full border border-teal-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            {/* Gênero */}
            <div>
              <label className="block font-semibold mb-1">Gênero:</label>
              <input
                type="text"
                className="w-full border border-teal-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            {/* CEP */}
            <div>
              <label className="block font-semibold mb-1">CEP:</label>
              <input
                type="text"
                className="w-full border border-teal-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            {/* Telefone */}
            <div>
              <label className="block font-semibold mb-1">Telefone:</label>
              <input
                type="text"
                className="w-full border border-teal-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            {/* Data de nascimento */}
            <div>
              <label className="block font-semibold mb-1">Data de nascimento:</label>
              <input
                type="text"
                placeholder="dd/mm/aaaa"
                className="w-full border border-teal-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            {/* Tipo sanguíneo */}
            <div>
              <label className="block font-semibold mb-1">Tipo sanguíneo:</label>
              <select
                className="w-full border border-teal-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
              >
                <option value="">Selecione</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            {/* Alergia */}
            <div>
              <label className="block font-semibold mb-1">Alergia:</label>
              <input
                type="text"
                className="w-full border border-teal-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>

            {/* Doença crônica */}
            <div>
              <label className="block font-semibold mb-1">Doença crônica:</label>
              <input
                type="text"
                className="w-full border border-teal-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-600"
              />
            </div>
          </form>

          {/* Botão Salvar */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-teal-600 text-white font-semibold py-2 rounded hover:bg-teal-700 transition duration-300"
            >
              Salvar
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}

export default Configuracoes;
