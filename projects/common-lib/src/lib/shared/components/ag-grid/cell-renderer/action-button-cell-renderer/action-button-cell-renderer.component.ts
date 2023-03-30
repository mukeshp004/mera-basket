/**
 * for reference
 * https://stackblitz.com/edit/ag-grid-angular-hello-world-bq5yev?file=src%2Fapp%2Fbutton-renderer.component.ts
 **/
import { Component, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-action-button-cell-renderer',
  templateUrl: './action-button-cell-renderer.component.html',
  styleUrls: ['./action-button-cell-renderer.component.scss'],
})
export class ActionButtonCellRendererComponent
  implements ICellRendererAngularComp
{
  params!: any;
  buttons!: any[];
  constructor() {}

  agInit(params: any): void {
    this.params = params;
    this.buttons = this.params['buttons'];
  }

  refresh(params: ICellRendererParams): boolean {
    return true;
  }

  ngOnInit(): void {}
}
