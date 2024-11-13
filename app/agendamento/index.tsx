import React from 'react';
import Sidebar from '../components/sidebar';

function Agendamento() {
    return (
        <div className="agendamento-page">
            <Sidebar activePage="agendamento" />
            <main className="main-content">
                <h1>Agendamento</h1>
                <p>Bem-vindo à página de agendamento.</p>
            </main>
        </div>
    );
}

export default Agendamento;
