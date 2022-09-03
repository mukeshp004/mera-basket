import { Component, OnInit } from '@angular/core';
import { FieldArrayType } from '@ngx-formly/core';

@Component({
  selector: 'app-repeater-type',
  templateUrl: './repeater-type.component.html',
  styleUrls: ['./repeater-type.component.scss'],
})
export class RepeaterTypeComponent extends FieldArrayType implements OnInit {
  constructor() {
    super();
  }

  ngOnInit(): void {}
}
