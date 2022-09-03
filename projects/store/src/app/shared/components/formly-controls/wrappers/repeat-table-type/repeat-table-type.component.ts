import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FieldArrayType, FormlyFormBuilder } from '@ngx-formly/core';

@Component({
  selector: 'app-repeat-table-type',
  templateUrl: './repeat-table-type.component.html',
  styleUrls: ['./repeat-table-type.component.scss'],
})
export class RepeatTableTypeComponent
  extends FieldArrayType
  implements OnInit, OnChanges
{
  // https://stackblitz.com/edit/angular-material-formly-table?file=src%2Fapp%2Fformly%2Fmy-formly.module.ts,src%2Fapp%2Fformly%2Fmy-formly-array-type.component.ts
  fieldArray = [];

  constructor() {
    super();
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  getColumns() {
    return this.to['columns'];
  }
}
