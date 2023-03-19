export interface IUser {
  id?: number;
  name?: string;
  email?: string;
  email_verified_at?: string;
  token?: string;
}

export class User implements IUser {
  constructor(
    id: number,
    name: string,
    email: string,
    email_verified_at: string,
    token: string
  ) {}
}
