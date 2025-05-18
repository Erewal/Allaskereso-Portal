import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  signOut,
  authState,
  User as FirebaseUser,
  UserCredential,
  createUserWithEmailAndPassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateEmail as firebaseUpdateEmail,
  sendEmailVerification
} from '@angular/fire/auth';
import {
  Firestore,
  collection,
  doc,
  setDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Felhasznalo } from '../models/Adat';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUser: Observable<FirebaseUser | null>;

  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {
    this.currentUser = authState(this.auth);
  }

  signIn(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  signOut(): Promise<void> {
    localStorage.setItem('isLoggedIn', 'false');
    return signOut(this.auth).then(() => {
      this.router.navigateByUrl('/home');
    });
  }

  async signUp(email: string, password: string, userData: Partial<Felhasznalo>): Promise<UserCredential> {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      await this.createUserData(userCredential.user.uid, {
        ...userData,
        id: userCredential.user.uid,
        email: email,
      });
      return userCredential;
    } catch (error) {
      console.error('Hiba a regisztrációnál', error);
      throw error;
    }
  }

  private async createUserData(userId: string, userData: Partial<Felhasznalo>): Promise<void> {
    const userRef = doc(collection(this.firestore, 'User'), userId);
    return setDoc(userRef, userData);
  }

  isLoggedIn(): Observable<FirebaseUser | null> {
    return this.currentUser;
  }

  updateisLoginStatus(isLoggedIn: boolean): void {
    localStorage.setItem('isLoggedIn', isLoggedIn ? 'true' : 'false');
  }

  async updateUserEmail(newEmail: string, currentPassword?: string): Promise<void> {
    const user = this.auth.currentUser;
    if (!user) {
      console.error('Nincs bejelentkezett felhasználó');
      return Promise.reject(new Error('Nincs bejelentkezett felhasználó'));
    }

    console.log('Email módosítás kezdete, új email:', newEmail);
    console.log('Felhasználó email:', user.email, 'UID:', user.uid, 'Hitelesítési állapot:', user.metadata.lastSignInTime);

    try {
      // Újrahitelesítés, ha jelszó meg van adva
      if (currentPassword) {
        console.log('Újrahitelesítés folyamatban...');
        const credential = EmailAuthProvider.credential(user.email!, currentPassword);
        await reauthenticateWithCredential(user, credential);
        console.log('Újrahitelesítés sikeres');
      } else {
        console.warn('Nincs jelszó megadva, újrahitelesítés kihagyva');
      }

      // Próbáljuk meg frissíteni az emailt
      console.log('Email frissítése próbálkozás:', newEmail);
      await firebaseUpdateEmail(user, newEmail);
      console.log('Email sikeresen frissítve (ha nincs hiba)');

      // Verifikációs email küldése (opcionális, ha a hiba miatt szükséges)
      console.log('Verifikációs email küldése az új címre:', newEmail);
      await sendEmailVerification(user);
      console.log('Verifikációs email elküldve');
    } catch (error: any) {
      console.error('Email módosítási hiba:', error.code, error.message, 'Részletek:', error);
      if (error.code === 'auth/requires-recent-login') {
        throw new Error('Biztonsági okokból kérlek add meg a jelszavad az újra-hitelesítéshez.');
      } else if (error.code === 'auth/invalid-email') {
        throw new Error('Érvénytelen email cím.');
      } else if (error.code === 'auth/email-already-in-use') {
        throw new Error('Ez az email cím már használatban van.');
      } else if (error.code === 'auth/wrong-password') {
        throw new Error('Hibás jelszó.');
      } else if (error.code === 'auth/operation-not-allowed') {
        throw new Error('Az email módosítás nem engedélyezett a kliens oldalon. Kérlek, próbáld meg szerver oldali frissítéssel, vagy ellenőrizd a Firebase beállításokat: https://console.firebase.google.com');
      } else {
        throw new Error('Ismeretlen hiba történt: ' + (error.message || 'Nincs részletes hibaüzenet'));
      }
    }
  }
}