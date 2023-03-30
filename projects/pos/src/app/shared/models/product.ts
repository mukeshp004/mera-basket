export interface IProduct {
  id?: number;
  slug?: string;
  name?: string;
  sku?: string;
  type?: number;
  description?: string;
  is_new?: boolean;
  quantity?: number;
  cost?: number;
  mrp?: number;
  discount?: number;
  price?: number;
  color?: string;
  size?: string;
  status?: number;
}

export class Product implements IProduct {
  constructor(
    id?: number,
    slug?: string,
    name?: string,
    sku?: string,
    type?: number,
    description?: string,
    is_new?: boolean,
    quantity?: number,
    cost?: number,
    mrp?: number,
    price?: number,
    color?: string,
    size?: string,
    status?: number
  ) {}
}
