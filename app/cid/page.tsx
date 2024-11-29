"use client";
import React from "react";
import { AuthProvider } from "@/context/AuthContext";
import CidComponentPage from "@/components/cid/CidComponent";

function CidPage() {
  return (
    <AuthProvider>
      <CidComponentPage />
    </AuthProvider>
  );
}

export default CidPage;
