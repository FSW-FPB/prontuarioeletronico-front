"use client";
import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import Sidebar from "@/components/sidebar";
import CadastrarAtendente from "@/components/controles/admins/CadastrarAdmin";
import ListarAdmins from "@/components/controles/admins/ListarAdmin";

function ControleAdminPage() {
  return (
    <AuthProvider>
      <div className="flex">
        <Sidebar activePage="controle-atendente" />
        <div
          className="bg-gray-100 flex-col items-center"
          style={{ width: "84%" }}
        >
          <CadastrarAtendente />
          <ListarAdmins />
        </div>
      </div>
    </AuthProvider>
  );
}

export default ControleAdminPage;
