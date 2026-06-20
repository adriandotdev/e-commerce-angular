import { Routes } from '@angular/router';
import { Cart } from './cart/cart';
import { Checkout } from './checkout/checkout';
import { authGuard } from './guards/auth-guard';
import { publicGuard } from './guards/public-guard';
import { ProtectedLayout } from './layouts/protected-layout/protected-layout';
import { Home } from './products/products';
import { Signin } from './signin/signin';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'signin' },
  { path: 'signin', component: Signin, canActivate: [publicGuard] }, // no header

  {
    path: '',
    component: ProtectedLayout, // header lives here
    children: [
      { path: 'products', component: Home },
      { path: 'cart', component: Cart },
      { path: 'checkout', component: Checkout },
      {
        path: 'products/:id',
        pathMatch: 'full',
        loadComponent: () => {
          return import('./product/product').then((m) => m.Product);
        },
      },
    ],
    canActivate: [authGuard],
  },
];
