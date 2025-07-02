import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import {
  NgForm,
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  AbstractControl,
  ValidationErrors,

} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginS } from '../../services/login-s';
import { DarkModeServiceService } from '../../services/DarkModeService.service';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-register',
  imports: [RouterModule, ReactiveFormsModule, CommonModule, TranslateModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  registerForm: FormGroup;
  submitted = false;
  errorMessage: string = '';

  constructor(private fb: FormBuilder, private loginService: LoginS, private router: Router,
    public darkModeService: DarkModeServiceService) {
    this.registerForm = this.fb.group(
      {
        firstName: ['', [Validators.required, Validators.minLength(4)]],
        lastName: ['', [Validators.required, Validators.minLength(4)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required]
      },
      {
        validators: this.matchPasswordValidator
      }
    );
  }

  matchPasswordValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirm = group.get('confirmPassword')?.value;
    return password === confirm ? null : { passwordMismatch: true };
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }

    const { firstName, lastName, email, password } = this.registerForm.value;

    const newUser = { firstName, lastName, email, password };

    const success = this.loginService.addUser(newUser);

    if (success) {
      alert('User registered successfully!');
      this.router.navigate(['/login'], { replaceUrl: true });
    } else {
      this.errorMessage = 'Email already exists. Please log in.';
    }
  }

  toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }
}
