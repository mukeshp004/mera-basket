import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalConfigService {
  readonly dashboardRoute = 'page/dashboard';

  constructor() { }
}
