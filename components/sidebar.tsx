import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faUsers, faCalendarAlt, faCog } from "@fortawesome/free-solid-svg-icons";

type SidebarProps = {
  activePage: string;
};

const Sidebar = ({ activePage }: SidebarProps) => {
  return (
    <aside className="w-64 bg-teal-700 text-white min-h-screen">
      <h2 className="text-2xl font-bold text-center py-6">MedTrack</h2>
      <nav>
        <ul className="space-y-2">
          <li className={`px-4 py-3 flex items-center ${activePage === "home" ? "bg-teal-900" : ""}`}>
            <FontAwesomeIcon icon={faHome} className="w-5 h-5 mr-3" />
            <Link href="./clientpage/">
              <span className="text-lg">Tela Inicial</span>
            </Link>
          </li>
          <li className={`px-4 py-3 flex items-center ${activePage === "lista-espera" ? "bg-teal-900" : ""}`}>
            <FontAwesomeIcon icon={faUsers} className="w-5 h-5 mr-3" />
            <Link href="./listwaiting/">
              <span className="text-lg">Lista de Espera</span>
            </Link>
          </li>
          <li className={`px-4 py-3 flex items-center ${activePage === "agendamento" ? "bg-teal-900" : ""}`}>
            <FontAwesomeIcon icon={faCalendarAlt} className="w-5 h-5 mr-3" />
            <Link href="./agendamento/">
              <span className="text-lg">Agendamento</span>
            </Link>
          </li>
          <li className={`px-4 py-3 flex items-center ${activePage === "configuracoes" ? "bg-teal-900" : ""}`}>
            <FontAwesomeIcon icon={faCog} className="w-5 h-5 mr-3" />
            <Link href="./configuracoes">
              <span className="text-lg">Configurações</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
