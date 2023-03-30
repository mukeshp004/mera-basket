import { IProduct } from '../product';

export interface ICartItem {
  id?: number;
  product_id?: number;
  product?: IProduct;
  quantity?: number;
  price?: number;
  discount?: number;
  discount_percentage?: number;
  total?: number;
}

export class CartItem implements ICartItem {
  constructor(
    public id?: number,
    public product_id?: number,
    public quantity?: number,
    public price?: number,
    public discount?: number,
    public discount_percentage?: number,
    public total?: number,
    public product?: IProduct
  ) {
    this.quantity = 0;
    this.price = 0;
    this.discount = 0;
    this.discount_percentage = 0;
    this.total = 0;
  }
}
