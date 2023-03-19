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
        path: 'page/dashboard',
      },
      {
        name: 'Category',
        icon: 'fas fa-tachometer-alt',
        path: '/entity/category',
      },
      {
        name: 'Distrubuter',
        icon: 'fas fa-tachometer-alt',
        path: 'entity/distributor',
      },
      {
        name: 'Product',
        path: 'entity/product',
        children: [
          {
            name: 'Category',
            path: 'entity/Catogery',
          },
        ],
      },
    ];

    return menu;
  }
}
