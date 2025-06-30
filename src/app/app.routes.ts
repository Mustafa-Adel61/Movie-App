import { Routes } from '@angular/router';
import { Home } from './home/home';
import { UserAccount } from './user-account/user-account';


export const routes: Routes = [
    {path:"",redirectTo:"home" , pathMatch:"full"},
    {path:"home",component:Home},
    {path:"userAccount",component:UserAccount}
]
