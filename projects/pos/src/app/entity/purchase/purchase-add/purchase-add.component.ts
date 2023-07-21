import {
  Component,
  OnInit,
  AfterViewInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NgbCalendar,
  NgbDate,
  NgbDateParserFormatter,
  NgbDateStruct,
  NgbTypeaheadSelectItemEvent,
} from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { debounceTime, finalize, map, Observable } from 'rxjs';
import { CartItem, ICartItem } from '../../../shared/models/cart/cart-item';
import { IProduct } from '../../../shared/models/product';
import { IPurchase } from '../../../shared/models/purchase';
import { ISupplier } from '../../../shared/models/supplier';
import { CartService } from '../../../shared/services/cart/cart.service';
import { ProductService } from '../../product/services/product.service';
import { SupplierService } from '../../supplier/services/supplier.service';
import { PurchaseService } from '../services/purchase.service';

@Component({
  selector: 'app-purchase-add',
  templateUrl: './purchase-add.component.html',
  styleUrls: ['./purchase-add.component.scss'],
})
export class PurchaseAddComponent implements OnInit, AfterViewInit {
  @ViewChild('scanner') scanner!: ElementRef;
  productFrom: FormGroup = this.generateProductForm();
  cartItems: CartItem[] = [];
  products: IProduct[] = [];
  suppliers: ISupplier[] = [];

  /**
   * Summary related Variables
   */
  total = 0;
  grossTotal = 0;

  isSaving = false;

  purchase!: IPurchase;

  datepicker = this.calendar.getToday();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private productService: ProductService,
    private cart: CartService,
    private purchaseService: PurchaseService,
    private supplierService: SupplierService,
    private toastr: ToastrService,
    private calendar: NgbCalendar,
    private ngbDateParserFormatter: NgbDateParserFormatter
  ) {}

  ngOnInit(): void {
    this.cartItemListener();
    this.getProducts();
    this.getSupplier();
  }

  ngAfterViewInit(): void {
    this.scanner.nativeElement.focus();
  }

  getSupplier() {
    this.supplierService.get().subscribe((suppliers) => {
      this.suppliers = suppliers;
    });
  }
  getProducts() {
    this.productService.get().subscribe((products) => {
      this.products = products;

      this.routeListener();
    });
  }

  onDateSelect(event: NgbDate) {
    console.log(event);
    console.log(this.ngbDateParserFormatter.format(this.datepicker));
  }

  routeListener() {
    this.activatedRoute.data.subscribe((response: any) => {
      this.purchase = response.entity;
      setTimeout(() => {
        this.updateForm(this.purchase);
      });
    });
  }

  updateForm(purchase: IPurchase) {
    purchase.items?.forEach((item: ICartItem) => {
      this.cart.addItem(
        item.product_id!,
        item.quantity!,
        item.price,
        item.discount,
        item.discount_percentage
      );
    });

    console.log('complete');
  }

  cartItemListener() {
    this.cart.getItems().subscribe({
      next: (items: any) => {
        console.log(items);
        this.cartItems = [...items];

        this.cartItems.forEach((item) => {
          item.product = this.products.find((product: IProduct) => {
            return product.id === item.id;
          });
        });

        this.total = this.cart.total;
        this.grossTotal = this.cart.grossTotal;
      },
    });
  }

  // deleteItem(item: CartItem) {
  //   const product = this.products.find((p) => item.product_id === p.id);
  //   if (product) this.cart.delete(product);
  // }

  generateProductForm() {
    return this.fb.group({
      scanner: [],
    });
  }

  scanProduct() {
    console.log(this.productFrom.value);
  }

  searchSupplier: any = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(500),
      // distinctUntilChanged(),
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
    this.purchase.supplier_id = supplier.id;
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
                (`${product.name}${product.sku}` || '')
                  .toLowerCase()
                  .indexOf(term.toLowerCase()) > -1
              );
            })
            .slice(0, 10);
        }

        return item;
      })
    );

  formatter = (product: IProduct) => `${product.name} - ${product.sku}`;

  onScannerListSelect(event: NgbTypeaheadSelectItemEvent) {
    event.preventDefault();
    console.log('Select', event.item);
    const product = event.item;

    this.cart.addItem(product.id, 1, product.price);

    // setTimeout(() => {
    this.productFrom.patchValue({ scanner: null });
    // });
  }

  submit() {
    this.isSaving = true;
    const params = {
      items: this.cartItems.map((item) => {
        const { product, ...cartItem } = item;
        return { ...cartItem };
      }),
    };
    // if (params.id) {
    //   this.subscribeToSaveResponse(this.purchaseService.put(params.id, params));
    // } else {
    this.subscribeToSaveResponse(this.purchaseService.post(params));
    // }
  }

  protected subscribeToSaveResponse(result: Observable<IProduct>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: (error) => this.onSaveError,
    });
  }

  protected onSaveSuccess(): void {
    const createdMsg = 'Purchase created Successfully';
    const updatedMsg = 'Purchase updated Successfully';

    this.toastr.success(this.purchase.id ? updatedMsg : createdMsg, 'Success');
    // this.router.navigate(['entity/purchase']);
  }

  protected onSaveError(error: any): void {
    this.toastr.error(error.message);
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  goBack() {
    this.router.navigate(['entity/product']);
  }
}
