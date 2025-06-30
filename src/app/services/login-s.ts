import { Injectable } from '@angular/core';
import { Iuser } from '../interfaces/iuser';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class LoginS {
  private localStorageKey = 'users';

  constructor(private router: Router) { }

  getAllUsers(): Iuser[] {
    const usersJson = localStorage.getItem(this.localStorageKey);
    return usersJson ? JSON.parse(usersJson) : [];
  }

  addUser(user: Iuser): boolean {
    const users = this.getAllUsers();

    const isDuplicate = users.some(u => u.email === user.email);
    if (isDuplicate) {
      alert("This User already Registered");
      return false;
    }

    users.push(user);
    localStorage.setItem(this.localStorageKey, JSON.stringify(users));
    return true;
  }

  login(email: string, password: string): boolean {
    const users = this.getAllUsers();
    return users.some(u => u.email === email && u.password === password);
  }


  setCurrentUser(user: Iuser): void {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  getCurrentUser(): Iuser | null {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
