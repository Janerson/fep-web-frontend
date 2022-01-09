import { ClientesComponent } from './clientes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';

import { ClienteDetailComponent } from './clientes-detail/cliente-detail.component';
import { ClientesRoutingModule } from './clientes-routing.module';


@NgModule({
  declarations: [ClientesComponent,ClienteDetailComponent],
  imports: [
    ClientesRoutingModule,
    SharedModule
  ]
})
export class ClientesModule { }
