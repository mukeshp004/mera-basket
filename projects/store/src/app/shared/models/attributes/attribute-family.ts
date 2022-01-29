import { IAttributeGroup } from "./attribute-group";

export interface IAttributeFamily {
  id?: number;
  code?: string;
  name?: string;
  status?: number;
  groups?: IAttributeGroup[];
}

export class AttributeFamily implements IAttributeFamily {
  constructor(
    id?: number,
    code?: string,
    name?: string,
    status?: number,
    groups?: IAttributeGroup[]
  ) {}
}
