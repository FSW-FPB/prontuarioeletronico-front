"use client";
import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import HistoricoConsultasComponent from "@/components/historico-consultas/HistoricoConsultasComponent";

function HistoricoMedico() {
  return (
    <AuthProvider>
      <HistoricoConsultasComponent />
    </AuthProvider>
  );
}

export default HistoricoMedico;
