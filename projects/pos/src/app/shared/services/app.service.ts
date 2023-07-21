import { Injectable } from '@angular/core';
import { AbstractAppService } from 'projects/common-lib/src/lib/shared/services/abstract-app.service';
import { Menu } from '../models/menu';

@Injectable({
  providedIn: 'root',
})
export class AppService implements AbstractAppService {
  constructor() {}

  getMenu(): Menu[] {
    const menu = [
      {
        name: 'Dashboard',
        icon: 'fas fa-tachometer-alt',
        path: 'page/dashboard',
      },
      {
        name: 'Supplier',
        icon: 'fa-solid fa-users',
        path: 'entity/supplier',
      },
      {
        name: 'Inventory',
        icon: 'fa-solid fa-cart-plus',
        children: [
          {
            name: 'Category',
            icon: 'fa-solid fa-bars',
            path: '/entity/category',
          },
          {
            name: 'Attribute',
            icon: 'fa-solid fa-bars',
            path: '/entity/attribute',
          },
          {
            name: 'Product',
            icon: 'fa-brands fa-product-hunt',
            path: 'entity/product',
          },
          {
            name: 'Barcode',
            icon: 'fa-solid fa-barcode',
            path: 'entity/product/barcode',
          },
        ],
      },
      {
        name: 'Purchase',
        icon: 'fa-solid fa-warehouse',
        children: [
          {
            name: 'Purchase',
            icon: 'fa-solid fa-warehouse',
            path: 'entity/purchase',
          },
          {
            name: 'Purchase Return',
            icon: 'fa-solid fa-warehouse',
            path: 'entity/purchase/return',
          },
        ],
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
