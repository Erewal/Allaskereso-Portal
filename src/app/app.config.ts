import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
      provideFirebaseApp(() => initializeApp({ projectId: "allaskereso-portal",
         appId: "1:517971716049:web:9e213d22a4600a8f43e2f0",
          storageBucket: "allaskereso-portal.firebasestorage.app",
           apiKey: "AIzaSyBqwyHDyoPLDGhnDeemkgS_YjnnvfDd2wM",
            authDomain: "allaskereso-portal.firebaseapp.com",
             messagingSenderId: "517971716049",
              measurementId: "G-7HN03Y78KK" })),
               provideAuth(() => getAuth()),
                provideFirestore(() => getFirestore())]
};
