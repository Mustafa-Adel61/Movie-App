import { Routes } from '@angular/router';
import { authGuard } from './guards/auth-guard';
import { authRequiredGuard } from './guards/auth-required-guard';

export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./Components/login/login').then(m => m.Login),
        canActivate: [authGuard]
    },
    {
        path: 'register',
        loadComponent: () => import('./Components/register/register').then(m => m.Register),
        canActivate: [authGuard]
    },
    {
        path: 'home',
        loadComponent: () => import('./Components/navbar/navbar').then(m => m.Home),
        canActivate: [authRequiredGuard]
    },
      {
        path: 'userAccount',
        loadComponent: () => import('./Components/navbar/navbar').then(m => m.UserAccount),
        canActivate: [authRequiredGuard]
    },
    {
      path:"",
      redirectTo:"home" , 
      pathMatch:"full"
    },
    {
        path: '**',
        redirectTo: 'login'
    }

];


