import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import {
  fetchDadosPessoaisByCPF,
  createDadosPessoais,
} from "@/hooks/useDadosPessoais";
import ModalCPF from "../ModalCPF";
import { IFormData } from "@/types/IFormData";
import ModalForm from "../ModalForm";
import { createMedico } from "@/hooks/useMedicos";

const CadastrarMedico = () => {
  const [cpf, setCpf] = useState<string>("");
  const [isCPFModalOpen, setIsCPFModalOpen] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [hasDadosPessoais, setHasDadosPessoais] = useState<boolean>(false);
  const [formData, setFormData] = useState<IFormData>({
    genero: "",
    nome: "",
    data_nascimento: "",
    telefone: "",
    cep: "",
    email: "",
    senha: "",
    crm: "",
    especialidade: "",
    imgUrl: "",
    cpf: "",
  });

  const fetchUserDataByCpf = (cpf: string) => {
    return fetchDadosPessoaisByCPF(cpf);
  };

  const handleCpfSubmit = async () => {
    try {
      const userData = await fetchUserDataByCpf(cpf);
      if (userData) {
        setFormData({
          ...formData,
          ...userData,
        });
        setHasDadosPessoais(true);
      } else {
        setFormData((prev) => ({ ...prev, cpf }));
        setHasDadosPessoais(false);
      }
    } catch (error) {
      console.error("Erro ao buscar os dados pessoais:", error);
    }
    setIsCPFModalOpen(false);
    setIsModalOpen(true);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();

    let dadosPessoaisId: number | null = null;

    try {
      if (!hasDadosPessoais) {
        await createDadosPessoais(
          formData.nome,
          formData.cpf,
          formData.telefone,
          formData.cep,
          formData.data_nascimento,
          formData.genero,
          formData.imgUrl
        );
      }

      const dadosPessoais = await fetchUserDataByCpf(formData.cpf);
      if (dadosPessoais) {
        dadosPessoaisId = dadosPessoais.id;

        if (formData.crm && formData.especialidade) {
          await createMedico(
            formData.email,
            formData.senha,
            formData.crm,
            formData.especialidade,
            dadosPessoaisId
          );

          closeModalForm();
        }
      } else {
        console.log("Erro ao buscar os dados pessoais após a criação.");
      }
    } catch (error) {
      console.error("Erro ao cadastrar medico:", error);
    }
  };

  const closeModalForm = () => {
    setIsModalOpen(false);
    setFormData({
      genero: "",
      nome: "",
      data_nascimento: "",
      telefone: "",
      cep: "",
      email: "",
      senha: "",
      crm: "",
      especialidade: "",
      imgUrl: "",
      cpf: "",
    });
  };

  return (
    <div style={{ color: "#696969", textAlign: "center" }}>
      <Typography variant="h4" sx={{ mb: 4, mt: 4 }}>
        Cadastrar Médicos
      </Typography>
      <Button
        variant="contained"
        sx={{ backgroundColor: "#888", ":hover": { backgroundColor: "#777" } }}
        onClick={() => setIsCPFModalOpen(true)}
      >
        Cadastrar
      </Button>

      {/* Modal para CPF */}
      <ModalCPF
        cpf={cpf}
        handleCpfSubmit={handleCpfSubmit}
        open={isCPFModalOpen}
        setCpf={setCpf}
        setIsCPFModalOpen={setIsCPFModalOpen}
      />

      {/* Formulário */}
      <ModalForm
        closeModalForm={closeModalForm}
        open={isModalOpen}
        formData={formData}
        formType={2}
        handleFormSubmit={handleFormSubmit}
        handleInputChange={handleInputChange}
        setFormData={setFormData}
      />
    </div>
  );
};

export default CadastrarMedico;