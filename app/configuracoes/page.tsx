"use client";
import React from "react";
import Configuracoes from "@/components/clientpage/configuracoes/configuracoes";
import { AuthProvider } from "@/context/AuthContext";

function Config() {
  return (
    <AuthProvider>
      <Configuracoes />
    </AuthProvider>
  );
}

export default Config;
