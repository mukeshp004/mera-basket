import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductValueService {
  getSimpleProductDefaultValue() {
    const model1 = {
        name: 'Maggi',
        sku: 'Maggi0001',
        type: 1,
        attribute_family_id: 1,
        general: {
          sku: 'Maggi0001',
          product_number: 'Maggi0001',
          name: 'Maggi',
          url_key: 'maggi',
          tax_category_id: null,
          new: null,
          featured: null,
          visible_individually: true,
          guest_checkout: true,
          status: true,
          color: null,
          size: null,
          brand: null,
        },
        description: {
          short_description: 'Maggi',
          description: 'Maggi',
        },
        meta_description: {
          meta_title: null,
          meta_keywords: null,
          meta_description: null,
        },
        price: {
          price: 10,
          cost: null,
          special_price: null,
          special_price_from: null,
          special_price_to: null,
        },
        shipping: {
          length: null,
          width: null,
          height: null,
          weight: '10',
        },
        inventory: {
          Inventory: null,
        },
      };

      return model1;
  }

  getConfigurableProductDefaultValue() {
    const model = {
      name: 'jeans',
      sku: 'j001 ',
      type: 2,
      attribute_family_id: 1,
      general: {
        sku: 'Maggi0001',
        product_number: 'Maggi0001',
        name: 'Maggi',
        url_key: 'maggi',
        tax_category_id: null,
        new: null,
        featured: null,
        visible_individually: true,
        guest_checkout: true,
        status: true,
        color: null,
        size: null,
        brand: null,
      },
      description: {
        short_description: 'Maggi',
        description: 'Maggi',
      },
      meta_description: {
        meta_title: null,
        meta_keywords: null,
        meta_description: null,
      },
      price: {
        price: 10,
        cost: null,
        special_price: null,
        special_price_from: null,
        special_price_to: null,
      },
      shipping: {
        length: null,
        width: null,
        height: null,
        weight: '10',
      },
      inventory: {
        Inventory: null,
      },
    };

    return model;
  }
}
