import React, { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar";
import IPaciente from "@/types/IPaciente";
import IMedico from "@/types/IMedico";
import IAtendente from "@/types/IAtendente";
import {
  fetchPacienteById,
  updatePaciente,
  updatePasswordAndEmailPaciente,
} from "@/hooks/usePacients";
import {
  fetchMedicoById,
  updateMedico,
  updatePasswordAndEmailMedico,
} from "@/hooks/useMedicos";
import { fetchAtendenteById, updateAtendente } from "@/hooks/useAtendente";
import { updateDadosPessoais } from "@/hooks/useDadosPessoais";
import { useAuth } from "@/context/AuthContext";
import EditModal from "@/components/controles/EditModal";

function Configuracoes() {
  const { idUsuario, tipoUsuario } = useAuth();

  const [usuario, setUsuario] = useState<
    IPaciente | IMedico | IAtendente | null
  >(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [changePasswordModalOpen, setChangePasswordModalOpen] =
    useState<boolean>(false);

  const [newEmail, setNewEmail] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [editedName, setEditedName] = useState("");
  const [editedCpf, setEditedCpf] = useState("");
  const [editedCep, setEditedCep] = useState("");
  const [editedTelefone, setEditedTelefone] = useState("");
  const [editedData_nascimento, setEditedData_nascimento] = useState("");
  const [editedStatus, setEditedStatus] = useState("");
  const [editedGenero, setEditedGenero] = useState("");
  const [editedImgUrl, setEditedImgUrl] = useState("");
  const [editedAlergia, setEditedAlergia] = useState<string | undefined>(
    undefined
  );
  const [editedTipoSanguineo, setEditedTipoSanguineo] = useState<
    string | undefined
  >(undefined);
  const [editedDoencasCronicas, setEditedDoencasCronicas] = useState<
    string | undefined
  >(undefined);
  const [editedEspecialidade, setEditedEspecialidade] = useState<
    string | undefined
  >(undefined);
  const [editedCrm, setEditedCrm] = useState<string | undefined>(undefined);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      if (!idUsuario) return;

      try {
        let data: IPaciente | IMedico | IAtendente | null = null;
        if (tipoUsuario === 1) data = await fetchPacienteById(idUsuario);
        else if (tipoUsuario === 2) data = await fetchMedicoById(idUsuario);
        else if (tipoUsuario === 3) data = await fetchAtendenteById(idUsuario);

        setUsuario(data);
        if (data) {
          setEditedName(data?.dadosPessoais.nome);
          setEditedCep(data.dadosPessoais.cep);
          setEditedTelefone(data.dadosPessoais.telefone);
          setEditedCpf(data.dadosPessoais.cpf);
          setEditedData_nascimento(data.dadosPessoais.data_nascimento);
          setEditedGenero(data.dadosPessoais.genero);
          setEditedImgUrl(data.dadosPessoais.imgUrl);
          setEditedStatus(data.dadosPessoais.status);
          setNewEmail(data.email);

          if ("tipoSanguineo" in data) {
            setEditedTipoSanguineo(data.tipoSanguineo);
            setEditedAlergia(data.alergia);
            setEditedDoencasCronicas(data.doencasCronicas);
          } else if ("crm" in data) {
            setEditedCrm(data.crm);
            setEditedEspecialidade(data.especialidade);
          }
        }
      } catch (err: any) {
        setError(err.message || "Erro ao carregar os dados.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [idUsuario, tipoUsuario]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (usuario) {
        await updateDadosPessoais(
          usuario.dadosPessoais.id,
          usuario.dadosPessoais.nome,
          usuario.dadosPessoais.cpf,
          usuario.dadosPessoais.telefone,
          usuario.dadosPessoais.cep,
          usuario.dadosPessoais.status,
          usuario.dadosPessoais.data_nascimento,
          usuario.dadosPessoais.genero,
          usuario.dadosPessoais.imgUrl
        );

        if (!idUsuario) return;

        if (tipoUsuario === 1 && "tipoSanguineo" in usuario) {
          await updatePaciente(
            idUsuario,
            usuario.tipoSanguineo,
            usuario.doencasCronicas,
            usuario.alergia
          );
        } else if (tipoUsuario === 2 && "crm" in usuario) {
          await updateMedico(idUsuario, usuario.crm, usuario.especialidade);
        } else if (tipoUsuario === 3) {
          await updateAtendente(idUsuario, usuario.email, usuario.senha);
        }
      }
    } catch (err: any) {
      setError(err.message || "Erro ao salvar os dados.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async () => {
    if (usuario) {
      await updateDadosPessoais(
        usuario.dadosPessoais.id,
        editedName,
        editedCpf,
        editedTelefone,
        editedCep,
        editedStatus,
        editedData_nascimento,
        editedGenero,
        editedImgUrl
      );

      if (idUsuario && "tipoSanguineo" in usuario) {
        await updatePaciente(
          idUsuario,
          usuario.tipoSanguineo,
          usuario.doencasCronicas,
          usuario.alergia
        );
      } else if (idUsuario && "crm" in usuario) {
        await updateMedico(idUsuario, usuario.crm, usuario.especialidade);
      } else if (idUsuario) {
        await updateAtendente(idUsuario, usuario.email, usuario.senha);
      } else {
        console.log("ERRO");
      }
    }
  };

  const handleUpdateCredentials = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (!idUsuario) return;
    try {
      if (tipoUsuario === 3 && usuario) {
        const response = await updateAtendente(
          idUsuario,
          newEmail,
          newPassword
        );
        setChangePasswordModalOpen(false);
      }
      if (tipoUsuario === 2 && usuario) {
        const response = await updatePasswordAndEmailMedico(
          idUsuario,
          newEmail,
          newPassword
        );
        setChangePasswordModalOpen(false);
      }
      if (tipoUsuario === 1 && usuario) {
        const response = await updatePasswordAndEmailPaciente(
          idUsuario,
          newEmail,
          newPassword
        );
        setChangePasswordModalOpen(false);
      }
    } catch (err: any) {
      setError(err.message || "Erro ao atualizar email e senha.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Carregando informações do usuário...</div>;
  }

  if (error) {
    return <div className="text-red-500">Erro: {error}</div>;
  }

  return (
    <div className="flex">
      <Sidebar activePage="configuracoes" />
      <main className="flex-1 bg-gray-50">
        <div className="header-image">
          <img
            src="https://via.placeholder.com/800x100"
            alt="Imagem de cabeçalho"
            className="w-full h-auto"
          />
        </div>

        <div className="bg-white p-8 rounded-lg shadow-md max-w-3xl mx-auto text-gray-700">
          <h1 className="text-2xl font-semibold mb-6 text-center text-black">
            Altere seus dados aqui. As mudanças feitas nessa página refletirão
            na tela inicial.
          </h1>

          <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
            {/* Nome */}
            <div>
              <label className="block font-semibold mb-1 text-black">
                Nome:
              </label>
              <input
                type="text"
                value={usuario?.dadosPessoais.nome || ""}
                onChange={(e) =>
                  setUsuario({
                    ...usuario!,
                    dadosPessoais: {
                      ...usuario!.dadosPessoais,
                      nome: e.target.value,
                    },
                  })
                }
                className="w-full border border-teal-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-600 text-gray-700"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-black">
                CEP:
              </label>
              <input
                type="text"
                value={usuario?.dadosPessoais.cep || ""}
                onChange={(e) =>
                  setUsuario({
                    ...usuario!,
                    dadosPessoais: {
                      ...usuario!.dadosPessoais,
                      cep: e.target.value,
                    },
                  })
                }
                className="w-full border border-teal-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-600 text-gray-700"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-black">
                CPF:
              </label>
              <input
                type="text"
                value={usuario?.dadosPessoais.cpf || ""}
                onChange={(e) =>
                  setUsuario({
                    ...usuario!,
                    dadosPessoais: {
                      ...usuario!.dadosPessoais,
                      cpf: e.target.value,
                    },
                  })
                }
                className="w-full border border-teal-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-600 text-gray-700"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1 text-black">
                Telefone:
              </label>
              <input
                type="text"
                value={usuario?.dadosPessoais.telefone || ""}
                onChange={(e) =>
                  setUsuario({
                    ...usuario!,
                    dadosPessoais: {
                      ...usuario!.dadosPessoais,
                      telefone: e.target.value,
                    },
                  })
                }
                className="w-full border border-teal-500 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-600 text-gray-700"
              />
            </div>

            {/* Botões */}
            <div className="col-span-2 flex justify-between items-center">
              <button
                type="submit"
                className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
              >
                Salvar Alterações
              </button>

              <button
                onClick={() => setChangePasswordModalOpen(true)}
                className="px-6 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
              >
                Alterar Email/Senha
              </button>
            </div>
          </form>
        </div>

        {changePasswordModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
            <div className="bg-white p-6 rounded-lg w-96 text-gray-600">
              <h2 className="text-xl font-semibold mb-4">
                Alterar Email/Senha
              </h2>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Novo Email
                </label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  placeholder="Digite o novo email"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Nova Senha
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full mt-1 p-2 border border-gray-300 rounded-md"
                  placeholder="Digite a nova senha"
                />
              </div>
              <div className="flex justify-end mt-4">
                <button
                  type="button"
                  onClick={() => setChangePasswordModalOpen(false)}
                  className="mr-6 px-6 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleUpdateCredentials}
                  className="px-6 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
                >
                  Salvar Alterações
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Configuracoes;
