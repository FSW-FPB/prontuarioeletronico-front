import React from "react";
import Sidebar from "../../components/sidebar";

function Configuracoes() {
  return (
    <div className="configuracoes-page">
      <Sidebar activePage="configuracoes" />
      <main className="main-content">
        <h1>configuracoes</h1>
        <p>Bem-vindo à página de configuracoes.</p>
      </main>
    </div>
  );
}

export default Configuracoes;
