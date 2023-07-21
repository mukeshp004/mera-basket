import { IAttributeFamily } from './attributes/attribute-family';

export interface IProduct {
  id?: number;
  name?: string;
  sku?: string;
  type?: string;
  attribute_family_id?: number;
  parent_id?: number;
  variants?: IProduct[];
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
    public parent_id?: number
  ) {}
}

export interface IProductFindResponse {
  product: IProduct;
  attributeFamily: IAttributeFamily;
}
