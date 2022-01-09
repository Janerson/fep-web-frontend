import { AlertService, AlertTypes } from './../../services/alert.service';
import { ClienteService } from './../../services/cliente.service';
import { Cliente } from './../../model/cliente.model';
import { Page } from '../../model/page.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription,interval } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { distinctUntilChanged, debounce, switchMap } from "rxjs/operators";

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss'],
})
export class ClientesComponent implements OnInit, OnDestroy {

  private subscription: Subscription | undefined;

  public clientes: Page<Cliente> | undefined;
  public formulario: FormGroup = this.fb.group({
    descricao: ["", []],
  });
  public hasErro = false

  constructor(
    private service: ClienteService,
    private alertService:AlertService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.service.refresh.subscribe(value => this.listarClientes())
    this.listarClientes();
    this.onValueChanged()
  }

  listarClientes(page = 0, textoPesquia?: string) {
    this.hasErro = false;
    this.subscription = this.service
      .paginado(page, textoPesquia)
      .subscribe((res: Page<Cliente>) => (this.clientes = res),this.err);
  }

  private initForm() {
    this.formulario = this.fb.group({
      descricao: [null, []],
    });
  }

  pageChanged(event: any): void {
    this.listarClientes(
      event.page - 1,
      this.formulario.get('descricao').value
    );
  }

  acessar(id:number): void {
    this.router.navigate([`clientes/${id}`]);
  }
  apagar(id:number){
    this.service.excluir(id).subscribe(() => {
      this.alertService.showToastr(AlertTypes.SUCESS,"Sucesso","Registro excluído.")
    })
  }

  onValueChanged() {
    this.formulario
      .get('descricao')
      .valueChanges.pipe(
        distinctUntilChanged(),
        debounce(() => interval(300)),
        switchMap((value: any) => this.service.paginado(0, value))
      )
      .subscribe(
        (result: any) => {
          this.clientes = result;
          this.hasErro = false;
        },
        this.err
      );
  }

  err = (err: any) =>{
    this.hasErro = true
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

