export interface IAttributeOption {
  id?: number;
  name?: string;
}

export class AttributeOption implements IAttributeOption {
  constructor(id?: number, name?: string) {}
}
