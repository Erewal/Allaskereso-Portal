import {ChangeDetectionStrategy ,Component, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,              
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  hide = signal(true);
  email = new FormControl('');
  password = new FormControl('');
  isLoading = false;
  loginError = '';
  showLoginForm = true;

  constructor() {}

  login() {
    this.loginError = '';

    if (this.email.value === 'test@gmail.com' && this.password.value === 'testpws') {
      this.isLoading = true;
      this.showLoginForm = false;
      localStorage.setItem('isLoggedIn', 'true');
      window.location.href = '/home';
    } else {
      this.loginError = 'Helytelen email vagy jelszó';
    }
  }
  clickEvent(event: MouseEvent){
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
