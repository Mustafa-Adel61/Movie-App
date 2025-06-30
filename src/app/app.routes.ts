import { Routes } from '@angular/router';
import { Register } from './Components/register/register';


export const routes: Routes = [
    { path: '', component: Register },


    //Notfound
    // { path: 'notFound', component: NotFound, title: 'Notfound' },
    // { path: '**', redirectTo: 'notFound' }
];
