import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'app-check-list',
  templateUrl: './check-list.component.html',
  styleUrls: ['./check-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: CheckListComponent,
    },
  ],
})
export class CheckListComponent implements ControlValueAccessor {
  @Input() items: any[] = [];

  @Input() label: any;
  @Input() id?: string;

  onChange = (item: any) => {};

  onTouched: Function = () => {};

  touched = false;

  disabled = false;

  selectedItems: Array<any> = [];

  constructor() {}

  getUniqueId(item: any, index: number): string {
    return this.id
      ? `${this.id}-${item[this.label]}-${index}`
      : `${item[this.label]}-${index}`;
  }

  onSeletionChange(item: any) {
    this.markAsTouched();

    if (this.selectedItems.includes(item)) {
      this.selectedItems.splice(this.selectedItems.indexOf(item));
    } else {
      this.selectedItems.push(item);
    }

    this.onChange(this.selectedItems);
  }

  writeValue(items: any[]): void {
    this.selectedItems = items;
  }

  registerOnChange(onChangeFn: any) {
    this.onChange = onChangeFn;
  }

  registerOnTouched(onTouched: Function) {
    this.onTouched = onTouched;
  }

  markAsTouched() {
    if (!this.touched) {
      this.onTouched();
      this.touched = true;
    }
  }

  setDisabledState(disabled: boolean) {
    this.disabled = disabled;
  }
}
