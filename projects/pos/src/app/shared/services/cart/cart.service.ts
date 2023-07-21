import { Injectable } from '@angular/core';
import { CartItem, ICartItem } from '../../models/cart/cart-item';
import { IProduct } from '../../models/product';
import { BehaviorSubject } from 'rxjs';
import { LocalStorageService } from 'ngx-webstorage';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items$ = new BehaviorSubject<any>([]);
  items: CartItem[] = [];

  key = 'purchase_cart';

  total = 0;
  deliveryTotal = 0;
  grossTotal = 0;

  constructor() {}

  /**
   *
   * @returns cart item observables
   */
  public getItems() {
    // return this.items;
    return this.items$.asObservable();
  }

  private getItem(productId: number): CartItem | undefined {
    let item = this.items.find(
      (cartItem: CartItem) => cartItem.product_id === productId
    );

    return item;
  }

  public addItem(
    productId: number,
    quantity: number,
    price?: number,
    discount?: number,
    discountPercentage?: number
  ): void {
    let item = this.items.find(
      (cartItem: CartItem) => cartItem.product_id === productId
    );

    if (item === undefined) {
      item = new CartItem(productId, productId);
      // item.product = product;
      // item.productId = product.id;
      this.items.push(item);
    }

    if (item) {
      item.quantity = (item.quantity || 0) + quantity;
      item.price = item.price || price || 0;
      item.discount = discount || 0;
      item.discount_percentage = discountPercentage || 0;
      // item.total = item.quantity * item.price;

      this.commit();
    }
  }

  /**
   * Edit Card Item
   *
   * @param productId productId
   * @param quantity number
   * @param price number
   * @param discount number
   * @param discountPercentage number
   */
  editItem(
    productId: number,
    quantity: number,
    price: number,
    discount: number,
    discountPercentage: number
  ) {
    let item = this.getItem(productId);

    if (item) {
      item.price = this.str2float(price);
      item.quantity = this.str2float(+quantity);
      item.discount = this.str2float(discount);
      item.discount_percentage = this.str2float(discountPercentage);
      // item.total = item.quantity * price;

      this.commit();
    }
  }

  public delete(productId: number): void {
    let itemIndex = this.items.findIndex(
      (cartItem: ICartItem) => cartItem.product_id === productId
    );

    this.items.splice(itemIndex, 1);
    this.commit();
  }

  public empty(): void {
    this.items = [];
    this.commit();
  }

  sendUpdate() {
    this.items$.next(this.items);
    localStorage.setItem(this.key, JSON.stringify(this.items));
    // this.localStorage.store(this.key, this.items);
  }

  commit() {
    this.calculateSummary();
    this.sendUpdate();
  }

  calculateSummary() {
    const total = this.items
      .map(this.calculateItemAmount)
      .reduce((previous, current) => previous + current, 0);

    this.total = +total.toFixed(2);
    this.grossTotal = +total.toFixed(2);
  }

  calculateItemAmount = (item: ICartItem): number => {
    const qty: number = item.quantity || 0;
    const price: number = item.price || 0;

    let total = this.str2float(qty) * this.str2float(price);
    total = this.calculateItemDiscount(item, total);
    item.total = total;
    return total;
  };

  calculateItemDiscount(item: ICartItem, total: number) {
    if (item.discount) {
      return total - item.discount;
    }

    if (item.discount_percentage) {
      return total - (total * item.discount_percentage) / 100;
    }

    return total;
  }

  str2float(data: string | number): number {
    if (typeof data === 'number') {
      return data;
    }

    if (!data) {
      return 0;
    }

    return parseFloat(data);
  }
}
