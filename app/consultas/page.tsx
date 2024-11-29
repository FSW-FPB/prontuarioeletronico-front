"use client";
import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import ConsultasComponent from "@/components/consultas/ConsultasComponent";

function HistoricoMedico() {
  return (
    <AuthProvider>
      <ConsultasComponent />
    </AuthProvider>
  );
}

export default HistoricoMedico;
