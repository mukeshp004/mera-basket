import { IAttribute } from './attribute';
import { IAttributeGroupMapping } from './attribute-group-mapping';

export interface IAttributeGroup {
  id?: number;
  code?: string;
  name?: string;
  is_user_define?: number;
  attribute_family_id?: number;
  position?: number;
  mappings?: IAttributeGroupMapping;
  attributes?: IAttribute[];
}

export class AttributeGroup implements IAttributeGroup {
  attributes = [];

  constructor(
    id?: number,
    code?: string,
    name?: string,
    is_user_define?: number,
    attribute_family_id?: number,
    position?: number,
    mappings?: IAttributeGroupMapping,
    attributes?: IAttribute[]
  ) {}
}
