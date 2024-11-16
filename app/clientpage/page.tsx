"use client";
import React from "react";
import ClientHome from "../../components/clientpage/paginicial/clientHome";
import { AuthProvider, useAuth } from "@/context/AuthContext";

function HomePageContent() {
  const { idUsuario, tipoUsuario } = useAuth(); // Acessa o idUsuario do AuthContext

  if (!idUsuario || !tipoUsuario) {
    return <div>Carregando...</div>; // Exibe um estado de carregamento ou mensagem
  }

  return <ClientHome idUser={idUsuario} tipoUsuario={tipoUsuario} />;
}

function HomePage() {
  return (
    <AuthProvider>
      <HomePageContent />
    </AuthProvider>
  );
}

export default HomePage;
