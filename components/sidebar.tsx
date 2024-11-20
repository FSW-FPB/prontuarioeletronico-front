import React from "react";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUsers,
  faCalendarAlt,
  faHeartPulse,
  faCog,
  faMagnifyingGlass,
  faUserDoctor,
  faUser,
  faCalendarDays,
  faBedPulse,
} from "@fortawesome/free-solid-svg-icons";
import { useAuth } from "@/context/AuthContext";

type SidebarProps = {
  activePage: string;
};

const Sidebar = ({ activePage }: SidebarProps) => {
  const { tipoUsuario } = useAuth();

  if (!tipoUsuario) {
    return null;
  }

  const menus: Record<number, { title: string; href: string; icon: any }[]> = {
    1: [
      { title: "Tela Inicial", href: "/clientpage", icon: faHome },
      { title: "Agendamento", href: "/agendamento", icon: faCalendarAlt },
      { title: "Lista de Espera", href: "/listwaiting", icon: faUsers },
      {
        title: "Histórico Médico",
        href: "/historico-medico",
        icon: faBedPulse,
      },
      { title: "Configurações", href: "/configuracoes", icon: faCog },
    ],
    2: [
      { title: "Tela Inicial", href: "/clientpage", icon: faHome },
      { title: "Minhas Consultas", href: "/consultas", icon: faHeartPulse },
      {
        title: "Histórico Consultas",
        href: "/historico-consultas",
        icon: faCalendarDays,
      },
      { title: "Verificar CID", href: "/cid", icon: faMagnifyingGlass },
      { title: "Configurações", href: "/configuracoes", icon: faCog },
    ],
    3: [
      { title: "Tela Inicial", href: "/clientpage", icon: faHome },
      {
        title: "Controle de Usuário",
        href: "/controle-usuario",
        icon: faUser,
      },
      {
        title: "Controle de Médico",
        href: "/controle-medico",
        icon: faUserDoctor,
      },
      { title: "Configurações", href: "/configuracoes", icon: faCog },
    ],
  };

  const userMenus = menus[tipoUsuario] || menus[1];

  return (
    <aside className="w-64 bg-teal-700 text-white min-h-screen">
      <h2 className="text-2xl font-bold text-center py-6">MedTrack</h2>
      <nav>
        <ul className="space-y-2">
          {userMenus.map((menu, index) => {
            const menuPage = menu.href.replace("/", "");
            return (
              <li
                key={index}
                className={`px-4 py-3 flex items-center ${
                  activePage === menuPage ||
                  (activePage === "home" && menuPage === "clientpage")
                    ? "bg-teal-900"
                    : ""
                }`}
              >
                <FontAwesomeIcon icon={menu.icon} className="w-5 h-5 mr-3" />
                <Link href={menu.href}>
                  <span className="text-lg">{menu.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
