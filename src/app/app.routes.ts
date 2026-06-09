import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'products',
  },
  {
    path: 'products',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./products/products').then((m) => m.Home);
    },
  },
  {
    path: 'cart',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./cart/cart').then((m) => m.Cart);
    },
  },
];
