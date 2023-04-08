export interface IMenu {
  name: string;
  icon?: string;
  path?: string;
  children?: IMenu[];
}

export class Menu implements IMenu {
  constructor(
    public name: string,
    public icon?: string,
    public path?: string,
    public children?: IMenu[]
  ) {}
}
