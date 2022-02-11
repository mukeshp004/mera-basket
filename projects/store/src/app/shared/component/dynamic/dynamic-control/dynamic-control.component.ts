/**
 * https://angular.io/guide/dynamic-form
 */
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IAttribute } from '../../../models/attributes/attribute';
import { IAttributeGroup } from '../../../models/attributes/attribute-group';
import { DropdownInput } from '../../../models/fields/dropdown';
import { DynamicInput } from '../../../models/fields/input';
import { Textbox } from '../../../models/fields/textbox';

@Component({
  selector: 'app-dynamic-control',
  templateUrl: './dynamic-control.component.html',
  styleUrls: ['./dynamic-control.component.scss']
})
export class DynamicControlComponent implements OnInit {
  @Input() attribute!: IAttribute;
  @Input() input!: DynamicInput<string>;
  @Input() form!: FormGroup;
  @Input() group!: IAttributeGroup;
  // get isValid() { return this.form.controls[this.input.key].valid; }


  constructor() { }

  // get controls() {
  //   // this.form.controls(this.group.name)
  // }

  ngOnInit(): void {

    console.log(this.attribute);
    if(this.attribute.type === 'select') {
      this.input = new DropdownInput({
        key: this.attribute.code,
        label: this.attribute.name,
        options: this.attribute.options?.map(o => { return { key: o.id, value: o.name}}),
        order: 2
      });
    } else {
      this.input = new Textbox({
        key: this.attribute.code,
        label: this.attribute.name,
        type: 'text',
        order: 2
      });
    }
  }

}
