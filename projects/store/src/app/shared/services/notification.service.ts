import { Injectable } from '@angular/core';
import { IndividualConfig, ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  options: IndividualConfig = {
    extendedTimeOut: 0,
    positionClass: 'toast-bottom-right',
  } as IndividualConfig;

  constructor(private toastr: ToastrService) {}

  error(title?: string, message?: string, overrides?: any) {
    const defaultOptions = { disableTimeOut: true };

    this.options = { ...this.options, ...defaultOptions, ...overrides };
    this.toastr.error(message, title, this.options);
  }

  warning(title: string, message: string, overrides?: any) {
    this.options = { ...this.options, ...overrides };
    this.toastr.warning(message, title, this.options);
  }

  success(title: string, message: string, overrides?: any) {
    this.options = { ...this.options, ...overrides };
    this.toastr.success(message, title, this.options);
  }

  info(title: string, message: string, overrides?: any) {
    this.options = { ...this.options, ...overrides };
    this.toastr.info(message, title, this.options);
  }
}
