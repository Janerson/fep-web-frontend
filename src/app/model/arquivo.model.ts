import { BaseModel } from './base-model';
export interface Arquivo extends BaseModel {
  nome: string;
  extensao: string;
  tipoConteudo: string;
}
