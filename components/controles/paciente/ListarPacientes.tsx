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
import {
  fetchPacientes,
  fetchPacienteById,
  updatePaciente,
  deletePaciente,
} from "@/hooks/usePacients";
import { updateDadosPessoais } from "@/hooks/useDadosPessoais";
import IPaciente from "@/types/IPaciente";
import { IPageable } from "@/types/IPageable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditModal from "../EditModal";
import DeleteModal from "../DeleteModal";

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
  const [editedCpf, setEditedCpf] = useState("");
  const [editedCep, setEditedCep] = useState("");
  const [editedTelefone, setEditedTelefone] = useState("");
  const [editedData_nascimento, setEditedData_nascimento] = useState("");
  const [editedStatus, setEditedStatus] = useState("");
  const [editedGenero, setEditedGenero] = useState("");
  const [editedImgUrl, setEditedImgUrl] = useState("");
  const [editedTipoSanguineo, setEditedTipoSanguineo] = useState("");
  const [editedAlergia, setEditedAlergia] = useState("");
  const [editedDoencasCronicas, setEditedDoencasCronicas] = useState("");

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

  const handleOpenEditModal = async (pacienteId: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPacienteById(pacienteId);
      setSelectedPaciente(data);
      setEditedName(data.dadosPessoais.nome);
      setEditedCep(data.dadosPessoais.cep);
      setEditedCpf(data.dadosPessoais.cpf);
      setEditedData_nascimento(data.dadosPessoais.data_nascimento);
      setEditedGenero(data.dadosPessoais.genero);
      setEditedStatus(data.dadosPessoais.status);
      setEditedTelefone(data.dadosPessoais.telefone);
      setEditedImgUrl(data.dadosPessoais.imgUrl);

      setEditedDoencasCronicas(data.doencasCronicas);
      setEditedTipoSanguineo(data.tipoSanguineo);
      setEditedAlergia(data.alergia);

      setOpenEditModal(true);
    } catch (err: any) {
      console.error("Erro ao buscar dados do paciente:", err);
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

  const handleOpenDeleteModal = (paciente: IPaciente) => {
    setSelectedPaciente(paciente);
    setOpenDeleteModal(true);
  };

  const handleEditPaciente = async () => {
    if (selectedPaciente) {
      await updateDadosPessoais(
        selectedPaciente.dadosPessoais.id,
        editedName,
        editedCpf,
        editedTelefone,
        editedCep,
        editedStatus,
        editedData_nascimento,
        editedGenero,
        editedImgUrl
      );

      await updatePaciente(
        selectedPaciente.id,
        editedTipoSanguineo,
        editedDoencasCronicas,
        editedAlergia
      );
      fetchData(currentPage);
      setOpenEditModal(false);
    }
  };

  const handleDeletePaciente = () => {
    if (selectedPaciente) {
      deletePaciente(selectedPaciente.id);
      fetchData(currentPage);
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
                                onClick={() => handleOpenEditModal(paciente.id)}
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

              <EditModal
                formType={1}
                open={openEditModal}
                setOpen={setOpenEditModal}
                editedCep={editedCep}
                setEditedCep={setEditedCep}
                editedCpf={editedCpf}
                setEditedCpf={setEditedCpf}
                editedTelefone={editedTelefone}
                setEditedTelefone={setEditedTelefone}
                editedName={editedName}
                setEditedName={setEditedName}
                editedImgUrl={editedImgUrl}
                setEditedImgUrl={setEditedImgUrl}
                editedGenero={editedGenero}
                setEditedGenero={setEditedGenero}
                editedData_nascimento={editedData_nascimento}
                setEditedData_nascimento={setEditedData_nascimento}
                editedStatus={editedStatus}
                setEditedStatus={setEditedStatus}
                editedDoencasCronicas={editedDoencasCronicas}
                setEditedDoencasCronicas={setEditedDoencasCronicas}
                editedTipoSanguineo={editedTipoSanguineo}
                setEditedTipoSanguineo={setEditedTipoSanguineo}
                editedAlergia={editedAlergia}
                setEditedAlergia={setEditedAlergia}
                handleEditPaciente={handleEditPaciente}
              />

              <DeleteModal
                formType={1}
                handleDelete={handleDeletePaciente}
                open={openDeleteModal}
                setOpen={setOpenDeleteModal}
              />
            </>
          ) : (
            <Typography>Nenhum paciente encontrado.</Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default ListarPacientes;
