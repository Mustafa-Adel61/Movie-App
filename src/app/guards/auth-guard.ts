
// src/app/guards/auth.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { LoginS } from './../services/login-s';

export const authGuard: CanActivateFn = () => {
  const loginS = inject(LoginS);
  const router = inject(Router);

  const user = loginS.getCurrentUser();

  if (user) {
    router.navigate(['/home'], { replaceUrl: true });
    return false;
  }

  return true;
};


