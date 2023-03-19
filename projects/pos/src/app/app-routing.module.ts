import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from 'projects/common-lib/src/lib/layout/layout.component';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: 'page',
        // component: DashboardComponent,
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },

      {
        path: 'entity',
        loadChildren: () =>
          import('./entity/entity.module').then((m) => m.EntityModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
