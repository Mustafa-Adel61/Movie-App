// src/app/guards/auth-required.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginS } from './../services/login-s';

export const authRequiredGuard: CanActivateFn = () => {
  const userService = inject(LoginS);
  const router = inject(Router);

  const user = userService.getCurrentUser();

  if (!user) {
    router.navigate(['/login'], { replaceUrl: true });
    return false;
  }

  return true;
};
