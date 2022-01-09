import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Arquivo } from '../model/arquivo.model';
import { Page } from '../model/page.model';
import { BaseService } from './base-service';

@Injectable({
  providedIn: 'root',
})
export class ArquivoService extends BaseService<Arquivo> {
  private ENDPOINT = `arquivo`;

  constructor(protected http: HttpClient) {
    super(http, 'arquivo');
  }

  upload(idCliente: number, file: File) {
    let formData = new FormData();
    formData.set('file', file);
    return this.http
      .post(
        `${environment.url_api}/${this.ENDPOINT}/upload/${idCliente}`,
        formData
      )
      .pipe(
        take(1),
        tap(() => this.refresh.next())
      );
  }

  download(idArquivo: number): Observable<Blob> {
    return this.http.get(
      `${environment.url_api}/${this.ENDPOINT}/download/${idArquivo}`,
      {
        responseType: 'blob',
      }
    );
  }

  listarArquivoCliente(
    idCliente:number,
    page: number = 0,
    searchBy?: string,
    orderBy?: string,
    dir?: string
  ) {
    return this.http.get<Page<Arquivo>>(
      `${environment.url_api}/${this.ENDPOINT}/cliente/${idCliente}/?page=${page}&search=${
        searchBy || ""
      }&sort=${orderBy||'id'}&dir=${dir || "asc"}`
    );
  }
}
