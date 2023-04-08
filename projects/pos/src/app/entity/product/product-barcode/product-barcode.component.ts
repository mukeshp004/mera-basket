import { Component, OnInit } from '@angular/core';
import { IProduct } from '../../../shared/models/product';
import { ProductService } from '../services/product.service';
import { NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { Observable, debounceTime, map } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-product-barcode',
  templateUrl: './product-barcode.component.html',
  styleUrls: ['./product-barcode.component.scss'],
})
export class ProductBarcodeComponent implements OnInit {
  from: FormGroup = this.generateForm();
  products: IProduct[] = [];
  selectedProduct!: IProduct;
  p: any;

  row: number = 4;
  column: number = 4;
  width: number = 1;
  height: number = 45;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getProducts();
  }

  getNoList(no: number) {
    return new Array(no);
  }

  getProducts() {
    this.productService.get().subscribe((products) => {
      this.products = products;
    });
  }

  generateForm() {
    return this.fb.group({
      product: [],
    });
  }

  onProductSelected(event: NgbTypeaheadSelectItemEvent) {
    event.preventDefault();
    console.log('Select', event.item);
    this.selectedProduct = event.item;
  }

  search: any = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(500),
      // distinctUntilChanged(),
      // switchMap((searchText: string) => {
      //   return this.productService.search({ term: searchText });
      // })
      map((term) => {
        let item: IProduct[] = [];
        if (term.length > 2) {
          item = this.products
            .filter((product: IProduct) => {
              return (
                (product.name || '').toLowerCase().indexOf(term.toLowerCase()) >
                -1
              );
            })
            .slice(0, 10);
        }

        return item;
      })
    );

  formatter = (x: { name: string }) => x.name;
}
