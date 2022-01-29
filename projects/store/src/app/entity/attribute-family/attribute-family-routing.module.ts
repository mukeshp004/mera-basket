import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttributeFamilyListComponent } from './attribute-family-list/attribute-family-list.component';
import { AttributeFamilyUpsertComponent } from './attribute-family-upsert/attribute-family-upsert.component';
import { AttributeFamilyResolveService } from './services/attribute-family-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: AttributeFamilyListComponent,
  },
  {
    path: 'add',
    component: AttributeFamilyUpsertComponent,
    resolve: { entity: AttributeFamilyResolveService },
  },
  {
    path: 'edit/:id',
    component: AttributeFamilyUpsertComponent,
    resolve: { entity: AttributeFamilyResolveService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AttributeFamilyRoutingModule {}
