import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { FC } from "react";

interface DeleteModalProps {
  formType: number;
  open: boolean;
  setOpen: (value: boolean) => void;
  handleDelete: () => void;
}

const DeleteModal: FC<DeleteModalProps> = ({
  open,
  formType,
  setOpen,
  handleDelete,
}) => {
  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>
        Excluir{" "}
        {formType == 1 ? "paciente" : formType == 2 ? "médico" : "atendente"}
      </DialogTitle>
      <DialogContent>
        <Typography>
          Tem certeza de que deseja excluir este{" "}
          {formType == 1 ? "paciente" : formType == 2 ? "médico" : "atendente"}?
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="primary">
          Cancelar
        </Button>
        <Button onClick={handleDelete} color="primary">
          Excluir
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
