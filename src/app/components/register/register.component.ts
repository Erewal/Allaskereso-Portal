import {ChangeDetectionStrategy, Component,signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router,RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Felhasznalo } from '../share/models/Adat';
import { AuthService } from '../share/services/auth.service';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  hide = signal(true);
  signUpform= new FormGroup ({
    email: new FormControl ('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    Repassword: new FormControl('',[Validators.required]),
    name: new FormGroup({
      firstname: new FormControl('',[Validators.required, Validators.minLength(2)]),
      lastname: new FormControl ('',[Validators.required, Validators.minLength(2)])
    })
  });
  isLoading = false;
  ShowForm = true;
  signUpError= '';

  constructor(
    private router: Router,
    private authService: AuthService
  ){}

  signUp(): void{
    if(this.signUpform.invalid){
      this.signUpError ="Javítsd ki a hibákat a regisztrációnál!";
      return;
    }
    const password= this.signUpform.get('password')?.value;
    const Repassword=this.signUpform.get('Repassword')?.value;

    if(password !==Repassword){
      return;
    }
    this.isLoading = true;
    this.ShowForm = false;

    const userData: Partial<Felhasznalo> ={
      name: {
        firstname: this.signUpform.value.name?.firstname || '',
        lastname: this.signUpform.value.name?.lastname || ''
      },
      email: this.signUpform.value.email || '',
      role: "user"
    };
    const email =this.signUpform.value.email || '';
    const pw = this.signUpform.value.password || '';

    this.authService.signUp(email,pw, userData)
      .then(userCredential =>{
        this.authService.updateisLoginStatus(true);
        this.router.navigateByUrl('/home');
      })
      .catch(error =>{
        this.isLoading = false;
        this.ShowForm = true;

        switch(error.code){
          case 'auth/email-already-in-use.':
            this.signUpError = "Ez az email cím már használva van!";
            break;
          case 'auth/invalid-email':
            this.signUpError = "Nem helyes email!";
            break;
          case 'auth/weak-password':
            this.signUpError = "A jelszó nem elég erős!";
            break;
          default:
            this.signUpError = "Hiba keletkezett a regisztrációnál. Kérlek probáld később.";

        }
      });
  }
  clickEvent(event: MouseEvent){
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
