import {ChangeDetectionStrategy, Component, signal, OnDestroy, ChangeDetectorRef} from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { AuthService } from '../share/services/auth.service';
import { Subscription } from 'rxjs';

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
export class LoginComponent implements OnDestroy {
  hide = signal(true);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  isLoading = false;
  loginError: string = '';
  showLoginForm = true;
  authSubscription?: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private cd: ChangeDetectorRef,
  ) {}

  login() {
    if (this.email.invalid) {
      this.loginError = 'Kérlek írd be valós email címet';
      this.cd.markForCheck();
      return;
    }
    if (this.password.invalid) {
      this.loginError = 'Kérlek add meg a valós jelszavadat!';
      this.cd.markForCheck();
      return;
    }

    const emailValue = this.email.value || '';
    const passwordValue = this.password.value || '';

    this.isLoading = true;
    this.showLoginForm = false;
    this.loginError = '';
    this.cd.markForCheck();

    this.authService.signIn(emailValue, passwordValue)
      .then(userCredential => {
        console.log('Bejelentkezés sikeres', userCredential);
        this.authService.updateisLoginStatus(true);
        this.router.navigateByUrl('/home');
      })
      .catch(error => {
        console.log('Login error', error);
        this.isLoading = false;
        this.showLoginForm = true;
        switch (error.code) {
          case 'auth/user-not-found':
            this.loginError = 'Nem található ilyen fiók ezzel az email címmel';
            break;
          case 'auth/wrong-password':
            this.loginError = 'Helytelen jelszó';
            break;
          case 'auth/invalid-credential':
            this.loginError = 'Helytelen email vagy jelszó';
            break;
          default:
            this.loginError = 'Megerősítés sikertelen. Kérjük próbálja meg később';
        }
        this.cd.markForCheck();
      });
  }

  ngOnDestroy() {
    this.authSubscription?.unsubscribe();
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
