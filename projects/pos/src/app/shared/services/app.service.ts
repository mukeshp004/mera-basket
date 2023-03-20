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
        icon: 'fa-solid fa-bars',
        path: '/entity/category',
      },
      {
        name: 'Distrubuter',
        icon: 'fa-solid fa-users',
        path: 'entity/distributor',
      },
      {
        name: 'Inventory',
        path: 'entity/product',
        // icon: '',
        children: [
          {
            name: 'Category',
            path: 'entity/Catogery',
          },
        ],
      },
      {
        name: 'Purchase',
        icon: 'fa-solid fa-warehouse',
        path: 'entity/purchase',
      },
      {
        name: 'Sales',
        icon: 'fa-solid fa-cart-shopping',
        path: 'entity/sales',
      },
    ];

    return menu;
  }
}
