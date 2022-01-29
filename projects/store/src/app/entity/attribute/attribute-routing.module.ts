import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttributeEditComponent } from './attribute-edit/attribute-edit.component';
import { AttributeListComponent } from './attribute-list/attribute-list.component';
import { AttributeResolveService } from './attribute-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: AttributeListComponent,
  },
  {
    path: 'add',
    component: AttributeEditComponent,
    resolve: { entity: AttributeResolveService },
  },
  {
    path: 'edit/:id',
    component: AttributeEditComponent,
    resolve: { entity: AttributeResolveService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttributeRoutingModule {}
