"use client";
import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
  CircularProgress,
} from "@mui/material";
import { fetchPrescricaoById } from "@/hooks/usePrescricao";
import { useSearchParams } from "next/navigation";
import IPrescricao from "@/types/IPrescricao";
import { AuthProvider } from "@/context/AuthContext";

const PrescricaoMedica = () => {
  const searchParams = useSearchParams();
  const [prescricao, setPrescricao] = useState<IPrescricao | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const idPrescricao = searchParams.get("id"); // Obtenha o ID como string
  const medicoNome = searchParams.get("medico");
  const pacienteNome = searchParams.get("paciente");
  const crm = searchParams.get("crm");

  useEffect(() => {
    if (!idPrescricao) {
      setError("ID da prescrição não fornecido.");
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const data = await fetchPrescricaoById(idPrescricao);
        console.log("Dados da prescrição:", data);
        setPrescricao(data);

        console.log("ID do Médico:", data.medico_id);
        console.log("ID do Paciente:", data.paciente_id);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar a prescrição.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idPrescricao]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <Container style={{ textAlign: "center", marginTop: "20px" }}>
        <CircularProgress />
        <Typography>Carregando...</Typography>
      </Container>
    );
  }

  return (
    <AuthProvider>
      <Container
        maxWidth="md"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Paper
          elevation={3}
          style={{
            padding: "40px",
            textAlign: "center",
            width: "100%",
            maxWidth: "800px",
          }}
        >
          <Typography variant="h4" gutterBottom>
            Prescrição Médica
          </Typography>
          <Typography variant="subtitle1">
            <strong>Médico:</strong>{" "}
            {`${medicoNome} - ${crm}` || "Não informado"}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Paciente:</strong> {pacienteNome || "Não informado"}
          </Typography>
          <Typography variant="subtitle1">
            <strong>Data:</strong>{" "}
            {new Date(prescricao?.data_prescricao || "").toLocaleDateString() ||
              "N/A"}
          </Typography>
          <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
            Diagnóstico
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>Doença:</strong> {prescricao?.doenca || "Não informado"}
          </Typography>
          <Typography variant="body1" gutterBottom>
            <strong>CID:</strong> {prescricao?.CID || "Não informado"}
          </Typography>
          <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
            Medicamentos
          </Typography>
          <List
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {prescricao && prescricao?.medicamentos?.length > 0 ? (
              prescricao.medicamentos.map((med: any, index: number) => (
                <>
                  <ListItem key={index}>
                    <ListItemText
                      primary={`${med.informacoes_medicamento.nome} - ${med.dosagem}`}
                      secondary={
                        med.informacoes_medicamento.tipo ||
                        "Sem tipo determinado"
                      }
                    />
                  </ListItem>
                </>
              ))
            ) : (
              <Typography>Nenhum medicamento prescrito.</Typography>
            )}
          </List>
          <Typography variant="h6" gutterBottom style={{ marginTop: "20px" }}>
            Observações
          </Typography>
          <Typography variant="body1">
            {prescricao?.observacao || "Sem observações adicionais."}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={handlePrint}
            style={{ marginTop: "20px" }}
          >
            Imprimir Prescrição
          </Button>
        </Paper>
      </Container>
    </AuthProvider>
  );
};

export default PrescricaoMedica;
