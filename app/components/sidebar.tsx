import React from 'react';
import Link from 'next/link'; // Importa Link para navegação
import './clientpage/ClientHome.css';

type SidebarProps = {
    activePage: string; // Indica qual página está ativa
};

const Sidebar = ({ activePage }: SidebarProps) => {
    return (
        <aside className="sidebar">
            <h2>MedTrack</h2> 
            <nav>
                <ul>
                    <li className={activePage === 'home' ? 'active' : ''}>
                        <Link href="/clientpage/clientHome">Tela Inicial</Link>
                    </li>
                    <li className={activePage === 'lista-espera' ? 'active' : ''}>
                        <Link href="/clientpage/lista-espera">Lista de Espera</Link>
                    </li>
                    <li className={activePage === 'agendamento' ? 'active' : ''}>
                        <Link href="./agendamento/index">Agendamento</Link>
                    </li>
                    <li className={activePage === 'configuracoes' ? 'active' : ''}>
                        <Link href="/clientpage/configuracoes">Configurações</Link>
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default Sidebar;
