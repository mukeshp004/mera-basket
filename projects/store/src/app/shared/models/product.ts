import { IAttributeFamily } from './attributes/attribute-family';
import { Inventory } from './inventory';
import { IInventorySource } from './inventory-source';

export interface IProduct {
  id?: number;
  name?: string;
  sku?: string;
  type?: string;
  attribute_family_id?: number;
  parent_id?: number;
  variants?: IProduct[];
  inventories?: Inventory[],
  [key: string]: any;
}

export class Product implements IProduct {
  constructor(
    public id?: number,
    public name?: string,
    public sku?: string,
    public type?: string,
    public attribute_family_id?: number,
    public variants?: IProduct[],
    public inventories?: any[],
    public parent_id?: number
  ) {}
}

export interface IProductFindResponse {
  product?: IProduct;
  attributeFamilies: IAttributeFamily[],
  attributeFamily?: IAttributeFamily;
  inventorySources: IInventorySource[];
}
