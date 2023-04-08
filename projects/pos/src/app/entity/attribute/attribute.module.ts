import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttributeRoutingModule } from './attribute-routing.module';
import { AttributeListComponent } from './attribute-list/attribute-list.component';
import { AttributeAddComponent } from './attribute-add/attribute-add.component';
import { SharedModule } from '../../shared/shared.module';
import { KeysPipe } from 'projects/common-lib/src/lib/shared/pipes/keys.pipe';

@NgModule({
  declarations: [AttributeListComponent, AttributeAddComponent, KeysPipe],
  imports: [CommonModule, AttributeRoutingModule, SharedModule],
})
export class AttributeModule {}
