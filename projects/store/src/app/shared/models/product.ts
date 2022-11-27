import { IAttributeFamily } from './attributes/attribute-family';

export interface IProduct {
  id?: number;
  name?: string;
  sku?: string;
  type?: string;
  attribute_family_id?: number;
  parent_id?: number;
  [key: string]: any;
}

export class Product implements IProduct {
  constructor(
    id?: number,
    name?: string,
    sku?: string,
    type?: string,
    attribute_family_id?: number,
    parent_id?: number
  ) {}
}

export interface IProductFindResponse {
  product: IProduct;
  attributeFamily: IAttributeFamily;
}
