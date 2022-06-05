import { Directive, ElementRef, Input } from '@angular/core';
import JSONFormatter from 'json-formatter-js';

@Directive({
  selector: '[json-formatter]',
})
export class JsonFormatterDirective {
  @Input('json-formatter') json: any;

  constructor(private elRef: ElementRef) {}

  ngOnChanges() {
    if (this.json) {
      const formatter = new JSONFormatter(this.json);
      this.elRef.nativeElement.innerHTML = '';
      this.elRef.nativeElement.appendChild(formatter.render());
    }
  }
}
