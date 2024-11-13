import React from "react";
import Sidebar from "../../components/sidebar";

function ListEspera() {
  return (
    <div className="lista-espera-page">
      <Sidebar activePage="lista-espera" />
      <main className="main-content">
        <h1>Lista de Espera</h1>
        <p>Bem-vindo à página de agendamento.</p>
      </main>
    </div>
  );
}

export default ListEspera;
