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
} from "@mui/material";
import {
  fetchMedicoById,
  fetchMedicos,
  deleteMedico,
  updateMedico,
} from "@/hooks/useMedicos";
import { updateDadosPessoais } from "@/hooks/useDadosPessoais";
import IMedico from "@/types/IMedico";
import { IPageable } from "@/types/IPageable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditModal from "../EditModal";
import DeleteModal from "../DeleteModal";

const ListarMedicos = () => {
  const [pageable, setPageable] = useState<IPageable | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedMedico, setselectedMedico] = useState<IMedico | null>(null);
  const [editedName, setEditedName] = useState("");
  const [editedCpf, setEditedCpf] = useState("");
  const [editedCep, setEditedCep] = useState("");
  const [editedTelefone, setEditedTelefone] = useState("");
  const [editedData_nascimento, setEditedData_nascimento] = useState("");
  const [editedStatus, setEditedStatus] = useState("");
  const [editedGenero, setEditedGenero] = useState("");
  const [editedImgUrl, setEditedImgUrl] = useState("");

  const [editedCrm, setEditedCrm] = useState("");
  const [editedEspecialidade, setEditedEspecialidade] = useState("");

  const fetchData = async (pageNumber: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMedicos(pageNumber);
      setPageable(data);
    } catch (err: any) {
      console.error("Erro ao buscar medicos:", err);
      setError(err.message || "Erro desconhecido.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenEditModal = async (medicoId: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMedicoById(medicoId);
      setselectedMedico(data);
      setEditedName(data.dadosPessoais.nome);
      setEditedCep(data.dadosPessoais.cep);
      setEditedCpf(data.dadosPessoais.cpf);
      setEditedData_nascimento(data.dadosPessoais.data_nascimento);
      setEditedGenero(data.dadosPessoais.genero);
      setEditedStatus(data.dadosPessoais.status);
      setEditedTelefone(data.dadosPessoais.telefone);
      setEditedImgUrl(data.dadosPessoais.imgUrl);

      setEditedCrm(data.crm);
      setEditedEspecialidade(data.especialidade);

      setOpenEditModal(true);
    } catch (err: any) {
      console.error("Erro ao buscar dados do medico:", err);
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

  const handleOpenDeleteModal = (medico: IMedico) => {
    setselectedMedico(medico);
    setOpenDeleteModal(true);
  };

  const handleEditmedico = async () => {
    if (selectedMedico) {
      await updateDadosPessoais(
        selectedMedico.dadosPessoais.id,
        editedName,
        editedCpf,
        editedTelefone,
        editedCep,
        editedStatus,
        editedData_nascimento,
        editedGenero,
        editedImgUrl
      );

      await updateMedico(selectedMedico.id, editedCrm, editedEspecialidade);
      fetchData(currentPage);
      setOpenEditModal(false);
    }
  };

  const handleDeletemedico = () => {
    if (selectedMedico) {
      deleteMedico(selectedMedico.id);
      fetchData(currentPage);
      setOpenDeleteModal(false);
    }
  };

  return (
    <Box sx={{ padding: 2, mt: 6 }}>
      <Typography variant="h4" sx={{ mb: 2, color: "#696969" }}>
        Listagem de medicos
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
                  maxHeight: pageable.content.length > 3 ? 350 : "auto", // Aplica o scroll se houver mais de 5 medicos
                  overflowY: pageable.content.length > 3 ? "auto" : "visible", // Ativa o scroll vertical se houver mais de 5 medicos
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
                      (pageable.content as IMedico[])
                        .sort((a, b) => a.id - b.id)
                        .map((medico: IMedico) => (
                          <TableRow key={medico.id}>
                            <TableCell>{medico.id}</TableCell>
                            <TableCell>{medico.dadosPessoais.nome}</TableCell>
                            <TableCell>{medico.email}</TableCell>
                            <TableCell>{medico.dadosPessoais.cpf}</TableCell>
                            <TableCell>
                              <IconButton
                                onClick={() => handleOpenEditModal(medico.id)}
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                onClick={() => handleOpenDeleteModal(medico)}
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
                formType={2}
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
                editedCrm={editedCrm}
                setEditedCrm={setEditedCrm}
                editedEspecialidade={editedEspecialidade}
                setEditedEspecialidade={setEditedEspecialidade}
                handleEdit={handleEditmedico}
              />

              <DeleteModal
                formType={2}
                handleDelete={handleDeletemedico}
                open={openDeleteModal}
                setOpen={setOpenDeleteModal}
              />
            </>
          ) : (
            <Typography>Nenhum medico encontrado.</Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default ListarMedicos;
