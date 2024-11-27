import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { FC } from "react";

interface EditModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  formType: number;
  editedName: string;
  setEditedName: (value: string) => void;
  editedCpf: string;
  setEditedCpf: (value: string) => void;
  editedCep: string;
  setEditedCep: (value: string) => void;
  editedTelefone: string;
  setEditedTelefone: (value: string) => void;
  editedData_nascimento: string;
  setEditedData_nascimento: (value: string) => void;
  editedStatus: string;
  setEditedStatus: (value: string) => void;
  editedImgUrl: string;
  setEditedImgUrl: (value: string) => void;
  editedGenero: string;
  setEditedGenero: (value: string) => void;
  handleEdit: () => void;

  /* Dados Paciente */
  editedTipoSanguineo?: string;
  setEditedTipoSanguineo?: (value: string) => void;
  editedDoencasCronicas?: string;
  setEditedDoencasCronicas?: (value: string) => void;
  editedAlergia?: string;
  setEditedAlergia?: (value: string) => void;

  /* Dados Medico */
  editedEspecialidade?: string;
  setEditedEspecialidade?: (value: string) => void;
  editedCrm?: string;
  setEditedCrm?: (value: string) => void;
}

const EditModal: FC<EditModalProps> = ({
  open,
  setOpen,
  editedName,
  setEditedName,
  editedCep,
  setEditedCep,
  editedCpf,
  setEditedCpf,
  editedData_nascimento,
  setEditedData_nascimento,
  editedGenero,
  setEditedGenero,
  editedImgUrl,
  setEditedImgUrl,
  editedStatus,
  setEditedStatus,
  editedTelefone,
  setEditedTelefone,
  handleEdit,
  formType,
  editedAlergia,
  setEditedAlergia,
  editedTipoSanguineo,
  setEditedTipoSanguineo,
  editedDoencasCronicas,
  setEditedDoencasCronicas,
  editedCrm,
  setEditedCrm,
  editedEspecialidade,
  setEditedEspecialidade,
}) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>
        Editar{" "}
        {formType === 1 ? "Paciente" : formType == 2 ? "Medico" : "Atendente"}
      </DialogTitle>
      <DialogContent>
        <TextField
          sx={{ mb: 2 }}
          fullWidth
          label="Nome"
          value={editedName}
          onChange={(e) => setEditedName(e.target.value)}
          margin="normal"
        />
        <TextField
          sx={{ mb: 2 }}
          fullWidth
          label="CPF"
          value={editedCpf}
          onChange={(e) => setEditedCpf(e.target.value)}
          margin="normal"
        />
        <TextField
          sx={{ mb: 2 }}
          fullWidth
          label="CEP"
          value={editedCep}
          onChange={(e) => setEditedCep(e.target.value)}
          margin="normal"
        />
        <TextField
          sx={{ mb: 2 }}
          fullWidth
          label="Telefone"
          value={editedTelefone}
          onChange={(e) => setEditedTelefone(e.target.value)}
          margin="normal"
        />
        <TextField
          sx={{ mb: 2 }}
          label="Data de Nascimento"
          fullWidth
          name="data_nascimento"
          type="date"
          value={editedData_nascimento}
          onChange={(e) => setEditedData_nascimento(e.target.value)}
        />
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Gênero</InputLabel>
          <Select
            name="genero"
            value={editedGenero}
            onChange={(e) => setEditedGenero(e.target.value)}
          >
            <MenuItem value="M">Masculino</MenuItem>
            <MenuItem value="F">Feminino</MenuItem>
            <MenuItem value="O">Outro</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel>Status</InputLabel>
          <Select
            name="status"
            value={editedStatus}
            onChange={(e) => setEditedStatus(e.target.value)}
          >
            <MenuItem value="ATIVO">ATIVO</MenuItem>
            <MenuItem value="INATIVO">INATIVO</MenuItem>
            <MenuItem value="BLOQUEADO">BLOQUEADO</MenuItem>
          </Select>
        </FormControl>
        <TextField
          sx={{ mb: 2 }}
          fullWidth
          label="URL da imagem"
          value={editedImgUrl}
          onChange={(e) => setEditedImgUrl(e.target.value)}
          margin="normal"
        />

        {formType === 1 ? (
          <>
            <TextField
              sx={{ mb: 2 }}
              fullWidth
              label="Alergia"
              value={editedAlergia}
              onChange={(e) =>
                setEditedAlergia && setEditedAlergia(e.target.value)
              }
              margin="normal"
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Tipo Sanguíneo</InputLabel>
              <Select
                name="tipoSanguineo"
                value={editedTipoSanguineo ?? "?"}
                onChange={(e) =>
                  setEditedTipoSanguineo &&
                  setEditedTipoSanguineo(e.target.value)
                }
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
              sx={{ mb: 2 }}
              fullWidth
              label="Doenças Crônicas"
              value={editedDoencasCronicas}
              onChange={(e) =>
                setEditedDoencasCronicas &&
                setEditedDoencasCronicas(e.target.value)
              }
              margin="normal"
            />
          </>
        ) : formType === 2 ? (
          <>
            <TextField
              sx={{ mb: 2 }}
              fullWidth
              label="CRM"
              value={editedCrm}
              onChange={(e) => setEditedCrm && setEditedCrm(e.target.value)}
              margin="normal"
            />
            <TextField
              sx={{ mb: 2 }}
              fullWidth
              label="Especialidade(s)"
              value={editedEspecialidade}
              onChange={(e) =>
                setEditedEspecialidade && setEditedEspecialidade(e.target.value)
              }
              margin="normal"
            />
          </>
        ) : (
          ""
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleEdit} color="primary">
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditModal;
