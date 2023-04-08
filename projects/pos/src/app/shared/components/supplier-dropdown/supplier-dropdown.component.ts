import { Component, Input, forwardRef } from '@angular/core';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { Observable, debounceTime, map } from 'rxjs';
import { IProduct } from '../../models/product';
import { ISupplier } from '../../models/supplier';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-supplier-dropdown',
  templateUrl: './supplier-dropdown.component.html',
  styleUrls: ['./supplier-dropdown.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SupplierDropdownComponent),
      multi: true,
    },
  ],
})
export class SupplierDropdownComponent implements ControlValueAccessor {
  @Input() suppliers: any[] = [];
  @Input() getSelectedValue?: Function;
  onChange: any = () => {};
  onTouch: any = () => {};

  field: any;

  searchSupplier: any = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(500),
      // switchMap((searchText: string) => {
      //   return this.productService.search({ term: searchText });
      // })
      map((term) => {
        let item: IProduct[] = [];
        if (term.length >= 1) {
          item = this.suppliers
            .filter((supplier: ISupplier) => {
              return (
                (supplier.name || '')
                  .toLowerCase()
                  .indexOf(term.toLowerCase()) > -1
              );
            })
            .slice(0, 10);
        }

        return item;
      })
    );
  };

  supplierFormatter = (x: { name: string }) => x.name;

  onSupplierSelect(event: NgbTypeaheadSelectItemEvent) {
    console.log(event);
    const supplier = event.item;
  }

  // sets the value used by the ngModel of the element
  set value(val: string) {
    this.field = val;
    this.onChange(val);
    this.onTouch(val);
  }

  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    // throw new Error('Method not implemented.');
  }
}
