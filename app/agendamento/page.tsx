"use client";
import React from "react";
import Agendamento from "../../components/clientpage/agendamento/agendamento";
import { AuthProvider } from "@/context/AuthContext";

function AgendamentoPage() {
  return (
    <AuthProvider>
      <Agendamento />
    </AuthProvider>
  );
}

export default AgendamentoPage;
