import { BaseModel } from "./base-model";

export interface Cliente extends BaseModel {
  nomeEmpresa: string;
  cnpj: string;

}
