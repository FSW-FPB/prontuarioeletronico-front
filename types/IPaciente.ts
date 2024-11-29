import IDadosPessoais from "./IDadosPessoais";

export default interface IPaciente {
  id: number;
  tipoSanguineo: string;
  alergia: string;
  doencasCronicas: string;
  email: string;
  senha: string;
  dadosPessoais: IDadosPessoais;
}
