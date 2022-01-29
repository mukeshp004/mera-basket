export interface IAttributeGroupMapping {
  attribute_id?: number;
  attribute_group_id?: number;
  position?: number;
}

export class AttributeGroupMapping implements IAttributeGroupMapping {
  constructor(
    attribute_id?: number,
    attribute_group_id?: number,
    position?: number
  ) {}
}
