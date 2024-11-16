"use client";
import React from "react";
import ClientHome from "../../components/clientpage/paginicial/clientHome";
import { AuthProvider } from "@/context/AuthContext";

function HomePage() {
  const idUsuario = 1;

  return (
    <AuthProvider>
      <ClientHome idPaciente={Number(idUsuario)} />
    </AuthProvider>
  );
}

export default HomePage;
