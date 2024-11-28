import Sidebar from "../sidebar";
import BuscaMedicamentos from "./BuscarMedicamento";
import TabelaAgendamentos from "./TabelaAgendamentos";

function ConsultasComponent() {
  return (
    <div className="flex">
      <Sidebar activePage="consultas" />
      <main className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-100">
        <BuscaMedicamentos />
        <TabelaAgendamentos />
      </main>
    </div>
  );
}

export default ConsultasComponent;
