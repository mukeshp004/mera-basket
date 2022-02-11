import { DynamicInput } from "./input";


export class DropdownInput extends DynamicInput<string> {
  override controlType = 'dropdown';
}

