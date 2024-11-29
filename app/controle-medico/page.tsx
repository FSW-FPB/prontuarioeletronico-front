"use client";
import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import Sidebar from "@/components/sidebar";
import CadastrarMedico from "@/components/controles/medicos/CadastrarMedico";
import ListarMedicos from "@/components/controles/medicos/ListarMedico";

function ControleMedicPage() {
  return (
    <AuthProvider>
      <div className="flex">
        <Sidebar activePage="controle-medico" />
        <div
          className="bg-gray-100 flex-col items-center"
          style={{ width: "84%" }}
        >
          <CadastrarMedico />
          <ListarMedicos />
        </div>
      </div>
    </AuthProvider>
  );
}

export default ControleMedicPage;
