import { useState, useEffect } from "react";
import Sidebar from "../sidebar";
import {
  Modal,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  FilledInput,
} from "@mui/material";
import { fetchCids, fetchCIDByCode, fetchCIDByName } from "@/hooks/useCID";
import ICid from "@/types/ICid";

function CidComponentPage() {
  const [searchTerm, setSearchTerm] = useState(""); // Para o nome
  const [searchCode, setSearchCode] = useState(""); // Para o código
  const [cidList, setCidList] = useState<ICid[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchOption, setSearchOption] = useState("byAll");
  const [openModal, setOpenModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 200; // Número de itens por página

  // Função para buscar CIDs com base na página e nos filtros
  const searchCids = async (page: number) => {
    if (searchOption === "byTerm" && !searchTerm && !searchCode) return;

    setIsLoading(true);
    setError("");
    setCidList([]); // Limpa os resultados anteriores antes de buscar novos CIDs

    try {
      let response;
      if (searchOption === "byTerm" && searchTerm) {
        response = await fetchCIDByName(searchTerm);
        setCidList(response);
        setTotalPages(Math.ceil(response.length / itemsPerPage));
        setCurrentPage(1);
      } else if (searchOption === "byCode" && searchCode) {
        response = await fetchCIDByCode(searchCode);
        setCidList(response);
        setTotalPages(Math.ceil(response.length / itemsPerPage));
        setCurrentPage(1);
      } else {
        response = await fetchCids(page, itemsPerPage);
        setCidList(response);
        setTotalPages(Math.ceil(34636 / itemsPerPage)); // Quantidade de CIDs
      }

      if (response) {
        setOpenModal(true); // Abre o modal após a resposta
      } else {
        setError("Nenhum CID encontrado.");
      }
    } catch (err) {
      setError("Erro ao buscar CIDs. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const changePage = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
    searchCids(newPage); // Busca os dados da nova página
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handlePageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const page = parseInt(event.target.value, 10);
    if (!isNaN(page)) {
      setCurrentPage(page);
      searchCids(page); // Busca os dados da nova página
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar activePage="cid" />

      <main className="main-content flex-1 bg-gray-50 flex justify-center items-center flex-col p-4">
        <div className="search-container mb-4 text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Buscar CIDs</h1>
          <div className="flex justify-center items-center mb-4">
            <div className="mr-4">
              <input
                type="radio"
                id="byTerm"
                name="searchOption"
                checked={searchOption === "byTerm"}
                onChange={() => setSearchOption("byTerm")}
              />
              <label htmlFor="byTerm" className="ml-2 text-gray-700">
                Buscar por nome
              </label>
            </div>
            <div className="mr-4">
              <input
                type="radio"
                id="byCode"
                name="searchOption"
                checked={searchOption === "byCode"}
                onChange={() => setSearchOption("byCode")}
              />
              <label htmlFor="byCode" className="ml-2 text-gray-700">
                Buscar por código
              </label>
            </div>
            <div className="mr-4">
              <input
                type="radio"
                id="allCids"
                name="searchOption"
                checked={searchOption === "allCids"}
                onChange={() => setSearchOption("allCids")}
              />
              <label htmlFor="allCids" className="ml-2 text-gray-700">
                Buscar todos os CIDs
              </label>
            </div>
          </div>

          {searchOption === "byTerm" && (
            <div className="flex justify-center items-center mb-4">
              <input
                type="text"
                className="p-2 border border-gray-300 rounded-l-md w-2/3 text-gray-800"
                placeholder="Digite o nome do CID"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          )}

          {searchOption === "byCode" && (
            <div className="flex justify-center items-center mb-4">
              <input
                type="text"
                className="p-2 border border-gray-300 rounded-l-md w-2/3 text-gray-800"
                placeholder="Digite o código do CID"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value)}
              />
            </div>
          )}

          <button
            onClick={() => searchCids(currentPage)} // Passa a página atual para a busca
            className="ml-2 p-2 bg-teal-700 text-white rounded-md w-1/3"
            disabled={isLoading}
          >
            {isLoading ? "Buscando..." : "Buscar"}
          </button>
        </div>

        <div className="cid-results w-full">
          {error && <p className="text-center text-red-500">{error}</p>}
        </div>

        {/* Modal para exibir os resultados */}
        <Modal
          open={openModal}
          onClose={handleCloseModal}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
        >
          <div
            className="modal-content p-6 bg-white rounded-lg max-w-4xl mx-auto mt-10 flex flex-col"
            style={{ height: "600px" }}
          >
            <h2
              id="modal-title"
              className="text-xl font-bold text-gray-800 mb-4"
            >
              Resultados da Busca de CIDs
            </h2>

            {/* Tabela com rolagem */}
            <div className="flex-1 overflow-y-auto">
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>
                        <strong>Código</strong>
                      </TableCell>
                      <TableCell>
                        <strong>Nome</strong>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {cidList.map((cid, index) => (
                      <TableRow key={index}>
                        <TableCell>{cid.code || cid.Código}</TableCell>
                        <TableCell>{cid.name || cid.Nome}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>

            {/* Navegação de página fixada no fundo */}
            <div className="flex justify-between mt-4 pt-4 border-t">
              <Button
                variant="contained"
                color="warning"
                size="small"
                onClick={() => changePage(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Anterior
              </Button>
              <span className="text-gray-500">
                Página{" "}
                <FilledInput
                  type="number"
                  value={currentPage}
                  onChange={handlePageChange}
                  sx={{
                    width: "100px",
                    textAlign: "center",
                    fontWeight: "bold",
                  }}
                />
                de {totalPages}
              </span>
              <Button
                variant="contained"
                color="warning"
                size="small"
                onClick={() => changePage(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Próxima
              </Button>
            </div>
          </div>
        </Modal>
      </main>
    </div>
  );
}

export default CidComponentPage;
