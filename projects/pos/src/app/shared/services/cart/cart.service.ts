import { Injectable } from '@angular/core';
import { CartItem, ICartItem } from '../../models/cart/cart-item';
import { IProduct } from '../../models/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items$ = new BehaviorSubject<any>([]);
  items: CartItem[] = [];

  total = 0;
  deliveryTotal = 0;
  grossTotal = 0;

  constructor() {}

  public getItems() {
    // return this.items;
    return this.items$.asObservable();
  }

  private getItem(productId: number): CartItem | undefined {
    let item = this.items.find(
      (cartItem: any) => cartItem.productId === productId
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
      (cartItem: any) => cartItem.productId === productId
    );

    if (!item) {
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
      item.total = item.quantity * item.price;

      this.commit();
    }
  }

  editItem(
    productId: number,
    quantity: number,
    price: number,
    discount: number,
    discountPercentage: number
  ) {
    let item = this.getItem(productId);

    if (item) {
      item.price = price;
      item.quantity = +quantity;
      item.discount = discount;
      item.discount_percentage = discountPercentage;
      item.total = item.quantity * price;

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

  str2float(data: string | number) {
    if (typeof data === 'number') {
      return data;
    }
    return parseFloat(data);
  }
}
