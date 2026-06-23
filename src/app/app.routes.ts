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
  { path: 'signin', component: Signin, canActivate: [publicGuard], title: 'Shopping | Sign In' }, // no header

  {
    path: '',
    component: ProtectedLayout, // header lives here
    children: [
      { path: 'products', component: Home, title: 'Shopping | Products' },
      { path: 'cart', component: Cart, title: 'Shopping | My Cart' },
      { path: 'checkout', component: Checkout, title: 'Shopping | Checkout' },
      {
        path: 'products/:id',
        pathMatch: 'full',
        loadComponent: () => {
          return import('./product/product').then((m) => m.Product);
        },
        title: 'Shopping | Product',
      },
    ],
    canActivate: [authGuard],
  },
];
