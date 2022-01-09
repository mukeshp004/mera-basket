import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';

@NgModule({
  declarations: [],
  imports: [SharedModule, DashboardModule, PagesRoutingModule],
})
export class PagesModule {}
