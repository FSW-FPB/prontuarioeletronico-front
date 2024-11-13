import React from "react";
import Link from "next/link";
import "./clientpage/ClientHome.css";

type SidebarProps = {
  activePage: string; 
};

const Sidebar = ({ activePage }: SidebarProps) => {
  return (
    <aside className="sidebar">
      <h2>MedTrack</h2>
      <nav>
        <ul>
          <li className={activePage === "home" ? "active" : ""}>
            <Link href="./clientpage/">Tela Inicial</Link>
          </li>
          <li className={activePage === "lista-espera" ? "active" : ""}>
            <Link href="./listwaiting/">Lista de Espera</Link>
          </li>
          <li className={activePage === "agendamento" ? "active" : ""}>
            <Link href="./agendamento/">Agendamento</Link>
          </li>
          <li className={activePage === "configuracoes" ? "active" : ""}>
            <Link href="./configuracoes">Configurações</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
