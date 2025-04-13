import {ChangeDetectionStrategy, Component,signal } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router,RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Felhasznalo } from '../share/models/Adat';

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

  constructor(private router: Router){}

  signUp(): void{
    if(this.signUpform.invalid){
      this.signUpError ="Javítsd ki a hibákat a regisztrációnál!";
      return;
    }
    const password= this.signUpform.get('password');
    const Repassword=this.signUpform.get('Repassword');

    if(password?.value !==Repassword?.value){
      return;
    }
    this.isLoading = true;
    this.ShowForm = false;

    const newUser: Felhasznalo ={
      name: {
        fistname: this.signUpform.value.name?.firstname || '',
        lastname: this.signUpform.value.name?.lastname || ''
      },
      email: this.signUpform.value.email || '',
      password: this.signUpform.value.password || ''
    };

    this.router.navigateByUrl('/home');
    console.log("Új felhasználó: ",newUser);
    console.log("Form value",this.signUpform.value);
  }
  clickEvent(event: MouseEvent){
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}
