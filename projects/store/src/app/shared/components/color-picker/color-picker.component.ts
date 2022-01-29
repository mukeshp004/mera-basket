import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorPickerComponent),
      multi: true,
    },
  ],
})
export class ColorPickerComponent implements OnInit, ControlValueAccessor {
  @Input()
  disabled = false;

  value = '#ffff';

  onChange: any = () => {};
  onTouched: any = () => {};

  constructor() {}

  ngOnInit(): void {
    console.log(this.disabled);
  }

  /**
   * Called when color is changed in color picker
   *
   * @param color color code
   */
  onColorChange(color: string) {
    this.value = color;
    /**
     * call onChange method to reflect to component
     */
    this.onChange(color);
  }

  /**
   * This method set the color to component
   *
   * @param value color code
   */
  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }
}
