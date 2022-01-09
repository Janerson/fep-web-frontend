import { BaseModel } from '../model/base-model';
import { HttpClient } from "@angular/common/http";

import { take, tap } from "rxjs/operators";

import { Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { Page } from '../model/page.model';


export class BaseService<T extends BaseModel> {
  

  private _refresh$ = new Subject<T>();

  constructor(protected http: HttpClient, private endpoint: string) {}

  get refresh() {
    return this._refresh$;
  }
 
  listar() {
    return this.http.get<T[]>(`${environment.url_api}/${this.endpoint}/listar`);    
  }

  paginado(
    page: number = 0,
    searchBy?: string,
    orderBy?: string,
    dir?: string
  ) {
    return this.http.get<Page<T>>(
      `${environment.url_api}/${this.endpoint}/?page=${page}&search=${
        searchBy || ""
      }&sort=${orderBy||'id'}&dir=${dir || "asc"}`
    );
  }
 
  buscarPorID(id: number) {
    return this.http
      .get<T>(`${environment.url_api}/${this.endpoint}/${id}`)
      .pipe(take(1) /*,tap(console.log)*/);
  }

 
  salvar(obj: T) {
    if (obj.id) {
      return this.atualizar(obj);
    }
    return this.gravar(obj);
  }

  excluir(id: number) {
    return this.http.delete(`${environment.url_api}/${this.endpoint}/${id}`).pipe(
      take(1),
      tap(() => this._refresh$.next())
    );
  }

  private atualizar(obj: T) {
    return this.http
      .put<T>(`${environment.url_api}/${this.endpoint}`, obj)
      .pipe(
        take(1),
        tap(() => this._refresh$.next())
      );
  }
  private gravar(obj: T) {
    return this.http.post<T>(`${environment.url_api}/${this.endpoint}`, obj).pipe(
      take(1),
      tap(() => this._refresh$.next())
    );
  }

  
}
