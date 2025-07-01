import { Component } from '@angular/core';
import { LoginS } from '../../services/login-s';
import { Iuser } from '../../interfaces/iuser';

@Component({
  selector: 'app-user-account',
  imports: [],
  templateUrl: './user-account.html',
  styleUrl: './user-account.css'
})
export class UserAccount {
  currentUser: Iuser | null

  
  
  constructor(private loginService: LoginS){

    this.currentUser = loginService.getCurrentUser()


  }

}
