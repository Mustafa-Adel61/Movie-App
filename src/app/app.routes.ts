import { Routes } from '@angular/router';
import { Home } from './Components/home/home';
import { Wishlist } from './Components/wishlist/wishlist';

export const routes: Routes = [
    {path:'',title:'Home'},
    {path:'home',component:Home,title:'Home'},

    {path:'wishlist',component:Wishlist,title:'My Favourite'}
];
