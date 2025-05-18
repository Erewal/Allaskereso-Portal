import { Injectable } from '@angular/core';
import { Firestore, doc, getDoc, updateDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { Observable, from, of } from 'rxjs';
import { switchMap } from 'rxjs';
import { Felhasznalo } from '../models/Adat';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) { }

  getUserProfile(): Observable<{ user: Felhasznalo | null }> {
    return this.authService.currentUser.pipe(
      switchMap(authUser => {
        if (!authUser) {
          return of({ user: null });
        }
        return from(this.fetchUser(authUser.uid));
      })
    );
  }

  private async fetchUser(userId: string): Promise<{ user: Felhasznalo | null }> {
    try {
      const userDocRef = doc(this.firestore, 'User', userId);
      const userSnapshot = await getDoc(userDocRef);

      if (!userSnapshot.exists()) {
        return { user: null };
      }

      const userData = userSnapshot.data() as Felhasznalo;
      const user: Felhasznalo = { ...userData, id: userId };

      return { user };
    } catch (error) {
      console.error('Hiba a felhasználó lekérésekor:', error);
      return { user: null };
    }
  }

  updateUser(userId: string, data: Partial<Felhasznalo>): Promise<void> {
    const userDocRef = doc(this.firestore, 'User', userId);
    return updateDoc(userDocRef, data);
  }
}
