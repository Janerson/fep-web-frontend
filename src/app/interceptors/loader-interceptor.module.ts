import { LoaderService } from '../shared/components/loader.service';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable, NgModule } from "@angular/core";
import { Observable } from "rxjs";
import { finalize } from 'rxjs/operators';

@Injectable()
export class  LoaderInterceptor implements HttpInterceptor{

    constructor(public loaderService : LoaderService){}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       this.loaderService.show();

       return next.handle(req).pipe(finalize(() => this.loaderService.hide()))
    }
    

}
@NgModule({
    providers: [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: LoaderInterceptor,
        multi: true,
      }  
    ],
  })
  export class LoaderInterceptorModule {}