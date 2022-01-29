import { IAttributeGroupMapping } from './attribute-group-mapping';

export interface IAttributeGroup {
  id?: number;
  name?: string;
  is_user_define?: number;
  attribute_family_id?: number;
  position?: number;
  mappings?: IAttributeGroupMapping;
}

export class AttributeGroup implements IAttributeGroup {
  constructor(
    id?: number,
    name?: string,
    is_user_define?: number,
    attribute_family_id?: number,
    position?: number,
    mappings?: IAttributeGroupMapping
  ) {}
}
