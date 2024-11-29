import { useState } from "react";
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import IMedicamento from "@/types/IMedicamento";
import { fetchMedicamentoByName } from "@/hooks/useMedicamento";

function BuscaMedicamentos() {
  const [search, setSearch] = useState("");
  const [medicamentos, setMedicamentos] = useState<IMedicamento[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [page, setPage] = useState(0); // Página começa em 0 para paginar corretamente com MUI
  const [rowsPerPage, setRowsPerPage] = useState(100); // Tamanho da página (quantos medicamentos por vez)

  const handleSearch = async () => {
    try {
      // Passando página e tamanho da página para a API
      const response = await fetchMedicamentoByName(
        page + 1,
        search,
        rowsPerPage
      ); // API começa com 1
      if (!response) {
        alert("Erro 404!!!!");
      } else {
        setMedicamentos(response.medicamentos);
        setOpenModal(true);
      }
    } catch (error) {
      console.error("Erro ao buscar medicamentos:", error);
    }
  };

  // Função para mudar de página
  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage); // MUI usa zero-based, então não há necessidade de ajustar a página aqui
    handleSearch();
  };

  // Função para mudar o tamanho da página (número de itens por página)
  const handleChangeRowsPerPage = (event: any) => {
    setPage(0); // Reinicia para a primeira página ao mudar a quantidade de itens
    setRowsPerPage(parseInt(event.target.value, 10));
    handleSearch();
  };

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4 text-gray-600">
        Buscar Medicamentos
      </h2>

      {/* Caixa de pesquisa */}
      <div className="flex mb-4">
        <TextField
          label="Nome do Medicamento"
          variant="outlined"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          onClick={handleSearch}
          sx={{ marginLeft: 2, backgroundColor: "#696969" }}
        >
          Buscar
        </Button>
      </div>

      {/* Modal de medicamentos */}
      <Dialog
        open={openModal}
        onClose={() => setOpenModal(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>Medicamentos Encontrados</DialogTitle>
        <DialogContent>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nome</TableCell>
                  <TableCell>Tipo</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {medicamentos.length > 0 ? (
                  medicamentos.map((medicamento, index) => (
                    <TableRow key={index}>
                      <TableCell>{medicamento.nome}</TableCell>
                      <TableCell>{medicamento.tipo}</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={2} align="center">
                      Nenhum medicamento encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Paginação */}
          <TablePagination
            component="div"
            count={medicamentos.length} // Substitua com o total de medicamentos retornado pela API
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={[100]}
            page={page} // MUI começa em 0, então mantém o valor da página corretamente
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BuscaMedicamentos;
