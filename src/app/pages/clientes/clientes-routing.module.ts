import { ClienteDetailComponent } from './clientes-detail/cliente-detail.component';
import { ClientesComponent } from './clientes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: ClientesComponent,
   
  },
  { path: ':id', component: ClienteDetailComponent },
  {
    path: "novo",
    component: ClienteDetailComponent,
    data: {
      title: "Cadastrar Cliente",
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientesRoutingModule {}
