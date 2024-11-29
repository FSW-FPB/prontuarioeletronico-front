"use client";
import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import Sidebar from "@/components/sidebar";
import CadastrarPaciente from "@/components/controles/paciente/CadastrarPaciente";
import ListarPacientes from "@/components/controles/paciente/ListarPacientes";

function ControleUserPage() {
  return (
    <AuthProvider>
      <div className="flex">
        <Sidebar activePage="controle-usuario" />
        <div
          className="bg-gray-100 flex-col items-center"
          style={{ width: "84%" }}
        >
          <CadastrarPaciente />
          <ListarPacientes />
        </div>
      </div>
    </AuthProvider>
  );
}

export default ControleUserPage;
