export class BaseModel {
  id?: number;
  dataCadastro?:Date;

  constructor(obj: BaseModel) {
    Object.assign(this, obj);
  }
}
