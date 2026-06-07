import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => {
      return import('./home/home').then((m) => m.Home);
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
