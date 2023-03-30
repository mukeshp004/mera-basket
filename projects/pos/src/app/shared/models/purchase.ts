import { ICartItem } from './cart/cart-item';

export interface IPurchase {
  id?: number;
  date?: string;
  supplier_id?: number;
  quantity?: number;
  sub_total?: number;
  tax?: number;
  total?: number;
  status?: number;
  items?: ICartItem[];
}

export class Purchase implements IPurchase {
  constructor(
    id?: number,
    date?: string,
    supplier_id?: number,
    quantity?: number,
    sub_total?: number,
    tax?: number,
    total?: number,
    status?: number,
    items?: ICartItem[]
  ) {}
}
