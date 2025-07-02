import { Component } from '@angular/core';
import { LoginS } from '../../services/login-s';
import { Iuser } from '../../interfaces/iuser';
import { DarkModeServiceService } from '../../services/DarkModeService.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-account',
  imports: [CommonModule],
  templateUrl: './user-account.html',
  styleUrl: './user-account.css'
})
export class UserAccount {
  currentUser: Iuser | null



  constructor(private loginService: LoginS, public darkModeService: DarkModeServiceService) {

    this.currentUser = loginService.getCurrentUser()


  }

}
