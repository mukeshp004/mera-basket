import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent implements OnInit {

  @Input() msg: string = "Do you want to delete?";

  
  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {
  }

  confirm() {
    this.modal.close(true);
  }

}
