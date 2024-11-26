import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import React, { FC } from "react";

interface ModalCPFProps {
  open: boolean;
  setIsCPFModalOpen: (value: boolean) => void;
  handleCpfSubmit: () => void;
  cpf: string;
  setCpf: (cpf: string) => void;
}

const ModalCPF: FC<ModalCPFProps> = ({
  open,
  setIsCPFModalOpen,
  handleCpfSubmit,
  cpf,
  setCpf,
}) => {
  return (
    <Modal open={open} onClose={() => setIsCPFModalOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, color: "#606060" }}>
          Digite o CPF
        </Typography>
        <TextField
          label="CPF"
          fullWidth
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#888",
            ":hover": { backgroundColor: "#777" },
          }}
          fullWidth
          onClick={handleCpfSubmit}
        >
          Confirmar
        </Button>
      </Box>
    </Modal>
  );
};

export default ModalCPF;
