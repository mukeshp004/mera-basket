import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './admin/login/login.component';
import { JsonFromComponent } from './json-from/json-from.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './shared/guards/auth-guard.service';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'jsonform',
        component: JsonFromComponent,
      },
      {
        path: 'page',
        loadChildren: () =>
          import('./pages/pages.module').then((m) => m.PagesModule),
      },
      {
        path: 'category',
        loadChildren: () =>
          import('./entity/category/category.module').then(
            (m) => m.CategoryModule
          ),
      },
      {
        path: 'attribute',
        loadChildren: () =>
          import('./entity/attribute/attribute.module').then(
            (m) => m.AttributeModule
          ),
      },
      {
        path: 'attribute/family',
        loadChildren: () =>
          import('./entity/attribute-family/attribute-family.module').then(
            (m) => m.AttributeFamilyModule
          ),
      },

      {
        path: 'product',
        loadChildren: () =>
          import('./entity/product/product.module').then(
            (m) => m.ProductModule
          ),
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
