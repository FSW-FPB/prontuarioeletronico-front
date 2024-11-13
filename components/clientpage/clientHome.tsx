import React from "react";
import Sidebar from "../sidebar"; // Ajuste o caminho conforme a nova estrutura (tudo minúsculo)
import "./ClientHome.css";

function ClientHome() {
  return (
    <div className="client-home">
      {/* Passando a prop 'activePage' para o Sidebar */}
      <Sidebar activePage="home" /> {/* Página "home" está ativa */}
      {/* Display Principal */}
      <main className="main-content">
        {/* Cabeçalho */}
        <div className="header-image">
          <img src="https://via.placeholder.com/800x100" alt="Imagem inicial" />
        </div>

        {/* Informações do Usuário */}
        <section className="user-info">
          <div className="user-profile">
            <img
              src="https://via.placeholder.com/150"
              alt="Foto do usuário"
              className="user-photo"
            />
            <div>
              <h3>Nome do Usuário</h3>
              <p>usuario@email.com</p>
            </div>
          </div>

          <div className="user-details">
            <div className="top-details">
              <div className="user-detail">
                <p>
                  <strong>Gênero</strong>
                </p>
                <p>Não informado</p>
              </div>
              <div className="user-detail">
                <p>
                  <strong>Data de Nascimento</strong>
                </p>
                <p>Não informado</p>
              </div>
              <div className="user-detail">
                <p>
                  <strong>Telefone</strong>
                </p>
                <p>Não informado</p>
              </div>
            </div>

            <div className="bottom-details">
              <div className="user-detail">
                <p>
                  <strong>CEP</strong>
                </p>
                <p>Não informado</p>
              </div>
              <div className="user-detail">
                <p>
                  <strong>Status</strong>
                </p>
                <p>Não informado</p>
              </div>
            </div>
          </div>
        </section>

        <div className="medical-title">
          <h2>Informações Médicas:</h2>
        </div>

        {/* Informações Médicas */}
        <section className="medical-info">
          <div className="user-details">
            <div className="top-details">
              <div className="user-detail">
                <p>
                  <strong>Tipo Sanguíneo</strong>
                </p>
                <p>Não informado</p>
              </div>
              <div className="user-detail">
                <p>
                  <strong>Alergia</strong>
                </p>
                <p>Não informado</p>
              </div>
              <div className="user-detail">
                <p>
                  <strong>Doença Crônica</strong>
                </p>
                <p>Não informado</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default ClientHome;
