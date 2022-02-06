export interface IProduct {
  id?: number;
  name?: string;
  sku?: string;
  type?: string;
  attribute_family_id?: number;
  parent_id?: number;
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
