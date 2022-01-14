export interface ICategory {
    id?: number;
    name?: string;
    slug?: string;
    show_in_menu?: number;
    display_mode?: number;
  }
  
  export class Category implements ICategory {
    constructor(
      id: number,
      name: string,
      slug: string,
      show_in_menu: number,
      display_mode: number,

    ) {}
  }
  