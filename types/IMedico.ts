import IDadosPessoais from "./IDadosPessoais";

export default interface IMedico {
  id: number;
  crm: string;
  especialidade: string;
  email: string;
  senha: string;
  dadosPessoais: IDadosPessoais;
}
