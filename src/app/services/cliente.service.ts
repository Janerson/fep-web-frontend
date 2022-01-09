import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from 'src/app/model/cliente.model';

import { BaseService } from './base-service';

@Injectable({
  providedIn: 'root',
})
export class ClienteService extends BaseService<Cliente> {
  
  private ENDPOINT = `cliente`;

  constructor(protected http: HttpClient) {
    super(http,'cliente')
  }
 

}
