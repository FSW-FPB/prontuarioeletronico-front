import React from "react";
import Sidebar from "../../../components/sidebar";
import { FaWalking } from "react-icons/fa";

function ListEspera() {
  return (
    <div className="flex h-screen">
      <Sidebar activePage="lista-espera" />
      
      {/* Conteúdo Principal com Imagem Placeholder */}
      <main className="main-content flex-1 bg-gray-50">
        
        {/* Imagem Placeholder sem espaçamento */}
        <div className="header-image">
          <img 
            src="https://via.placeholder.com/800x100" 
            alt="Imagem de cabeçalho" 
            className="w-full h-auto"
          />
        </div>

        {/* Conteúdo centralizado */}
        <div className="flex flex-col items-center justify-center bg-white p-8 rounded-lg shadow-md text-center mx-auto mt-12 max-w-2xl">
          <h1 className="text-2xl font-semibold mb-4 text-gray-900">
            Você está vendo a sua posição atual na fila de atendimento.
          </h1>
          <p className="text-gray-700 mb-12">
            À medida que avançamos, sua posição mudará até que você seja chamado.
          </p>
          
          {/* Ícone centralizado */}
          <div className="text-8xl text-gray-800 mb-6">
            <FaWalking />
          </div>

          <p className="text-xl font-semibold mb-2 text-gray-900">
            Você está na posição <span className="font-bold">8</span> da fila.
          </p>
          <p className="text-lg text-gray-700 mb-8">
            Seu atendimento iniciará em breve.
          </p>
          <p className="text-gray-600 mb-4">
            Lembre-se de ter seus documentos prontos!
          </p>
          <a href="#" className="text-teal-600 font-semibold underline">
            Precisa de ajuda? Fale conosco
          </a>
        </div>
      </main>
    </div>
  );
}

export default ListEspera;
