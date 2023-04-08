import { IAttributeOption } from './attribute-option';

export interface IAttribute {
  id?: number;
  code?: string;
  name?: string;
  description?: string;
  type?: string;
  swatch_type?: number;
  options?: IAttributeOption[];
  validation?: number;
  is_required?: number;
  is_unique?: number;
  is_filterable?: number;
  is_configurable?: number;
  is_user_defined?: number;
  is_visible_on_front?: number;
  is_comparable?: number;
  use_in_flat?: number;
  position?: number;
  status?: number;
}

export class Attribute implements IAttribute {
  constructor(
    id?: number,
    code?: string,
    name?: string,
    description?: string,
    type?: string,
    swatch_type?: number,
    options?: IAttributeOption,
    validation?: number,
    is_required?: number,
    is_unique?: number,
    is_filterable?: number,
    is_configurable?: number,
    is_user_defined?: number,
    is_visible_on_front?: number,
    is_comparable?: number,
    use_in_flat?: number,
    position?: number,
    status?: number
  ) {}
}
