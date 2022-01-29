import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { AttributeEditComponent } from './attribute-edit/attribute-edit.component';
import { AttributeListComponent } from './attribute-list/attribute-list.component';
import { AttributeRoutingModule } from './attribute-routing.module';

@NgModule({
  declarations: [AttributeEditComponent, AttributeListComponent],
  imports: [CommonModule, SharedModule, AttributeRoutingModule],
})
export class AttributeModule {}
