import { Component, inject, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { Auth, user } from '@angular/fire/auth';
import { Felhasznalo } from '../share/models/Adat';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { firstValueFrom, Subscription } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CommonModule,
    ReactiveFormsModule
  ]
})
export class ProfileComponent implements OnInit, OnDestroy {
  userData: Felhasznalo | null = null;
  loading = true;
  error: string | null = null;
  editMode = false;
  profileForm!: FormGroup;
  isStylesLoaded = false;
  private userSub?: Subscription;

  private fb = inject(FormBuilder);
  private firestore = inject(Firestore);
  private auth = inject(Auth);
  private cdr = inject(ChangeDetectorRef);

  ngOnInit() {
    setTimeout(() => {
      this.isStylesLoaded = true;
      this.cdr.detectChanges();
      this.loadUserProfile();
    }, 100); 
  }

  ngOnDestroy() {
    if (this.userSub) {
      this.userSub.unsubscribe();
    }
  }

  async loadUserProfile() {
    try {
      this.loading = true;
      this.error = null;
      console.log('Auth lekérdezése folyamatban...');

      const authUser = await firstValueFrom(user(this.auth));
      console.log('AuthUser:', authUser);

      if (!authUser) {
        this.error = 'Nincs bejelentkezett felhasználó. Kérlek, jelentkezz be újra.';
        console.warn('Nincs bejelentkezett felhasználó.');
        this.loading = false;
        this.cdr.detectChanges();
        return;
      }

      console.log('Firestore lekérdezés: User/', authUser.uid);
      const userDocRef = doc(this.firestore, 'User', authUser.uid);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        this.error = 'Nincs profiladatok a bejelentkezett felhasználóhoz. Regisztrálj vagy kérj segítséget!';
        console.warn('Firestore dokumentum nem létezik:', authUser.uid);
        this.loading = false;
        this.cdr.detectChanges();
        return;
      }

      const data = userSnapshot.data();
      console.log('Firestore adatok:', data);

      if (!data || !data['name'] || !data['email'] || !data['role']) {
        this.error = 'Hiányos vagy érvénytelen felhasználói adatok a Firestore-ban.';
        console.warn('Érvénytelen Firestore adatok:', data);
        this.loading = false;
        this.cdr.detectChanges();
        return;
      }

      this.userData = {
        id: authUser.uid,
        name: {
          firstname: data['name'].firstname,
          lastname: data['name'].lastname
        },
        email: data['email'],
        role: data['role']
      };

      console.log('Betöltött userData:', this.userData);
      this.initializeForm();
    } catch (error: any) {
      if (error.code === 'permission-denied') {
        this.error = 'Hozzáférési hiba: Nincs jogosultságod a felhasználói adatok lekérdezéséhez. Ellenőrizd a Firestore szabályokat.';
      } else {
        this.error = 'Hiba történt a profil betöltése során: ' + (error.message || 'Ismeretlen hiba');
      }
      console.error('Profil betöltési hiba:', error);
    } finally {
      this.loading = false;
      this.cdr.detectChanges();
    }
  }

  private initializeForm() {
    if (this.userData) {
      this.profileForm = this.fb.group({
        firstname: [this.userData.name.firstname, Validators.required],
        lastname: [this.userData.name.lastname, Validators.required]
      });
    }
  }

  toggleEdit() {
    if (this.editMode) {
      this.editMode = false;
      if (this.userData) {
        console.log('Form visszaállítása:', this.userData.name);
        this.profileForm.setValue({
          firstname: this.userData.name.firstname,
          lastname: this.userData.name.lastname
        });
      }
    } else {
      this.editMode = true;
    }
    this.cdr.detectChanges();
  }

  async saveChanges() {
    if (!this.profileForm.valid || !this.userData) {
      console.warn('Hibás űrlap vagy hiányzó felhasználói adatok.');
      this.error = 'Kérlek, töltsd ki az összes mezőt helyesen.';
      this.cdr.detectChanges();
      return;
    }

    const updatedData: Partial<Felhasznalo> = {
      name: {
        firstname: this.profileForm.value.firstname,
        lastname: this.profileForm.value.lastname
      }
    };

    try {
      const userDocRef = doc(this.firestore, 'User', this.userData.id);
      await updateDoc(userDocRef, updatedData);

      this.userData = { ...this.userData, ...updatedData };
      this.toggleEdit();
      this.error = null;
    } catch (error: any) {
      if (error.code === 'permission-denied') {
        this.error = 'Hozzáférési hiba: Nincs jogosultságod a felhasználói adatok módosításához.';
      } else {
        this.error = 'Hiba történt a mentés során: ' + (error.message || 'Ismeretlen hiba');
      }
      console.error('Felhasználó frissítés hiba:', error);
    } finally {
      this.cdr.detectChanges();
    }
  }
}