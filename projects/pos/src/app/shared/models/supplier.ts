export interface ISupplier {
  id?: number;
  name?: string;
  status?: number;
}

export class Supplier implements ISupplier {
  constructor(id?: number, name?: string, status?: number) {}
}
