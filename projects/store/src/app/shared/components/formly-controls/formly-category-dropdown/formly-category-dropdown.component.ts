import { Component, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-category-dropdown',
  templateUrl: './formly-category-dropdown.component.html',
  styleUrls: ['./formly-category-dropdown.component.scss'],
})
export class FormlyCategoryDropdownComponent
  extends FieldType<FieldTypeConfig>
  implements OnInit
{
  items: any;
  // constructor(private ngZone: NgZone) {
  //   super();
  // }

  ngOnInit(): void {
    this.items = this.field.templateOptions?.options || [];
  }
}
