import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';

export enum AlertTypes {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  SUCESS = 'success',
  DANGER = 'danger',
  WARNING = 'warning',
  INFO = 'info',
  LIGHT = 'light',
  DARK = 'dark',
  CONFIRM = 'question',
}

@Injectable({
  providedIn:'root'
})
export class AlertService {

  constructor(private toastr: ToastrService) {}

  showToastr(
    type: AlertTypes,
    title: string,
    message: string,
    opt?: Partial<IndividualConfig>
  ) {
    this.toastr.clear();
    switch (type) {
      case AlertTypes.SUCESS:
        this.toastr.success(message, title, opt);
        break;
      case AlertTypes.DANGER:
        this.toastr.error(message, title, opt);
        break;
      case AlertTypes.INFO:
        this.toastr.info(message, title, opt);
        break;
      case AlertTypes.WARNING:
        this.toastr.warning(message, title, opt);
        break;
      default:
        this.toastr.show(message, title, opt);
        break;
    }
  }
}
