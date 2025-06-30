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
        path: 'navbar',
        loadComponent: () => import('./Components/navbar/navbar').then(m => m.Navbar),
        canActivate: [authRequiredGuard]
    },
    {
        path: '',
        redirectTo: 'navbar',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
