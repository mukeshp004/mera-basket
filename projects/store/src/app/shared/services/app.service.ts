import { Injectable } from '@angular/core';
import { AbstractAppService } from 'projects/common-lib/src/lib/shared/services/abstract-app.service';

@Injectable({
  providedIn: 'root',
})
export class AppService implements AbstractAppService {
  constructor() {}

  getMenu(): any[] {
    const menu = [
      {
        name: 'Dashboard',
        icon: 'fas fa-tachometer-alt',
        path: 'Page/dashboard',
      },
      {
        name: 'Category',
        icon: 'fas fa-user',
        path: 'category',
      },
      {
        name: 'Attribute',
        icon: 'fas fa-user',
        path: 'attribute',
      },
      {
        name: 'Attribute Family',
        icon: 'fas fa-user',
        path: '/attribute/family',
      },
      {
        name: 'Product',
        icon: 'fas fa-tachometer-alt',
        path: 'product',
      },
    ];

    return menu;
  }
}
