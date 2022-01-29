import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttributeFamilyRoutingModule } from './attribute-family-routing.module';
import { AttributeFamilyListComponent } from './attribute-family-list/attribute-family-list.component';
import { AttributeFamilyUpsertComponent } from './attribute-family-upsert/attribute-family-upsert.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [AttributeFamilyListComponent, AttributeFamilyUpsertComponent],
  imports: [CommonModule, SharedModule, AttributeFamilyRoutingModule],
})
export class AttributeFamilyModule {}
