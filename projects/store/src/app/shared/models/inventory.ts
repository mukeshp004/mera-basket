
export interface IInventory {
    id?: number;
    product_id?: number;
    inventory_source_id?: number;
    quantity?: number;
  }
  
  export class Inventory implements IInventory {
    constructor(
      public id?: number,
      public product_id?: number,
      public inventory_source_id?: number,
      public quantity?: number,
    ) {}
  }
  