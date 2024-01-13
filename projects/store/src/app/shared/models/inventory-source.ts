export interface IInventorySource {
  id?: number;
  code?: string;
  name?: string;
  description?: string;
  contact_name?: string;
  contact_email?: string;
  contact_number?: string;
  contact_fax?: string;
  country?: string;
  state?: string;
  city?: string;
  street?: string;
  postcode?: string;
  priority?: string;
  latitude?: number;
  longitude?: number;
  status?: number;
}

export class InventorySource implements IInventorySource {
  constructor(
    id?: number,
    code?: string,
    name?: string,
    description?: string,
    contact_name?: string,
    contact_email?: string,
    contact_number?: string,
    contact_fax?: string,
    country?: string,
    state?: string,
    city?: string,
    street?: string,
    postcode?: string,
    priority?: string,
    latitude?: number,
    longitude?: number,
    status?: number,
  ) {}
}
