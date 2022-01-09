import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
    // component: LoginComponent,
  },
  // {
  //   path: 'page',

  //   component: DemoComponent,
  // },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'page',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'category',
        loadChildren: () =>
          import('./entity/category/category.module').then((m) => m.CategoryModule),
      },
      
    ],
  },
  { path: '**', redirectTo: 'dashboard' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
