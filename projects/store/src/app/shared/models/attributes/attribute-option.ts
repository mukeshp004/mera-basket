export interface IAttributeOption {
  id?: number;
  attribute_id?: number;
  name?: string;
}

export class AttributeOption implements IAttributeOption {
  constructor(
    public id?: number, 
    public attribute_id?: number, 
    public name?: string) {}
}
