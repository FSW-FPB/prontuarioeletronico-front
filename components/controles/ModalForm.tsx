import { IFormData } from "@/types/IFormData";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { FC } from "react";

interface ModalFormProps {
  open: boolean;
  closeModalForm: () => void;
  handleFormSubmit: (e: any) => void;
  formData: IFormData;
  handleInputChange: (event: any) => void;
  setFormData: React.Dispatch<React.SetStateAction<IFormData>>;
  formType: number;
}

const ModalForm: FC<ModalFormProps> = ({
  open,
  closeModalForm,
  handleFormSubmit,
  formData,
  handleInputChange,
  setFormData,
  formType,
}) => {
  return (
    <Modal open={open} onClose={closeModalForm}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 800,
          bgcolor: "#fff",
          p: 3,
          borderRadius: 2,
          boxShadow: 24,
          maxHeight: "80vh",
          overflowY: "auto",
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, color: "#606060" }}>
          Dados Pessoais
        </Typography>
        <form onSubmit={handleFormSubmit}>
          <TextField
            label="Nome"
            fullWidth
            name="nome"
            value={formData.nome}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Data de Nascimento"
            fullWidth
            name="data_nascimento"
            type="date"
            value={formData.data_nascimento}
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                data_nascimento: e.target.value,
              }))
            }
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Gênero</InputLabel>
            <Select
              name="genero"
              value={formData.genero}
              onChange={handleInputChange}
            >
              <MenuItem value="M">Masculino</MenuItem>
              <MenuItem value="F">Feminino</MenuItem>
              <MenuItem value="O">Outro</MenuItem>
            </Select>
          </FormControl>
          <TextField
            label="Telefone"
            fullWidth
            name="telefone"
            value={formData.telefone}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="CEP"
            fullWidth
            name="cep"
            value={formData.cep}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="CPF"
            fullWidth
            name="cpf"
            value={formData.cpf}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="URL da imagem"
            fullWidth
            name="imgUrl"
            value={formData.imgUrl}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <Typography variant="h6" sx={{ mt: 2, mb: 2, color: "#606060" }}>
            Dados de Conta
          </Typography>
          <TextField
            label="Email"
            fullWidth
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Senha"
            fullWidth
            name="senha"
            type="password"
            value={formData.senha}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          {formType === 1 && (
            <>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Tipo Sanguíneo</InputLabel>
                <Select
                  name="tipoSanguineo"
                  value={formData.tipoSanguineo ?? "?"}
                  onChange={handleInputChange}
                >
                  <MenuItem value="A+">A+</MenuItem>
                  <MenuItem value="A-">A-</MenuItem>
                  <MenuItem value="B+">B+</MenuItem>
                  <MenuItem value="B-">B-</MenuItem>
                  <MenuItem value="O+">O+</MenuItem>
                  <MenuItem value="O-">O-</MenuItem>
                  <MenuItem value="?">O paciente não sabe</MenuItem>
                </Select>
              </FormControl>
              <TextField
                label="Doenças Crônicas"
                fullWidth
                name="doencasCronicas"
                value={formData.doencasCronicas}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
              <TextField
                label="Alergias"
                fullWidth
                name="alergias"
                value={formData.alergias}
                onChange={handleInputChange}
                sx={{ mb: 2 }}
              />
            </>
          )}
          <Button
            type="submit"
            variant="contained"
            sx={{
              backgroundColor: "#888",
              ":hover": { backgroundColor: "#777" },
            }}
            fullWidth
          >
            Finalizar Cadastro
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default ModalForm;
