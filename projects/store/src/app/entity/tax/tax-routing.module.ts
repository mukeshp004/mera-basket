import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaxListComponent } from './tax-list/tax-list.component';
import { TaxUpsertComponent } from './tax-upsert/tax-upsert.component';
import { TaxResolveService } from './services/tax-resolve.service';

const routes: Routes = [
  {
    path: '',
    component: TaxListComponent,
  },
  {
    path: 'add',
    component: TaxUpsertComponent,
    // resolve: { entity: TaxResolveService },
  },
  {
    path: 'edit/:id',
    component: TaxUpsertComponent,
    // resolve: { entity: TaxResolveService },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaxRoutingModule { }
