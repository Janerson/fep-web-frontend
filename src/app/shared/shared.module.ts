import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertModule } from 'ngx-bootstrap/alert';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PopoverModule } from 'ngx-bootstrap/popover';
import { ngxLoadingAnimationTypes, NgxLoadingModule } from 'ngx-loading';
import { NgxMaskModule } from 'ngx-mask';
import { ToastrModule } from 'ngx-toastr';
import { FileUploadComponent } from './components/file-upload/file-upload.component';

import { LoaderComponent } from './components/loader/loader.component';
import { ValidatorComponent } from './components/validator-component/validator-component.component';
import { CpfCnpjPipe } from './pipes/cpfcnpj.pipe';
import { HighlightPipe } from './pipes/highlight.pipe';

@NgModule({
  declarations: [LoaderComponent, HighlightPipe,CpfCnpjPipe,ValidatorComponent,FileUploadComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    ButtonsModule.forRoot(),
    AlertModule.forRoot(),
    NgxLoadingModule.forRoot({
      fullScreenBackdrop: true,
      animationType: ngxLoadingAnimationTypes.threeBounce,
      primaryColour: '#068bcd',
      secondaryColour: '#ca981f',
    }),
    ToastrModule.forRoot({
      progressBar: true,
      newestOnTop:true,
      maxOpened:10
    }),
    NgxMaskModule.forRoot()
  ],
  exports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    PaginationModule,
    PopoverModule,
    AlertModule,
    ButtonsModule,
    HighlightPipe,
    CpfCnpjPipe,
    LoaderComponent,
    NgxMaskModule,
    ValidatorComponent,
    FileUploadComponent
  ],
})
export class SharedModule {}
