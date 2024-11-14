import React from "react";
import Sidebar from "../../sidebar";

function ClientHome() {
  return (
    <div className="flex bg-gray-200 font-roboto">
      {/* Sidebar */}
      <Sidebar activePage="home" />

      {/* Display Principal */}
      <main className="flex-grow">
        {/* Cabeçalho */}
        <div className="w-full mb-12">
          <img
            src="https://via.placeholder.com/800x100"
            alt="Imagem inicial"
            className="w-full h-auto"
          />
        </div>

        {/* Informações do Usuário */}
        <section className="flex items-center justify-center px-20 py-20">
          <div className="flex flex-col items-center mr-44 text-center">
            <img
              src="https://via.placeholder.com/150"
              alt="Foto do usuário"
              className="w-36 h-36 rounded-full mb-4"
            />
            <div>
              <h3 className="text-lg mt-4 font-semibold text-gray-700">
                Nome Usuário
              </h3>
              <p className="text-gray-500">emailusuario@gmail.com</p>
            </div>
          </div>

          {/* Detalhes do Usuário */}
          <div className="flex flex-col text-gray-700">
            <div className="flex gap-52 mb-24">
              <div>
                <p className="font-semibold">Gênero</p>
                <p className="text-gray-500">Não informado</p>
              </div>
              <div>
                <p className="font-semibold">Data de Nascimento</p>
                <p className="text-gray-500">Não informado</p>
              </div>
              <div>
                <p className="font-semibold">Telefone</p>
                <p className="text-gray-500">Não informado</p>
              </div>
            </div>
            <div className="flex gap-52">
              <div>
                <p className="font-semibold">CEP</p>
                <p className="text-gray-500">Não informado</p>
              </div>
              <div>
                <p className="font-semibold">Status do Usuário</p>
                <p className="text-gray-500">Ativo</p>
              </div>
            </div>
          </div>
        </section>

        {/* Título das Informações Médicas */}
        <h2 className="text-lg font-semibold px-40 py-4 text-gray-700">
          Informações médicas:
        </h2>

        {/* Informações Médicas */}
        <section className="flex px-16 py-10">
          <div className="flex gap-52 mx-52 text-gray-700">
            <div>
              <p className="font-semibold">Tipo Sanguíneo</p>
              <p className="text-gray-500">Não informado</p>
            </div>
            <div>
              <p className="font-semibold">Alergia</p>
              <p className="text-gray-500">Não informado</p>
            </div>
            <div>
              <p className="font-semibold">Doença Crônica</p>
              <p className="text-gray-500">Não informado</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ClientHome;
