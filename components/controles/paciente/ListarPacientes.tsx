import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { fetchPacientes } from "@/hooks/usePacients";
import IPaciente from "@/types/IPaciente";
import { IPageable } from "@/types/IPageable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const ListarPacientes = () => {
  const [pageable, setPageable] = useState<IPageable | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedPaciente, setSelectedPaciente] = useState<IPaciente | null>(
    null
  );
  const [editedName, setEditedName] = useState("");

  const fetchData = async (pageNumber: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPacientes(pageNumber);
      setPageable(data);
    } catch (err: any) {
      console.error("Erro ao buscar pacientes:", err);
      setError(err.message || "Erro desconhecido.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (pageable && !pageable.last) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pageable && !pageable.first) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleOpenEditModal = (paciente: IPaciente) => {
    setSelectedPaciente(paciente);
    setEditedName(paciente.dadosPessoais.nome); // Preenche com o nome atual para editar
    setOpenEditModal(true);
  };

  const handleOpenDeleteModal = (paciente: IPaciente) => {
    setSelectedPaciente(paciente);
    setOpenDeleteModal(true);
  };

  const handleEditPaciente = () => {
    if (selectedPaciente) {
      // Lógica para editar o paciente
      console.log("Editando paciente", selectedPaciente.id, editedName);
      setOpenEditModal(false);
    }
  };

  const handleDeletePaciente = () => {
    if (selectedPaciente) {
      // Lógica para excluir o paciente
      console.log("Excluindo paciente", selectedPaciente.id);
      setOpenDeleteModal(false);
    }
  };

  return (
    <Box sx={{ padding: 2, mt: 6 }}>
      <Typography variant="h4" sx={{ mb: 2, color: "#696969" }}>
        Listagem de Pacientes
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Typography color="error">{error}</Typography>
      ) : (
        <>
          {pageable && pageable.content.length > 0 ? (
            <>
              <TableContainer
                sx={{
                  maxHeight: pageable.content.length > 3 ? 350 : "auto", // Aplica o scroll se houver mais de 5 pacientes
                  overflowY: pageable.content.length > 3 ? "auto" : "visible", // Ativa o scroll vertical se houver mais de 5 pacientes
                }}
              >
                <Table>
                  <TableHead
                    sx={{
                      position: "sticky",
                      top: 0,
                      backgroundColor: "#efe",
                      zIndex: 1,
                    }}
                  >
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Nome</TableCell>
                      <TableCell>Email</TableCell>
                      <TableCell>CPF</TableCell>
                      <TableCell>Ações</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {Array.isArray(pageable.content) &&
                    pageable.content.every(
                      (item) => "id" in item && "dadosPessoais" in item
                    ) ? (
                      (pageable.content as IPaciente[])
                        .sort((a, b) => a.id - b.id)
                        .map((paciente: IPaciente) => (
                          <TableRow key={paciente.id}>
                            <TableCell>{paciente.id}</TableCell>
                            <TableCell>{paciente.dadosPessoais.nome}</TableCell>
                            <TableCell>{paciente.email}</TableCell>
                            <TableCell>{paciente.dadosPessoais.cpf}</TableCell>
                            <TableCell>
                              <IconButton
                                onClick={() => handleOpenEditModal(paciente)}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                onClick={() => handleOpenDeleteModal(paciente)}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))
                    ) : (
                      <Typography color="error">
                        Dados inválidos ou tipo errado.
                      </Typography>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
              >
                <Button
                  onClick={handlePreviousPage}
                  disabled={pageable.first || loading}
                  variant="contained"
                >
                  Anterior
                </Button>
                <Typography>
                  Página {pageable.number + 1} de {pageable.totalPages}
                </Typography>
                <Button
                  onClick={handleNextPage}
                  disabled={pageable.last || loading}
                  variant="contained"
                >
                  Próxima
                </Button>
              </Box>
            </>
          ) : (
            <Typography>Nenhum paciente encontrado.</Typography>
          )}
        </>
      )}

      {/* Modal de Edição */}
      <Dialog open={openEditModal} onClose={() => setOpenEditModal(false)}>
        <DialogTitle>Editar Paciente</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Nome"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)}
            margin="normal"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenEditModal(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleEditPaciente} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal de Exclusão */}
      <Dialog open={openDeleteModal} onClose={() => setOpenDeleteModal(false)}>
        <DialogTitle>Excluir Paciente</DialogTitle>
        <DialogContent>
          <Typography>
            Tem certeza de que deseja excluir este paciente?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteModal(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeletePaciente} color="primary">
            Excluir
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ListarPacientes;
