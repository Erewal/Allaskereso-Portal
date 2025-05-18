import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { firstValueFrom } from 'rxjs';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  try {
    // Várjuk meg, hogy az authService.currentUser értéket adjon
    const user = await firstValueFrom(authService.currentUser);
    if (user) {
      console.log('Felhasználó bejelentkezve:', user.uid);
      return true;
    } else {
      console.log('Access denied: Nincs bejelentkezett felhasználó');
      router.navigate(['/login']);
      return false;
    }
  } catch (error) {
    console.error('Hiba az authGuard-ban:', error);
    router.navigate(['/login']);
    return false;
  }
};

export const publicGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);

  try {
    const user = await firstValueFrom(authService.currentUser);
    if (!user) {
      console.log('Nincs bejelentkezett felhasználó, hozzáférés engedélyezve');
      return true;
    } else {
      console.log('Already authenticated: Átirányítás a /home oldalra');
      router.navigate(['/home']);
      return false;
    }
  } catch (error) {
    console.error('Hiba a publicGuard-ban:', error);
    return true; // Ha hiba történik, engedjük a hozzáférést a publikus oldalhoz
  }
};