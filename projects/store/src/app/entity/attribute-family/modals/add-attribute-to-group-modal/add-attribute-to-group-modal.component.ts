import { Component, EventEmitter, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IAttribute } from 'projects/store/src/app/shared/models/attributes/attribute';
import { IAttributeGroup } from 'projects/store/src/app/shared/models/attributes/attribute-group';

@Component({
  selector: 'app-add-attribute-to-group-modal',
  templateUrl: './add-attribute-to-group-modal.component.html',
  styleUrls: ['./add-attribute-to-group-modal.component.scss'],
})
export class AddAttributeToGroupModalComponent implements OnInit {
  group!: IAttributeGroup;
  attributes: IAttribute[] = [];
  add = new EventEmitter();

  constructor(public modal: NgbActiveModal) {}

  ngOnInit(): void {}

  submit() {}

  addAttribute(attribute: IAttribute): void {
    console.log(this.group);
    this.group.attributes?.push(attribute);
    this.removeAttribute(attribute);
  }

  removeAttribute(attribute: IAttribute): void {
    const index = this.attributes.findIndex((a) => a.id === attribute.id);
    this.attributes.splice(index, 1);
  }

  confirm() {
    this.submit();

    this.modal.close(true);
  }
}
