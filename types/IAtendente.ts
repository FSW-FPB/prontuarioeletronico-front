import IDadosPessoais from "./IDadosPessoais";

export default interface IAtendente {
  id: number;
  email: string;
  senha: string;
  dadosPessoais: IDadosPessoais;
}
