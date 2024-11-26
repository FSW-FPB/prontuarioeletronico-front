import IAtendente from "./IAtendente";
import IMedico from "./IMedico";
import IPaciente from "./IPaciente";

export interface IPageable {
  content: IPaciente[] | IMedico[] | IAtendente[];
  pageable: {
    pageNumber: number;
    pageSize: number;
    sort: {
      empty: boolean;
      unsorted: boolean;
      sorted: boolean;
    };
    offSet: number;
    unpaged: boolean;
    paged: boolean;
  };
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: {
    empty: boolean;
    unsorted: boolean;
    sorted: boolean;
  };
  numberOfElements: 4;
  first: boolean;
  empty: boolean;
}
