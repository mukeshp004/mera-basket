import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { AttributeAddComponent } from './attribute-add/attribute-add.component';
import { AttributeListComponent } from './attribute-list/attribute-list.component';

const routes: Routes = [
  {
    path: '',
    component: AttributeListComponent,
  },
  {
    path: 'add',
    component: AttributeAddComponent,
    // resolve: { entity: AttributeResolveService },
  },
  {
    path: 'edit/:id',
    component: AttributeAddComponent,
    // resolve: { entity: AttributeResolveService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttributeRoutingModule {}
