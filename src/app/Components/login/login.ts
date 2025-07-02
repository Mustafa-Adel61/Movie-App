import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { LoginS } from '../../services/login-s';
import { CommonModule } from '@angular/common';
import { DarkModeServiceService } from '../../services/DarkModeService.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule, TranslateModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  loginForm: FormGroup;
  submitted = false;
  loginFailed = false;

  constructor(private fb: FormBuilder, private LoginS: LoginS, private router: Router,
    public darkModeService: DarkModeServiceService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    const users = this.LoginS.getAllUsers();
    const matchedUser = users.find(user => user.email === email && user.password === password);

    if (matchedUser) {
      this.LoginS.setCurrentUser(matchedUser);
      alert('Login successfully!');
      this.router.navigate(['/'], { replaceUrl: true });
    } else {
      alert('Email or Password Incorrect!');
      this.loginFailed = true;
    }
  }


  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }
}
