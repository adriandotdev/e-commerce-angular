import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  let isAuth = localStorage.getItem('auth');

  if (isAuth !== 'true') {
    return router.createUrlTree(['/signin']);
  }
  return true;
};
