import { AlertService, AlertTypes } from './../../../services/alert.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { interval } from 'rxjs/internal/observable/interval';
import { debounce, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { ArquivoService } from 'src/app/services/arquivo.service';

import { Page } from '../../../model/page.model';
import { Arquivo } from './../../../model/arquivo.model';
import { ClienteService } from './../../../services/cliente.service';

import { saveAs } from 'file-saver';

@Component({
  selector: 'app-cliente-detail',
  templateUrl: './cliente-detail.component.html',
  styleUrls: ['./cliente-detail.component.scss'],
})
export class ClienteDetailComponent implements OnInit {
  private subscription: Subscription = new Subscription();

  public arquivos: Page<Arquivo>;

  public formularioArquivo: FormGroup;
  public formularioCliente: FormGroup;
  public idCliente: number;

  constructor(
    private clienteService: ClienteService,
    private arquivoService: ArquivoService,
    private alertService : AlertService,
    private fb: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.subscription.add(
      this.activeRoute.paramMap.subscribe((param) => {
        this.idCliente = parseInt(param.get('id'));
      })
    );
    this.subscription.add(
      this.arquivoService.refresh.subscribe(value => this.listarArquivos(this.idCliente))
    )
    this.onValueChanged();
    this.buscarCliente();
  }

  private initForm() {
    this.formularioArquivo = this.fb.group({
      descricao: [null, []],
    });

    this.formularioCliente = this.fb.group({
      id: [null, []],
      nomeEmpresa: [null, [Validators.required]],
      cnpj: [null, [Validators.required ]],
      dataCadastro: [new Date().toISOString().split("T")[0],[Validators.required ]],
    });
  }

  buscarCliente() {
    if (!this.idCliente) return;
    this.clienteService.buscarPorID(this.idCliente).subscribe((cliente) => {
      this.formularioCliente.patchValue(cliente);
      this.listarArquivos(this.idCliente);
    });
  }

  gravar(){
    this.clienteService.salvar(this.formularioCliente.value)
    .subscribe(value =>{
      this.formularioCliente.patchValue(value)
      this.idCliente = value.id;
      this.alertService.showToastr(AlertTypes.SUCESS,"Sucesso","Dados gravados com sucesso.")
    })
  }

  upload(file : File){
    if(!this.idCliente){
      this.alertService.showToastr(AlertTypes.WARNING,"Atenção","Salve os dados do cliente")
      return
    }

    this.arquivoService.upload(this.idCliente,file)
    .subscribe(value => this.alertService.showToastr(AlertTypes.SUCESS,"Sucesso","Arquivo enviado com sucesso."))

  }

  visualizarArquivo(arq :Arquivo){
    this.arquivoService.download(arq.id).subscribe((resp) => {    
      let fileURL = URL.createObjectURL(resp);
      window.open(fileURL);
    });
  }
  download(arq :Arquivo){
    this.arquivoService.download(arq.id).subscribe((resp) => {
      let nomeArquivo = `${arq.nome}.${arq.extensao}`;
      saveAs(resp, nomeArquivo);
    });
  }

  apagarArquivo(idArquivo:number){
    this.arquivoService.excluir(idArquivo)
    .subscribe(value => this.alertService.showToastr(AlertTypes.SUCESS,"Sucesso","Arquivo excluído com sucesso."))
  }

  pageChanged(event: any): void {
    this.listarArquivos(
      this.idCliente,
      event.page - 1,
      this.formularioArquivo.get('descricao').value
    );
  }

  listarArquivos(idCliente:number,page = 0, textoPesquia?: string) {
    this.subscription = this.arquivoService
      .listarArquivoCliente(idCliente,page, textoPesquia)
      .subscribe((res) => (this.arquivos = res));
  }

  voltar() {
    this.router.navigate(['clientes']);
  }

  onValueChanged() {
    this.formularioArquivo
      .get('descricao')
      .valueChanges.pipe(
        distinctUntilChanged(),
        debounce(() => interval(300)),
        switchMap((value: any) => this.arquivoService.paginado(0, value))
      )
      .subscribe(
        (result: any) => {
          this.arquivos = result;
        },
        (error: { message: string }) => console.log(error.message)
      );
  }
}
