import { Component, EventEmitter, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AttributeGroup } from 'projects/store/src/app/shared/models/attributes/attribute-group';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss'],
})
export class AddGroupComponent implements OnInit {
  form = this.getForm();
  add = new EventEmitter();

  constructor(public modal: NgbActiveModal, private fb: UntypedFormBuilder) {}

  ngOnInit(): void {}

  getForm(): UntypedFormGroup {
    return this.fb.group({
      id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      position: [0, Validators.required],
    });
  }

  submit() {
    const group = new AttributeGroup();
    console.log(this.form.value);
    this.add.emit(Object.assign({}, group, this.form.value));
  }

  confirm() {
    this.submit();

    this.modal.close(true);
  }
}
