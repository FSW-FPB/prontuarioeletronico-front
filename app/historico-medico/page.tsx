"use client";
import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import HistoricoMedicoComponent from "@/components/clientpage/historico-medico/HistoricoMedicoComponent";

function HistoricoMedico() {
  return (
    <AuthProvider>
      <HistoricoMedicoComponent />
    </AuthProvider>
  );
}

export default HistoricoMedico;
