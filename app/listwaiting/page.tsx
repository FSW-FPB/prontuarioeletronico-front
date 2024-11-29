"use client";
import React from "react";
import ListEspera from "../../components/clientpage/listespera/listespera";
import { AuthProvider } from "@/context/AuthContext";

function ListaEspera() {
  return (
    <AuthProvider>
      <ListEspera />
    </AuthProvider>
  );
}

export default ListaEspera;
