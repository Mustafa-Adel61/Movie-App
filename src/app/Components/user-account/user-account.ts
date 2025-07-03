import { Component, ElementRef, ViewChild } from '@angular/core';
import { LoginS } from '../../services/login-s';
import { Iuser } from '../../interfaces/iuser';
import { DarkModeServiceService } from '../../services/DarkModeService.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-user-account',
  imports: [CommonModule, TranslateModule],
  templateUrl: './user-account.html',
  styleUrl: './user-account.css'
})
export class UserAccount {

  currentUser: Iuser | null;
  isEditProfileBtnClicked: boolean = false;

  @ViewChild('firstNameInput') firstNameInput!: ElementRef;
  @ViewChild('lastNameInput') lastNameInput!: ElementRef;
  @ViewChild('passwordInput') passwordInput!: ElementRef;

  constructor(
    private loginService: LoginS,
    public darkModeService: DarkModeServiceService
  ) {
    this.currentUser = loginService.getCurrentUser();
  }

  Logout() {
    this.loginService.logout();
  }

  OpenEditForm() {
    this.isEditProfileBtnClicked = true;
  }

  EditProfile() {
    const users = this.loginService.getAllUsers();
    const userIndex = users.findIndex(
      u => u.email === this.currentUser?.email && u.password === this.currentUser.password
    );

    if (userIndex < 0) {
      alert('User not found');
      return;
    }

    const newFirstName = this.firstNameInput.nativeElement.value.trim();
    const newLastName = this.lastNameInput.nativeElement.value.trim();
    const newPassword = this.passwordInput.nativeElement.value.trim();

   
    const errors: string[] = [];

    if (!newFirstName && !newLastName && !newPassword) {
      alert('No information changed');
      return;
    }

    if (newFirstName && newFirstName.length < 3) {
      errors.push('First name must be at least 3 characters.');
    }

    if (newLastName && newLastName.length < 3) {
      errors.push('Last name must be at least 3 characters.');
    }

    if (newPassword && newPassword.length < 6) {
      errors.push('Password must be at least 6 characters.');
    }

    if (errors.length > 0) {
      alert(errors.join('\n'));
      return;
    }

    if (newFirstName) {
      users[userIndex].firstName = newFirstName;
    }

    if (newLastName) {
      users[userIndex].lastName = newLastName;
    }

    if (newPassword) {
      users[userIndex].password = newPassword;
    }


    this.currentUser = users[userIndex];
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(this.currentUser));

    alert('Information changed successfully');
    this.isEditProfileBtnClicked = false;
  }
}
