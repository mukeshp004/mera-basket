export interface IInventorySource {
  id?: number;
  code?: string;
  name?: string;
}

export class InventorySource implements IInventorySource {
  constructor(
    id?: number,
    code?: string,
    name?: string,
  ) {}
}
