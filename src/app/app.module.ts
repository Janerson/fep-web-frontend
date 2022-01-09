import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpErrorInterceptor } from './interceptors/http-error-interceptor.module';
import { LoaderInterceptorModule } from './interceptors/loader-interceptor.module';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,   
    LoaderInterceptorModule,
    HttpErrorInterceptor
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
