import { IInventory } from "projects/store/src/app/shared/models/inventory";

export interface IProduct {
  id?: number;
  slug?: string;
  name?: string;
  sku?: string;
  type?: number;
  description?: string;
  is_new?: boolean;
  quantity?: number;
  cost_price?: number;
  price?: number;
  mrp?: number;
  discount?: number;
  sale_price?: number;
  color?: string;
  size?: string;
  status?: number;
  inventories?: IInventory[],
  variants?: IProduct[]
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
    cost_price?: number,
    mrp?: number,
    sale_price?: number,
    color?: string,
    size?: string,
    status?: number,
    inventories?: IInventory[],
    variants?: IProduct[]
  ) {}
}
