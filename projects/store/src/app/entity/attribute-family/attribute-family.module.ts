import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttributeFamilyRoutingModule } from './attribute-family-routing.module';
import { AttributeFamilyListComponent } from './attribute-family-list/attribute-family-list.component';
import { AttributeFamilyUpsertComponent } from './attribute-family-upsert/attribute-family-upsert.component';
import { SharedModule } from '../../shared/shared.module';
import { AddGroupComponent } from './modals/add-group/add-group.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddAttributeToGroupModalComponent } from './modals/add-attribute-to-group-modal/add-attribute-to-group-modal.component';

@NgModule({
  declarations: [
    AttributeFamilyListComponent,
    AttributeFamilyUpsertComponent,
    AddGroupComponent,
    AddAttributeToGroupModalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AttributeFamilyRoutingModule,
    NgbModule,
  ],
})
export class AttributeFamilyModule {}
