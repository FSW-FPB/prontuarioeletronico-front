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
  fetchAtendenteById,
  fetchAtendentes,
  deleteAtendente,
} from "@/hooks/useAtendente";
import { updateDadosPessoais } from "@/hooks/useDadosPessoais";
import IAtendente from "@/types/IAtendente";
import { IPageable } from "@/types/IPageable";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditModal from "../EditModal";
import DeleteModal from "../DeleteModal";

const ListarAdmins = () => {
  const [pageable, setPageable] = useState<IPageable | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedAtendente, setselectedAtendente] = useState<IAtendente | null>(
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

  const fetchData = async (pageNumber: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAtendentes(pageNumber);
      setPageable(data);
    } catch (err: any) {
      console.error("Erro ao buscar atendentes:", err);
      setError(err.message || "Erro desconhecido.");
    } finally {
      setLoading(false);
    }
  };

  const handleOpenEditModal = async (atendenteId: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchAtendenteById(atendenteId);
      setselectedAtendente(data);
      setEditedName(data.dadosPessoais.nome);
      setEditedCep(data.dadosPessoais.cep);
      setEditedCpf(data.dadosPessoais.cpf);
      setEditedData_nascimento(data.dadosPessoais.data_nascimento);
      setEditedGenero(data.dadosPessoais.genero);
      setEditedStatus(data.dadosPessoais.status);
      setEditedTelefone(data.dadosPessoais.telefone);
      setEditedImgUrl(data.dadosPessoais.imgUrl);

      setOpenEditModal(true);
    } catch (err: any) {
      console.error("Erro ao buscar dados do atendente:", err);
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

  const handleOpenDeleteModal = (atendente: IAtendente) => {
    setselectedAtendente(atendente);
    setOpenDeleteModal(true);
  };

  const handleEditatendente = async () => {
    if (selectedAtendente) {
      await updateDadosPessoais(
        selectedAtendente.dadosPessoais.id,
        editedName,
        editedCpf,
        editedTelefone,
        editedCep,
        editedStatus,
        editedData_nascimento,
        editedGenero,
        editedImgUrl
      );
    }
  };

  const handleDeleteatendente = () => {
    if (selectedAtendente) {
      deleteAtendente(selectedAtendente.id);
      fetchData(currentPage);
      setOpenDeleteModal(false);
    }
  };

  return (
    <Box sx={{ padding: 2, mt: 6 }}>
      <Typography variant="h4" sx={{ mb: 2, color: "#696969" }}>
        Listagem de atendentes
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
                  maxHeight: pageable.content.length > 3 ? 350 : "auto", // Aplica o scroll se houver mais de 5 atendentes
                  overflowY: pageable.content.length > 3 ? "auto" : "visible", // Ativa o scroll vertical se houver mais de 5 atendentes
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
                      (pageable.content as IAtendente[])
                        .sort((a, b) => a.id - b.id)
                        .map((atendente: IAtendente) => (
                          <TableRow key={atendente.id}>
                            <TableCell>{atendente.id}</TableCell>
                            <TableCell>
                              {atendente.dadosPessoais.nome}
                            </TableCell>
                            <TableCell>{atendente.email}</TableCell>
                            <TableCell>{atendente.dadosPessoais.cpf}</TableCell>
                            <TableCell>
                              <IconButton
                                onClick={() =>
                                  handleOpenEditModal(atendente.id)
                                }
                              >
                                <EditIcon />
                              </IconButton>
                              <IconButton
                                onClick={() => handleOpenDeleteModal(atendente)}
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
                formType={3}
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
                handleEdit={handleEditatendente}
              />

              <DeleteModal
                formType={3}
                handleDelete={handleDeleteatendente}
                open={openDeleteModal}
                setOpen={setOpenDeleteModal}
              />
            </>
          ) : (
            <Typography>Nenhum atendente encontrado.</Typography>
          )}
        </>
      )}
    </Box>
  );
};

export default ListarAdmins;
